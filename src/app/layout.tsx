import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'CurhatAi',
  description: 'A friendly chatbot for teenagers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-svh">
            <div className="flex-1">{children}</div>
            <footer className="p-4 text-center text-sm text-muted-foreground border-t">
                © 2025 Ahmad Rizki Sabani. All Rights Reserved.
            </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
