"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { X, CirclePlus } from "lucide-react";
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
import { useState } from "react";

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
  const [addedItems, setAddedItems] = useState<
    { items: number; discount: number }[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
    const formatted = data.items.map((item) => ({
      items: parseInt(item.quantity),
      discount: parseInt(item.discount),
    }));

    setAddedItems((prev) => [...prev, ...formatted]);

    toast("Form submitted successfully!", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // Reset form fields
    form.reset({ items: [{ quantity: "", discount: "" }] });
  };

  const toggleSelection = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const deleteSelectedRows = () => {
    setAddedItems((prev) =>
      prev.filter((_, index) => !selectedRows.includes(index))
    );
    setSelectedRows([]);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 relative">
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
                    <FormLabel className="lg:text-xl text-base font-medium text-gray-900">
                      How Much Item?
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 2"
                        className="bg-gray-50 border-gray-200 lg:h-14 h-12 text-base"
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
                    <FormLabel className="lg:text-xl text-base font-medium text-gray-900">
                      Discounted Price (%):
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 10"
                        className="bg-gray-50 border-gray-200 lg:h-14 h-12 text-base"
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
              className="border-b-2 border-r-2 border-l-0 border-t-0 border-black w-[150px] flex gap-2"
            >
              <CirclePlus className="w-4 h-4" />
              ADD
            </Button>
          </div>

          {/* All Added Items */}
          <div className="mt-8 space-y-4">
            {addedItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 bg-gray-50 p-4 rounded-md shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => toggleSelection(index)}
                  className="h-5 w-5"
                />
                <div className="flex flex-col text-base text-gray-800">
                  <span className="font-medium">How Much Item?</span>
                  <span>{item.items}</span>
                </div>
                <div className="flex flex-col text-sm text-gray-800">
                  <span className="font-medium">Discount price (%)</span>
                  <span>{item.discount}%</span>
                </div>
              </div>
            ))}

            {addedItems.length > 0 && (
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={deleteSelectedRows}
                  variant="outline"
                  className="bg-white border text-gray-800 hover:text-red-500 hover:border-red-400"
                >
                  Mark As Delete
                </Button>
              </div>
            )}
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
