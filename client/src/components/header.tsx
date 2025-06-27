import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Sparkles className="h-6 w-6 text-primary mr-2" />
                <span className="text-xl font-bold text-gray-900">PhotoRestore AI</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => {
                  const element = document.getElementById('upload');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Try It Free
              </Button>
              
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('features')}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary w-full text-left"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary w-full text-left"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary w-full text-left"
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary w-full text-left"
                >
                  Contact
                </button>

              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
