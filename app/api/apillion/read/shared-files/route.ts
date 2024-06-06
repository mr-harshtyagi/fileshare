//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { Storage, LogLevel, FileStatus } from "@apillon/sdk";
import prisma from "@/prisma/prisma";

export const runtime = "nodejs";
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: Response) {
  const data = await req.formData();
  const wallet = data.get("walletAddress");

  console.log(" Query database for Wallet Address:", wallet);

  if (!wallet) {
    return NextResponse.json({
      message: "No Files Shared yet",
      status: "ok",
      data: { total: 0, items: [] },
    });
  }

  try {
    const result = await prisma.SharedFiles.findMany({
      where: {
        sharedWith: wallet,
      },
    });

    // Initialize the SDK
    const storage = new Storage({
      key: process.env.APILLION_API_KEY,
      secret: process.env.APILLION_SECRET,
      logLevel: LogLevel.VERBOSE,
    });

    // create and instance of a bucket directly through uuid
    const bucket = storage.bucket("e8d36da5-e9e9-46ce-ba4c-f5c4eab61a35");

    try {
      const fileReadPromises = result.map((sharedFile) => {
        return bucket.file(sharedFile.fileUuid).get();
      });

      const results = await Promise.allSettled(fileReadPromises);
      const items = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      console.log("Shared files read Successful:", items);

      return NextResponse.json({
        message: "Shared files read Successful",
        status: "ok",
        data: { total: items.length, items: items },
      });
    } catch (error) {
      return NextResponse.json({
        message: "An error occurred while reading shared files",
        status: "error",
        error: error.message,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "An error occurred",
      status: "error",
      error: error.message,
    });
  }
}