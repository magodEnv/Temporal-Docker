import { NextResponse } from "next/server";
import { promises as fsPromises } from "fs";
import path from "path";

const filePath = path.resolve("public/json/login.json");

export async function POST(req) {
	const request = await req.json();
	console.log(request.name);

	const data = await fsPromises.readFile(filePath, "utf8");
	const credentials = JSON.parse(data);
    console.log(credentials);

    console.log("request password:", request.password)
    console.log("request password:", credentials.pass)
	if (request.name === credentials.name && request.password === credentials.pass) {
        return NextResponse.json({
            message: "Valid credentials",
            status: 200
        })
    } else {
		return NextResponse.json({
			message: "Invalid credentials",
			status: 401,
		});
	}
}
