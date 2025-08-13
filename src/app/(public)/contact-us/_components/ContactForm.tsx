"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/PhoneInput";
import CommonButton from "@/components/ui/common-button";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    // This is where you would typically send the form data to your backend
    console.log(values);
    alert("Form submitted successfully!");
  }

  return (
    <div>
     
      <Form {...form}>
        <form style={{ background: "#FEFBFB", boxShadow: "0 4px 19px 0 rgba(0, 0, 0, 0.10)" }} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:p-6 p-3 rounded-lg">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 focus-visible:ring-0 bg-[#F5F5F5]"
                      placeholder="Enter your first name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="py-5 focus-visible:ring-0 bg-[#F5F5F5]"
                      placeholder="Enter your last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    className="py-5 focus-visible:ring-0 bg-[#F5F5F5]"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <PhoneInput
                    // @ts-ignore
                    value={field.value}
                    onChange={field.onChange}
                    international
                    defaultCountry="US"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your message...."
                    className="min-h-[100px] bg-[#F5F5F5]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CommonButton
            className="border-white w-full"
          >
            Send message
           
          </CommonButton>
        </form>
      </Form>
    </div>
  );
}