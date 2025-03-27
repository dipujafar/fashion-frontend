import Image from "next/image";

const charitySupportData = [
  {
    _id: 1,
    image: "/charityImage1.png",
    title: "SAVE THE CHILDREN",
    present: 5,
  },
  {
    _id: 2,
    image: "/charityImage2.png",
    title: "Plant More Trees",
    present: 10,
  },
  {
    _id: 3,
    image: "/charityImage3.png",
    title: "Women for Women International",
    present: 15,
  },
];

const CharitySupport = () => {
  return (
    <div>
      {/* ======================================= section header ========================================== */}
      <div className="flex-between border-b lg:mb-6 mb-4">
        <div className="flex items-center gap-x-1.5">
          <h4 className="lg:text-2xl text-lg font-medium"> Charity Support</h4>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.0111 22.7403C11.3811 22.7403 10.7611 22.5303 10.2711 22.1103L8.69109 20.7603C8.53109 20.6203 8.13109 20.4803 7.92109 20.4803H6.17109C4.69109 20.4803 3.49109 19.2803 3.49109 17.8003V16.0903C3.49109 15.8803 3.35109 15.4803 3.22109 15.3303L1.86109 13.7303C1.04109 12.7603 1.04109 11.2403 1.86109 10.2603L3.22109 8.66031C3.35109 8.51031 3.49109 8.11031 3.49109 7.90031V6.20031C3.49109 4.72031 4.69109 3.52031 6.17109 3.52031H7.90109C8.11109 3.52031 8.50109 3.37031 8.67109 3.23031L10.2511 1.88031C11.2311 1.05031 12.7611 1.05031 13.7411 1.88031L15.3211 3.23031C15.4811 3.37031 15.8911 3.51031 16.1011 3.51031H17.8011C19.2811 3.51031 20.4811 4.71031 20.4811 6.19031V7.89031C20.4811 8.10031 20.6311 8.49031 20.7711 8.66031L22.1211 10.2403C22.9611 11.2303 22.9511 12.7603 22.1211 13.7303L20.7711 15.3103C20.6311 15.4803 20.4911 15.8703 20.4911 16.0803V17.7803C20.4911 19.2603 19.2911 20.4603 17.8111 20.4603H16.1111C15.9011 20.4603 15.5111 20.6103 15.3311 20.7503L13.7511 22.1003C13.2611 22.5303 12.6311 22.7403 12.0111 22.7403ZM6.17109 5.02031C5.52109 5.02031 4.99109 5.55031 4.99109 6.20031V7.90031C4.99109 8.47031 4.73109 9.19031 4.36109 9.63031L3.00109 11.2303C2.66109 11.6403 2.66109 12.3603 3.00109 12.7603L4.35109 14.3503C4.71109 14.7603 4.98109 15.5103 4.98109 16.0803V17.7903C4.98109 18.4403 5.51109 18.9703 6.16109 18.9703H7.90109C8.46109 18.9703 9.20109 19.2403 9.64109 19.6103L11.2311 20.9703C11.6411 21.3203 12.3611 21.3203 12.7711 20.9703L14.3511 19.6203C14.8011 19.2403 15.5311 18.9803 16.0911 18.9803H17.7911C18.4411 18.9803 18.9711 18.4503 18.9711 17.8003V16.1003C18.9711 15.5403 19.2411 14.8103 19.6111 14.3603L20.9711 12.7703C21.3211 12.3603 21.3211 11.6403 20.9711 11.2303L19.6211 9.65031C19.2411 9.20031 18.9811 8.47031 18.9811 7.91031V6.20031C18.9811 5.55031 18.4511 5.02031 17.8011 5.02031H16.1011C15.5311 5.02031 14.7911 4.75031 14.3511 4.38031L12.7611 3.02031C12.3511 2.67031 11.6411 2.67031 11.2211 3.02031L9.65109 4.38031C9.20109 4.75031 8.47109 5.02031 7.90109 5.02031H6.17109Z"
              fill="#F16365"
            />
            <path
              d="M12 16.8691C11.45 16.8691 11 16.4191 11 15.8691C11 15.3191 11.44 14.8691 12 14.8691C12.55 14.8691 13 15.3191 13 15.8691C13 16.4191 12.56 16.8691 12 16.8691Z"
              fill="#F16365"
            />
            <path
              d="M12 13.7209C11.59 13.7209 11.25 13.3809 11.25 12.9709V8.13086C11.25 7.72086 11.59 7.38086 12 7.38086C12.41 7.38086 12.75 7.72086 12.75 8.13086V12.9609C12.75 13.3809 12.42 13.7209 12 13.7209Z"
              fill="#F16365"
            />
          </svg>
        </div>
        <div className="flex gap-x-3 items-center group">
          <h4 className=" font-bold   ">ADD DONATE</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            className="group-hover:translate-x-2 duration-500"
          >
            <path
              d="M15.75 7.72461L0.75 7.72461"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.69922 1.701L15.7492 7.725L9.69922 13.75"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

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
            <div className="absolute top-0 right-0 bg-primary-red text-primary-white w-20 h-8 flex-center rounded">
              <p>{charitySupport?.present}%</p>
            </div>
            <div className="absolute flex-center bottom-0 w-full bg-[rgba(217,217,217,0.09)] text-white p-4 backdrop-blur-[7px] transition-all duration-1000 ease-in-out h-[50px] group-hover:h-full group-hover:rounded-2xl md:group-hover:text-3xl group-hover:text-xl origin-bottom overflow-hidden">
              <p>{charitySupport?.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharitySupport;
