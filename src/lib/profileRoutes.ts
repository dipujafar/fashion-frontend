export const profileRouts = [
    {
        id: 1,
        title: "Purchase",
        rout: "/profile/purchase",
        routs: [
            {
                id: 1,
                title: "Orders",
                rout: "/profile/purchase/orders"
            },
            {
                id: 2,
                title: "Returns",
                rout: "/profile/purchase/returns"
            }
        ],
    },
    {
        id: 4,
        title: "Selling",
        rout: "/profile/sell",
        routs: [
            {
                id: 1,
                title: "Products",
                rout: "/profile/sell/products"
            },
            {
                id: 2,
                title: "Orders",
                rout: "/profile/sell/orders"
            },
            {
                id: 3,
                title: "Returns",
                rout: "/profile/sell/returns"
            },
            {
                id: 4,
                title: "Bundle Discount",
                rout: "/profile/sell/bundle-discount"
            }
        ]
    },
    {
        id: 3,
        title: "Payment",
        rout: "/profile/payment",
        routs: [
            {
                id: 5,
                title: "Earnings",
                rout: "/profile/payment/earnings"
            }
        ]
    },
    {
        id: 2,
        title: "Settings",
        rout: "/profile",
        routs: [
            {
                id: 5,
                title: "Profile",
                rout: "/profile"
            },
            {
                id: 8,
                title: "Address",
                rout: "/profile/address"
            },
            {
                id: 6,
                title: "Vacation Mode",
                rout: "/profile/vacation-mode"
            },
            // {
            //     id: 1,
            //     title: "Notifications",
            //     rout: "/profile/notifications"
            // },
            {
                id: 7,
                title: "Change Password",
                rout: "/profile/change-password"
            }
        ]
    }
]