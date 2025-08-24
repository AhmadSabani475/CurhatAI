
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookHeart,
  Bot,
  History,
  LayoutDashboard,
  MessageSquare,
  PanelLeft,
} from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';


function Topbar() {
    const { toggleSidebar } = useSidebar()
    return (
        <div className="md:hidden flex items-center p-2 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
             <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleSidebar}
            >
                <PanelLeft />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <div className="flex items-center gap-2 ml-2">
                 <Bot className="size-7 text-primary" />
                <h1 className="text-lg font-bold font-headline">CurhatAi</h1>
            </div>
        </div>
    )
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <SidebarProvider>
        <div className="flex flex-1">
            <Sidebar>
                <SidebarHeader>
                <div className="flex items-center gap-2 p-2">
                    <Bot className="size-8 text-primary" />
                    <h1 className="text-xl font-bold font-headline">CurhatAi</h1>
                    <SidebarTrigger className="ml-auto" />
                </div>
                </SidebarHeader>
                <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        href="/chat"
                        isActive={pathname.startsWith('/chat')}
                        tooltip="Chat"
                    >
                        <Link href="/chat">
                        <MessageSquare />
                        <span>Chat</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        href="/dashboard"
                        isActive={pathname.startsWith('/dashboard')}
                        tooltip="Dashboard"
                    >
                        <Link href="/dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        href="/resources"
                        isActive={pathname.startsWith('/resources')}
                        tooltip="Resources"
                    >
                        <Link href="/resources">
                        <BookHeart />
                        <span>Resources</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        href="/history"
                        isActive={pathname.startsWith('/history')}
                        tooltip="History"
                    >
                        <Link href="/history">
                        <History />
                        <span>History</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <div className="flex flex-col flex-1">
                    <Topbar />
                    <div className="flex-1">{children}</div>
                </div>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
