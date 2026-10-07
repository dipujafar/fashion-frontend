"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, XCircle, AlertTriangle, UserX, Mail } from "lucide-react";
import Link from "next/link";

export type AccountApprovalStatus = "pending" | "rejected" | "suspended" | "deleted";

interface AccountStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  status: AccountApprovalStatus;
  message?: string;
}

export function AccountStatusModal({
  open,
  onOpenChange,
  status,
  message,
}: AccountStatusModalProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: <Clock className="h-8 w-8 animate-pulse" strokeWidth={2} />,
          iconBg: "bg-amber-100 text-amber-600 ring-8 ring-amber-50",
          title: "Account Approval Pending",
          subtitle: "Your account is waiting for FASHI-ON team approval.",
          description: (
            <p>
              Thank you for registering with <span className="font-semibold text-gray-900">FASHI-ON</span>.
              Your account details are currently under review by our administration team. You will be able to sign in once your account has been approved.
            </p>
          ),
          showSupportBtn: false,
          confirmBtnText: "Understood",
        };
      case "rejected":
        return {
          icon: <XCircle className="h-8 w-8" strokeWidth={2} />,
          iconBg: "bg-red-100 text-red-600 ring-8 ring-red-50",
          title: "Account Application Rejected",
          subtitle: "Your account has been rejected by the FASHI-ON team.",
          description: (
            <p>
              Unfortunately, your account application could not be approved at this time.
              If you have any questions or believe this was a mistake, please reach out to our support team.
            </p>
          ),
          showSupportBtn: true,
          confirmBtnText: "Close",
        };
      case "suspended":
        return {
          icon: <AlertTriangle className="h-8 w-8" strokeWidth={2} />,
          iconBg: "bg-orange-100 text-orange-600 ring-8 ring-orange-50",
          title: "Account Suspended",
          subtitle: "Your account has been suspended by the FASHI-ON team.",
          description: (
            <p>
              Access to this account has been suspended due to policy violations or security concerns.
              If you believe this suspension is in error, please contact our support team to request a review.
            </p>
          ),
          showSupportBtn: true,
          confirmBtnText: "Close",
        };
      case "deleted":
        return {
          icon: <UserX className="h-8 w-8" strokeWidth={2} />,
          iconBg: "bg-rose-100 text-rose-600 ring-8 ring-rose-50",
          title: "Account Deleted",
          subtitle: "This account has been deleted.",
          description: (
            <p>
              The account associated with these credentials has been deleted and is no longer active.
              If you wish to use <span className="font-semibold text-gray-900">FASHI-ON</span>, you can create a new account or reach out to support.
            </p>
          ),
          showSupportBtn: true,
          confirmBtnText: "Close",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6 text-center sm:rounded-2xl">
        <DialogHeader className="items-center">
          {/* Icon Badge */}
          <div
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-3 ${config.iconBg}`}
          >
            {config.icon}
          </div>

          {/* Title */}
          <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center">
            {config.title}
          </DialogTitle>

          {/* Subtitle / Primary Message */}
          <DialogDescription className="text-sm md:text-base text-gray-600 font-medium text-center mt-2">
            {config.subtitle}
          </DialogDescription>
        </DialogHeader>

        {/* Informational description */}
        <div className="space-y-3 my-2 text-sm text-gray-500 leading-relaxed">
          {config.description}

        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
          {config.showSupportBtn && (
            <Button
              asChild
              variant="outline"
              className="rounded-full cursor-pointer border-gray-300 hover:bg-gray-50"
            >
              <Link href="/contact-us" onClick={() => onOpenChange(false)}>
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
            </Button>
          )}

          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full cursor-pointer bg-primary-black text-white hover:bg-zinc-800 px-6"
          >
            {config.confirmBtnText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
