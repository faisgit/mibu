import { AuthService } from "@/services/firebase/auth";
import { DBService } from "@/services/firebase/db";
import { useAuthStore } from "@/store/authStore";

export const useAuth  =() => {
    const {setUser, user} = useAuthStore();
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
        await AuthService.logout();
        setUser(null);
    }

    const updateName = async (name: string) => {
        if (!user?.uid) return;
        try {
            await AuthService.updateProfile(name);
            await DBService.updateUserProfile(user.uid, { name });
            // Since we're using onAuthStateChanged in _layout, 
            // the store should update automatically if Firebase Auth user object changes,
            // but we can also manually update it for immediate feedback.
            if (user) {
                setUser({ ...user, displayName: name } as any);
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    return {
        login,
        signUp,
        logout,
        updateName
    }
}