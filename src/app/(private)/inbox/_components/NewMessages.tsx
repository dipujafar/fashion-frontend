import React from 'react'
import OwnerMsgCard from '@/components/shared/Message/OwnerMsgCard';
import ReceiverMsgCard from '@/components/shared/Message/ReceiverMsgCard';
import { useSocket } from '@/Context/SocketProvider';
import { RootState } from '@/redux/store';
import { IMessage } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

function NewMessages({ userName, scrollToBottom }: { userName: string; scrollToBottom: () => void }) {

    const { socket } = useSocket();
    const user = useSelector((state: RootState) => state?.auth?.user);

    const [newMessages, setNewMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setNewMessages([])

        if (!socket) return;

        //  receive my sent message & receive

        socket.on(`new-message::${userName}`, (res: IMessage) => {

            setNewMessages((prev) => [...prev, res]);
            socket?.emit(`seen`, { chatId: res?.chatId })

            // const { distanceFromBottom = 0 } = checkScroll();

            // if (distanceFromBottom > 80) {
            //     setNewMessageCount(prev => {
            //         return prev + 1
            //     });
            // }
        });

        socket.on(`new-message::${user?.id}`, (res: IMessage) => {

            setNewMessages((prev) => [...prev, res]);
            socket?.emit(`seen`, { chatId: res?.chatId })

            // const { distanceFromBottom = 0 } = checkScroll();

            // if (distanceFromBottom > 80) {
            //     setNewMessageCount(prev => {
            //         return prev + 1
            //     });
            // }
        });


        socket?.on(`io-error`, (res) => {
            console.log("---------------error res---------------", res)
            toast.error("An error occured, refresh the page")
            // setIsError(true);
        });

        return () => {
            if (socket) {
                // socket.off(`message`);
                socket.off(`seen`);
                socket.off(`new-message::${userName}`);
            }
        };

    }, [socket, userName, user])

    useEffect(() => {
        scrollToBottom();
    }, [newMessages]);

    return (
        <>
            {
                newMessages?.map((message, index) => {

                    const isMyMessage = message?.senderId?.toString() === user?.id?.toString();

                    // const currentDate = moment(message?.createdAt);
                    // const prevDate =
                    //     index > 0 ? moment(messages[index - 1]?.createdAt) : null;

                    // const showDateSeparator =
                    //     index === 0 || !currentDate.isSame(prevDate, "day");

                    return <div key={message?.id}>

                        {/* {showDateSeparator && (
                            <div className="flex justify-center items-center text-sm my-2">
                                <p className="text-gray-900 bg-gray-200 px-2 py-1 rounded-md text-xs font-normal">
                                    {formatChatDate(message?.createdAt)}
                                </p>
                            </div>
                        )} */}

                        {isMyMessage ?
                            // sent message
                            <div className="flex items-start gap-x-4" >
                                <Image
                                    src={message?.sender?.picture?.url || "/empty-user.png"}
                                    alt="user image"
                                    className="h-10 w-10 object-cover rounded-full"
                                    height={500}
                                    width={500}
                                />
                                <div className="max-w-[50%] space-y-3 overflow-hidden">

                                    <OwnerMsgCard message={message?.text || ""} createdAt={message?.createdAt} />
                                </div>
                            </div>

                            :

                            //received message
                            <div className="flex flex-row-reverse items-start gap-x-4">
                                <Image
                                    src={message?.sender?.picture?.url || "/empty-user.png"}
                                    alt="user image"
                                    className="h-10 w-10 object-cover rounded-full"
                                    height={500}
                                    width={500}
                                />
                                <div className="flex max-w-[50%] flex-col items-end space-y-3">
                                    <ReceiverMsgCard message={message?.text || ""} createdAt={message?.createdAt} />
                                </div>
                            </div>}
                    </div>
                })
            }
        </>
    )
}

export default NewMessages