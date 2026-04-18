import { DBService, Expense } from "@/services/firebase/db";
import { useAuthStore } from "@/store/authstore";
import { useExpenseStore } from "@/store/useExpenseStore"

export const useExpense = () => {
    const {expenses, setExpenses} = useExpenseStore();
    const {user} = useAuthStore();

    const fetchExpenses = async () => {
        if (!user?.uid) return;
        try {
            const expenses = await DBService.getExpenses(user.uid);
            setExpenses(expenses as Expense[]);
        } catch (error: any) {
            throw new Error(error.message)
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
        deleteExpense
    }
}