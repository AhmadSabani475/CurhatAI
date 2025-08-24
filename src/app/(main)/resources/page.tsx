import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, Globe, HeartHandshake, Smile, Users } from "lucide-react";
import Image from 'next/image';

const resources = [
  {
    title: "Mengelola Kecemasan: Panduan untuk Remaja",
    description: "Pelajari teknik praktis untuk mengatasi rasa cemas dan khawatir dalam kehidupan sehari-hari. Artikel dari UNICEF.",
    icon: <Brain className="h-8 w-8 text-primary" />,
    link: "https://www.unicef.org/indonesia/id/child-protection/7-cara-bagi-remaja-untuk-menjaga-kesehatan-mental",
    image: "https://placehold.co/600x400.png",
    imageHint: "teenager calming down"
  },
  {
    title: "Mengenal dan Mengatasi Stres",
    description: "Ketahui penyebab stres pada remaja dan cara efektif untuk mengelolanya agar tidak berlarut-larut.",
    icon: <Smile className="h-8 w-8 text-primary" />,
    link: "https://yankes.kemkes.go.id/view_artikel/328/mengenal-stres-dan-cara-mengatasinya",
    image: "https://placehold.co/600x400.png",
    imageHint: "stress relief"
  },
  {
    title: "Pentingnya Menjaga Kesehatan Mental",
    description: "Artikel dari Kementerian Kesehatan yang membahas mengapa kesehatan mental sama pentingnya dengan kesehatan fisik.",
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    link: "https://yankes.kemkes.go.id/view_artikel/1545/kesehatan-mental-sama-pentingnya-dengan-kesehatan-fisik",
    image: "https://placehold.co/600x400.png",
    imageHint: "mental health awareness"
  },
  {
    title: "Bantuan Profesional: Kapan Harus Menghubungi Psikolog?",
    description: "Cari tahu kapan saat yang tepat untuk mencari bantuan profesional dan apa yang diharapkan dari sesi konseling.",
    icon: <HeartHandshake className="h-8 w-8 text-primary" />,
    link: "https://www.halodoc.com/artikel/kapan-waktu-yang-tepat-untuk-ke-psikolog",
    image: "https://placehold.co/600x400.png",
    imageHint: "counseling session"
  },
  {
    title: "Membangun Hubungan Pertemanan yang Sehat",
    description: "Tips dan panduan untuk membangun dan menjaga hubungan pertemanan yang positif dan suportif.",
    icon: <Users className="h-8 w-8 text-primary" />,
    link: "https://hellosehat.com/mental/hubungan-harmonis/membangun-pertemanan-yang-sehat/",
    image: "https://placehold.co/600x400.png",
    imageHint: "healthy friendship"
  },
  {
    title: "Kumpulan Artikel Kesehatan Jiwa",
    description: "Jelajahi berbagai artikel mendalam tentang kesehatan jiwa dari PDSKJI (Perhimpunan Dokter Spesialis Kedokteran Jiwa Indonesia).",
    icon: <Globe className="h-8 w-8 text-primary" />,
    link: "https://www.pdskji.org/home/koleksi-artikel-kesehatan-jiwa",
    image: "https://placehold.co/600x400.png",
    imageHint: "reading online articles"
  }
];

export default function ResourcesPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Artikel & Sumber Daya</h1>
        <p className="text-muted-foreground">Temukan wawasan dan dukungan untuk kesehatan mentalmu di sini.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <a href={resource.link} key={index} target="_blank" rel="noopener noreferrer" className="block transform hover:-translate-y-1 transition-transform duration-200 group">
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-200 flex flex-col bg-card">
              <div className="relative h-48 w-full">
                <Image 
                    src={resource.image} 
                    alt={resource.title} 
                    fill
                    style={{objectFit: 'cover'}}
                    className="group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={resource.imageHint}
                />
                 <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <CardHeader className="flex flex-row items-start gap-4 flex-1">
                <div className="mt-1 shrink-0">
                    {resource.icon}
                </div>
                <div>
                    <CardTitle className="leading-tight text-lg">{resource.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{resource.description}</p>
                </div>
              </CardHeader>
              <div className="p-6 pt-0">
                <p className="text-xs text-primary font-semibold group-hover:underline">
                  Baca Selengkapnya &rarr;
                </p>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
