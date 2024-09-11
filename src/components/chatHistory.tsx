import { TbMessage2Plus, TbMessage2Search } from "react-icons/tb";

export default function ChatHistory() {
    return (
        <>
            {/* Prompt history panel */}
            <div
                className="min-w-72 rounded-lg border border-slate-300 bg-slate-50 py-2 dark:border-slate-200/10 dark:bg-slate-900 flex flex-col justify-between"
            >
                <div>
                    <div className="mx-2">
                        <form>
                            <label htmlFor="chat-input" className="sr-only">Search chats</label>
                            <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                                <input
                                    id="search-chats"
                                    type="text"
                                    className="w-full p-3 pr-10 text-sm rounded-l-lg focus:outline-none"
                                    placeholder="Search chats"
                                    required
                                />
                                <button
                                    type="button"
                                    className="rounded-lg p-2 text-sm text-slate-500 hover:text-blue-700 focus:outline-none sm:text-base"
                                >
                                    <TbMessage2Search className="text-2xl" />
                                    <span className="sr-only">Search chats</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Give the following container a height to make it scrollable such as: h-80 */}
                    <div className="my-4 h-80 space-y-4 overflow-y-auto px-2">
                        <button
                            className="flex w-full gap-y-2 rounded-lg px-3 py-2 justify-between items-center transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
                        >
                            <h1
                                className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
                            >
                                Tailwind Classes
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">12 Mar</p>
                        </button>
                        <button
                            className="flex w-full gap-y-2 rounded-lg bg-slate-200 px-3 py-2 justify-between items-center transition-colors duration-200 focus:outline-none dark:bg-slate-800"
                        >
                            <h1
                                className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
                            >
                                explain quantum computing
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">10 Feb</p>
                        </button>
                        <button
                            className="flex w-full gap-y-2 rounded-lg px-3 py-2 justify-between items-center transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:hover:bg-slate-800"
                        >
                            <h1
                                className="text-sm font-medium capitalize text-slate-700 dark:text-slate-200"
                            >
                                How to create ERP Diagram
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">22 Jan</p>
                        </button>
                    </div>
                </div>
                <div className="mx-2 mt-8">
                    <button
                        className="flex w-full flex-row-reverse justify-between rounded-lg bg-slate-600 p-4 text-sm font-medium text-slate-200 transition-colors duration-200 hover:bg-blue-600 focus:outline-none dark:bg-slate-800 dark:hover:bg-blue-600"
                    >
                        <TbMessage2Plus className="h-6 w-6" />
                        <span>New Chat</span>
                    </button>
                </div>
            </div>
        </>
    )
}