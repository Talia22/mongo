import { NextResponse } from "next/server";
import { getAllDocuments, connectDatabase, insertDocument } from '@/services/mongo'
import {ObjectId } from 'mongodb';


export async function GET(req: Request) {

    const client = await connectDatabase();
    const cars = await getAllDocuments(client, 'cars');

    client.close();

    return NextResponse.json(cars);

}

export async function POST(req: Request) {
    const client = await connectDatabase();
    const newCar = await req.json();


    try {
        const result = await insertDocument(client, 'cars', newCar);
        client.close();
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        client.close();
        return NextResponse.json({ error: 'Failed to add car' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const client = await connectDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); // Expecting the ID as a query parameter

    if (!id) {
        return NextResponse.json({ message: "ID parameter is required" });
    }

    try {
        const db = client.db("db01");
        const result = await db
            .collection("cars")
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "No car found with this ID" });
        }

        return NextResponse.json({ message: "car deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting car", error });
    } finally {
        client.close();
    }
}

export async function PATCH(req: Request) {
    const client = await connectDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "ID parameter is required" }, { status: 400 });
    }

    const updatedData = await req.json();

    try {
        const db = client.db("db01");
        const result = await db.collection("cars").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "No car found with this ID or no changes made" }, { status: 404 });
        }

        return NextResponse.json({ message: "Car updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error updating car", error }, { status: 500 });
    } finally {
        client.close();
    }
}
