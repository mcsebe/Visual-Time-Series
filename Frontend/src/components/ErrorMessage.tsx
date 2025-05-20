import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface NavItemProps {
    message: string;
}

export const ErrorMessage = ({message}: NavItemProps) => {
    return (
        <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-600">
            <ExclamationTriangleIcon className="w-16 h-16 text-red-400 mb-4" />
            <h2 className="text-3xl font-semibold">{message}</h2>
            <p className="text-xl mt-2">An error occurred while fetching the information. Please try again later.</p>
        </div>
    );
}