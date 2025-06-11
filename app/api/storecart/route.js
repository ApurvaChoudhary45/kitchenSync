import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
export async function POST(request) {
    await client.connect()
    const body = await request.json()
    const orders = client.db('Apurv')
    const placed = orders.collection('Cart')
    await placed.insertOne(body)
    return NextResponse.json({message: 'Added to cart'})

}