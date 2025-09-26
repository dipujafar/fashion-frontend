import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationBellIconWhite } from "@/icons";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  sender: string;
}

const dummyNotifications: Notification[] = [
  {
    id: "1",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
  {
    id: "2",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
  {
    id: "3",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
  {
    id: "4",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
  {
    id: "5",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
  {
    id: "6",
    message: "Dear Aris, Track your parcel from Fashion.",
    timestamp: "Fri, 12:30pm",
    sender: "Fashion Store",
  },
];

export default function NotificationContainer() {
  return (
    <div className="p-4 space-y-3 bg-black/5 rounded-lg">
      {dummyNotifications.map((notification) => (
        <Card
          key={notification.id}
          className="p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10 bg-gray-900 flex-shrink-0">
              <AvatarFallback className="bg-gray-900 text-white">
                <NotificationBellIconWhite className="text-white size-7" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 break-words">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                  {notification.timestamp}
                </span>
                </div>
                
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
