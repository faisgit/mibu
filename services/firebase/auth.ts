import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged as onAuthStateChangedFirebase, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, updateProfile } from "firebase/auth";
import { auth, db } from "./config";


export class AuthService {
    static async register(name: string, email: string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email,
                name,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            return user;
        } catch (error: any) {
            throw error;
        }
    }

    static async updateProfile(displayName: string) {
        try {
            const user = auth.currentUser;
            if (user) {
                await updateProfile(user, { displayName });
                return user;
            }
        } catch (error: any) {
            throw error;
        }
    }

    static async login(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            return user;
        } catch (error: any) {
            throw error;
        }
    }

    static async logout() {
        try {
            await signOut(auth);
        } catch (error: any) {
            throw error;
        }
    }

    static async resetPassword(email: string) {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error: any) {
            throw error;
        }
    }

    static onAuthStateChanged(callback: (user: User | null) => void) {
        return onAuthStateChangedFirebase(auth, callback);
    }
}
    