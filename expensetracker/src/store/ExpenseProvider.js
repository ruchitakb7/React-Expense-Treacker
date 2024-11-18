import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';

export const ExpenseContext = createContext();


const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const {userId,token}=useContext(AuthContext)

    const fetchExpenses = async () => {
        try {
          const response = await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/expenses.json`);
         
         if (!response.ok) {
            throw new Error('Error fetching expenses');
          }
          const data = await response.json();
       
          if(data && typeof data === 'object')
          {
            const expensesArray = Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value,
            }));
            setExpenses(expensesArray);
          }
          else
          setExpenses([])
        } catch (error) {
          console.error('Error fetching expenses:', error);
          setExpenses([])
        }
      };
      
  const addExpense = async (expense) => {
    try {
   
      const response = await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/expenses.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
  
      if (!response.ok) {
        throw new Error('Error adding expense');
      }
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };
  
  
  const updateExpense = async (id,updatedExpense) => {
   
    console.log(id)
    try {
      
      const response = await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/expenses/${id}`,{
        
          method: "PUT", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedExpense), 
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update expense");
      }

      const updatedData=await response.json()
      console.log(updatedData)
      
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === id ? { ...expense, ...updatedData } : expense
        ))
        console.log(expenses)

    } catch (error) {
      console.error("Error updating expense", error);
    }
  };


const deleteExpenses=async(id)=> {
  console.log(id)
  try{
      const response= await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/expenses/${id}.json`,{
      method: 'DELETE', 
          headers: {
              'Content-Type': 'application/json' 
          },})

          if (!response.ok) {
              console.log(response)
              throw new Error('FAILED TO DELETE DATA');
          }
          if(response.ok)
          {
            fetchExpenses()
             alert("DATA HAS BEEN DELETED SUCCESSFULLY")
             
          }
    }
    catch(error){
      alert(error)
    }
}

useEffect(()=>{
  if(userId)
    fetchExpenses()
},[userId,token])

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense,fetchExpenses,deleteExpenses ,updateExpense}}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseProvider

