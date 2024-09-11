import { CoreMessage } from "ai";
import mongoose, { Schema } from "mongoose";

export type Chats = {
    _id: mongoose.Types.ObjectId;
    name: string;
    messages: CoreMessage[];
    createdAt: string;
    updatedAt: string;
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