'use client';

import { getAiResponse } from '@/lib/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { Message } from '@/types';
import { Bot, Send, User } from 'lucide-react';
import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CHAT_STORAGE_KEY = 'remajaku-chat';

export default function ChatPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const scrollAreaRef = React.useRef<React.ElementRef<'div'>>(null);

  React.useEffect(() => {
    setIsMounted(true);
    try {
      const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([
            { role: 'assistant', content: 'Halo! Ada yang bisa aku bantu hari ini? Kamu bisa cerita apa saja kepadaku.' }
        ]);
      }
    } catch (error) {
      console.error("Failed to parse messages from localStorage", error);
      setMessages([
        { role: 'assistant', content: 'Halo! Ada yang bisa aku bantu hari ini? Kamu bisa cerita apa saja kepadaku.' }
      ]);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
     // Auto-scroll to bottom
     if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isMounted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAiResponse(newMessages);
      const assistantMessage: Message = { role: 'assistant', content: aiResponse };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Maaf, sepertinya ada sedikit masalah. Coba lagi nanti ya.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return <div className="flex h-full w-full items-center justify-center"><p>Loading chat...</p></div>;
  }

  return (
    <div className="flex h-full max-h-[calc(100svh-2rem)] flex-col">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 md:p-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback>
                    <Bot className="text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-2xl p-3 text-sm md:text-base',
                  message.role === 'user'
                    ? 'rounded-br-none bg-primary/90 text-primary-foreground'
                    : 'rounded-bl-none bg-card shadow'
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 border-2 border-muted-foreground">
                  <AvatarFallback>
                    <User className="text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback>
                    <Bot className="text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl p-3 rounded-bl-none bg-card shadow space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-32" />
                </div>
             </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t bg-background/80 p-2 md:p-4 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl flex gap-2 items-end"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Tuliskan ceritamu di sini..."
            className="flex-1 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Kirim</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
