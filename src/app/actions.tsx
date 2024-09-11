'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import chats, { Chats } from '@/models/chats';
import connectDB from '@/lib/connectDb';

export async function continueConversation(messages: CoreMessage[]) {
    const openai = createOpenAI({
        baseURL: 'https://models.inference.ai.azure.com',
        apiKey: process.env.GITHUB_TOKEN,
    });

    const result = await streamText({
        model: openai('gpt-4o-mini'),
        messages,
    });

    let data = {};
    const stream = createStreamableValue(result.textStream);
    if (messages.length === 1) {
        data = createConversation({ name: 'New Conversation' });
    }
    return { message: stream.value, data };
}

export async function getConversation({ id }: { id: string }) {
    await connectDB();
    const conversation: Chats | null = await chats.findById(id);
    if (!conversation) {
        return [] as CoreMessage[];
    }
    return conversation.messages as CoreMessage[];
}

export async function createConversation({ name }: { name: string }) {
    await connectDB();
    const r = await chats.create({ name, messages: [] }) as Chats;
    console.log(r._id.toString(), r._id);
    return r._id.toString();
}

export async function setConversation({ id, messages }: { id: string, messages: CoreMessage[] }) {
    await connectDB();
    return chats.findByIdAndUpdate(id, { messages });
}