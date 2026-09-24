"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { AddQuestion } from "@/lib/Actions/Question.action";
import { toast } from "sonner";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import LoadingSpin from "@/components/ui/loading-spin";

const formSchema = z.object({
  question: z
    .string({ required_error: "Question is required" })
    .min(1, { message: "Question is required" }),
});

const SubmitYourReview = ({ className, prodId }: { className?: string, prodId: string }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await AddQuestion({ payload: { productId: prodId, question: data?.question } });
      if (!res.success) {
        throw new Error(res.message);
      }
      toast.success(res.message || "Question submitted successfully");
      form.reset();
    }
    catch (error: any) {
      if (isRedirectError(error)) {
        throw error; // Let Next.js handle the redirect
      }
      toast.error(error?.message || "Failed to submit question");
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Add a  question"
                  {...field}
                  className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded h-[100px] bg-slate-50 mt-2 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button className="mt-4 group cursor-pointer">
            Submit {form?.formState?.isLoading ? <LoadingSpin color="white" /> : <AnimatedArrow />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubmitYourReview;
