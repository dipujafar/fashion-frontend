import Link from "next/link";
import PreviewProduct from "./PreviewProduct";

const RecentlyViewed = () => {
  return (
    <div>
      <div className="flex justify-between items-center gap-x-4 mb-2 ">
        <h4 className="section-name uppercase">recently viewed</h4>
        <Link
          href={"/shop"}
          className="flex gap-x-2 items-center font-bold group "
        >
          <p>VIEW ALL</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            className="group-hover:translate-x-2 duration-500 "
          >
            <path
              d="M15.75 7.67578L0.75 7.67578"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.69922 1.65217L15.7492 7.67617L9.69922 13.7012"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <hr />
      <PreviewProduct></PreviewProduct>
    </div>
  );
};

export default RecentlyViewed;
