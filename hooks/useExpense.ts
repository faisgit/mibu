import { DBService, Expense } from "@/services/firebase/db";
import { useAuthStore } from "@/store/authStore";
import { useExpenseStore } from "@/store/useExpenseStore"
import { useState } from "react";

export const useExpense = () => {
    const {expenses, setExpenses} = useExpenseStore();
    const {user} = useAuthStore();
    const [loading, setLoading] = useState(false);

    const fetchExpenses = async () => {
        if (!user?.uid) return;
        try {
            setLoading(true);
            const expenses = await DBService.getExpenses(user.uid);
            setExpenses(expenses as Expense[]);
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false);
        }
    }
    const addExpense = async (data: Expense) => {
        if (!user?.uid) return;
        try {
            await DBService.addExpense(user.uid, data);
            await fetchExpenses();
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    const updateExpense = async (id: string, data: Expense) => {
        if (!user?.uid) return;
        try {
            await DBService.updateExpense(user.uid, id, data);
            await fetchExpenses();
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    const deleteExpense = async (id: string) => {
        if (!user?.uid) return;
        try {
            await DBService.deleteExpense(user.uid, id);
            await fetchExpenses();
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    return {
        expenses,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        loading
    }
}