import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { User, MessageSquareText, XCircle, FileText } from "lucide-react"
import { CancelReasonFormat } from "@/utils/EnumFormater"


interface CancelReasonModalProps {
    cancelReason?: string | null
    cancelReasonDetails?: string | null
    cancelledBy?: string | null

    trigger: React.ReactNode
}

function getCancelReasonLabel(cancelReason?: string | null, cancelledBy?: string | null) {
    if (!cancelReason) return null

    return CancelReasonFormat[cancelReason]?.label ?? cancelReason
}

function DetailRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value?: string | null
}) {
    if (!value) return <></>
    return (
        <div className="flex items-start gap-x-3 py-2">
            <div className="mt-0.5 text-muted-foreground">{icon}</div>
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value}</span>
            </div>
        </div>
    )
}

function CancelReasonView({
    cancelReason,
    cancelReasonDetails,
    cancelledBy,
    trigger,
}: CancelReasonModalProps) {

    const reasonLabel = getCancelReasonLabel(cancelReason, cancelledBy)
    const cancelledByLabel = cancelledBy
        ? cancelledBy.charAt(0) + cancelledBy.slice(1).toLowerCase()
        : null

    return (
        <Dialog>
            <DialogTrigger asChild={typeof trigger !== "string"} className="cursor-pointer text-left">
                {trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-x-2">
                        <XCircle  size={18} />
                        Cancel Reason
                    </DialogTitle>
                    <DialogDescription>
                        Reason for canceling this order.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col divide-y">
                    <DetailRow
                        icon={<User size={16} />}
                        label="Cancelled by"
                        value={cancelledByLabel}
                    />
                    <DetailRow
                        icon={<MessageSquareText size={16} />}
                        label="Reason"
                        value={reasonLabel}
                    />
                    <DetailRow
                        icon={<MessageSquareText size={16} />}
                        label="Additional details"
                        value={cancelReasonDetails}
                    />
                </div>

                {!cancelReason && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No cancellation reason was provided.
                    </p>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CancelReasonView