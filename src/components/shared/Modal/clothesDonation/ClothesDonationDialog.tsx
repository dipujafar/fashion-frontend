"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DonationForm } from "./ClothesDonationFrom"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import AnimatedArrow from "@/components/animatedArrows/AnimatedArrow";
import { cn } from "@/lib/utils";

export default function ClothesDonationDialog({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} className={cn("bg-transparent font-medium hover:bg-gray-100 duration-300  text-green-700 rounded  uppercase md:min-w-40 md:py-5 cursor-pointer group border border-green-700", className)}>
                Donate Clothes <AnimatedArrow />
            </Button>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogContent className="max-h-[90vh] sm:max-w-2xl overflow-y-auto scroll-hide">
                    <DialogHeader>
                        <DialogTitle>Donate Clothes</DialogTitle>
                        <DialogDescription>Tell us what you are sending to the charity we accept it.</DialogDescription>
                    </DialogHeader>
                    <DonationForm onSubmit={() => setOpen(false)} />
                </DialogContent>
            </Dialog>
        </>
    )
}
