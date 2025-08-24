import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, HeartHandshake, Users, Phone } from "lucide-react";
import Image from 'next/image';

const resources = [
  {
    title: "Komunitas Peduli Remaja",
    description: "Bergabunglah dengan komunitas online yang aman untuk berbagi cerita, mendapatkan dukungan, dan menemukan teman yang memahami perasaanmu.",
    icon: <Users className="h-8 w-8 text-primary" />,
    link: "https://www.masalahremaja.com/",
    image: "https://placehold.co/600x400.png",
    imageHint: "community support group"
  },
  {
    title: "Layanan Konseling Profesional",
    description: "Jangan ragu mencari bantuan ahli. Hubungi konselor profesional yang siap mendengarkan dan membantumu melewati masa sulit.",
    icon: <HeartHandshake className="h-8 w-8 text-primary" />,
    link: "https://ibunda.id/p/konseling-dengan-psikolog",
    image: "https://placehold.co/600x400.png",
    imageHint: "friendly online counseling"
  },
  {
    title: "Artikel Kesehatan Mental",
    description: "Tambah wawasanmu tentang cara menjaga kesehatan mental, mengelola stres, dan membangun kepercayaan diri melalui artikel terpercaya.",
    icon: <Globe className="h-8 w-8 text-primary" />,
    link: "https://www.unicef.org/indonesia/id/kesehatan-mental",
    image: "https://placehold.co/600x400.png",
    imageHint: "person reading articles"
  },
   {
    title: "Hotline Bantuan Krisis",
    description: "Jika kamu butuh bantuan segera, jangan ragu untuk menghubungi nomor darurat untuk mendapatkan pertolongan cepat dan tepat.",
    icon: <Phone className="h-8 w-8 text-primary" />,
    link: "tel:119",
    image: "https://placehold.co/600x400.png",
    imageHint: "emergency phone call"
  },
];

export default function ResourcesPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Sumber Daya Bantuan</h1>
        <p className="text-muted-foreground">Kamu tidak sendirian. Temukan bantuan dan informasi yang kamu butuhkan di sini.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource, index) => (
          <a href={resource.link} key={index} target="_blank" rel="noopener noreferrer" className="block transform hover:-translate-y-1 transition-transform duration-200 group">
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-200 flex flex-col">
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
              <CardHeader className="flex flex-row items-start gap-4 bg-card z-10">
                <div className="mt-1">
                    {resource.icon}
                </div>
                <div>
                    <CardTitle className="leading-tight text-lg">{resource.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">{resource.description}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                <p className="text-xs text-primary font-semibold hover:underline">
                  Kunjungi Situs &rarr;
                </p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
