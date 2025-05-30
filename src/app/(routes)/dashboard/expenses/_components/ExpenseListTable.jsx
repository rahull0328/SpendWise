import React from "react";
import moment from "moment";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        toast("Expense Deleted!");
        refreshData();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast("Error deleting expense.");
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>

      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>

      {expensesList?.map((expense) => (
        <div
          key={expense.id}
          className="grid grid-cols-4 bg-slate-50 p-2 border-b"
        >
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{moment(expense.createdAt).format("DD MMM YYYY")}</h2>
          <h2
            onClick={() => deleteExpense(expense)}
            className="text-red-500 cursor-pointer"
          >
            Delete
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
