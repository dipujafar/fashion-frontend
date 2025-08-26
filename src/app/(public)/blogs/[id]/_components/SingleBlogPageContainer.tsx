"use client";
import Image from "next/image";
import blogImage from "@/assets/images/blog/blogImage.png";
import { MessageSquare } from "lucide-react";
import BlogImagePreview from "./BlogImagePreview";
import FeedbackSection from "./FeedbackSection";
import RelatedBlog from "./RelatedBlog";
import { ShareIcon2 } from "@/icons";

const handleShare = () => {
  navigator.share({
    title: "Blog Details",
    url: `/2`,
  });
};

const SingleBlogPageContainer = () => {
  return (
    <div className="xl:mt-12 mt-6 xl:space-y-8 space-y-5">
      {/* ================== image, date, feedback number ===================  */}
      <div className=" xl:space-y-4 space-y-2">
        <Image
          src={blogImage}
          alt="blog_image"
          className="mx-auto w-full max-h-[550px] object-cover origin-center"
        ></Image>
        {/* =================== date, feedback number and share option ==================== */}
        <div className="flex justify-between items-center gap-x-2">
          {/*==================== date and feedback ============================== */}
          <div className="flex text-sm text-primary-gray">
            {/* date */}
            <div className="flex justify-center items-center px-3 gap-x-1 border-r border-r-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                ></path>
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827q.39.03.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238q.35-.046.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71q-.034.255-.058.539h18.336q-.024-.284-.058-.54c-.135-1.005-.389-1.585-.812-2.008s-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008s-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812s-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p>Aug 12, 2024</p>
            </div>
            {/* feedback */}
            <div className="flex justify-center items-center px-3 gap-x-1">
              <div className="border rounded-full p-1 border-primary-gray">
                <MessageSquare size={18} color="#616161" />
              </div>
              <p>12 Feedback</p>
            </div>
          </div>

          {/* ================= share option ================*/}
          <button
            onClick={handleShare}
            className="bg-primary-light-pink text-primary-gray hover:bg-pink-50 px-3 py-1 cursor-pointer flex items-center rounded-full gap-x-1.5"
            style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.15)" }}
          >
            <ShareIcon2 className="size-6"></ShareIcon2>
            Share
          </button>
        </div>
      </div>

      {/* ==================================== description ========================== */}
      <div className="xl:space-y-8 space-y-4">
        {/* =============== post description ==================== */}
        <div className="xl:space-y-4 space-y-2.5">
          <h4 className="section-title  ">
            Sustainable Style: How Eco-Friendly Stores are Changing the Fashion
            Game
          </h4>
          <p className="text-primary-gray md:text-base text-sm">
            In a world where fast fashion is the norm, the concept of
            eco-friendly fashion is not just a trend—it’s a movement. At
            FASHI-ON, we believe that style should never come at the expense of
            the planet. That’s why our Eco-Friendly Stores are leading the way
            in redefining what it means to shop responsibly while still keeping
            your wardrobe fresh and stylish.
          </p>
        </div>
        <BlogImagePreview></BlogImagePreview>
        {/* ============================  section description ========================== */}
        <div className="xl:space-y-4 space-y-2.5">
          <h1 className="lg:text-3xl text-xl font-medium">
            Shop Smart, Shop Sustainable
          </h1>
          <p className="text-primary-gray md:text-base text-sm">
            Eco-friendly fashion refers to clothing that is designed, produced,
            and consumed in ways that minimize harm to the environment and
            promote sustainability. From using organic materials like organic
            cotton and hemp to reducing the carbon footprint through sustainable
            production practices, eco-friendly stores are transforming the
            fashion landscape.
          </p>
          <p className="text-primary-gray md:text-base text-sm">
            At FASHI-ON, Eco-Friendly Stores offer a curated collection of
            fashion that’s kind to the planet and stylish enough for your
            everyday life. These stores prioritize eco-consciousness without
            compromising on style, quality, or trends.
          </p>
        </div>
        {/* ============================== feedbacks ================================*/}
        <FeedbackSection></FeedbackSection>
      </div>

      {/* =============================  related blogs ============================= */}
      <RelatedBlog></RelatedBlog>
    </div>
  );
};

export default SingleBlogPageContainer;
