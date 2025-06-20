import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URI;
const client = new MongoClient(URI);

export async function GET(request) {
  try {
    await client.connect();
    const db = client.db("Apurv");
    const carted = db.collection("Cart");
    const result = await carted.find({}).toArray();

    return NextResponse.json({
      message: "Dish has been added to the cart",
      result,
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch cart data" },
      { status: 500 }
    );
  }
}
