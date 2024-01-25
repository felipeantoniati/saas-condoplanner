
import { BsCheck2Square } from "react-icons/bs";

export const SuccessMessage = ({ message, }: { message?: string; }) => {
      if (!message) return null;

      return (
            <div className="bg-emerald-500/15 p-3 rounded-md flex flex-col gap-2 items-center justify-center gap-x-2 text-base text-emerald-500 text-center">
                  <BsCheck2Square size={24} />
                  <p>{message}</p>
            </div>
      );
};