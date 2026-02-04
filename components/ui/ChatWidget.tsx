"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
}

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hello! I'm the MSE Solar Assistant. How can I help you today?", sender: "bot" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Generate a random session ID on mount
    const sessionId = useRef(Math.random().toString(36).substring(7));

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsLoading(true);

        try {
            // Updated to be more specific about language needs
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg.text,
                    sessionId: sessionId.current,
                    // Pass specific instruction to stick to the input's language
                    systemLanguagePreference: "Match input language. Do not code-switch unless requested."
                }),
            });

            if (!response.ok) throw new Error("Failed to send message");

            const data = await response.json();

            // Assuming n8n returns standard text response. Adjust based on actual payload.
            const botResponse = data.output || data.response || "I received your message but didn't get a text response.";

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: typeof botResponse === 'string' ? botResponse : JSON.stringify(botResponse),
                sender: "bot",
            };

            setMessages((prev) => [...prev, botMsg]);

        } catch (error) {
            console.error(error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-xl w-[350px] h-[500px] border border-slate-soft flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-navy p-4 flex justify-between items-center text-white">
                        <h3 className="font-display font-bold">MSE Support</h3>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.sender === "user"
                                    ? "bg-navy text-white rounded-br-none"
                                    : "bg-white border border-slate-200 text-navy rounded-bl-none shadow-sm"
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                                    <span className="flex space-x-1">
                                        <span className="w-2 h-2 bg-grey-light rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-grey-light rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-grey-light rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-soft flex gap-2">
                        <input
                            className="flex-1 bg-slate-soft/50 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-navy focus:outline-none"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="bg-green text-white p-2 rounded-lg hover:brightness-110 disabled:opacity-50 transition-all"
                            disabled={!inputValue.trim() || isLoading}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-navy text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </button>
            )}
        </div>
    );
};
