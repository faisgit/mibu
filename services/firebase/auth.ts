import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, User } from "firebase/auth";
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
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    static async login(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            return user;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    static async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    static async resetPassword(email: string) {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    static onAuthStateChanged(callback: (user: User | null) => void) {
        return onAuthStateChanged(auth, callback);
    }
}
    