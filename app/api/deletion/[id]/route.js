import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);

export async function DELETE(request) {
    await client.connect();
    const body = await request.json();
    console.log("Received Details:", body);

    const orders = client.db("Apurv").collection("Cart");
    await orders.deleteOne({ _id: new ObjectId(body._id) });
    return NextResponse.json({ message: "Deleted from cart" });
}