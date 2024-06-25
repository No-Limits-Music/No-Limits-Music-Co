-- CreateTable
CREATE TABLE "SpotifyMusic" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "Main_Label" TEXT NOT NULL,
    "Sub_Label" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "upc" TEXT NOT NULL,
    "ean" TEXT NOT NULL,
    "isrc" TEXT NOT NULL,
    "song_name" TEXT NOT NULL,
    "artist_name" TEXT NOT NULL,
    "composer_name" TEXT NOT NULL,
    "album_name" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "royality" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SpotifyMusic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyMusic_artist_name_key" ON "SpotifyMusic"("artist_name");
