"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, Bot } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

const SUGGESTED_PROMPTS = [
  "What are my limitations in software engineering?",
  "Where can I improve my coding skills?",
  "What topics should I learn next?",
  "Summarize my current knowledge",
]

export function ChatInterface() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Add assistant response
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: `Based on your resources, here's my analysis about "${content}"...`,
      role: "assistant",
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Start a conversation to analyze your knowledge
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className={`p-2 rounded-full ${message.role === "user" ? "bg-[#ff7700]/10" : "bg-gray-200"}`}>
                  {message.role === "user" ? (
                    <User className="h-5 w-5 text-[#ff7700]" />
                  ) : (
                    <Bot className="h-5 w-5 text-[#8ab100]" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-lg ${message.role === "user" ? "bg-[#ff7700] text-white" : "bg-white text-gray-800 border border-gray-200"}`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[80%]">
              <div className="p-2 rounded-full bg-gray-200">
                <Bot className="h-5 w-5 text-[#8ab100]" />
              </div>
              <div className="p-3 rounded-lg bg-white border border-gray-200">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-[#8ab100] animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#8ab100] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#8ab100] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested prompts */}
      {messages.length === 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {SUGGESTED_PROMPTS.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start h-auto py-2 px-3 text-left border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-[#8ab100]"
              onClick={() => handleSendMessage(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your software engineering knowledge..."
          disabled={isLoading}
          className="flex-1 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#8ab100]/50 focus:border-[#8ab100] transition-all shadow-[0_0_0px_rgba(138,177,0,0)] focus:shadow-[0_0_10px_rgba(138,177,0,0.2)]"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-[#ff7700] hover:bg-[#ff8800] text-white font-medium"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
