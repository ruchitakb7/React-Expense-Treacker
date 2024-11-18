import React, { useState,useContext,useEffect } from "react";
import { Form,Row,Col, Button, Table, Container } from "react-bootstrap";
import './expense.css'
import { ExpenseContext } from "../../store/ExpenseProvider";

const ExpenseTracker = () => {

  const [newexpense, setExpense] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const [expensid,setId]=useState('')
 
  const { expenses, addExpense, fetchExpenses,deleteExpenses,updateExpense } = useContext(ExpenseContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const updateHandler=(expense)=>{
    setExpense({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      id:expense.id
    });
    setId(expense.id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(expensid)
    {
      console.log(newexpense)
      await updateExpense(expensid,newexpense);
    }
    else{
      await addExpense(newexpense)
    }
    
    setExpense({ amount: "", description: "", category: "" });
    setId('')
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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
            required>
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
          {expensid?(
             <Button variant="primary" type="submit" >Click to Update</Button>
          ):(
            <Button variant="primary" type="submit" >Add Expense</Button>
          )}
         
          </Col>
        </Row>
      </Form>

      {/* Expenses List */}
      <div className="mt-5">
        <h3 className="text-center">Expenses List</h3>
        {expenses.length > 0 ? (
          <Table striped bordered hover responsive className="mt-3 text-center">
            <thead >
              <tr>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.amount}</td>
                  <td>{exp.description}</td>
                  <td>{exp.category}</td>
                  <td>
                    <Button size="sm" onClick={() => updateHandler(exp)} style={{marginRight:'20px'}} >Edit</Button>
                    <Button variant='danger' size="sm" onClick={() => deleteExpenses(exp.id)}>Delete</Button>
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
