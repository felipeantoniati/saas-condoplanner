import { useSession } from "next-auth/react";

export const useCurrentUserRole = () => {
      const session = useSession();
      const currentUserRole = session.data?.user?.role;
      return currentUserRole;
};