import { create } from "zustand";

interface AppUser {
    uid: string;
    email: string | null;
    name: string | null;
    photoURL: string | null;
}

interface AuthState {
    user: AppUser | null;
    setUser: (user: any) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (firebaseUser) => {
        if (!firebaseUser) {
            set({ user: null });
            return;
        }
        set({
            user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
            },
        });
    },
    clearUser: () => set({ user: null }),
}));