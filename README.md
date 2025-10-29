# Deployment Automation

Automated deployment system for smart contracts across multiple blockchain networks with database tracking and CSV export.

## Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- PostgreSQL (via Docker)
- Prisma CLI

## Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env` file:
```env
# Database
DATABASE_URL="postgresql://dbUsername:password@localhost:5436/localDb"

# RPC URLs (chain-specific)
RPC_URL_SEPOLIA=https://sepolia.infura.io/v3/YOUR_KEY
RPC_URL_ARBITRUM=https://arb1.arbitrum.io/rpc
RPC_URL_ETHEREUM=https://mainnet.infura.io/v3/YOUR_KEY

# Generic fallback (if chain-specific not set)
RPC_URL=https://your-rpc-url.com

# Wallet
PRIVATE_KEY=your_private_key_here
```

## Quick Start

### Full Pipeline (Recommended for first-time setup)
```bash
make all deploy sepolia
```

This will:
1. Start Docker container with PostgreSQL
2. Generate Prisma client
3. Run database migrations
4. Seed deployments
5. Seed contracts for the specified chain
6. Deploy all contracts
7. Generate CSV report

## Available Commands

### Deployment Commands

#### Simple Deploy
Deploy contracts to a specific chain:
```bash
make deploy sepolia
make deploy arbitrum
make deploy ethereum
```

#### Alternative Syntax
```bash
make run deploy sepolia
```

#### Full Pipeline
Complete setup + seed + deploy:
```bash
make all deploy sepolia
```

### Setup Commands

#### Start Docker Database
```bash
make docker-up
```

#### Generate Prisma Client
```bash
make prisma-generate
```

#### Run Migrations
```bash
make prisma-migrate
```

#### Setup Database & Prisma
```bash
make setup
```

### Seeding Commands

#### Seed Deployments
```bash
make seed-deployment
```

#### Seed Contracts for Specific Chain
```bash
make seed-contract CHAIN=sepolia
make seed-contract CHAIN=arbitrum
make seed-contract CHAIN=ethereum
```

### Cleanup Commands

#### Reset Database
Reset database (drops all data and reapplies migrations):
```bash
make clean-db
```

#### Stop Docker Containers
Stop and remove Docker containers:
```bash
make docker-down
```

#### Clean Everything
Reset database and remove Docker containers:
```bash
make clean-all
```

## Supported Chains

- **Sepolia** (Testnet) - Chain ID: 11155111
- **Ethereum** (Mainnet) - Chain ID: 1
- **Arbitrum** (Mainnet) - Chain ID: 42161

## CSV Export

After each deployment, a CSV file is automatically generated with deployment details:

- **Filename format**: `deployment-<deployment-name>-<date>.csv`
- **Example**: `deployment-sepolia-deployment-2024-10-28.csv`

### CSV Columns

- Contract Name
- Contract Address
- Gas Used
- Fee (Wei)
- Fee (ETH)
- Chain
- Chain ID
- Deployment Name
- Deployed At (ISO timestamp)

## Project Structure

```
.
├── Makefile              # Main commands
├── index.js              # Deployment script
├── helper.js             # Helper functions
├── package.json
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   ├── seed-deployment.js # Seed deployment data
│   ├── seed-contract.js   # Seed contract data
│   └── seed-contract-*.js # Chain-specific contract seeds
├── abi/                   # Contract ABIs and artifacts
└── .env                   # Environment variables (create this)
```

## How It Works

1. **Database Setup**: PostgreSQL database tracks deployments, contracts, and deployed contract addresses
2. **Chain Configuration**: Each chain has its own deployment configuration and contract seeds
3. **Dynamic RPC Selection**: Automatically selects the correct RPC URL based on chain name
4. **Contract Deployment**: Deploys contracts in order and updates dependent contracts with addresses
5. **Tracking**: Records all deployed contracts with gas usage and fees
6. **Export**: Generates CSV report after deployment

## Error Handling

- Contract deployments retry up to 3 times on failure
- Failed contracts are logged but don't stop the deployment process
- CSV generation errors don't break deployment

## Getting Help

View all available commands:
```bash
make help
```

## Notes

- All commands run in production mode (`NODE_ENV=production`)
- The system uses `upsert` operations, so you can safely re-run seed commands
- Deployment continues from where it left off based on `lastDeployedContract`
- Chain names are case-insensitive (sepolia, SEPOLIA, Sepolia all work)
