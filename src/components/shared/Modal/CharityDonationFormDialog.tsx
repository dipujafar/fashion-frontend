"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Link from "next/link";
import CommonButton from "@/components/ui/common-button";

const formSchema = z.object({
  charity: z.string().min(1, "Please select a charity type"),
  amount: z.string().min(1, "Please select or enter an amount"),
  privacy: z.enum(["anonymous", "public"], {
    required_error: "Please select a privacy option",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface CharityDonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CharityDonationFormDialog() {
  const [selectedAmount, setSelectedAmount] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      charity: "",
      amount: "",
      privacy: "anonymous",
    },
  });

  const presetAmounts = ["$50", "$100", "$200"];

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    form.setValue("amount", amount);
  };

  const handleCustomAmountChange = (value: string) => {
    setSelectedAmount("");
    form.setValue("amount", value);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="text-green-600 lg:text-base md:text-xs uppercase"
      >
        <span>Donate now</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4">
          <div>
            <div className="space-y-1">
              <div className="flex justify-between items-center gap-3 flex-wrap  w-full">
                <DialogTitle className="text-base font-medium text-foreground">
                  Would you like to donate to charity?
                </DialogTitle>
                {/*  ----------------- option for viewing all charities ---------------- */}
                <Link href={"/all-charities"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  View all
                </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Choose a charity and donate any amount for your support
              </p>
            </div>
           
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-6 pb-6 space-y-6"
          >
            {/* Charity Selection */}
            <FormField
              control={form.control}
              name="charity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type of charity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=" Women for Women International">
                          Women for Women International
                        </SelectItem>
                        <SelectItem value=" Plant More Trees">
                          Plant More Trees
                        </SelectItem>
                        <SelectItem value=" Save the Children">
                          Save the Children
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preset Amount Buttons */}
            <div className="flex gap-3">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handleAmountSelect(amount)}
                >
                  {amount}
                </Button>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="customAmount" className="text-sm font-medium">
                Custom Amount
              </Label>
              <Input
                id="customAmount"
                placeholder="Enter your amount"
                className="bg-gray-200"
                value={selectedAmount ? "" : form.watch("amount")}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
              />
            </div>

            {/* Privacy Options */}
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-medium">
                    Donation Privacy: Would you like to remain anonymous?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="anonymous" id="anonymous" />
                        <Label
                          htmlFor="anonymous"
                          className="text-sm font-normal cursor-pointer"
                        >
                          Yes, keep my donation anonymous
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label
                          htmlFor="public"
                          className="text-sm font-normal cursor-pointer"
                        >
                          No, show my profile
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
          <CommonButton  className="w-full md:py-4">Submit</CommonButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
