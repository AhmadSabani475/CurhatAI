'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, MessageSquareOff } from "lucide-react";
import type { Message } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const CHAT_STORAGE_KEY = 'curhatai-chat';

export default function HistoryPage() {
  const [history, setHistory] = React.useState<Message[]>([]);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    try {
      const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedMessages) {
        setHistory(JSON.parse(storedMessages));
      }
    } catch (error) {
      console.error("Failed to parse messages from localStorage", error);
      setHistory([]);
    }
  }, []);

  if (!isMounted) {
    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col items-start mb-6">
                <h1 className="text-2xl md:text-3xl font-bold font-headline">Riwayat Percakapan</h1>
                <p className="text-muted-foreground">Memuat riwayat percakapanmu...</p>
            </div>
        </div>
    );
  }

  const userMessages = history.filter(m => m.role === 'user');

  return (
    <div className="p-4 md:p-6 h-full flex flex-col">
      <div className="flex flex-col items-start mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Riwayat Percakapan</h1>
        <p className="text-muted-foreground">Lihat kembali percakapanmu sebelumnya.</p>
      </div>

      {history.length <= 1 ? (
        <div className="flex-1 flex items-center justify-center">
            <Card className="text-center p-10 border-2 border-dashed w-full max-w-lg">
                <CardContent>
                    <MessageSquareOff className="mx-auto h-12 w-12 text-muted-foreground mb-4"/>
                    <h3 className="text-lg font-semibold">Belum Ada Riwayat</h3>
                    <p className="text-muted-foreground mt-1">Kamu belum memulai percakapan. Mulai ngobrol di halaman Chat untuk melihat riwayatmu di sini.</p>
                </CardContent>
            </Card>
        </div>
      ) : (
        <ScrollArea className="flex-1 -mx-4">
            <div className="px-4 space-y-4">
            {history.map((message, index) => (
                <div key={index} className="flex items-start gap-3">
                    <Avatar className={cn(
                        "h-8 w-8 border-2",
                        message.role === 'user' ? 'border-muted-foreground' : 'border-primary'
                    )}>
                        <AvatarFallback>
                        {message.role === 'user' ? <User className="h-4 w-4 text-muted-foreground" /> : <Bot className="h-4 w-4 text-primary" />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">{message.role === 'user' ? 'Kamu' : 'CurhatAi'}</p>
                            <Badge variant={message.role === 'user' ? 'outline' : 'default'} className="text-xs">
                                {message.role}
                            </Badge>
                        </div>
                        <div className={cn(
                            "p-3 mt-1 rounded-lg text-sm md:text-base",
                            message.role === 'user' ? 'bg-secondary' : 'bg-primary/10'
                        )}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </ScrollArea>
      )}
    </div>
  );
}
