'use client';

import { Message, useChat } from 'ai/react';
import { FaPlus, FaRegCopy, FaRegThumbsDown, FaRegThumbsUp, FaRegUser } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';
import { SiOpenai } from 'react-icons/si';
import Markdown from 'react-markdown';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    console.log(messages);
    return (
        <div className="flex h-full w-full flex-col" >
            {/* Prompt Messages */}
            < div
                className="flex-1 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 dark:bg-slate-800 dark:text-slate-300 sm:text-base sm:leading-7"
            >
                {
                    messages.map(message => (
                        <MessageBox key={message.id} {...message} />
                    ))
                }
            </div >
            {/* Prompt message input */}
            < form className="mt-2" onSubmit={handleSubmit} >
                <label htmlFor="chat-input" className="sr-only">Enter your prompt</label>
                <div className="flex rounded-xl border-2 border-slate-300 px-2">
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
                        onChange={handleInputChange}
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

const MessageBox = (message: Message) => {
    return (
        <>
            {message.role === 'user' ? (
                <div className="flex flex-row px-2 py-4 sm:px-4">
                    <FaRegUser className="mr-2 text-2xl sm:mr-4" />

                    <div className="flex max-w-3xl items-center">
                        <p>{message.content}</p>
                    </div>
                </div>
            ) : (
                <div
                    className="mb-4 flex rounded-xl bg-slate-50 px-2 py-6 dark:bg-slate-900 sm:px-4"
                >
                    <SiOpenai className="mr-2 text-4xl sm:mr-4" />

                    <div className="flex max-w-4xl items-center rounded-xl">
                        <div className="text-wrap">
                            <Markdown>{message.content}</Markdown>
                        </div>
                    </div>
                    <div className="mb-2 flex w-full h-full flex-row justify-end items-start gap-x-2 text-slate-500">
                        <button className="hover:text-blue-600" type="button">
                            <FaRegCopy className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
};