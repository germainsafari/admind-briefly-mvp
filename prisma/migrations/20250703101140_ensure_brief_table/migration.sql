-- CreateEnum
CREATE TYPE "BriefStatus" AS ENUM ('New', 'Shared', 'Draft');

-- CreateEnum
CREATE TYPE "ManagerStatus" AS ENUM ('active', 'invited', 'deactivated');

-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('active', 'invited', 'deactivated');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('General', 'Motion', 'Events', 'Web', 'UX_UI_Website', 'Event_Tradeshow', 'Video_Animation', 'Digital_Paid_Campaign');

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ai_support" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "avatar" TEXT,
    "email" TEXT,
    "organization_id" INTEGER,
    "status" "ManagerStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "avatar" TEXT,
    "email" TEXT,
    "organization_id" INTEGER,
    "status" "ClientStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brief" (
    "id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "project_type" "ProjectType",
    "project_description" TEXT,
    "business_goals" TEXT,
    "communication_goals" TEXT,
    "project_kpi" TEXT,
    "challenge" TEXT,
    "timeline_expectations" TEXT,
    "project_budget" TEXT,
    "agency_scope" TEXT,
    "mandatories" TEXT,
    "technical_requirements" TEXT,
    "target_audience" TEXT,
    "internal_stakeholders" TEXT,
    "consumer_insight" TEXT,
    "rtb_features" TEXT,
    "key_message" TEXT,
    "value_proposition" TEXT,
    "tone_of_voice" TEXT,
    "market_competition" TEXT,
    "inspirations" TEXT,
    "past_communication" TEXT,
    "touchpoints" TEXT,
    "final_notes" TEXT,
    "attachments" TEXT[],
    "links" TEXT[],
    "creator_id" INTEGER,
    "client_id" INTEGER,
    "organization_id" INTEGER NOT NULL,
    "status" "BriefStatus" NOT NULL DEFAULT 'New',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brief_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_email_key" ON "Manager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "Manager"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brief" ADD CONSTRAINT "Brief_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
