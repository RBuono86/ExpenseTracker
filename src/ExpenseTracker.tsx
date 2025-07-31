import React, { useState } from "react";

interface Expense {
  id: number;
  description: string;
  amount: number;
}

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (!description.trim() || !amount || isNaN(Number(amount))) return;

    const newExpense: Expense = {
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
    };
    setExpenses((prev) => [...prev, newExpense]);
    setDescription("");
    setAmount("");
  };

  const deleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 16 }}>
      <h2>Expense Tracker</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "60%", marginRight: 8, padding: 6 }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "30%", marginRight: 8, padding: 6 }}
      />
      <button onClick={addExpense} style={{ padding: "6px 12px" }}>
        Add
      </button>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {expenses.map(({ id, description, amount }) => (
          <li
            key={id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              background: "#eee",
              padding: 8,
              borderRadius: 4,
            }}
          >
            <span>{description}</span>
            <span>
              ${amount.toFixed(2)}{" "}
              <button
                onClick={() => deleteExpense(id)}
                style={{
                  marginLeft: 12,
                  color: "red",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={`Delete expense ${description}`}
              >
                &times;
              </button>
            </span>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default ExpenseTracker;
