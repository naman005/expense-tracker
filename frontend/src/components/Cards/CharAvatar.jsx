import { getInitials } from "../../utlis/helper";

export default function CharAvatar ({ fullName, width, height, style }) {
    return (
        <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-gray-500 font-medium bg-gray-100`}>
            {getInitials(fullName || "")}
        </div>
    )
}