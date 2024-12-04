// import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/layout/Home';
import authReducer from '../src/store/authReducer';

const store = configureStore({
  reducer: { auth: authReducer },
});

describe('Home Component', () => {
  test('renders the header title', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    // Check for the header title
    const titleElement = screen.getByText('Track Your Expenses Easily');
    expect(titleElement).toBeInTheDocument();
  });
});
