"use client";
import moment from "moment";
import CommonButton from "@/components/ui/common-button";
import { Textarea } from "@/components/ui/textarea";
import { blogsFeedbacks } from "@/lib/dummyData.tsx";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const FeedbackSection = () => {
  const [showReview, setShowReview] = useState(4);
  return (
    <div className="lg:space-y-8 space-x-5">
      {/*  =================== send feedback ============================= */}
      <div className="lg:space-y-5 space-y-3">
        <div className="flex items-center gap-2 text-primary-gray">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1L377.9 88L407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9l46.1 46.1l-134.3 134.2c-2.9 2.9-6.5 5-10.4 6.1L186.9 325l16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25c-28.1-28.1-73.7-28.1-101.8 0M88 64c-48.6 0-88 39.4-88 88v272c0 48.6 39.4 88 88 88h272c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24v112c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40h112c13.3 0 24-10.7 24-24s-10.7-24-24-24z"
            />
          </svg>
          <p>Write any feedback</p>
        </div>
        <Textarea className="bg-primary-gray/10 border-none min-h-[200px] focus-visible:ring-0 focus-visible:ring-offset-0"></Textarea>
        <div className="text-end">
          <CommonButton>submit</CommonButton>
        </div>
      </div>
      {/* =========================== All Feedbacks ========================*/}
      <div className="space-y-5">
        {blogsFeedbacks?.slice(0, showReview)?.map((feedback) => (
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                <Image
                  src={feedback?.image}
                  alt="user_image"
                  width={1200}
                  height={1200}
                  className="size-12 rounded-full"
                ></Image>
                <p className="font-semibold">{feedback?.name}</p>
              </div>
              <p className="text-primary-gray">
                {moment(feedback?.createAt).fromNow()}
              </p>
            </div>
            <p className="text-primary-gray">{feedback?.comment}</p>
          </div>
        ))}
      </div>
      {blogsFeedbacks?.length > 4 && (
        <div className="flex justify-end">
          {blogsFeedbacks?.length <= showReview ? (
            <Button
              onClick={() => setShowReview(4)}
              variant="outline"
              className=" border-black/50 rounded-full duration-500"
            >
              See Less
            </Button>
          ) : (
            <Button
              onClick={() => setShowReview((prev) => prev + 4)}
              variant="outline"
              className=" border-black/50 rounded-full duration-500"
            >
              See More
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackSection;
