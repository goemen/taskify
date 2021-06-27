import { useSelector } from "react-redux"
import { RootState } from "../store"

export const useUsersList = () => {
    return useSelector((state: RootState) => state.users);
} 

export const useUser = (id: string) => {
    const users = useUsersList();
    return users.find(u => u.id === id);
} 