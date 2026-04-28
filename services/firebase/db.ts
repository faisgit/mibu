import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./config";

export interface Expense {
    id?: string,
    amount: number,
    category: string,
    date: Date,
    note?: string,
}

const expenseCollection = (userID: string) => {
    return collection(db, "users", userID, "expenses");
}

export class DBService {
    static async addExpense(userID: string, data: Expense) {
        try {
            await addDoc(expenseCollection(userID), {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }
    static async getExpenses(userID: string) {
        try {
            const q = query(
                expenseCollection(userID),
                orderBy("date", "desc")
            )
            const snapshot = await getDocs(q);
            const expenses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return expenses;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static async updateExpense(userID: string, expenseID: string, data: Expense) {
        try {
            await updateDoc(doc(db, "users", userID, "expenses", expenseID), {
                ...data,
                updatedAt: serverTimestamp(),
            });
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static async deleteExpense(userID: string, expenseID: string) {
        try {
            await deleteDoc(doc(db, "users", userID, "expenses", expenseID));
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
