"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { donationSchema, ITEM_TYPES, BAG_CONTENTS, CONDITIONS, WASHED_OPTIONS, GENDERS } from "./schema"
import { Donation } from "./schema"
import { cn } from "@/lib/utils"
import SingleItemForm from "./SingleItemForm"
import BagItemForm from "./BagItemForm"




interface DonationFormProps {
    onSubmit?: () => void
}

export function DonationForm({ onSubmit }: DonationFormProps) {
    const [donationType, setDonationType] = useState<"single" | "bag">("single")
    const [addedItems, setAddedItems] = useState<number>(1)

    const form = useForm<Donation>({
        resolver: zodResolver(donationSchema),
        defaultValues: {
            donationType: "single",
            singleItems: [
                {
                    itemType: [],
                    condition: "",
                    washed: "",
                },
            ],
        },
    })

    const handleSubmit = async (data: Donation) => {
        console.log("Form Data:", data)
        onSubmit?.()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Donation Type Selection */}
                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant={donationType === "single" ? "default" : "outline"}
                        onClick={() => {
                            setDonationType("single")
                            form.setValue("donationType", "single")
                        }}
                        className="flex-1"
                    >
                        Single Item
                    </Button>
                    <Button
                        type="button"
                        variant={donationType === "bag" ? "default" : "outline"}
                        onClick={() => {
                            setDonationType("bag")
                            form.setValue("donationType", "bag")
                        }}
                        className={cn("flex-1", donationType !== "bag" && "bg-gray-200")}
                    >
                        Bag of Items
                    </Button>
                </div>

                {donationType === "single" && <SingleItemForm form={form} itemCount={addedItems} />}

                {donationType === "bag" && <BagItemForm form={form} />}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                        Submit Donation
                    </Button>
                </div>
            </form>
        </Form>
    )
}

interface FormProps {
    form: any
    itemCount?: number
}



