import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CancelReasonDetails, CancelReasonModalProps } from './CancelReasonView'
import { Button } from '@/components/ui/button'
import { ApproveCancelRequest, DeclineCancelRequest } from '@/lib/Actions/Order.action'
import { toast } from 'sonner'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

interface ApproveDeclineCancelReqProps extends CancelReasonModalProps {
    itemId: string
}

function ApproveDeclinecancelReq({ itemId, ...props }: ApproveDeclineCancelReqProps) {
    const [isApproveLoading, setIsApproveLoading] = React.useState(false);
    const [isDeclineLoading, setIsDeclineLoading] = React.useState(false);

    const handleApproveRequest = async () => {
        setIsApproveLoading(true);
        try {

            const res = await ApproveCancelRequest({ payload: { orderItemId: itemId } });

            if (res?.error) {
                toast.error(res?.error || "Something went wrong. Please try again.");
                return;
            }
        } catch (error: any) {
            if (isRedirectError(error)) {
                throw error;
            }
            toast.error(error?.message || "Something went wrong. Please try again.")
        } finally {
            setIsApproveLoading(false)
        }
    }

    const handleDeclineRequest = async () => {
        setIsDeclineLoading(true);
        try {
            const res = await DeclineCancelRequest({ payload: { orderItemId: itemId } });

            if (res?.error) {
                toast.error(res?.error || "Something went wrong. Please try again.");
                return;
            }
        }
        catch (error: any) {
            if (isRedirectError(error)) {
                throw error;
            }
            toast.error(error?.message || "Something went wrong. Please try again.")
        } finally {
            setIsDeclineLoading(false)
        }
    }


    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer text-left">
                {props.trigger}
            </DialogTrigger>

            <DialogContent className="rounded-none overflow-y-auto max-h-screen">
                <DialogHeader className="border-b border-slate-100 pb-4">
                    <DialogTitle className="text-center text-base">Cancel Request</DialogTitle>
                </DialogHeader>

                <CancelReasonDetails {...props} />

                <DialogFooter>
                    <Button
                        className="cursor-pointer rounded-none border-destructive text-destructive hover:text-destructive hover:bg-destructive/10"
                        variant={"outline"}
                        disabled={isDeclineLoading}
                        onClick={(e) => {
                            e.preventDefault();
                            handleDeclineRequest();
                        }}
                    >
                        {isDeclineLoading ? <span className="loaderDark !w-9" /> : "Decline Request"}
                    </Button>

                    <Button
                        className="cursor-pointer rounded-none"
                        disabled={isApproveLoading}
                        onClick={(e) => {
                            e.preventDefault();
                            handleApproveRequest();
                        }}
                    >
                        {isApproveLoading ? <span className="loader" /> : "Approve Request"}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default ApproveDeclinecancelReq