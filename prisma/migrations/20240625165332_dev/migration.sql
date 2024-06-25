-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "forgotToken" TEXT NOT NULL DEFAULT '',
    "forgotTokenExpiry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifyToken" TEXT NOT NULL DEFAULT '',
    "verifyTokenExpiry" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "adminCreated" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotifyMusic" (
    "id" SERIAL NOT NULL,
    "country" TEXT,
    "label" TEXT,
    "Main_Label" TEXT,
    "Sub_Label" TEXT,
    "product" TEXT,
    "uri" TEXT,
    "upc" TEXT,
    "ean" TEXT,
    "isrc" TEXT,
    "song_name" TEXT,
    "artist_name" TEXT NOT NULL,
    "composer_name" TEXT,
    "album_name" TEXT,
    "total" TEXT,
    "file_name" TEXT,
    "royality" TEXT,

    CONSTRAINT "SpotifyMusic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_email_key" ON "SuperAdmin"("email");
