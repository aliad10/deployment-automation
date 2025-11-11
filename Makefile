.PHONY: help docker-up docker-down prisma-generate prisma-migrate seed-deployment seed-contract setup init run deploy all clean-db clean-all

# Default target
help:
	@echo "Deployment Commands:"
	@echo "  make deploy <chain_name>     - Deploy contracts to a chain"
	@echo "  make run deploy <chain_name> - Same as above (alternative syntax)"
	@echo "  make all deploy <chain_name> - Full pipeline: setup + seed + deploy"
	@echo "  make setup <chain_name>      - Post-deployment setup only"
	@echo ""
	@echo "Cleanup Commands:"
	@echo "  make clean-db                - Reset database (npx prisma migrate reset)"
	@echo "  make docker-down             - Stop and remove Docker containers"
	@echo "  make clean-all               - Clean everything (DB + Docker)"
	@echo ""
	@echo "Examples:"
	@echo "  make deploy sepolia"
	@echo "  make deploy arbitrum"
	@echo "  make setup sepolia"
	@echo "  make clean-all"

# Prevent Make from treating deploy and chain names as targets
%:
	@:

# Core infra (production)
docker-up:
	@echo "Checking Docker daemon status..."; \
	if ! docker info > /dev/null 2>&1; then \
		echo ""; \
		echo "❌ Error: Docker daemon is not running."; \
		echo "Please start Docker Desktop or Docker daemon and try again."; \
		echo ""; \
		echo "On macOS, you can start Docker Desktop from:"; \
		echo "  Applications > Docker"; \
		echo ""; \
		exit 1; \
	fi; \
	echo "✅ Docker daemon is running"; \
	NODE_ENV=production npm run docker:up

# Stop and remove Docker containers
docker-down:
	@echo "Stopping and removing Docker containers..."
	@docker compose down -v || true
	@echo "✅ Docker containers stopped and removed"

prisma-generate:
	@NODE_ENV=production npx prisma generate

prisma-migrate:
	@NODE_ENV=production npx prisma migrate deploy

seed-deployment:
	@NODE_ENV=production npm run seed:deployment

# Seed contracts for a specific chain (expects upper/lower case names)
# Usage:
#   make seed-contract CHAIN=sepolia
seed-contract:
	@CHAIN="$(CHAIN)"; \
	if [ -z "$$CHAIN" ]; then \
		echo "Error: Chain name is required. Usage: make seed-contract CHAIN=<chain_name>"; \
		echo "Example: make seed-contract CHAIN=sepolia"; \
		exit 1; \
	fi; \
	UPPER=$$(printf "%s" "$$CHAIN" | tr '[:lower:]' '[:upper:]'); \
	echo "Seeding contracts for chain: $$UPPER"; \
	NODE_ENV=production node prisma/seed-contract.js $$UPPER


# Initialize with seeds (extracts chain from command arguments)
# Usage: make init deploy <chain_name>
init: seed-deployment
	@CHAIN="$(word 3,$(MAKECMDGOALS))"; \
	if [ -z "$$CHAIN" ]; then \
		echo "Error: Chain name is required. Usage: make init deploy <chain_name>"; \
		echo "Example: make init deploy sepolia"; \
		exit 1; \
	fi; \
	UPPER=$$(printf "%s" "$$CHAIN" | tr '[:lower:]' '[:upper:]'); \
	echo "Seeding contracts for chain: $$UPPER"; \
	NODE_ENV=production node prisma/seed-contract.js $$UPPER

