-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 1,
    "data" JSONB,
    "updateName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deployments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chain" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "lastDeployedContract" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalFee" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "deployments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deployedContracts" (
    "id" TEXT NOT NULL,
    "deploymentId" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "fee" BIGINT NOT NULL DEFAULT 0,
    "gasUsed" BIGINT NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deployedContracts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contracts_chain_name_key" ON "contracts"("chain", "name");

-- CreateIndex
CREATE UNIQUE INDEX "deployments_name_key" ON "deployments"("name");

-- CreateIndex
CREATE INDEX "deployedContracts_deploymentId_idx" ON "deployedContracts"("deploymentId");
