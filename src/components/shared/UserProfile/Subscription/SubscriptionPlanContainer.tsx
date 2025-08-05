"use client";
import Container from "@/components/shared/Container";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleRightArrow } from "@/icons";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";

interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  priceLabel?: string;
  feature: string;
  buttonText: string;
}

const pricingData: PricingPlan[] = [
  {
    id: "free-trial",
    title: "Free Trial",
    description: "3 months free trial at sign-up.",
    price: "Free",
    feature: "Ideal for new eco-friendly sellers exploring the platform",
    buttonText: "GET STARTED",
  },
  {
    id: "pro-plan",
    title: "Pro Plan",
    description: "Unlimited Eco-friendly features all monthly",
    price: "$50.00",
    priceLabel: "/monthly",
    feature:
      "Unlimited product listings & Featured placement for increased visibility.",
    buttonText: "GET STARTED",
  },
];

export default function SubscriptionPlanContainer() {
  const [activeTab, setActiveTab] = useState("Free Trial");
  return (
    <Container className=" mt-8 font-bold text-center">
      <h4 className="section-name font-bold">
        Choose Your Plan & Start Making an Impact!
      </h4>

      <div className="w-full max-w-4xl mx-auto px-6 mt-2">
        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("Free Trial")}
              className={`px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === "Free Trial"
                  ? "bg-white text-black border-r border-gray-300"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Free Trial
            </button>
            <button
              onClick={() => setActiveTab("Monthly")}
              className={`px-6 py-2 text-sm font-medium transition-colors ${
                activeTab === "Monthly"
                  ? "bg-white text-black"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {pricingData.map((plan) => (
            <Card
              key={plan.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className="text-center p-6 pb-4">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                {/* Price Section */}
                <div className="bg-black text-white text-center py-6 mx-6 rounded-lg mb-6">
                  <div className="text-3xl font-bold">
                    {plan.price}
                    {plan.priceLabel && (
                      <span className="text-lg font-normal">
                        {plan.priceLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Feature */}
                <div className="px-6 mb-6">
                  <div className="flex items-start gap-3">
                    {/* <CheckCircle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" /> */}
                    <CircleRightArrow className=" size-7 text-black mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {plan.feature}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <div className="px-6 pb-6">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-black hover:bg-gray-50 font-medium py-3 h-auto bg-transparent group cursor-pointer"
                  >
                    {plan.buttonText}
                   <AnimatedArrow size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
