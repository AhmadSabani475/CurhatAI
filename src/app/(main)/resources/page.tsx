import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, HeartHandshake, Users } from "lucide-react";
import Image from 'next/image';

const resources = [
  {
    title: "Komunitas Peduli Remaja",
    description: "Temukan teman dan dukungan dari komunitas online yang aman dan suportif.",
    icon: <Users className="h-8 w-8 text-primary" />,
    link: "#",
    image: "https://placehold.co/600x400.png",
    imageHint: "community support"
  },
  {
    title: "Layanan Konseling Profesional",
    description: "Akses bantuan profesional untuk kesehatan mentalmu. Tersedia secara online.",
    icon: <HeartHandshake className="h-8 w-8 text-primary" />,
    link: "#",
    image: "https://placehold.co/600x400.png",
    imageHint: "counseling session"
  },
  {
    title: "Artikel & Tips Kesehatan Mental",
    description: "Baca artikel dan dapatkan tips praktis untuk menjaga kesehatan mentalmu setiap hari.",
    icon: <Globe className="h-8 w-8 text-primary" />,
    link: "#",
    image: "https://placehold.co/600x400.png",
    imageHint: "reading articles"
  },
];

export default function ResourcesPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl md:text-3xl font-bold font-headline">Sumber Daya Bantuan</h1>
        <p className="text-muted-foreground">Temukan bantuan dan informasi yang kamu butuhkan di sini.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <a href={resource.link} key={index} target="_blank" rel="noopener noreferrer" className="block transform hover:-translate-y-1 transition-transform duration-200">
            <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <div className="relative h-40 w-full">
                <Image 
                    src={resource.image} 
                    alt={resource.title} 
                    fill
                    style={{objectFit: 'cover'}}
                    data-ai-hint={resource.imageHint}
                />
              </div>
              <CardHeader className="flex flex-row items-center gap-4">
                {resource.icon}
                <CardTitle className="leading-tight">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{resource.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
