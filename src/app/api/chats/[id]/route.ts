import connectDB from "@/lib/connectDb";
import chats, { Chats } from "@/models/chats";
import { CoreMessage } from "ai";
import mongoose from "mongoose"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const objectId = new mongoose.Types.ObjectId(params.id);
    const conversation: Chats | null = await chats.findById(objectId);
    if (!conversation) {
        return Response.json([] as CoreMessage[]);
    }
    return Response.json(conversation.messages);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
        return new Response('Invalid request', { status: 400 });
    }

    await connectDB();
    const objectId = new mongoose.Types.ObjectId(params.id);
    const conversation = await chats.findById(objectId);
    if (!conversation) {
        return Response.json({ error: "Conversation not found" }, { status: 404 });
    }

    conversation.messages.push(...messages);
    await conversation.save();
    return Response.json({ success: true });
}