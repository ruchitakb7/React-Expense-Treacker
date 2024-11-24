import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table, Container } from "react-bootstrap";
import "./expense.css";
import { useSelector, useDispatch } from "react-redux";
import {fetchExpenses,addExpenseAsync,updateExpenseAsync,deleteExpenseAsync} from "../../store/ExpenseSlice";

const ExpenseTracker = () => {
  const [newexpense, setExpense] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const [expensid, setId] = useState("");

  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const userId = useSelector((state) => state.auth.userId); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    const processedValue = name === "amount" ? Number(value) : value;

    setExpense((prevExpense) => ({ ...prevExpense, [name]: processedValue }));
  };

  const updateHandler = (expense) => {
    setExpense({
      amount: Number(expense.amount),
      description: expense.description,
      category: expense.category,
    });
    setId(expense.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if (expensid) {
      dispatch(updateExpenseAsync(userId, expensid, newexpense));
    } else {
      dispatch(addExpenseAsync(userId, newexpense));
    }

    setExpense({ amount: "", description: "", category: "" });
    setId("");
  };

  const handleDelete = (id) => {
    dispatch(deleteExpenseAsync(userId, id));
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchExpenses(userId));
    }
  }, [userId, dispatch]);

  return (
    <Container className="form">
      <h6 className="text-center mb-4 mt-4">Add Expenses</h6>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <Row>
          <Col>
            <Form.Group controlId="formAmount">
              <Form.Control
                type="number"
                name="amount"
                value={newexpense.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Control
                type="text"
                name="description"
                value={newexpense.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCategory">
              <Form.Select
                name="category"
                value={newexpense.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            {expensid ? (
              <Button variant="primary" type="submit">
                Update Expense
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Add Expense
              </Button>
            )}
          </Col>
        </Row>
      </Form>

      <div className="mt-5">
        <h3 className="text-center">Expense List</h3>
        {loading ? (
          <p className="text-center mt-3">Loading...</p>
        ) : error ? (
          <p className="text-center mt-3 text-danger">{error}</p>
        ) : expenses.length > 0 ? (
          <Table striped bordered hover responsive className="mt-3 text-center">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.amount}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>
                    <Button
                      size="sm"
                      onClick={() => updateHandler(expense)}
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center mt-3">No expenses added yet.</p>
        )}
      </div>
    </Container>
  );
};

export default ExpenseTracker;