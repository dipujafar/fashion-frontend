import React from 'react'

function Alert({ show, message, type }: { show: boolean, message: string, type: 'success' | 'error' | 'warning' }) {

    if (!show) return null;

    switch (type) {
        case 'success':
            return (
                <div className="rounded-xs bg-green-700 px-3 py-2 shadow-md">
                    <p className="text-sm text-white">{message}</p>
                </div>
            )
        case 'error':
            return (
                <div className="rounded-xs bg-red-700 px-3 py-2 shadow-md">
                    <p className="text-sm text-white">{message}</p>
                </div>
            )
        case 'warning':
            return (
                <div className="rounded-xs bg-yellow-700 px-3 py-2 shadow-md">
                    <p className="text-sm text-white">{message}</p>
                </div>
            )
        default:
            return null;
    }

}

export default Alert