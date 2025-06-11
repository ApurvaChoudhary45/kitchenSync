import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
export async function GET(request) {
    await client.connect()
    const body = await request.body;
    const orders = client.db('Apurv')
    const placed = orders.collection('Placed Order')
    const results = await placed.find({}).toArray()
    return NextResponse.json({message: 'Order has been placed', results})

}