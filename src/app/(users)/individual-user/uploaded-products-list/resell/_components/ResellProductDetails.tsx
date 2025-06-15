type TProps = {
  id: string;
  item_number: string;
  category: string;
  tags: string[];
  condition: string;
  fabric: string;
  brand: string;
  available_size: string[];
  color: string;
  care_instruction: string[];
  images: string[];
};

const ResellProductDetails = ({
  productDetails,
}: {
  productDetails: TProps;
}) => {
  return (
    <div className="p-2 border rounded-lg h-fit">
      <h4 className="font-medium">Product Details</h4>
      <div className="text-sm flex gap-x-4 mt-2">
        <p className="text-[#8A8A8A] w-[100px] ">Item Number:</p>
        <p  className="lg:max-w-[150px] xl:max-w-[200px]">{productDetails.item_number}</p>
      </div>
      <hr className="mt-1" />
      <div className="text-sm flex gap-x-4 mt-2">
        <p className="text-[#8A8A8A] w-[100px] ">Category:</p>
        <p  className="lg:max-w-[150px] xl:max-w-[200px]">{productDetails.category}</p>
      </div>
      <hr  className="mt-1"/>
      <div className="text-sm flex gap-x-4 mt-2">
        <p className="text-[#8A8A8A] w-[100px] ">Tags:</p>
        <p  className="lg:max-w-[150px] xl:max-w-[200px]">{productDetails.tags?.join(", ")}</p>
      </div>
      <hr  className="mt-1"/>
      <div className="text-sm flex gap-x-4 mt-2">
        <p className="text-[#8A8A8A] w-[100px] ">Condition:</p>
        <p  className="lg:max-w-[150px] xl:max-w-[200px]">{productDetails.condition}</p>
      </div>
      <hr className="mt-1" />
      <div className="text-sm flex gap-x-4 mt-2">
        <p className="text-[#8A8A8A] w-[100px] ">Fabric:</p>
        <p className="lg:max-w-[150px] xl:max-w-[200px]">{productDetails.fabric}</p>
      </div>
      <hr className="mt-1" />
      <div className="text-sm flex gap-x-4 mt-2">
        <p className="text-[#8A8A8A] w-[100px] ">Brand:</p>
        <p className="lg:max-w-[150px] xl:max-w-[200px]">{productDetails.brand}</p>
      </div>
      <hr className="mt-1" />
      <div className="text-sm flex gap-x-4 mt-2">
        <p className="text-[#8A8A8A] w-[100px] lg:max-w-[150px] xl:max-w-[200px]">Available Size:</p>
        <p>{productDetails.available_size?.join(", ")}</p>
      </div>
      <hr className="mt-1" />
      <div className="text-sm flex gap-x-4 mt-2">
        <p className="text-[#8A8A8A] w-[100px] ">Color</p>
        <p style={{backgroundColor: productDetails?.color}} className="w-6 h-6 rounded-full border border-[#5a5454] p-0.5 lg:max-w-[150px] xl:max-w-[200px]"></p>
      </div>
      <hr className="mt-1"/>
      <div className="text-sm flex gap-x-4 mt-2">
        <p className="text-[#8A8A8A] w-[100px] ">Care Instruction:</p>
        <p className="lg:max-w-[150px] xl:max-w-[200px]">{productDetails.care_instruction?.join(", ")}</p>
      </div>
      <hr className="mt-1"/>
    </div>
  );
};

export default ResellProductDetails;
