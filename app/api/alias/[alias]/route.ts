import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET(request: Request, { params }: { params: { alias: string } }) {
    const alias = params.alias;

    try {
        const client = await clientPromise;
        const db = client.db("url-shortener");
        const collection = db.collection("aliases");

        const record = await collection.findOne({ alias });

        if (record) {
            return NextResponse.json({ url: record.url });
        } else {
            return NextResponse.json({ error: "Alias not found" }, { status: 404 });
        }
    }  catch {

    }
}
