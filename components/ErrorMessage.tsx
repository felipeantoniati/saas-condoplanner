import { BsExclamationTriangle } from "react-icons/bs";

export const ErrorMessage = ({ message, }: { message?: string; }) => {
      if (!message) return null;

      return (
            <div className="bg-destructive/15 p-3 rounded-md flex flex-col items-center justify-center gap-y-2 text-base text-destructive text-center tracking-wider">
                  <BsExclamationTriangle size={24} />
                  <p>{message}</p>
            </div>
      );
};