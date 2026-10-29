"use client";

import React, { useState } from "react";
import { IDonationThanksMsg, TThanksMessageType } from "@/types";
import { useSendThanksMessageMutation } from "@/redux/api/donation.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Heart,
  Loader2,
  MessageSquareText,
  Send,
} from "lucide-react";
import moment from "moment";
import { toast } from "sonner";

interface ThanksMessageDialogProps {
  referenceId: string;
  msgType: TThanksMessageType;
  existingMsg?: IDonationThanksMsg | null;
}

function ThanksMessageDialog({
  referenceId,
  msgType,
  existingMsg,
}: ThanksMessageDialogProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [localSentMsg, setLocalSentMsg] = useState<IDonationThanksMsg | null>(
    null
  );

  const [sendThanksMessage, { isLoading }] = useSendThanksMessageMutation();

  const currentMsg = existingMsg || localSentMsg;
  const hasSent = Boolean(currentMsg);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      toast.error("Please write a thank you message before sending");
      return;
    }

    try {
      const res = await sendThanksMessage({
        referenceId,
        msgType,
        message: trimmed,
      }).unwrap();

      if (res?.data) {
        setLocalSentMsg(res.data);
      } else {
        setLocalSentMsg({
          id: referenceId,
          donorId: "",
          message: trimmed,
          msgType,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      toast.success(res?.message || "Thank you message sent successfully");
      setMessage("");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send thank you message");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border border-primary-black rounded-none shadow-none cursor-pointer gap-1.5 text-xs font-medium"
        >
          {hasSent ? (
            <>
              <MessageSquareText className="size-3.5" />
              View Msg
            </>
          ) : (
            <>
              <Heart className="size-3.5" />
              Send Thank You
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-5 sm:p-6 rounded-none">
        <DialogHeader className="border-b border-gray-200 pb-3.5">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {hasSent ? "Thank You Message" : "Send Thank You Message"}
          </DialogTitle>
          {hasSent && currentMsg?.createdAt ? (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
              <Calendar className="size-3.5" />
              Sent on {moment(currentMsg.createdAt).format(
                "MMM DD, YYYY"
              )} (
              {moment(currentMsg.createdAt).fromNow()})
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              Send a note of appreciation to thank the supporter for their
              donation.
            </p>
          )}
        </DialogHeader>

        {hasSent ? (
          <div className="space-y-4 pt-2">
            <div className="border border-gray-200 bg-zinc-50 p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {currentMsg?.message}
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
                className="border border-primary-black rounded-none shadow-none cursor-pointer text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">
                Your Message
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a heartfelt thank you message to the donor..."
                rows={4}
                disabled={isLoading}
                className="border-[#e1e1e1] rounded-none shadow-none focus-visible:ring-0 focus:ring-0 border focus-visible:border-primary-black text-sm resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isLoading}
                onClick={() => setOpen(false)}
                className="border border-primary-black rounded-none shadow-none cursor-pointer text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                size="sm"
                disabled={isLoading || !message.trim()}
                className="border border-primary-black rounded-none shadow-none cursor-pointer gap-1.5 text-xs"
              >
                {isLoading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Send className="size-3.5" />
                )}
                Send Message
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ThanksMessageDialog;

