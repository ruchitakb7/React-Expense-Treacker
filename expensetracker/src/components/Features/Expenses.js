import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table, Container,Image } from "react-bootstrap";
import "./expense.css";
import { useSelector, useDispatch } from "react-redux";
import {fetchExpenses,addExpenseAsync,updateExpenseAsync,deleteExpenseAsync} from "../../store/ExpenseSlice";
import deletepic from "../../asset/deletepic.png"
import editIcon from "../../asset/editPic.jpg"


const ExpenseTracker = () => {

  const [newexpense, setExpense] = useState({
    amount: "",
    description: "",
    category: "",
  });

  const [expensid, setId] = useState("");

  const dispatch = useDispatch();
  const { expenses,totalexpenseamount, loading, error } = useSelector((state) => state.expenses);
  const userId = useSelector((state) => state.auth.userId); 
  const { isDarkMode, themeStyles } = useSelector((state) => state.theme);

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
      <h6 className="text-center mb-4 mt-4" style={{marginRight:'100px',fontWeight:'bold'}}>Add Expenses</h6>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <Row>
          <Col style={{textAlign:'center'}}>
            <Form.Group controlId="formAmount">
              <Form.Label>Enter Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={newexpense.amount}
                onChange={handleInputChange}
                style={themeStyles}
             
                required
              />
            </Form.Group>
          </Col>
          <Col style={{textAlign:'center'}}>
            <Form.Group controlId="formDescription">
            <Form.Label >Enter Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newexpense.description}
                onChange={handleInputChange}
                style={themeStyles}
                required
              />
            </Form.Group>
          </Col>
          <Col style={{textAlign:'center'}}>
            <Form.Group controlId="formCategory">
              <Form.Label>Select a category</Form.Label>
              <Form.Select
                name="category"
                value={newexpense.category}
                onChange={handleInputChange}
                style={themeStyles}
                required>
                 <option value="">Select</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
                <option value="Travel">Travel</option>
                <option value="HealthCare">HealthCare</option>
                <option value="shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col style={{display:'flex', alignItems:'center'}}>
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
        <h5 className="text-center" style={{marginRight:'100px',fontWeight:'bold'}}>Expense List</h5>
        {loading ? (
          <p className="text-center mt-3">Loading...</p>
        ) : error ? (
          <p className="text-center mt-3 text-danger">{error}</p>
        ) : expenses.length > 0 ? (
          <Table striped bordered hover responsive className="mt-3 text-center"
          variant={isDarkMode ? 'dark' : 'light'}>
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
                    <Image className="img" onClick={() => updateHandler(expense)} src={editIcon} alt="" style={{marginRight:'10px'}}></Image>
                    <Image className="img" onClick={() => handleDelete(expense.id)} src={deletepic} alt="" style={{marginLeft:'20px'}}></Image>
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
