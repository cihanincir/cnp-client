import { useRootSelector } from "@/Store";
import { USER_SELECTOR } from "@/Store/Reducers/User";

export const useUser = () => useRootSelector(USER_SELECTOR);