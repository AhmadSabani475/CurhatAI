'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTopicAnalysis } from '@/lib/actions';
import type { Message } from '@/types';
import { BrainCircuit, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { EmotionChart } from '@/components/emotion-chart';
import { Badge } from '@/components/ui/badge';

const CHAT_STORAGE_KEY = 'curhatai-chat';

type AnalysisResult = {
  topics: string[];
  summary: string;
};

export default function DashboardPage() {
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  const handleAnalyze = React.useCallback(async (showLoading = true) => {
    if(showLoading) {
        setIsLoading(true);
    }
    setError(null);
    try {
      const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedMessages) {
        const messages: Message[] = JSON.parse(storedMessages);
        // Ensure there's more than just the initial assistant message
        if (messages.length > 1) {
          const result = await getTopicAnalysis(messages);
          setAnalysis(result);
        } else {
          setAnalysis(null);
          setError('Kamu belum memulai percakapan. Mulai ngobrol di halaman Chat yuk!');
        }
      } else {
        setAnalysis(null);
        setError('Tidak ada riwayat percakapan yang ditemukan.');
      }
    } catch (e) {
      setError('Gagal menganalisis percakapan. Coba beberapa saat lagi.');
      console.error(e);
    } finally {
        if(showLoading){
            setIsLoading(false);
        }
    }
  }, []);
  
  React.useEffect(() => {
    setIsMounted(true);
    handleAnalyze();
  }, [handleAnalyze]);

  if (!isMounted) {
      return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-headline">Dashboard Analisis</h1>
                    <p className="text-muted-foreground">Dapatkan wawasan dari percakapanmu.</p>
                </div>
            </div>
            <div className="flex items-center justify-center p-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        </div>
      )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline">Dashboard Analisis</h1>
            <p className="text-muted-foreground">Dapatkan wawasan dari percakapanmu.</p>
        </div>
        <Button onClick={() => handleAnalyze(true)} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Muat Ulang Analisis
        </Button>
      </div>

      {isLoading && (
        <Card className="text-center p-10">
            <CardContent>
                <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin mb-4"/>
                <h3 className="text-lg font-semibold">Menganalisis...</h3>
                <p className="text-muted-foreground mt-1">Kami sedang memproses percakapanmu untuk mendapatkan wawasan.</p>
            </CardContent>
        </Card>
      )}

      {error && !isLoading && (
        <Card className="bg-destructive/10 border-destructive text-center p-10">
          <CardContent>
            <BrainCircuit className="mx-auto h-12 w-12 text-destructive mb-4"/>
            <h3 className="text-lg font-semibold text-destructive">Oops!</h3>
            <p className="text-muted-foreground mt-1">{error}</p>
            </CardContent>
        </Card>
      )}

      {!analysis && !isLoading && !error && (
        <Card className="text-center p-10 border-2 border-dashed">
            <CardContent>
                <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground mb-4"/>
                <h3 className="text-lg font-semibold">Siap untuk analisis?</h3>
                <p className="text-muted-foreground mt-1">Mulai ngobrol dan kembali ke sini untuk melihat analisisnya, atau klik tombol muat ulang.</p>
            </CardContent>
        </Card>
      )}

      {analysis && !isLoading && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Topik Utama</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.topics.length > 0 ? (
                  analysis.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-base px-3 py-1 bg-primary/20 text-primary-foreground">
                      {topic}
                    </Badge>
                  ))
                ) : (
                  <p>Tidak ada topik spesifik yang terdeteksi.</p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{analysis.summary}</p>
            </CardContent>
          </Card>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Tren Emosi (Contoh)</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-4">Grafik ini adalah contoh visualisasi tren emosi berdasarkan interaksi. Fitur ini masih dalam pengembangan.</p>
          <EmotionChart />
        </CardContent>
      </Card>
    </div>
  );
}
