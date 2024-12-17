import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from 'fs';
//POST para subir imagenes
export const POST = async (req, res) => {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  // Verificar que el archivo es una imagen
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  //console.log(filename);

  try {
    await writeFile(
      path.join(process.cwd(), "public/Images/" + filename),
      buffer
    );

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    //console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  };
}

// DELETE para eliminar imágenes
export const DELETE = async (req) => {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "No filename provided." }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), `public/Images`, filename);
  
  try {
    await fs.promises.unlink(filePath);
    return NextResponse.json({ Message: "File deleted successfully.", status: 200 });
  } catch (error) {
    //console.log("Error occurred while deleting the file:", error);
    return NextResponse.json({ Message: "Failed to delete file.", status: 500 });
  }
};