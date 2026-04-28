import { AuthService } from "@/services/firebase/auth";
import { useAuthStore } from "@/store/authStore";

export const useAuth  =() => {
    const {setUser} = useAuthStore();
    const login = async(email: string, password: string) => {
        try {
            const authUser = await AuthService.login(email, password);
            if (authUser) {
                setUser(authUser);
            }
             } catch (error: any) {
            throw new Error(error.message)
        }
    }
    const signUp = async (name: string, email: string, password: string) => {
        try {
            const authUser = await AuthService.register(name, email, password);
            if (authUser) {
                setUser(authUser);
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    const logout = async() => {
        setUser(null);
    }

    return {
        login,
        signUp,
        logout
    }
}