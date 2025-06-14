import Image from "next/image";
const charitySupportData = [
  {
    _id: 1,
    image: "/charityImage1.png",
    title: "SAVE THE CHILDREN",
  },
  {
    _id: 2,
    image: "/charityImage2.png",
    title: "Plant More Trees",
  },
  {
    _id: 3,
    image: "/charityImage3.png",
    title: "Women for Women International",
  },
];

const CharitySupport = () => {
  return (
    <>
      <div>
        {/* ========================================= preview images and data ==================================== */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
          {charitySupportData?.map((charitySupport) => (
            <div key={charitySupport?._id} className="relative group">
              <Image
                src={charitySupport?.image}
                alt="charity_support_data"
                width={1200}
                height={1200}
                className="object-cover origin-center"
              ></Image>
              <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out h-[50px] group-hover:h-full group-hover:rounded-2xl md:group-hover:text-[25px] group-hover:text-xl origin-bottom overflow-hidden">
                <p>{charitySupport?.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CharitySupport;
