-- CreateTable
CREATE TABLE "Chambre" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Chambre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "dateArrivee" TIMESTAMP(3) NOT NULL,
    "dateDepart" TIMESTAMP(3) NOT NULL,
    "chambreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'client',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evenement" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "placesTotal" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evenement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_chambreId_fkey" FOREIGN KEY ("chambreId") REFERENCES "Chambre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
