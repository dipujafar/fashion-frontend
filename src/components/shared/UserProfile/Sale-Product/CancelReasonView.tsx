import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CancelReasonFormat } from "@/utils/EnumFormater"
import { CancelReason } from "@/types"
import Image from "next/image"
import { defaultImg } from "@/utils/defaultImg"

export interface CancelReasonModalProps {
    cancelReason?: CancelReason | null
    cancelReasonDetails?: string | null
    cancelledBy?: string | null

    trigger: React.ReactNode
    cancelEvidences: { key: string; url: string; id: string }[]
}

function getCancelReasonLabel(cancelReason?: CancelReason | null) {
    if (!cancelReason) return null
    return CancelReasonFormat[cancelReason]?.label ?? cancelReason
}

function CancelReasonView(props: CancelReasonModalProps) {

    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer text-left">
                {props.trigger}
            </DialogTrigger>

            <DialogContent className="rounded-none overflow-y-auto max-h-screen">
                <DialogHeader className="border-b border-slate-100 pb-4">
                    <DialogTitle className="text-center text-base">Cancel Reason</DialogTitle>
                </DialogHeader>

                <CancelReasonDetails {...props} />

            </DialogContent>
        </Dialog>
    )
}

export default CancelReasonView;

export const CancelReasonDetails = ({
    cancelReason,
    cancelReasonDetails,
    cancelEvidences,
}: CancelReasonModalProps) => {

    const reasonLabel = getCancelReasonLabel(cancelReason)

    return <div className="flex flex-col gap-y-6">
        {/* Reason */}
        {reasonLabel && (
            <div className="flex flex-col gap-y-2.5">
                <span className="text-sm font-semibold text-primary-black">
                    Reason
                </span>
                <span className="self-start rounded-md bg-destructive/5 px-4 py-1.5 text-sm font-semibold text-destructive border border-destructive/10">
                    {reasonLabel}
                </span>
            </div>
        )}

        {/* Reason Details */}
        {cancelReasonDetails && (
            <div className="flex flex-col gap-y-2.5">
                <span className="text-sm font-semibold text-primary-black">
                    Reason Details
                </span>
                <div className="rounded border border-slate-200 bg-zinc-50 px-4 py-3.5">
                    <p className="text-sm leading-relaxed text-slate-800">
                        {cancelReasonDetails}
                    </p>
                </div>
            </div>
        )}

        {/* Evidence Photo */}
        {cancelEvidences?.length > 0 && (
            <div className="flex flex-col gap-y-2.5">
                <span className="text-sm font-semibold text-primary-black">
                    Evidence Photo
                </span>
                <div className="grid grid-cols-2 gap-3">
                    {cancelEvidences.map((evidence) => (
                        <Image
                            src={evidence?.url || defaultImg?.placeholderImg}
                            key={evidence?.id}
                            placeholder="blur"
                            blurDataURL={defaultImg?.placeholderImg}
                            height={1000}
                            width={1000}
                            alt="Cancellation evidence"
                            className="h-40 w-40 object-cover"
                        />
                    ))}
                </div>
            </div>
        )}

        {!cancelReason && !cancelReasonDetails && cancelEvidences?.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
                No cancellation reason was provided.
            </p>
        )}
    </div>

}