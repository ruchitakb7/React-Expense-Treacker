import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./AuthSlice"
import expenseReducer from "./ExpenseSlice"
import dashboardReducer from "./DashboardSlice"
import themeReducer from "./themeSlice"

const store=configureStore({
    reducer:{
    auth:authReducer,
     expenses:expenseReducer,
     dashboard:dashboardReducer,
     theme:themeReducer,
     }
})

export default store