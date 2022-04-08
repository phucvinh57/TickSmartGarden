import { configureStore } from '@reduxjs/toolkit'
import gatewayReducer from './slices/garden'

const store = configureStore({
    reducer: {
        garden: gatewayReducer
    }
})
export default store