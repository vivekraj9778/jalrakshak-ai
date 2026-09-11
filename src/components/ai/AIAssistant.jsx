import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, X, Send, Bot, User, Sparkles, ShieldAlert, Waves, ArrowUpRight, RefreshCw } from "lucide-react";
import { generateAIResponse } from "../../services/aiService";
import { useApp } from "../../context/AppContext";

export const AIAssistant = () => {
  const { isAiOpen, setIsAiOpen } = useApp();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am **JalRakshak AI**, your flood monitoring and emergency response co-pilot. How can I help you stay safe or coordinate rescue today?",
      timestamp: "Just now"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    { label: "🚨 Report SOS", query: "I need immediate rescue, water is rising." },
    { label: "⛺ Find Shelter", query: "Where is the nearest flood shelter?" },
    { label: "🌊 Kosi Water Level", query: "What is the Kosi river water level and danger mark?" },
    { label: "📞 Helplines", query: "What are the emergency contact numbers?" },
  ];

  useEffect(() => {
    if (isAiOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAiOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await generateAIResponse(text);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.text,
        action: response.action,
        actionText: response.actionText,
        actionUrl: response.actionUrl,
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: "I'm temporarily experiencing connectivity issues with the central telemetry server. For immediate life-safety emergencies, please call **1078** directly.",
          timestamp: "Just now"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsAiOpen(!isAiOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-navy-900 text-white rounded-full shadow-2xl hover:shadow-glow-blue border border-navy-700/80 transition-all duration-300 transform hover:scale-105 group"
        aria-label="Ask JalRakshak AI Assistant"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-flood-blue to-cyan-400 flex items-center justify-center text-white shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-bold tracking-wide pr-1">Ask JalRakshak AI</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-navy-900 animate-pulse" />
      </button>

      {/* AI Chat Window Panel */}
      {isAiOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[580px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scale-up">
          {/* Header */}
          <div className="p-4 bg-navy-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-flood-blue flex items-center justify-center text-white shadow-glow-blue">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm flex items-center gap-1.5">
                  JalRakshak AI <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">ONLINE</span>
                </h4>
                <p className="text-[11px] text-slate-300">Flood Response Co-Pilot</p>
              </div>
            </div>
            <button
              onClick={() => setIsAiOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Pills */}
          <div className="p-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickActions.map((qa, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(qa.query)}
                className="whitespace-nowrap px-3 py-1 bg-white hover:bg-blue-50 hover:text-flood-blue hover:border-flood-blue/40 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 transition-colors shadow-sm"
              >
                {qa.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#F8FAFC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "ai" && (
                  <div className="w-7 h-7 rounded-lg bg-navy-900 text-white flex-shrink-0 flex items-center justify-center mt-1">
                    <Waves className="w-4 h-4 text-flood-glow" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-flood-blue text-white rounded-br-none shadow-md font-medium"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  {/* Embedded Action Button if available */}
                  {msg.actionUrl && (
                    <button
                      onClick={() => {
                        setIsAiOpen(false);
                        navigate(msg.actionUrl);
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all transform hover:translate-x-0.5"
                    >
                      <span>{msg.actionText || "View Details"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-flood-glow" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs pl-2">
                <div className="w-7 h-7 rounded-lg bg-navy-900 flex items-center justify-center">
                  <RefreshCw className="w-3.5 h-3.5 text-flood-glow animate-spin" />
                </div>
                <span className="font-medium">Analyzing emergency request...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about rescue, shelters, water levels..."
              className="flex-1 bg-slate-50 border border-slate-200 focus:border-flood-blue focus:bg-white text-slate-800 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 bg-flood-blue hover:bg-flood-hover disabled:bg-slate-200 text-white rounded-xl transition-colors shadow-sm disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
