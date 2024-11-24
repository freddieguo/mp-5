import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

interface AliasDocument {
    alias: string;
    url: string;
}

export async function POST(request: Request) {
    const { alias, url }: AliasDocument = await request.json();

    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlRegex.test(url)) {
        return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("url-shortener");
    const collection = db.collection<AliasDocument>("aliases");

    const existing = await collection.findOne({ alias });
    if (existing) {
        return NextResponse.json({ message: "Alias already exist" }, { status: 400 });
    }

    await collection.insertOne({ alias, url });

    return NextResponse.json({ message: "Alias created successfully" }, { status: 200 });
}
