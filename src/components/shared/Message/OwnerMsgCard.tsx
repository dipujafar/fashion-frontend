import moment from "moment";

const OwnerMsgCard = ({ message, createdAt }: { message: string, createdAt: Date }) => {
  return (
    <div className="max-w-max rounded-xl border bg-main-color text-white px-3 py-2 space-y-1">
      <p>{message}</p>
      <p className="text-[10px] text-left text-gray-200">{moment(createdAt).format("h:mm a")}</p>
    </div>
  );
};

export default OwnerMsgCard;