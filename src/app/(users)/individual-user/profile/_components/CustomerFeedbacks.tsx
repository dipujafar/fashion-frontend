"use client";
import { Rating } from "@/components/ui/rating";
import moment from "moment";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomAvatar from "@/components/shared/CustomAvatar";
import { features } from "process";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { StarIcon } from "@/icons";
import { Checkbox } from "@/components/ui/checkbox";

const feedbacksData = [
  {
    _id: 1,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-12T15:45:30",
    rating: 4.6,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
    features: [
      {
        title: "Rate Feedback",
        value: "Good",
      },
      {
        title: "Seller Communication",
        rating: 4.9,
      },
      {
        title: "Product as Described",
        rating: 4.9,
      },
      {
        title: "Postage",
        rating: 4.9,
      },
    ],
  },
  {
    _id: 2,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-11T15:45:30",
    rating: 4.2,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
    features: [
      {
        title: "Rate Feedback",
        value: "Good",
      },
      {
        title: "Seller Communication",
        rating: 4.9,
      },
      {
        title: "Product as Described",
        rating: 4.9,
      },
      {
        title: "Postage",
        rating: 4.9,
      },
    ],
  },
  {
    _id: 3,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-10T15:45:30",
    rating: 4.9,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
    features: [
      {
        title: "Rate Feedback",
        value: "Good",
      },
      {
        title: "Seller Communication",
        rating: 4.9,
      },
      {
        title: "Product as Described",
        rating: 4.9,
      },
      {
        title: "Postage",
        rating: 4.9,
      },
    ],
  },
  {
    _id: 4,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-09T15:45:30",
    rating: 4.9,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
    features: [
      {
        title: "Rate Feedback",
        value: "Good",
      },
      {
        title: "Seller Communication",
        rating: 4.9,
      },
      {
        title: "Product as Described",
        rating: 4.9,
      },
      {
        title: "Postage",
        rating: 4.9,
      },
    ],
  },
  {
    _id: 5,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-08T15:45:30",
    rating: 4.9,
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
    features: [
      {
        title: "Rate Feedback",
        value: "Good",
      },
      {
        title: "Seller Communication",
        rating: 4.9,
      },
      {
        title: "Product as Described",
        rating: 4.9,
      },
      {
        title: "Postage",
        rating: 4.9,
      },
    ],
  },
];

const CustomerFeedbacks = () => {
  const [showReview, setShowReview] = useState(2);
  return (
    <div>
      <div className="p-5 border rounded-lg flex gap-x-5 mb-10">
        <div className="bg-black rounded-full p-2 w-fit h-fit">
          <StarIcon className="w-10 h-10" />
        </div>
        <div>
          <h4 className="text-black/60 text-lg">Total Rating & Review</h4>
          <p>
            <span className="text-xl font-semibold">4.8</span>/(12 Reviews)
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="bg-black/5 text-black hover:text-white">Request to Delete</Button>
      </div>
      {feedbacksData?.slice(0, showReview).map((feedback) => (
        <div key={feedback?._id} className="md:mt-6 mt-4 flex gap-x-3 ">
          <Checkbox id={`delete-${feedback?._id}`}  className="border-black/70 cursor-pointer"/>
          <div className="space-y-3">
            <div className="flex justify-between items-center gap-x-2 flex-wrap gap-y-2">
              <div className="flex items-center gap-x-2 ">
                <CustomAvatar
                  img={feedback?.userImage}
                  name={feedback?.name}
                  className="size-12"
                />

                <div>
                  <p>{feedback?.name}</p>
                  <div className="flex items-center gap-x-1 ">
                    <Rating rating={feedback?.rating}></Rating>
                    <p>({feedback?.rating}/5)</p>
                  </div>
                </div>
              </div>

              {/* date */}
              <p className="text-primary-gray">
                {moment(feedback?.date).fromNow()}
              </p>
            </div>
            <p className="text-primary-gray">{feedback?.review}</p>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {feedback?.features?.map((feature) => (
                <div
                  style={{ boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.11)" }}
                  className="bg-[#FFFBFB] p-2 rounded-lg flex items-center  gap-3 font-medium"
                >
                  <h4 className="text-[#7F7F7F] lg:text-lg ">
                    {feature?.title}
                  </h4>
                  <p
                    className={cn(
                      !feature?.value && "hidden lg:text-base text-sm"
                    )}
                  >
                    ({feature?.value})
                  </p>
                  <p
                    className={cn(
                      "flex items-center gap-x-1",
                      !feature?.rating && "hidden lg:text-base text-sm"
                    )}
                  >
                    <Star color="#FFD700" fill="#FFD700" size={16} />(
                    {feature?.rating}/5)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {feedbacksData?.length > 2 && (
        <div className="flex justify-end mt-5">
          {feedbacksData?.length <= showReview ? (
            <Button
              onClick={() => setShowReview(2)}
              variant="outline"
              className=" border-primary-blue rounded-full text-black duration-500"
            >
              See Less
            </Button>
          ) : (
            <Button
              onClick={() => setShowReview((prev) => prev + 2)}
              variant="outline"
              className=" border-primary-blue rounded-full text-black duration-500"
            >
              See More
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerFeedbacks;