# Main deployment command
# RPC URL is automatically selected based on chain from .env file
# Supports: RPC_URL_SEPOLIA, RPC_URL_ARBITRUM, RPC_URL_ETHEREUM, or fallback to RPC_URL
# This runs: node index.js <deployment-name>
#
# Usage: make deploy sepolia
# Or:    make run deploy sepolia (alternative syntax)
deploy:
	@CHAIN="$(word 2,$(MAKECMDGOALS))"; \
	if [ "$$CHAIN" = "deploy" ] || [ -z "$$CHAIN" ]; then \
		CHAIN="$(word 3,$(MAKECMDGOALS))"; \
	fi; \
	if [ -z "$$CHAIN" ]; then \
		echo "Error: Chain name is required."; \
		echo "Usage: make deploy <chain_name>"; \
		echo "Example: make deploy sepolia"; \
		exit 1; \
	fi; \
	echo "Deploying to chain: $$CHAIN"; \
	DEPLOYMENT_NAME="$$CHAIN-deployment"; \
	echo "Running: node index.js $$DEPLOYMENT_NAME"; \
	NODE_ENV=production node index.js $$DEPLOYMENT_NAME || exit 1

# Alternative syntax: make run deploy sepolia
run: deploy

# Full pipeline: docker-up -> prisma-generate -> prisma-migrate -> seed-deployment -> seed-contract -> deploy -> setup
# Usage: make all deploy <chain_name>
all:
	@CHAIN="$(word 3,$(MAKECMDGOALS))"; \
	if [ -z "$$CHAIN" ] || [ "$$CHAIN" = "all" ] || [ "$$CHAIN" = "deploy" ]; then \
		echo "Error: Chain name is required. Usage: make all deploy <chain_name>"; \
		echo "Example: make all deploy sepolia"; \
		exit 1; \
	fi; \
	echo "🚀 Starting full deployment pipeline for chain: $$CHAIN"; \
	echo ""; \
	echo "📦 Step 1/7: Starting Docker database..."; \
	$(MAKE) docker-up || exit 1; \
	echo "⏳ Waiting for database to be ready..."; \
	sleep 5; \
	echo ""; \
	echo "🔧 Step 2/7: Generating Prisma client..."; \
	$(MAKE) prisma-generate || exit 1; \
	echo ""; \
	echo "📊 Step 3/7: Running database migrations..."; \
	$(MAKE) prisma-migrate || exit 1; \
	echo ""; \
	echo "🌱 Step 4/7: Seeding deployment data..."; \
	$(MAKE) seed-deployment || exit 1; \
	echo ""; \
	echo "📝 Step 5/7: Seeding contract data for chain: $$CHAIN..."; \
	UPPER=$$(printf "%s" "$$CHAIN" | tr '[:lower:]' '[:upper:]'); \
	NODE_ENV=production node prisma/seed-contract.js $$UPPER || exit 1; \
	echo ""; \
	echo "🚀 Step 6/7: Deploying contracts..."; \
	DEPLOYMENT_NAME="$$CHAIN-deployment"; \
	NODE_ENV=production node index.js $$DEPLOYMENT_NAME || exit 1; \
	# echo ""; \
	# echo "⚙️  Step 7/7: Running post-deployment setup..."; \
	# DEPLOYMENT_NAME="$$CHAIN-deployment" NODE_ENV=production node run/setup/index.js || exit 1; \
	# echo ""; \
	# echo "✅ Full deployment pipeline completed successfully!"

# Post-deployment setup only. Usage: make setup <chain_name>
setup:
	@CHAIN="$(word 2,$(MAKECMDGOALS))"; \
	if [ -z "$$CHAIN" ] || [ "$$CHAIN" = "setup" ]; then \
	  echo "Error: Chain name is required. Usage: make setup <chain_name>"; \
	  exit 1; \
	fi; \
	DEPLOYMENT_NAME="$$CHAIN-deployment" NODE_ENV=production node run/setup/index.js || exit 1

# Cleanup commands
# Reset database (drops all data and reapplies migrations)
clean-db:
	@echo "Resetting database..."
	@NODE_ENV=production npx prisma migrate reset --force || true
	@echo "✅ Database reset complete"

# Clean everything: database + Docker
clean-all: clean-db docker-down
	@echo "✅ All cleanup complete: database reset and Docker containers removed"

