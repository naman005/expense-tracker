import { LuX } from "react-icons/lu";
export default function Modal ({ children, isOpen, onClose, title }) {
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full overflow-y-auto overflow-x-hidden bg-black/50">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal Content */}
                <div className="relative rounded-lg shadow-sm bg-white">
                {/* Modal Header */}

                <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
                    <h3 className="text-lg font-medium text-black">
                        {title}
                    </h3>

                    <button
                        type="button"
                        className="text-gray-400 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer"
                        onClick={onClose}
                    >
                        <LuX className="text-2xl" />
                    </button>
                </div>
                {/* Modal Body */}
                <div className="p-4 md:p-5 space-y-4">
                    {children}
                </div>
                </div>
            </div>
        </div>
    )
}