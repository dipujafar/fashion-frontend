"use client"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

interface DialogProps {
    open: boolean
    setOpen: (open: boolean) => void,
    content?: React.ReactNode
}

export function SuccessModal({ open, setOpen, content }: DialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-md p-0 rounded-none overflow-y-auto max-h-screen">
                <DialogHeader></DialogHeader>

                {content}

            </DialogContent>
        </Dialog>
    )
}