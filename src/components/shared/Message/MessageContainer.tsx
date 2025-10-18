import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import userImg from "@/assets/images/message/user2.png";
import user2Img from "@/assets/images/message/user1.png";
import user3Img from "@/assets/images/message/user1.png";
import OwnerMsgCard from "./OwnerMsgCard";
import ReceiverMsgCard from "./ReceiverMsgCard";
import UserCard from "./UserCard";
import { BellIcon } from "@/icons";
import { ReportDialog } from "./ReportDialog";

const MessageContainer = () => {
  return (
    <div className="lg:mx-auto ">
      <div className="relative z-10 flex flex-col  lg:flex-row">
        {/* left */}
        <div className="border-opacity-[40%] pr-2 lg:w-[30%] lg:border-r-2 lg:border-gray-300">
          <div className="border-t-black flex items-center justify-between gap-x-5 border-opacity-[40%]  text-black">
            <h4 className="text-2xl font-bold">Messages</h4>
            <p>
              <BellIcon />
            </p>
          </div>

          <div className="mx-auto mb-10 mt-4">
            <Input
              placeholder="Search messages"
              className="w-full rounded-xl border  bg-transparent  py-6 "
              type="text"
            />

            {/* users list - TODO: Use dynamic data */}
            <div className="scroll-hide mt-8 max-h-[calc(100vh-250px)] space-y-8 overflow-auto">
              {Array.from({ length: 8 }).map((_, idx) => (
                <UserCard
                  key={idx}
                  user={{
                    img: user3Img,
                    name: "Elmer Laverty",
                    latestMsg: "Emily: Yes, You can make an offer of ...",
                  }}
                  active={idx === 1 ? true : false}
                />
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between lg:flex-grow lg:px-8">
          <div className=" bg-black text-white flex items-center justify-between border-b border-opacity-[40%] pb-1 px-4 py-1 rounded">
            <div className="flex items-center gap-x-5">
              <div className="w-[22%]">
                <Image
                  src={userImg}
                  alt="user image"
                  className="aspect-square w-full rounded-full"
                />
              </div>

              <div className="lg:flex-grow">
                <h3 className="text-xl font-semibold">Elmer Laverty</h3>

                <div className="mt-1 flex items-center gap-x-2">
                  {/* Active/Online Indicator */}
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="">Online</p>
                </div>
              </div>
            </div>
            <div>
              <ReportDialog />
            </div>
          </div>

          <div className="max-h-full space-y-8 overflow-hidden pt-2">
            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3 overflow-hidden">
                <ReceiverMsgCard
                  message={"Thank you so uch for donate to our charity."}
                />
                <ReceiverMsgCard
                  message={"Would you consider an offer of $28?"}
                />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-x-4">
              <Image
                src={user2Img}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex max-w-[50%] flex-col items-end space-y-3">
                <OwnerMsgCard
                  message={
                    "Hello! Thanks for your interest. I appreciate your offer. I can meet you halfway—how about $30 for the dress?"
                  }
                />
                <OwnerMsgCard
                  message={
                    "Shipping fees will be calculated based on your location."
                  }
                />
              </div>
            </div>
            <div className="flex flex-row-reverse items-start gap-x-4">
              <Image
                src={user2Img}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex max-w-[50%] flex-col items-end space-y-3">
                <OwnerMsgCard
                  message={
                    "Sure! For Chicago, the shipping fee comes to about $5."
                  }
                />
                <OwnerMsgCard
                  message={
                    "Once you confirm your order, I’ll provide you with the exact details."
                  }
                />
              </div>
            </div>

            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3 overflow-hidden">
                <ReceiverMsgCard
                  message={
                    "Great, thanks for the clarification. Also, could you explain your return policy in case the dress doesn't fit or if there’s any defect?"
                  }
                />
                <ReceiverMsgCard
                  message={"Would you consider an offer of $28?"}
                />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-x-4">
              <Image
                src={user2Img}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex max-w-[50%] flex-col items-end space-y-3">
                <OwnerMsgCard
                  message={
                    "Of course. If the dress is in its original condition and you encounter any issues, you can return it within 7 days of delivery."
                  }
                />
                <OwnerMsgCard
                  message={
                    "Please note that the return shipping fee is typically covered by the buyer unless the item is defective."
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex w-full items-center gap-x-6">
            <Button
              variant="outline"
              type="button"
              className="w-fit h-fit flex flex-col items-center justify-center text-gray-600 hover:text-gray-800 border-none shadow-none bg-transparent p-0 "
            >
              <input type="file" id="fileInput" className="hidden" />
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center"
              >
                <Paperclip></Paperclip>
              </label>
            </Button>
            <div className="flex w-full items-stretch gap-x-4 relative">
              <Input
                placeholder="Type a message"
                type="text"
                className="w-full border-2 border-black/50 bg-transparent px-4 py-5 rounded-3xl"
              />
              <Send
                size={20}
                color="#000"
                className="cursor-pointer absolute right-4 top-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
