import { create } from "zustand";
import { Expense } from "@/services/firebase/db";

interface ExpenseState {
    expenses: Expense[];
    setExpenses: (expenses: Expense[]) => void;
    clearExpenses: () => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
    expenses: [],
    setExpenses: (expenses) => set({ expenses }),
    clearExpenses: () => set({ expenses: [] }),
}));