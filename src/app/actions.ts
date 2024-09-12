'use server';

import { createStreamableValue } from 'ai/rsc';
import { convertToCoreMessages, CoreMessage, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import chats, { Chats } from '@/models/chats';
import connectDB from '@/lib/connectDb';
import mongoose from 'mongoose';

export async function continueConversation(messages: CoreMessage[], newChat?: boolean) {
    const openai = createOpenAI({
        baseURL: 'https://models.inference.ai.azure.com',
        apiKey: process.env.GITHUB_TOKEN,
    });

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages,
    });

    let data: string | null = null;
    const stream = createStreamableValue(result.textStream);
    if (newChat) {
        data = await createConversation({ name: 'New Conversation' });
    }
    return { message: stream.value, data };
}

export async function getConversation(id: string) {
    await connectDB();
    const objectId = new mongoose.Types.ObjectId(id);
    const conversation: Chats | null = await chats.findById(objectId);
    if (!conversation) {
        return [] as CoreMessage[];
    }
    return conversation.messages;
}

export async function createConversation({ name }: { name: string }) {
    await connectDB();
    const r = await chats.create({ name, messages: [] }) as Chats;
    return r._id.toString();
}

export async function setConversation({ id, messages }: { id: string, messages: CoreMessage[] }) {
    await connectDB();
    const objectId = new mongoose.Types.ObjectId(id);
    return chats.findByIdAndUpdate(objectId, { messages });
}