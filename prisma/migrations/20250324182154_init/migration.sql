-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "msg" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
