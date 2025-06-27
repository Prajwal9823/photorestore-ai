import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this service really free?",
    answer: "Yes! Our photo restoration service is completely free with no hidden costs, subscriptions, or limitations. No account creation required - simply upload your photo and get enhanced results instantly."
  },
  {
    question: "How does AI photo restoration work?",
    answer: "Our AI uses advanced machine learning models trained on millions of photo pairs to understand how to enhance old photos. It analyzes patterns, textures, and historical color information to intelligently restore and colorize your images while preserving their authenticity."
  },
  {
    question: "What file formats do you support?",
    answer: "We support JPG, PNG, and TIFF formats. For best results, we recommend uploading high-resolution images (at least 1080p). The maximum file size is 10MB per image."
  },
  {
    question: "How long does processing take?",
    answer: "Most photos are processed within 30-60 seconds. Processing time may vary based on image complexity and current server load. The service is completely free with no limitations."
  },
  {
    question: "Are my photos stored or shared?",
    answer: "Your privacy is our priority. All uploaded photos are automatically deleted from our servers after 24 hours. We never store, analyze, or share your personal images without explicit consent."
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer: "Since our service is completely free, you can try processing your photo multiple times with no limitations. If you're not happy with the results, feel free to contact our support team for assistance with different processing approaches."
  },
  {
    question: "Can I restore damaged or torn photos?",
    answer: "Yes! Our AI is specifically trained to repair various types of damage including scratches, tears, stains, and missing sections. The AI intelligently reconstructs damaged areas based on surrounding context and patterns."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about our photo restoration service</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-0">
                <button
                  className="flex justify-between items-center w-full text-left p-6 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                      openItems.includes(index) ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
