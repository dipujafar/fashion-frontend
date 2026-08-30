import moment from "moment";
import React from "react";

const ReceiverMsgCard = ({ message, createdAt }: { message: string, createdAt: Date }) => {
  return (
    <div className="max-w-max rounded-xl border bg-[#DFE1E3] px-3 py-2 space-y-1">
      <p className="text-black">{message}</p>
      <p className="text-[10px] text-right text-gray-600">{moment(createdAt).format("h:mm a")}</p>
    </div>
  );
};

export default ReceiverMsgCard;