import Container from "../Container";

const categories = [
  "New In",
  "Designers",
  "Women",
  "Men",
  "We Love",
  "Vintage",
  "Bags",
  "Watches & Jewellery",
  "Children",
  "Express Delivery",
  "Direct Shipping",
];

export default function NavbarCategories() {
  return (
    <div className="bg-white hidden md:block">
      <Container className="flex justify-center items-center gap-x-5 py-2  border-t border-gray-200 cursor-pointer">
        {categories?.map((category) => (
          <div className="relative group">
            <span className=" group-hover:text-primary-black text-primary-gray font-medium  lg:text-base ">
              {category}
            </span>
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-black transform scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100 origin-left"></span>
          </div>
        ))}
      </Container>
    </div>
  );
}
