import React, { useState, Fragment } from "react";

const Expense= () => {
  
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "",
  });

  
  const [expenses, setExpenses] = useState([]);
  const handleInputChange = (e) => {
    connectDataConnectEmulator.log('expense')
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.amount && expense.description && expense.category) {
      setExpenses((prevExpenses) => [...prevExpenses, expense]);
      setExpense({ amount: "", description: "", category: "" }); 
    }
  };

  return (
    <Fragment>
        <div style={{ width: "50%", margin: "50px auto", textAlign: "center" }}>
          <h2>Expense Tracker</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <label>
                Money Spent:
                <input
                  type="number"
                  name="amount"
                  value={expense.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  required
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={expense.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  required
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>
                Category:
                <select
                  name="category"
                  value={expense.category}
                  onChange={handleInputChange}
                  required
                  style={{ marginLeft: "10px", padding: "5px" }}
                >
                  <option value="">Select a category</option>
                  <option value="Food">Food</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Salary">Salary</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <button type="submit" style={{ padding: "10px 20px" }}>
              Add Expense
            </button>
          </form>

          {/* Expenses List */}
          <div style={{ marginTop: "30px" }}>
            <h3>Expenses List</h3>
            {expenses.length > 0 ? (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "10px",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Amount
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Description
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp, index) => (
                    <tr key={index}>
                      <td
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        {exp.amount}
                      </td>
                      <td
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        {exp.description}
                      </td>
                      <td
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        {exp.category}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No expenses added yet.</p>
            )}
          </div>
        </div>
      
    </Fragment>
  );
};

export default Expense;
