import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { useState } from "react";

const suggestions = [
  "I'm starting a new business, which pooja should I do?",
  "Find me a Tamil-speaking pandit in Chennai for Ganapathi Homam",
  "What's the auspicious time for Griha Pravesh this month?",
  "I need a complete samagri kit for Satyanarayan Katha",
  "Recommend spiritual courses for beginners",
];

type Message = { role: "assistant" | "user"; content: string };

const initialMessages: Message[] = [
  { role: "assistant", content: "🙏 Namaste! I'm SarvaPooja AI, your spiritual companion. I can help you plan rituals, find pandits, order samagri, check auspicious times, and much more. How can I assist you today?" },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }, { role: "assistant", content: "I understand you're looking for help with \"" + input + "\". Let me analyze your requirements and find the best options for you. In a production system, this would connect to our AI agents for personalized recommendations." }]);
    setInput("");
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
      <PageHeader title="AI Assistant" description="Your intelligent spiritual companion powered by Agentic AI" />

      <Card className="glass-card flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 animate-fade-in ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg gradient-saffron flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "user"
                  ? "gradient-saffron text-primary-foreground rounded-br-md"
                  : "bg-muted rounded-bl-md"
              }`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => setInput(s)} className="text-xs px-3 py-1.5 rounded-full border hover:bg-muted transition-colors text-left">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything about spiritual services..."
              className="flex-1"
            />
            <Button onClick={handleSend} className="gradient-saffron text-primary-foreground" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
