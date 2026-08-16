"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Package, Percent, Tag } from "lucide-react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { UpdateBundleDiscounts } from "@/lib/Actions/Profile.action";
import { toast } from "sonner";
import LoadingSpin from "@/components/ui/loading-spin";
import { cn } from "@/lib/utils";

// ─── Schema ────────────────────────────────────────────────────────────────

const tierSchema = z.object({
  quantity: z
    .string({ invalid_type_error: "Required" })
    .regex(/^[1-9]\d*$/, "Must be a valid quantity of 1 or more"),
  percent: z
    .string({ invalid_type_error: "Required" })
    .regex(/^([1-9]|[1-9][0-9]|100)$/, "Must be a valid percentage between 1 and 100")
});

const bundleDiscountSchema = z.object({
  enabled: z.boolean(),
  tiers: z
    .array(tierSchema)
    .min(1, "Add at least one tier")
});

type BundleDiscountFormValues = z.infer<typeof bundleDiscountSchema>;

// ─── Component ─────────────────────────────────────────────────────────────

export function EnableBundleCreation({ discounts }: { discounts: { enabled: boolean, tiers: { itemCount: number, discountPercent: number }[] } }) {
  const form = useForm<BundleDiscountFormValues>({
    resolver: zodResolver(bundleDiscountSchema),
    defaultValues: {
      enabled: discounts.enabled,
      tiers: discounts.tiers.length > 0 ? discounts.tiers.map((tier) => ({
        quantity: tier.itemCount.toString(),
        percent: tier.discountPercent.toString()
      })) : [
        { quantity: "2", percent: "5" },
        { quantity: "5", percent: "20" },
      ],
    }
  });

  const { formState: { errors, isSubmitting: isLoading } } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tiers",
  });

  const enabled = form.watch("enabled");

  async function onSubmit(values: BundleDiscountFormValues) {
    try {
      await UpdateBundleDiscounts({ payload: values });
      toast.success("Bundle discounts updated successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update bundle discounts. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl space-y-4 md:p-6"
      >
        {/* ── Enable toggle ── */}
        <Card className="rounded-none shadow-none border border-border">
          <CardContent className="flex items-center justify-between rounded-none">
            <Label htmlFor="enabled-switch" className="text-lg font-medium cursor-pointer">
              Enable bundle discounts
            </Label>
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      id="enabled-switch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <p className="px-1 text-sm text-muted-foreground">
          Give discounts when customers buy more items. The more they buy, the better the deal — and the more you'll sell!
          {/* <a href="#" className="text-primary underline-offset-2 hover:underline">
            FAQs
          </a> */}
          .
        </p>

        {/* ── Tiers panel ── */}
        {enabled && (
          <Card className="rounded-none border border-border shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Tag className="h-4 w-4 text-primary text-base" />
                Discount tiers
              </CardTitle>
              <CardDescription className="text-sm">
                Customers automatically receive the highest qualifying discount
                at checkout.
              </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-3 pt-4">
              {/* Column labels */}
              <div className="grid grid-cols-[1fr_1fr_auto] gap-3 px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <span>Buy quantity</span>
                <span>Discount</span>
                <span className="w-9" />
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-[1fr_1fr_auto] items-start gap-3"
                >
                  {/* Quantity */}
                  <FormField
                    control={form.control}
                    name={`tiers.${index}.quantity`}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <InputGroup className="border-[#e1e1e1] rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 focus:border has-[[data-slot=input-group-control]:focus-visible]:border-primary-black !text-base">
                            <InputGroupInput
                              id={`tier-quantity-${index}`}
                              {...field}
                              placeholder="e.g. 2"
                              type="number"
                              min={1}
                              aria-invalid={!!fieldState.error}
                              className={cn("", fieldState.error ? "border-destructive focus-visible:ring-destructive" : "")}
                            />
                            <InputGroupAddon align="inline-start">
                              <Package className="h-4 w-4 shrink-0 text-muted-foreground" />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                              items
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Percent */}
                  {/* <FormField
                    control={form.control}
                    name={`tiers.${index}.percent`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue placeholder="Select Donation Percent" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((item) => (
                                <SelectItem value={item.toString()} key={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name={`tiers.${index}.percent`}
                    render={({ field }) => {

                      return <FormItem>
                        {/* <FormLabel>Country</FormLabel> */}
                        <FormControl>
                          <Combobox
                            items={Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((item) => ({
                              value: item.toString(),
                              label: `${item}% off`
                            }))}
                            value={field.value?.toString()}
                            onValueChange={(percent) => {
                              field.onChange(percent || "");
                            }}
                          >
                            <ComboboxInput placeholder="Select a percent" className={"bg-white border-[#e1e1e1] rounded shadow-none has-[[data-slot=input-group-control]:focus-visible]:ring-0 focus:ring-0 focus:border has-[[data-slot=input-group-control]:focus-visible]:border-primary-black text-lg md:text-base"} />
                            <ComboboxContent className="rounded-none p-0">
                              <ComboboxEmpty>No items found.</ComboboxEmpty>
                              <ComboboxList className={"p-0"}>
                                {(percent) => (
                                  <ComboboxItem
                                    key={`${percent?.label}`}
                                    value={percent?.value}
                                    className="cursor-pointer py-2.5 rounded-none hover:bg-zinc-100 border-b border-b-gray-200"
                                  >
                                    {percent?.label}
                                  </ComboboxItem>
                                )}
                              </ComboboxList>
                            </ComboboxContent>
                          </Combobox>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    }
                    }
                  />

                  {/* Remove */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={fields.length === 1}
                    aria-label={`Remove tier ${index + 1}`}
                    onClick={() => remove(index)}
                    className="mt-0.5 text-muted-foreground hover:text-destructive cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}


            </CardContent>

            <Separator />

            <CardFooter className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed cursor-pointer"
                onClick={() => append({ quantity: undefined as any, percent: undefined as any })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add another tier
              </Button>
            </CardFooter>
          </Card>

        )}

        <Button type='submit' variant={"default"} className="ml-auto cursor-pointer flex flex-row items-center gap-2 disabled:cursor-not-allowed rounded-none" disabled={isLoading}>
          {isLoading ? <span className="loader" /> : "Save Changes"}
        </Button>

      </form>
    </Form>
  );
}