import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function CharitySelectModal() {
  return (
    <></>
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogContent className="w-[700px]">
    //     <div className="space-y-4">
    //       <div className="flex md:flex-row flex-col  gap-x-4">
    //         <div className="relative">
    //           <Image
    //             src={selectedProducts[0]?.image}
    //             alt="hero image"
    //             width={500}
    //             height={500}
    //             className="h-32 w-36 rounded-2xl "
    //           />
    //           <div className="absolute inset-0 flex-center bg-black/30 rounded-2xl">
    //             <div className="bg-white/40 text-white size-18 flex items-center justify-center rounded-full">
    //               <p className="text-2xl">+{selectedProducts?.length}</p>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="text-base">
    //           <h1 className="text-base">
    //            Brown fringe shawl / bohemian - whimsical vibes.
    //           </h1>
    //           <p className="text-[#8A8A8A]">Product Price: $300.00</p>
             
    //           <p className="text-[#E12728]">Offer Expire in 24 hrs</p>
    //         </div>
    //       </div>
    //       <div className="text-[#6B6B6B] font-medium text-lg">
    //         <h1>Submit your offer</h1>
    //         <hr className="my-2" />

    //         <div className={cn("flex justify-center items-center gap-x-5 flex-wrap")}>
    //           {offerData?.map((item) => (
    //             <p
    //               key={item?.id}
    //               onClick={() => setSelectedOffer(item?.id)}
    //               style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.05)" }}
    //               className={cn("text-center  w-fit py-2 px-5 rounded-xl border border-gray-200 cursor-pointer",  selectedOffer === item?.id && "border-primary-gray/40 bg-gray-100")}
    //             >
    //               £{item?.price} for <br /> {item?.discount}% off
    //             </p>
    //           ))}
    //         </div>

    //         <div className="py-2">
    //           <p className="text-lg font-medium text-black">Custom Offer</p>
    //           <Input
    //             placeholder="Enter your offer price"
    //             className="mt-2 bg-[#EEE] h-[50px]"
    //           />
    //           <div className="flex mt-2 items-center gap-x-0.5">
    //             <InfoIcon3 />
    //             <p className="text-[#E12728] line-clamp-1 text-base">
    //               The lowest amount you can offer is £210.00 for (20% off).
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* ------------------------------- action buttons ------------------------------- */}
    //       <div className="mt-5 flex gap-2">
    //         <CommonButton handlerFunction={handleSendOffer} className="flex-1">
    //           Send Offer
    //         </CommonButton>
    //         <CommonButton className="flex-1 bg-transparent text-black border-b-3 border-r-3 border-black hover:bg-gray-100">
    //           Contact Seller
    //         </CommonButton>
    //       </div>
    //     </div>
    //   </DialogContent>
    // </Dialog>
  )
}
