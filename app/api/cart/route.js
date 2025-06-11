import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
export async function GET(request) {
    await client.connect()
    const body = await request.body;
    const order = client.db('Apurv')
    const carted = order.collection('Cart')
    const result = await carted.find({}).toArray()
    return NextResponse.json({message: 'Dish has been added to the cart', result})
}