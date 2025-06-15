import Image from "next/image";


const ResellProductImages = ({productImages}: {productImages: string[]}) => {
  return (
    <div>
      <div className="flex gap-2">
        <div className="w-1/2">
          <Image
            width={220}
            height={220}
            src={productImages[0] || "/placeholder.svg"}
            alt={"Product Image"}
            className="w-full h-auto max-h-[400px] rounded-lg object-cover"
          />
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-2  max-h-[400px]">
          {productImages?.slice(0, 4).map((image, index) => (
            <Image
              width={110}
              height={110}
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Product Image`}
              className="w-full h-auto rounded-md object-cover  max-h-[196px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResellProductImages;
