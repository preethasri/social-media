import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Pages/Authentication'

export default configureStore({
  
  reducer: {
    auth:authReducer,
    
  },
})
