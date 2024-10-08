'use client';

import { type CoreMessage } from 'ai';
import { FormEvent, useEffect, useState } from 'react';
import { continueConversation, createConversation, getConversation, setConversation } from '@/app/actions';
import { readStreamableValue } from 'ai/rsc';

import { FaPlus, FaRegCopy, FaRegUser } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';
import { SiOpenai } from 'react-icons/si';
import Markdown from 'react-markdown';
import { useRouter } from 'next/navigation';

export const maxDuration = 30;

export default function Page({ params }: { params: { id: string } }) {
    const [messages, setMessages] = useState<CoreMessage[]>([]);
    const [input, setInput] = useState('');
    const id = params.id;

    useEffect(() => {
        fetch(`/api/chats/${id}`).then(res => res.json().then(setMessages));
    }, [id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newMessages: CoreMessage[] = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        const res = await continueConversation(newMessages, id);
        for await (const message of readStreamableValue(res.message)) {
            setMessages([...newMessages, {
                role: 'assistant',
                content: message as string,
            }]);
        }
    }

    return (
        <div className="flex h-full w-full flex-col" >
            {/* Prompt Messages */}
            < div
                className="flex-1 overflow-y-auto rounded-lg bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7"
            >
                {
                    messages.map((message, i) => (
                        <MessageBox key={i} {...message} />
                    ))
                }
            </div >
            {/* Prompt message input */}
            <form className="mt-2" onSubmit={handleSubmit} >
                <label htmlFor="chat-input" className="sr-only">Enter your prompt</label>
                <div className="flex rounded-lg border-2 border-slate-300 px-2">
                    <button
                        type="button"
                        className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
                    >
                        <FaPlus className="h-6 w-6" />
                        <span className="sr-only">Import Image</span>
                    </button>
                    <input
                        id="chat-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="block w-full p-2 text-sm text-slate-900 dark:bg-slate-800 focus:outline-none dark:text-slate-200 dark:placeholder-slate-400 sm:text-base"
                        placeholder="Enter your prompt"
                        required
                    ></input>
                    <button
                        type="submit"
                        className="text-sm font-medium text-slate-500 sm:text-base hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
                    >
                        <IoSend className='w-6 h-6' /> <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form >
        </div >
    );
}

const MessageBox = (message: CoreMessage) => {
    return (
        <>
            {message.role === 'user' ? (
                <div className="flex flex-row px-2 py-4 sm:px-4">
                    <FaRegUser className="mr-2 sm:mr-4" height={40} width={40}/>

                    <div className="flex max-w-3xl items-center">
                        <Markdown>{message.content as string}</Markdown>
                    </div>
                </div>
            ) : (
                <div
                    className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 dark:bg-slate-900 sm:px-4"
                >
                    <SiOpenai className="mr-2 sm:mr-4" height={40} width={40} />

                    <div className="flex max-w-4xl items-center rounded-xl">
                        <div className="text-wrap">
                            <Markdown>{message.content as string}</Markdown>
                        </div>
                    </div>
                    <div className="mb-2 flex w-full h-full flex-row justify-end items-start gap-x-2 text-slate-500">
                        <button className="hover:text-blue-600" type="button">
                            <FaRegCopy height={20} width={20}/>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
};