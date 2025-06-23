"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Star, ArrowRight, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";

const feedbackSchema = z.object({
  overallFeedback: z.enum(["poor", "average", "good", "very-good"], {
    required_error: "Please select your overall feedback.",
  }),
  sellerCommunication: z
    .number()
    .min(1, "Please rate seller communication")
    .max(5),
  productAsDescribed: z.number().min(1, "Please rate product accuracy").max(5),
  postage: z.number().min(1, "Please rate postage").max(5),
  review: z
    .string()
    .min(10, "Review must be at least 10 characters long")
    .optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const feedbackOptions = [
  { value: "poor", emoji: "😞", label: "Poor" },
  { value: "average", emoji: "😐", label: "Average" },
  { value: "good", emoji: "😎", label: "Good" },
  { value: "very-good", emoji: "😄", label: "Very Good" },
] as const;

const ratingCategories = [
  { key: "sellerCommunication", label: "Seller Communication" },
  { key: "productAsDescribed", label: "Product as Described" },
  { key: "postage", label: "Postage" },
] as const;

export default function SendFeedbacksForm() {
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      sellerCommunication: 0,
      productAsDescribed: 0,
      postage: 0,
      review: "",
    },
  });

  function onSubmit(data: FeedbackFormValues) {
    console.log("Feedback submitted:", data);
    // Handle form submission here
  }

  const StarRating = ({
    value,
    onChange,
  }: {
    value: number;
    onChange: (value: number) => void;
    name: string;
  }) => {
    return (
      <div className="flex xl:gap-1 gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="xl:p-1 p-0.5 hover:scale-110 transition-transform"
          >
            <Star
              className={cn(
                "xl:size-5 size-4 transition-colors",
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-300"
              )}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Card className="border-none shadow-none py-0">
      <CardHeader className="px-0">
        <CardTitle className="md:text-2xl text-xl font-medium text-black/50">
          Select Your Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Overall Feedback Selection */}
            <FormField
              control={form.control}
              name="overallFeedback"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                      {feedbackOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => field.onChange(option.value)}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:bg-gray-50",
                            field.value === option.value &&
                              "bg-blue-50 ring-2 ring-blue-200"
                          )}
                        >
                          <div className="md:text-5xl text-3xl">
                            {option.emoji}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rating Categories */}
            <div className="space-y-4">
              <h3 className="md:text-2xl text-xl font-medium text-black/50">
                Rate Your Experience
              </h3>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 xl:gap-6 gap-3">
                {ratingCategories.map((category) => (
                  <FormField
                    key={category.key}
                    control={form.control}
                    name={category.key as keyof FeedbackFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <div
                          style={{
                            boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.11)",
                          }}
                          className="flex items-center justify-between xl:gap-x-4 gap-x-1  bg-[#FFFBFB] p-2 rounded-lg"
                        >
                          <FormLabel className="text-gray-600 font-normal">
                            {category.label}
                          </FormLabel>
                          <FormControl>
                            <StarRating
                              value={field.value as number}
                              onChange={field.onChange}
                              name={category.key}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Review Text Area */}
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
                    <SquarePen className="size-4" />
                    Write a Review
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience..."
                      className="min-h-[120px] resize-none border-gray-200 focus:border-gray-300 bg-[#F4F4F4]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white px-8 py-2  font-medium group border-b-2 border-r-2 border-red-600 rounded-none "
              >
                SUBMIT
                <AnimatedArrow/>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
