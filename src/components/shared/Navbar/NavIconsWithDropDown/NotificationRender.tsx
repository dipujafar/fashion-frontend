import { INotification } from "@/types";
import { NotificationBellIconWhite } from "@/icons";
import Image from "next/image";
import { defaultImg } from "@/utils/defaultImg";

export const NotificationRender = ({ notification }: { notification: INotification }) => {
    switch (notification?.entityType) {
        case "PRODUCT":
            switch (notification?.type) {
                case "PRODUCT_LIKE":
                    return {
                        avatar: <Image src={notification?.actor?.picture?.url || defaultImg?.empty_user} alt="user image" width={1200} height={1200} placeholder="blur" blurDataURL={defaultImg?.placeholderImg} className="w-10 h-10 rounded-full object-cover" />,
                        link: `/shop/${notification?.entityId}`,
                        postImg: notification?.entityImgs?.length > 0 && <Image src={notification?.entityImgs?.[0] || defaultImg?.product} alt="product image" width={1200} height={1200} placeholder="blur" blurDataURL={defaultImg?.placeholderImg} className="w-10 h-10 rounded object-cover" />
                    }
                case "PRICE_DROP":
                    return {
                        avatar: notification?.entityImgs?.length > 0 ? <Image src={notification?.entityImgs[0] || defaultImg?.empty_user} alt="product image" width={1200} height={1200} placeholder="blur" blurDataURL={defaultImg?.placeholderImg} className="w-10 h-10 rounded-full object-cover" /> : <NotificationBellIconWhite className="size-4" />,
                        link: `/shop/${notification?.entityId}`,
                        postImg: null
                    }
                case "SOLD_OUT":
                    return {
                        avatar: notification?.entityImgs?.length > 0 ? <div className="relative">
                            <Image src={notification?.entityImgs[0] || defaultImg?.empty_user} alt="product image" width={1200} height={1200} placeholder="blur" blurDataURL={defaultImg?.placeholderImg} className="w-10 h-10 rounded-full object-cover" />
                            <span className="text-xs bg-destructive text-white px-1 py-0.5 absolute top-1 left-0">Sold</span>
                        </div> : <NotificationBellIconWhite className="size-4" />,
                        link: `/shop/${notification?.entityId}`,
                        postImg: null
                    }
                default:
                    return {
                        avatar: <NotificationBellIconWhite className="size-4" />,
                        link: null,
                        postImg: null
                    }
            }

        case "OFFER":
            // OFFER_RECEIVED, OFFER_ACCEPTED, OFFER_REJECTED, OFFER_CANCELED all behave the same
            return {
                avatar: <Image src={notification?.actor?.picture?.url || defaultImg?.empty_user} alt="user image" width={1200} height={1200} placeholder="blur" blurDataURL={defaultImg?.placeholderImg} className="w-10 h-10 rounded-full object-cover" />,
                link: `/inbox/${notification?.entityId}`,
                postImg: null
            }

        case "ORDER":
            // ORDER_PLACED, ORDER_STATUS_CHANGED, ORDER_COMPLETED, ORDER_ITEM_CANCELED all behave the same
            return {
                avatar: <NotificationBellIconWhite className="size-4" />,
                link: null,
                postImg: notification?.entityImgs?.length > 0 && (
                    <div className="flex -space-x-2">
                        {notification.entityImgs.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img || defaultImg?.product}
                                alt="order item image"
                                width={1200}
                                height={1200}
                                placeholder="blur"
                                blurDataURL={defaultImg?.placeholderImg}
                                className="w-10 h-10 rounded object-cover border border-white"
                            />
                        ))}
                    </div>
                )
            }

        case "USER":
            switch (notification?.type) {
                case "FOLLOWED":
                    return {
                        avatar: <Image src={notification?.actor?.picture?.url || defaultImg?.empty_user} alt="user image" width={1200} height={1200} placeholder="blur" blurDataURL={defaultImg?.placeholderImg} className="w-10 h-10 rounded-full object-cover" />,
                        link: `/member/${notification?.entityId}`,
                        postImg: null
                    }
                default:
                    return {
                        avatar: <NotificationBellIconWhite className="size-4" />,
                        link: null,
                        postImg: null
                    }
            }

        case "DONATION":
            return {
                avatar: <NotificationBellIconWhite className="size-4" />,
                link: null,
                postImg: null
            }

        case "RETURN":
            return {
                avatar: <NotificationBellIconWhite className="size-4" />,
                link: null,
                postImg: null
            }

            case "BADGE":
            // badge earned notification
            return {
                avatar: <NotificationBellIconWhite className="size-4" />,
                link: `/member/${notification?.entityId}`,
                postImg: null
            }

        default:
            return {
                avatar: <NotificationBellIconWhite className="size-4" />,
                link: null,
                postImg: null
            }
    }
}