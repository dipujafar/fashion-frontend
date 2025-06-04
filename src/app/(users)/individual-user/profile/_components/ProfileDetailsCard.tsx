import { DownArrowIcon, UpArrowIcon } from "@/icons";

interface TrackingCardProps {
  orderId: string;
  trackingCode: string;
  name: string;
  address: string;
}

const ProfileDetailsCard: React.FC<TrackingCardProps> = ({
  orderId,
  trackingCode,
  name,
  address,
}) => {
  return (
    <div className="w-full  mx-auto ">
      <div className=" rounded-lg shadow-lg overflow-hidden bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {/* Order ID */}
          <div className="p-4 md:p-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Total Sales
            </h3>
            <div className="flex gap-x-2">
              <p className="text-white font-semibold text-lg break-all">
                {orderId}
              </p>
              <UpArrowIcon />
            </div>
          </div>

          {/* Tracking Code */}
          <div className="p-4 md:p-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Total Earnings
            </h3>
            <div className="flex gap-x-2">
              <p className="text-white font-semibold text-lg break-all">
                {trackingCode}
              </p>
              <DownArrowIcon />
            </div>
          </div>

          {/* Name */}
          <div className="p-4 md:p-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Total Followers
            </h3>
            <div className="flex gap-x-2">
              <p className="text-white font-semibold text-lg">{name}</p>
              <DownArrowIcon />
            </div>
          </div>

          {/* Address */}
          {/* Tracking Code Section */}
          <div className="p-4 md:p-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Total Funds Raised
            </h3>
            <div className="flex gap-x-2">
              <p className="text-white font-semibold text-lg">{address}</p>
              <UpArrowIcon/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  {
    /* Address Section */
  }
};

export default ProfileDetailsCard;
