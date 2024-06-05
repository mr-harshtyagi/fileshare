//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: Response) {
  const data = await req.formData();
  const file = data.get("file");
  // file is the file object
  const content = await file?.arrayBuffer();
  const fileName = file?.name;
  const contentType = file?.type;

  // testing
  const filePath = path.join(process.cwd(), "uploads", file.name);
  fs.writeFileSync(filePath, Buffer.from(content));

  return NextResponse.json({
    message: "File uploaded successfully",
    status: "ok",
  });
  // });
}
