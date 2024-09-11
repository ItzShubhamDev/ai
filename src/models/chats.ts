import mongoose, { Schema } from "mongoose";

export type Chats = {
    _id: string;
    name: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}

export type Message = {
    role: string;
    content: string;
}

const ChatsSchema = new Schema<Chats>({
    messages: [
        {
            type: {
                role: String,
                content: String,
            },
            required: true,
        },
    ],
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });


export default mongoose.models.Chats || mongoose.model<Chats>('Chats', ChatsSchema);