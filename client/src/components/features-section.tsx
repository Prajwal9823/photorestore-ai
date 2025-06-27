import { Card, CardContent } from "@/components/ui/card";
import { Palette, Sparkles, ZoomIn, Clock, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Natural Colorization",
    description: "Transform black and white photos with warm, natural colors. Our system automatically detects grayscale images and applies beautiful sepia and color tones for authentic results.",
    color: "text-primary bg-primary/10"
  },
  {
    icon: Sparkles,
    title: "Photo Enhancement",
    description: "Improve your photos with advanced enhancement algorithms. Reduce noise, enhance contrast, sharpen details, and optimize brightness for professional-quality results.",
    color: "text-secondary bg-secondary/10"
  },
  {
    icon: ZoomIn,
    title: "Quality Upscaling",
    description: "Increase image resolution up to 2x with high-quality scaling algorithms. Preserves fine details and textures while making your photos larger and clearer.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Photo Colorization & Enhancement</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your black and white photos with natural colorization and professional enhancement algorithms
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
