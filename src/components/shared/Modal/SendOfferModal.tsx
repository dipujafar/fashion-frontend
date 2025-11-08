import CommonButton from "@/components/ui/common-button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InfoIcon3 } from "@/icons";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SendOfferModal({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [selectedOffer, setSelectedOffer] = useState<number>(0);

  const handleSendOffer = () => {
    router.push("/individual-user/dashboard/message");
  };

  const offerData = [
    {
      id: 1,
      discount: 5,
      price: 152.00,
    },
    {
      id: 2,
      discount: 10,
      price: 144.00,
    },
    {
      id: 3,
      discount: 15,
      price: 142.00,
    },
  ];
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[700px]">
        <div className="space-y-4">
          <div className="flex md:flex-row flex-col  gap-x-4">
            <div className="relative">
              <Image
                src={"/productDetailsImage3.jpeg"}
                alt="hero image"
                width={500}
                height={500}
                className="h-32 w-36 rounded-2xl object-cover "
              />
           
            </div>

            <div className="text-base">
              <h1 className="text-base">
               Brown fringe shawl / bohemian - whimsical vibes.
              </h1>
              <p className="text-[#8A8A8A]">Product Price: $300.00</p>
             
              <p className="text-[#E12728]">Offer Expire in 24 hrs</p>
            </div>
          </div>
          <div className="text-[#6B6B6B] font-medium text-lg">
            <h1>Submit your offer</h1>
            <hr className="my-2" />

            <div className={cn("flex justify-center items-center gap-x-5 flex-wrap")}>
              {offerData?.map((item) => (
                <p
                  key={item?.id}
                  onClick={() => setSelectedOffer(item?.id)}
                  style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.05)" }}
                  className={cn("text-center  w-fit py-2 px-5 rounded-xl border border-gray-200 cursor-pointer",  selectedOffer === item?.id && "border-primary-gray/40 bg-gray-100")}
                >
                  £{item?.price} for <br /> {item?.discount}% off
                </p>
              ))}
            </div>

            <div className="py-2">
              <p className="text-lg font-medium text-black">Custom Offer</p>
              <Input
                placeholder="Enter your offer price"
                className="mt-2 bg-[#EEE] h-[50px]"
              />
              <div className="flex mt-2 items-center gap-x-0.5">
                <InfoIcon3 />
                <p className="text-[#E12728] line-clamp-1 text-base">
                  The lowest amount you can offer is £210.00 for (20% off).
                </p>
              </div>
            </div>
          </div>

          {/* ------------------------------- action buttons ------------------------------- */}
          <div className="mt-5 flex gap-2">
            <CommonButton handlerFunction={handleSendOffer} className="flex-1">
              Send Offer
            </CommonButton>
            <CommonButton className="flex-1 bg-transparent text-black border-b-3 border-r-3 border-black hover:bg-gray-100">
              Contact Seller
            </CommonButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
