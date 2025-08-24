import { Card, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col items-start mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Riwayat Percakapan</h1>
        <p className="text-muted-foreground">Lihat kembali percakapanmu sebelumnya.</p>
      </div>
      <Card className="text-center p-10 border-2 border-dashed">
            <CardContent>
                <History className="mx-auto h-12 w-12 text-muted-foreground mb-4"/>
                <h3 className="text-lg font-semibold">Segera Hadir</h3>
                <p className="text-muted-foreground mt-1">Fitur riwayat percakapan sedang dalam pengembangan dan akan segera tersedia.</p>
            </CardContent>
        </Card>
    </div>
  );
}
