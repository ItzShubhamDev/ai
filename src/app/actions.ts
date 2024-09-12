'use server';

import { createStreamableValue } from 'ai/rsc';
import { convertToCoreMessages, CoreMessage, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import chats, { Chats } from '@/models/chats';
import connectDB from '@/lib/connectDb';
import mongoose from 'mongoose';

export async function continueConversation(messages: CoreMessage[], id?: string) {
    await connectDB();
    let chatId: string | null = null;

    const openai = createOpenAI({
        baseURL: 'https://models.inference.ai.azure.com',
        apiKey: process.env.GITHUB_TOKEN,
    });

    if (!id) {
        chatId = await createConversation({ name: 'New Conversation' });
    } else {
        chatId = id;
    }

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages,
        onFinish: async (e) => {
            await setConversation({ id: chatId as string, messages: [...messages, { role: "assistant", content: e.text }] });
        },
    });

    const stream = createStreamableValue(result.textStream);
    return { message: stream.value, chatId };
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