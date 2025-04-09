import KidClothSizes from "./KidClothSizes";
import KidShoeSizes from "./KidShoeSizes";
import ManSuitsJacketsSizes from "./ManSuitsJacketsSizes";
import MenClothSizes from "./MenClothSizes";
import MenJeansPantSizes from "./MenJeansPantSizes";
import MenShoeSizes from "./MenShoeSizes";
import WomenClothSize from "./WomenClothSize";
import WomenJeansPantSize from "./WomenJeansPantSize";
import WomenShoeSize from "./WomenShoeSize";
import WomenSuitsJackets from "./WomenSuitsJackets";

const ProductSizes = () => {
  return (
    <div className="space-y-12">
      {/* women's product size */}
      <div className="space-y-4">
        <h1 className="section-title text-start">Women’s Size Guide</h1>
        {/*  -------- clothing -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">CLOTHING</h5>
          <div>
            <WomenClothSize></WomenClothSize>
          </div>
        </div>

        {/*  -------- JEANS & PANT -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">JEANS & PANT</h5>
          <div>
            <WomenJeansPantSize></WomenJeansPantSize>
          </div>
        </div>

        {/*  -------- Suits & Jackets -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">Suits & Jackets</h5>
          <div>
            <WomenSuitsJackets></WomenSuitsJackets>
          </div>
        </div>
        {/*  -------- Shoe -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">Shoe</h5>
          <div>
            <WomenShoeSize></WomenShoeSize>
          </div>
        </div>
      </div>

      {/* men's product size */}
      <div className="space-y-4">
        <h1 className="section-title text-start">Men's Size Guide</h1>
        {/*  -------- clothing -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">CLOTHING</h5>
          <div>
            <MenClothSizes></MenClothSizes>
          </div>
        </div>

        {/*  -------- JEANS & PANT -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">JEANS & PANT</h5>
          <div>
            <MenJeansPantSizes></MenJeansPantSizes>
          </div>
        </div>

        {/*  -------- Suits & Jackets -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">Suits & Jackets</h5>
          <div>
            <ManSuitsJacketsSizes></ManSuitsJacketsSizes>
          </div>
        </div>
        {/*  -------- Shoe -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">Shoe</h5>
          <div>
            <MenShoeSizes></MenShoeSizes>
          </div>
        </div>
      </div>

      {/* Kid's Size guide */}
      <div className="space-y-4">
        <h1 className="section-title text-start">Kid's Size Guide</h1>
        {/*  -------- clothing -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">CLOTHING</h5>
          <div>
            <KidClothSizes></KidClothSizes>
          </div>
        </div>

        {/*  -------- Shoe -------- */}
        <div className="space-y-2">
          <h5 className="text-xl text-primary-gray/90">Shoe</h5>
          <div>
            <KidShoeSizes></KidShoeSizes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSizes;
