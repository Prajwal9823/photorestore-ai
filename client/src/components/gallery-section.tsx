import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const galleryItems = [
  {
    before: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    after: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Portrait Restoration",
    era: "1920s → Enhanced",
    beforeFilter: "grayscale"
  },
  {
    before: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    after: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Family Photo",
    era: "1950s → Restored",
    beforeFilter: "sepia"
  },
  {
    before: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    after: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Wedding Photo",
    era: "1940s → Colorized",
    beforeFilter: "grayscale"
  },
  {
    before: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    after: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Street Photography",
    era: "1960s → Enhanced",
    beforeFilter: "grayscale"
  },
  {
    before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    after: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Professional Portrait",
    era: "1930s → Colorized",
    beforeFilter: "grayscale"
  },
  {
    before: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    after: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    category: "Group Photo",
    era: "1970s → Restored",
    beforeFilter: "sepia opacity-75"
  }
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Amazing Results</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the incredible transformations our AI has achieved for thousands of customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <div className="grid grid-cols-2 h-48">
                <img
                  src={item.before}
                  alt={`${item.category} before restoration`}
                  className={`w-full h-full object-cover ${item.beforeFilter}`}
                />
                <img
                  src={item.after}
                  alt={`${item.category} after restoration`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{item.category}</span>
                  <span>{item.era}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors">
            View More Examples
          </Button>
        </div>
      </div>
    </section>
  );
}
