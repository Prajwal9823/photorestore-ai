import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, Camera } from "lucide-react";

export default function HeroSection() {
  const scrollToUpload = () => {
    const element = document.getElementById('upload');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative gradient-hero py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Restore Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Memories
              </span>{" "}
              with AI
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Transform black and white photos into beautiful colorized images with our advanced photo enhancement system. Add natural, warm colors while improving clarity, contrast, and overall quality. Completely free, no account required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToUpload}
                className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Restoring
              </Button>
              <Button
                variant="outline"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                View Examples
              </Button>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Completely free
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                No signup required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Instant results
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                HD quality
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3">BEFORE</h3>
                    <img
                      src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                      alt="Old damaged family photo"
                      className="rounded-lg w-full h-48 object-cover shadow-md grayscale"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3">AFTER</h3>
                    <img
                      src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                      alt="Restored family photo with vibrant colors"
                      className="rounded-lg w-full h-48 object-cover shadow-md"
                    />
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Enhanced in 30 seconds
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-full shadow-lg animate-float">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-secondary text-white p-3 rounded-full shadow-lg animate-float">
                <Camera className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
