"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Plus, ArrowRight, X, CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";

const formSchema = z.object({
  items: z
    .array(
      z.object({
        quantity: z.string().min(1, "Item quantity is required"),
        discount: z.string().min(1, "Discount percentage is required"),
      })
    )
    .min(1, "At least one item is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateBundleForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [{ quantity: "", discount: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const addNewItem = () => {
    append({ quantity: "", discount: "" });
  };

  const onSubmit = (data: FormValues) => {
    toast("Form submitted successfully!", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className="w-full ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 relative">
              {/* Remove button - only show for items after the first one */}
              {index > 0 && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <FormField
                control={form.control}
                name={`items.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-900">
                      How Much Item?
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 2 Items"
                        className="bg-gray-50 border-gray-200 h-12 text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`items.${index}.discount`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-900">
                      Discounted Price (%):
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 10%"
                        className="bg-gray-50 border-gray-200 h-12 text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={addNewItem}
              className="border-b-2 border-r-2 border-l-0 border-t-0 border-black w-[150px]"
            >
              <CirclePlus className="w-4 h-4" />
              ADD
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-4 text-sm font-medium flex items-center justify-center gap-2"
          >
            SUBMIT
            <AnimatedArrow />
          </Button>
        </form>
      </Form>
    </div>
  );
}
