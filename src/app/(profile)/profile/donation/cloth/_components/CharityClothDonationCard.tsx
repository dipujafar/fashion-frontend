"use client";

import React, { useState } from "react";
import {
  IClothDonation,
  useUpdateClothDonationStatusMutation,
} from "@/redux/api/donation.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Check,
  Droplets,
  Image as ImageIcon,
  Loader2,
  Package,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { toast } from "sonner";
import { defaultImg } from "@/utils/defaultImg";
import { cn } from "@/lib/utils";
import {
  formatClothStatus,
  formatWashedType,
} from "../../../donation-contribution/cloth-donation/_components/ClothDonationDetailsDialog";
import CharityClothDonationDetailsDialog from "./CharityClothDonationDetailsDialog";
import ThanksMessageDialog from "../../_components/ThanksMessageDialog";

interface CharityClothDonationCardProps {
  donation: IClothDonation;
}

function CharityClothDonationCard({ donation }: CharityClothDonationCardProps) {
  const [actionStatus, setActionStatus] = useState<
    "ACCEPTED" | "REJECTED" | null
  >(null);

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateClothDonationStatusMutation();

  const photos = donation?.photos || [];
  const mainPhoto = photos[0]?.url || defaultImg?.product;
  const statusInfo = formatClothStatus(donation.status);
  const donor = donation?.donor;
  const donorName =
    `${donor?.fname || ""} ${donor?.lname || ""}`.trim() ||
    donor?.userName ||
    "Donor";

  const handleStatusUpdate = async (status: "ACCEPTED" | "REJECTED") => {
    setActionStatus(status);
    try {
      const res = await updateStatus({ id: donation.id, status }).unwrap();
      toast.success(
        res?.message ||
          `Donation ${status === "ACCEPTED" ? "approved" : "declined"} successfully`
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update donation status");
    } finally {
      setActionStatus(null);
    }
  };

  return (
    <div className="border border-gray-200 bg-white p-3.5 sm:p-4 hover:border-gray-300 transition-colors flex flex-col sm:flex-row gap-4 justify-between">
      {/* Left: Photo + Details */}
      <div className="flex flex-col xs:flex-row items-start gap-4 flex-1 min-w-0">
        {/* Thumbnail */}
        <div className="relative h-28 w-full xs:w-28 sm:h-28 sm:w-28 overflow-hidden border border-gray-200 bg-zinc-100 shrink-0">
          <Image
            src={mainPhoto}
            alt="Cloth donation"
            fill
            className="object-cover"
          />
          {photos.length > 1 && (
            <span className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 bg-black/75 px-1.5 py-0.5 text-[10px] font-medium text-white">
              <ImageIcon className="size-3" />
              {photos.length}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-2 w-full">
          {/* Top Row: Donor & Status */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs text-muted-foreground">From:</span>
              <Link
                href={donor?.userName ? `/member/${donor.userName}` : "#"}
                className="text-base font-semibold text-gray-900 hover:underline truncate"
              >
                @{donor?.userName || donorName}
              </Link>
            </div>

            <div className="flex items-center gap-1.5">
              <Badge
                variant="outline"
                className="text-[11px] font-medium bg-zinc-50 border-gray-200 rounded-none"
              >
                {donation.donationType === "SINGLE"
                  ? "Single Item"
                  : "Multiple Items"}
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  "text-[11px] font-semibold rounded-none",
                  statusInfo.className
                )}
              >
                {statusInfo.label}
              </Badge>
            </div>
          </div>

          {/* Item Categories */}
          {donation.itemTypes?.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {donation.itemTypes.slice(0, 4).map((item, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-xs font-normal px-2 py-0 h-5 rounded-none"
                >
                  {item}
                </Badge>
              ))}
              {donation.itemTypes.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{donation.itemTypes.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Meta Attributes */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-600">
            <span className="inline-flex items-center gap-1">
              <Package className="size-3.5 text-muted-foreground" />
              {donation.itemsCount
                ? `${donation.itemsCount} ${
                    donation.donationType === "SINGLE" ? "item" : "items"
                  }`
                : donation.donationType === "SINGLE"
                ? "1 item"
                : "Multiple items"}
            </span>

            <span className="inline-flex items-center gap-1">
              <Sparkles className="size-3.5 text-muted-foreground" />
              {donation.condition}
            </span>

            <span className="inline-flex items-center gap-1">
              <Droplets className="size-3.5 text-muted-foreground" />
              {formatWashedType(donation.washedType)}
            </span>

            {donation.brands?.length > 0 && (
              <span className="inline-flex items-center gap-1 truncate max-w-[180px]">
                <Tag className="size-3.5 text-muted-foreground shrink-0" />
                {donation.brands.join(", ")}
              </span>
            )}
          </div>

          {/* Bottom Row: Date + Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            {donation.createdAt ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="size-3.5" />
                {moment(donation.createdAt).format("MMM DD, YYYY")} (
                {moment(donation.createdAt).fromNow()})
              </span>
            ) : (
              <span />
            )}

            <div className="flex flex-wrap items-center gap-2">
              {donation.status === "PENDING" && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate("REJECTED")}
                    className="border border-destructive text-destructive hover:text-destructive rounded-none shadow-none cursor-pointer gap-1 text-xs font-medium"
                  >
                    {isUpdating && actionStatus === "REJECTED" ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <X className="size-3.5" />
                    )}
                    Decline
                  </Button>

                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    disabled={isUpdating}
                    onClick={() => handleStatusUpdate("ACCEPTED")}
                    className="border border-primary-black rounded-none shadow-none cursor-pointer gap-1 text-xs font-medium"
                  >
                    {isUpdating && actionStatus === "ACCEPTED" ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Check className="size-3.5" />
                    )}
                    Approve
                  </Button>
                </>
              )}

              {(donation.status === "ACCEPTED" ||
                donation.status === "COMPLETED") && (
                <ThanksMessageDialog
                  referenceId={donation.id}
                  msgType="CLOTH"
                  existingMsg={donation.thanksMsg || donation.thanksMessage}
                />
              )}

              <CharityClothDonationDetailsDialog donation={donation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharityClothDonationCard;
