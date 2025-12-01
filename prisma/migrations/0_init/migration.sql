-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Clients" (
    "id" SERIAL NOT NULL,
    "family" VARCHAR(60),
    "name" VARCHAR(60),
    "secname" VARCHAR(60),
    "birthday" DATE,
    "sex" VARCHAR(6),
    "notes" VARCHAR(120),
    "balance" DECIMAL NOT NULL DEFAULT 0,
    "isPositive" BOOLEAN DEFAULT (balance >= (0)::numeric),

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTransactions" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER,
    "phoneId" INTEGER,
    "serviceId" INTEGER,
    "transactionTypeId" INTEGER,
    "amount" DECIMAL NOT NULL,
    "minutesUsed" INTEGER,
    "transactionDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(120),

    CONSTRAINT "PaymentTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhoneServices" (
    "id" SERIAL NOT NULL,
    "phoneId" INTEGER,
    "serviceId" INTEGER,
    "connectDate" TIMESTAMPTZ(6),
    "paymentId" INTEGER,

    CONSTRAINT "PhoneServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhoneTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "PhoneTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phones" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER,
    "number" VARCHAR(15),
    "phoneTypeId" INTEGER,
    "tariffId" INTEGER,

    CONSTRAINT "Phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60),
    "serviceFee" INTEGER,
    "description" VARCHAR(120),

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tariffs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60),
    "monthlyFee" INTEGER,
    "minutesIncluded" INTEGER,
    "pricePerMinOver" INTEGER,
    "description" VARCHAR(120),

    CONSTRAINT "Tariffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "TransactionTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PhoneTypes_name_key" ON "PhoneTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionTypes_name_key" ON "TransactionTypes"("name");

-- AddForeignKey
ALTER TABLE "PaymentTransactions" ADD CONSTRAINT "PaymentTransactions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PaymentTransactions" ADD CONSTRAINT "PaymentTransactions_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "Phones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PaymentTransactions" ADD CONSTRAINT "PaymentTransactions_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PaymentTransactions" ADD CONSTRAINT "PaymentTransactions_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "TransactionTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PhoneServices" ADD CONSTRAINT "PhoneServices_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "PaymentTransactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PhoneServices" ADD CONSTRAINT "PhoneServices_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "Phones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PhoneServices" ADD CONSTRAINT "PhoneServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "Phones_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "Phones_phoneTypeId_fkey" FOREIGN KEY ("phoneTypeId") REFERENCES "PhoneTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "Phones_tariffId_fkey" FOREIGN KEY ("tariffId") REFERENCES "Tariffs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

