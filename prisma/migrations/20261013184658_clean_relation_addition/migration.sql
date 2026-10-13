-- CreateEnum
CREATE TYPE "pokemontype" AS ENUM ('Normal', 'Grass', 'Fire', 'Water', 'Electric', 'Ice', 'Fighting', 'Ground', 'Poison', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy');

-- CreateEnum
CREATE TYPE "pokemonrarity" AS ENUM ('Common', 'Rare', 'Legendary');

-- CreateTable
CREATE TABLE "pokemons" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type1" "pokemontype" NOT NULL,
    "type2" "pokemontype",
    "rarity" "pokemonrarity" NOT NULL,
    "level" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "nickname" TEXT,
    "trainerId" UUID,

    CONSTRAINT "pokemons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainers" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trainers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trainers_email_key" ON "trainers"("email");

-- AddForeignKey
ALTER TABLE "pokemons" ADD CONSTRAINT "pokemons_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "trainers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
