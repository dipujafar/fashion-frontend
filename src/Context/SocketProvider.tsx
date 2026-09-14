"use client"
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { EnvConfig } from "@/config";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type TValueType = {
    socket: Socket;
    socketLoading: boolean;
};
const SocketContext = createContext({});

export const useSocket = () => {
    return useContext(SocketContext) as TValueType;
};

// const socketApi = "http://10.10.10.9:3500"
const socketApi = EnvConfig.socket_url

export const SocketProvider = ({ children }: { children: ReactNode }) => {

    const [socketLoading, setSocketLoading] = useState(false);
    const token = useSelector((state: RootState) => state.auth?.token);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (token && !socketRef.current) {
            setSocketLoading(true);

            const socketInstance = io(socketApi, {
                transports: ["websocket"],
                auth: { token },
            });

            socketInstance.on("connect", () => {
                setSocketLoading(false);
            });

            socketRef.current = socketInstance;
        }

        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, [token]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current, socketLoading }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
