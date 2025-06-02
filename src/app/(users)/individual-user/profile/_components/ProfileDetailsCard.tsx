interface TrackingCardProps {
  orderId: string;
  trackingCode: string;
  name: string;
  address: string;
  phoneNumber: string;
}

const ProfileDetailsCard: React.FC<TrackingCardProps> = ({
  orderId,
  trackingCode,
  name,
  address,
  phoneNumber,
}) => {
  return (
    <div className="w-full  mx-auto ">
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(77, 168, 218, 0.60) 0%, rgba(120, 192, 168, 0.60) 85.08%)",
        }}
        className=" rounded-lg shadow-lg overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {/* Order ID */}
          <div className="p-4 md:p-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">Order ID</h3>
            <p className="text-white font-semibold text-lg break-all">
              {orderId}
            </p>
          </div>

          {/* Tracking Code */}
          <div className="p-4 md:p-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Tracking Code
            </h3>
            <p className="text-white font-semibold text-lg break-all">
              {trackingCode}
            </p>
          </div>

          {/* Name */}
          <div className="p-4 md:p-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">Name</h3>
            <p className="text-white font-semibold text-lg">{name}</p>
          </div>

          {/* Address */}
          {/* Tracking Code Section */}
          <div className="p-4 md:p-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">Address</h3>
            <p className="text-white font-semibold text-lg">{address}</p>
          </div>

          {/* Phone Number */}
          <div className="p-4 md:p-6">
            <h3 className="text-sm font-medium text-white/80 mb-2">
              Phone Number
            </h3>
          {/* Name Section */}
            <p className="text-white font-semibold text-lg">{phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
          {/* Address Section */}
};

export default ProfileDetailsCard;
