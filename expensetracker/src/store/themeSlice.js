import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  isPremium: false,
  themeStyles: {
    backgroundColor: '#f8f8f8',
    color: '#000000',
    borderRight: '1px solid #ddd',
    borderLeft: '1px solid #ddd',
    placeholderColor: '#888888',
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;

      if (state.isDarkMode) {
        state.themeStyles = {
          backgroundColor: '#2a2a2a',
          color: '#ffffff',
          borderRight: '1px solid #444',
          borderLeft: '1px solid #444',
          placeholderColor: '#cccccc',
        };
      } else {
        state.themeStyles = {
          backgroundColor: '#f8f8f8',
          color: '#000000',
          borderRight: '1px solid #ddd',
          borderLeft: '1px solid #ddd',
          placeholderColor: '#888888',
        };
      }
    },
    premium: (state) => {
      //state.isPremium = !state.isPremium; 
      state.isPremium = !state.isPremium;
  if (!state.isPremium) {
    state.isDarkMode = false;
    state.themeStyles = {
      backgroundColor: '#f8f8f8',
      color: '#000000',
      borderRight: '1px solid #ddd',
      borderLeft: '1px solid #ddd',
      placeholderColor: '#888888',
    };
  }
    },
  },
});

export const { toggleTheme, premium } = themeSlice.actions;
export default themeSlice.reducer;
