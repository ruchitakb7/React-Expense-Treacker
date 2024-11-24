import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./AuthSlice"
import expenseReducer from "./ExpenseSlice"
import dashboardReducer from "./DashboardSlice"


const store=configureStore({
    reducer:{
     auth:authReducer,
     expenses:expenseReducer,
     dashboard:dashboardReducer,
    }
})

export default store