"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
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
import Image from "next/image";
import { Redo2, Reply } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  question: z
    .string({ required_error: "Question is required" })
    .min(1, { message: "Question is required" }),
});

const replyFormSchema = z.object({
  reply: z
    .string({ required_error: "Question is required" })
    .min(1, { message: "Question is required" }),
});

const commentData = [
  {
    id: 1,
    name: "John Doe",
    date: "2023-07-01",
    comment: "There is any more color available?",
    profileImage: "/userProfile1.png",
  },
];

const SubmitYourReview = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });
  const replyForm = useForm<z.infer<typeof replyFormSchema>>({
    resolver: zodResolver(replyFormSchema),
    defaultValues: {
      reply: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const onSubmitReply = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className={cn(" rounded-sm  space-y-4", className)}>
      <h3 className="md:text-3xl text-xl font-medium">Comments (0)</h3>
      <div>
        <h3>
          Have a question that others might want to know? Add a public Comment.
        </h3>
        {/* <div>
          <InputRating
            onRatingChange={handleRatingChange}
            className="w-36"
          ></InputRating>
        </div> */}

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Add a comment"
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
                  Submit <AnimatedArrow />
                </Button>
              </div>
            </form>
          </Form>

          {/* -------------------- display previous questions ------------- */}
          <div>
            {commentData?.map((comment) => (
              <div
                key={comment.id}
                className=" mt-4 border bg-gray-100 p-2 rounded flex justify-between"
              >
                <div className="flex space-x-3">
                  <Image
                    src={comment.profileImage}
                    alt=""
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{comment.name}</p>
                    <p className="text-lg">{comment.comment}</p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {comment.date}
                  </p>

                  <Popover>
                    <PopoverTrigger>
                      <Button size={"sm"} className="mt-2 cursor-pointer">
                        Reply <Redo2 />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Form {...replyForm}>
                        <form
                          onSubmit={form.handleSubmit(onSubmitReply)}
                          className=" "
                        >
                          <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your reply"
                                    {...field}
                                    className="focus-visible:ring-0  focus-visible:ring-offset-0  rounded  bg-slate-50 mt-2 "
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end">
                            <Button size={"sm"} className="mt-4 group cursor-pointer">
                              Reply 
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default SubmitYourReview;
