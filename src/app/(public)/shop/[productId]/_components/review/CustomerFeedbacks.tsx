"use client";
import { Rating } from "@/components/ui/rating";
import Image from "next/image";
import moment from "moment";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomAvatar from "@/components/shared/CustomeAvater";

const feedbacksData = [
  {
    _id: 1,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-12T15:45:30",
    rating: 4.6,
    productImage: ["/comment_product1.png", "/comment_product1.png"],
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
  {
    _id: 2,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-11T15:45:30",
    rating: 4.2,
    productImage: ["/comment_product1.png", "/comment_product1.png"],
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
  {
    _id: 3,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-10T15:45:30",
    rating: 4.9,
    productImage: ["/comment_product1.png", "/comment_product1.png"],
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
  {
    _id: 4,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-09T15:45:30",
    rating: 4.9,
    productImage: ["/comment_product1.png", "/comment_product1.png"],
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
  {
    _id: 5,
    userImage: "/user_image.png",
    name: "Amanda P.",
    date: "2025-05-08T15:45:30",
    rating: 4.9,
    productImage: ["/comment_product1.png", "/comment_product1.png"],
    review:
      "I recently purchased a breeding group of rare blueberry snails from Moonlight Aquatics, and the entire experience was exemplary. These live-bearing, filter-feeding snails are difficult to source, so I was particularly pleased to find a healthy and established colony available.Shipping was handled with the utmost professionalism. The snails were expertly packed and shipped via overnight delivery, arriving in perfect condition. Upon their arrival in mid-March, their temperature was a stable 65°F—ideal for their acclimation. Every detail of the transaction demonstrated Moonlight Aquatics' commitment to quality and the well-being of their livestock. I highly recommend Moonlight Aquatics to any aquarist seeking rare and well-cared-for specimens. Their dedication to both customer service and the responsible distribution of these unique invertebrates is commendable.",
  },
];

const CustomerFeedbacks = () => {
  const [showReview, setShowReview] = useState(2);
  return (
    <div>
      <h3 className="md:text-3xl text-xl font-medium">Customer Feedback</h3>
      {/* ===================== all feedbacks ===================== */}

      {feedbacksData?.slice(0, showReview).map((feedback) => (
        <div key={feedback?._id} className="md:mt-6 mt-4  space-y-3">
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
          <div className="flex gap-2">
            {feedback?.productImage?.map((image, index) => (
              <div key={index} className="flex flex-wrap items-center gap-x-2">
                <Image
                  src={image}
                  alt="product"
                  width={1200}
                  height={1200}
                  className="w-[140px] h-[94px] rounded object-cover origin-center"
                ></Image>
              </div>
            ))}
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
