import { Card, CardContent } from "@/components/ui/card";
import { Palette, Sparkles, ZoomIn, Clock, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "DeOldify Colorization",
    description: "Professional colorization using DeOldify AI model, the same technology used by film studios and historians to bring historical photos to life.",
    color: "text-primary bg-primary/10"
  },
  {
    icon: Sparkles,
    title: "CodeFormer Face Restoration",
    description: "Professional face restoration using CodeFormer AI model. Repairs damaged faces, enhances facial features, and restores missing details with remarkable accuracy.",
    color: "text-secondary bg-secondary/10"
  },
  {
    icon: ZoomIn,
    title: "Real-ESRGAN Upscaling",
    description: "Industry-leading Real-ESRGAN model enhances resolution up to 8x while preserving natural textures, facial features, and fine details with exceptional clarity.",
    color: "text-accent bg-accent/10"
  },
  {
    icon: Clock,
    title: "Instant Processing",
    description: "Get professional results in seconds, not hours. Our optimized AI models deliver high-quality enhancements faster than ever before.",
    color: "text-green-600 bg-green-100"
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "Your photos are automatically deleted after processing. We never store or share your personal images without explicit permission.",
    color: "text-yellow-600 bg-yellow-100"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Works perfectly on any device. Upload and enhance photos directly from your smartphone with the same professional quality.",
    color: "text-blue-600 bg-blue-100"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Professional AI Models</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            State-of-the-art AI models used by professionals and researchers worldwide, now available for free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-8">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
