import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for trying out our service",
    features: [
      "3 photos per month",
      "Basic enhancement",
      "720p output quality",
      { name: "Priority processing", included: false }
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For regular photo restoration needs",
    popular: true,
    features: [
      "100 photos per month",
      "Advanced AI enhancement",
      "Full HD (1080p) output",
      "Priority processing",
      "Batch processing"
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "default" as const
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For professional workflows",
    features: [
      "Unlimited photos",
      "Premium AI models",
      "4K output quality",
      "API access",
      "Dedicated support"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-2 border-primary shadow-xl' : 'shadow-lg'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-4">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-8">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {typeof feature === 'string' ? (
                        <>
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </>
                      ) : (
                        <>
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
