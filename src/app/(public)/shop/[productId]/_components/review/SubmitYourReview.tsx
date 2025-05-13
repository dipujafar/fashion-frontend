"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { InputRating } from "@/components/ui/input-rating";

const formSchema = z.object({
  userName: z
    .string({ required_error: "User Name is required" })
    .min(1, { message: "User Name is required" }),
});

const SubmitYourReview = ({ className }: { className?: string }) => {
  const [selectRating, setSelectRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setSelectRating(newRating);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className={cn(" rounded-sm  space-y-4", className)}>
      <h3 className="md:text-3xl text-xl font-medium">Comments (0)</h3>
      <div>
        <h3>Submit Your Review</h3>
        <div>
          <InputRating
            onRatingChange={handleRatingChange}
            className="w-36"
          ></InputRating>
        </div>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:space-y-6 space-y-4"
            >
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your review"
                        {...field}
                        className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded h-[100px] "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SubmitYourReview;
