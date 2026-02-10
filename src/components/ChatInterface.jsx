import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { getAIModelResponse } from '../services/aiService';

const ChatInterface = ({ parcel }) => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: parcel ? `Hello! I can help you with insights for your ${parcel.crop} field in ${parcel.location || 'your area'}. Ask me anything!` : "Hello! I am your AI farm assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [thinkingStep, setThinkingStep] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        const analysisSteps = [
            "Connecting to Planet-Scale Satellite APIs...",
            `Retrieving real-time weather for ${parcel?.location || 'your area'}...`,
            `Processing ${parcel?.soilTexture || 'soil'} structural data...`,
            "Running agronomic growth model...",
            "Finalizing recommendation..."
        ];

        let stepIdx = 0;
        const interval = setInterval(() => {
            if (stepIdx < analysisSteps.length) {
                setThinkingStep(analysisSteps[stepIdx]);
                stepIdx++;
            }
        }, 800);

        try {
            const responseText = await getAIModelResponse(currentInput, parcel);

            // Artificial delay to let user see the 'thinking' process
            setTimeout(() => {
                clearInterval(interval);
                const botMsg = {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: responseText,
                    confidence: 99,
                    source: 'Agri-Pulse AI v2.5 (Real-time Model)'
                };
                setMessages(prev => [...prev, botMsg]);
                setIsTyping(false);
                setThinkingStep('');
            }, 3000);
        } catch (error) {
            clearInterval(interval);
            setIsTyping(false);
            setThinkingStep('');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-100 bg-emerald-50/50 rounded-t-2xl">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                        <Bot className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">Farm Assistant AI</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs text-gray-500">Online • Context Aware</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl p-4 ${msg.type === 'user'
                            ? 'bg-emerald-600 text-white rounded-tr-sm'
                            : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                            }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            {msg.type === 'bot' && msg.confidence && (
                                <div className="mt-2 pt-2 border-t border-gray-200/50 flex items-center justify-between text-xs text-gray-500">
                                    <span>Conf: {msg.confidence}%</span>
                                    <span>Src: {msg.source}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-2xl p-4 rounded-tl-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                            <p className="text-xs text-emerald-700 italic font-medium animate-pulse">
                                {thinkingStep}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-100">
                {/* Quick Prompts */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
                    <button onClick={() => setInput("Why plant now?")} className="whitespace-nowrap px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-100 hover:bg-emerald-100 transition-colors">
                        Why plant now?
                    </button>
                    {parcel && (
                        <button onClick={() => setInput("Check crop status")} className="whitespace-nowrap px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-100 hover:bg-emerald-100 transition-colors">
                            Check crop status
                        </button>
                    )}
                    <button onClick={() => setInput("Weather forecast?")} className="whitespace-nowrap px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-100 hover:bg-emerald-100 transition-colors">
                        Weather forecast?
                    </button>
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={parcel ? `Ask about ${parcel.crop}...` : "Ask about your farm..."}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition-colors shadow-lg shadow-emerald-200"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
