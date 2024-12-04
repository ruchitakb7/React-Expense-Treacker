import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../components/layout/header';
import authReducer from '../store/AuthSlice'

const store=configureStore({
    reducer: { 
        auth: authReducer },
})


    describe('Header Component', () => {
        test('renders the header title', () => {
          render(
            <Provider store={store}>
                    <Header />
            </Provider>        
          );
      

    const headingElement = screen.getByText('Expense Tracker');
    expect(headingElement).toBeInTheDocument();
  });
});
