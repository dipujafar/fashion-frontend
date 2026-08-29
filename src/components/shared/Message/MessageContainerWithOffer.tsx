import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Clock, MapPin, Paperclip, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import userImg from "@/assets/images/message/user2.png";
import user2Img from "@/assets/images/message/user1.png";
import user3Img from "@/assets/images/message/user1.png";
import OwnerMsgCard from "./OwnerMsgCard";
import ReceiverMsgCard from "./ReceiverMsgCard";
import UserCard from "./UserCard";
import { BellIcon } from "@/icons";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { ReportDialog } from "./ReportDialog";

const MessageContainerWithOffer = () => {
  return (
    <div className="pt-5">
      <div className="relative z-10 flex flex-col lg:flex-row border-t border-gray-200">
        {/* left */}
        

        {/* right */}
        <div className="flex flex-col lg:grow max-h-[calc(100vh-250px)] justify-between lg:border-r border-gray-200 lg:border-b">

          <div className="max-h-[60vh] overflow-y-auto px-4">
            <div>
              {/* Product Section */}
              <div className="flex gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/message_page_product.png"
                    alt="Brown fringe shawl bohemian style"
                    width={80}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className=" font-medium text-gray-900 mb-1 leading-tight">
                    Brown fringe shawl / bohemian - whimsical vibes.
                  </h3>
                  <p className="text-lg font-semibold text-black/60">$300.00</p>
                  <p className="text-sm text-red-500 mb-3">22 hrs left</p>

                  <div className="flex gap-2">
                    <Button className="bg-black hover:bg-gray-800 text-white text-xs px-4 py-2 h-8 rounded-none">
                      BUY NOW
                    </Button>
                    <Button
                      variant="outline"
                      className="text-xs px-4 py-2 h-8 border-t-0 border-l-0 border-b-3 border-r-3 border-black rounded-none"
                    >
                      MAKE AN OFFER
                    </Button>
                  </div>
                </div>
              </div>

              {/* User Review Section */}
              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <div className="flex-shrink-0">
                  <CustomAvatar
                    img={userImg}
                    name="Emily Johnson"
                    className="md:size-12 size-10"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Emily Johnson
                  </p>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                          }`}
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">(4.9/5)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>United States</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Last seen 21 hrs ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-h-full space-y-8 overflow-hidden pt-8">
              <div className="flex items-start gap-x-4">
                {/* <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              /> */}
                <div className="max-w-[50%] space-y-3 overflow-hidden">
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
                      "It’s too much cheap. Would you consider it $35.00."
                    }
                  />
                  <OwnerMsgCard message={"Can you make it?"} />
                </div>
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

export default MessageContainerWithOffer;
