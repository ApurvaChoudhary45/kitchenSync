import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);

export async function GET(request) {
  if (!URI) {
    return NextResponse.json(
      { error: "MONGO_URI is not defined in environment variables." },
      { status: 500 }
    );
  }

  try {
    await client.connect();
    const db = client.db("Apurv");
    const placed = db.collection("Placed Order");
    const results = await placed.find({}).toArray();

    return NextResponse.json({
      message: "Order has been placed",
      results,
    });
  } catch (error) {
    console.error("Error fetching placed orders:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch placed orders" },
      { status: 500 }
    );
  }
}
