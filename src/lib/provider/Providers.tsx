"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TooltipProvider>
                    {children}
                </TooltipProvider>
            </PersistGate>
        </Provider>
    );
};

export default Providers;
