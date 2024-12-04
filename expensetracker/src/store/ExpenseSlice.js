import { createSlice } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
// import { toggleTheme } from './themeSlice';

const initialState = {
  expenses: [],
  totalexpenseamount:0,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setExpenses(state, action) {
      state.expenses = action.payload;
      state.totalexpenseamount = state.expenses.reduce((total, expense) => total + Number(expense.amount), 0);
      
    },

    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.totalexpenseamount=state.totalexpenseamount+Number(action.payload.amount);
    },

    updateExpense(state, action) {
      const { id, updatedExpense } = action.payload;
      state.expenses = state.expenses.map((expense) => {
        if (expense.id === id) {
          state.totalexpenseamount += Number(updatedExpense.amount) - Number(expense.amount);
          return { ...expense, ...updatedExpense };
        }
        return expense;
      });
    },
    deleteExpense(state, action) {
     
        const deletedExpense = state.expenses.find((expense) => expense.id === action.payload);
        state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
        if (deletedExpense) {
          state.totalexpenseamount -= Number(deletedExpense.amount);
          
        }
    },
  },
});

export const {
  setLoading,
  setError,
  setExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = expenseSlice.actions;


export const fetchExpenses = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/expenses.json`);
    if (!response.ok) throw new Error('Error fetching expenses');

    const data = await response.json();
    if (data && typeof data === 'object') {
      const expensesArray = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      dispatch(setExpenses(expensesArray));
    } else {
      dispatch(setExpenses([]));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addExpenseAsync = (userId, expense) => async (dispatch,getState) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/expenses.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    if (!response.ok) throw new Error('Error adding expense');

    const result = await response.json();
    dispatch(addExpense({ id: result.name, ...expense }));

    const { totalexpenseamount } = getState().expenses;
    await updateTotalExpense(userId, totalexpenseamount);

  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateExpenseAsync = (userId, id, updatedExpense) => async (dispatch,getState) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/expenses/${id}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExpense),
    });
    if (!response.ok) throw new Error('Error updating expense');

    dispatch(updateExpense({ id, updatedExpense }));
    const { totalexpenseamount } = getState().expenses;
    await updateTotalExpense(userId, totalexpenseamount);

  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteExpenseAsync = (userId, id) => async (dispatch,getState) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/expenses/${id}.json`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting expense');

    dispatch(deleteExpense(id));
    const { totalexpenseamount } = getState().expenses;
    await updateTotalExpense(userId, totalexpenseamount);

  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};


const updateTotalExpense = async (userId, totalexpenseamount) => {
 // const totalExpense = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  await fetch(`https://expensetracker-ebe3e-default-rtdb.firebaseio.com/users/${userId}/totalexpenseamount.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(totalexpenseamount),
  });
};


export default expenseSlice.reducer;
