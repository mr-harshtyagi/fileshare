//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { Storage, LogLevel, FileStatus } from "@apillon/sdk";

export const runtime = "nodejs";
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: Response) {
  const data = await req.formData();
  const file = data.get("file");
  const wallet = data.get("walletAddress");
  console.log("wallet", wallet);

  // file is the file object
  const content = await file?.arrayBuffer();
  const fileName = file?.name;
  const contentType = file?.type;

  // Initialize the SDK
  const storage = new Storage({
    key: process.env.APILLION_API_KEY,
    secret: process.env.APILLION_SECRET,
    logLevel: LogLevel.VERBOSE,
  });

  // list buckets
  const buckets = await storage.listBuckets({ limit: 5 });

  // create and instance of a bucket directly through uuid
  const bucket = storage.bucket("e8d36da5-e9e9-46ce-ba4c-f5c4eab61a35");

  // await bucket.uploadFiles(
  //   [
  //     {
  //       fileName: fileName,
  //       contentType: contentType,
  //       content: content,
  //     },
  //   ],
  //   // Upload the files in a new subdirectory in the bucket instead of in the root of the bucket
  //   { wrapWithDirectory: true, directoryPath: `user_data/${wallet}` }
  // );

  // list objects (files, folders) in a bucket
  const objects = await bucket.listObjects({
    directoryUuid: "2a6961a7-ff4d-466a-b04d-99037ce1a6bb",
    markedForDeletion: false,
    limit: 5,
  });

  // testing
  // const filePath = path.join(process.cwd(), "uploads", file.name);
  // fs.writeFileSync(filePath, Buffer.from(content));

  return NextResponse.json({
    message: "File uploaded successfully",
    status: "ok",
    data: {
      buckets: buckets,
      objects: objects,
    },
  });
  // });
}
