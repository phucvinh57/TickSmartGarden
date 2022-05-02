import { configureStore } from '@reduxjs/toolkit'
import gatewayReducer from './slices/garden'
import screenReducer from './slices/screen'

const store = configureStore({
    reducer: {
        garden: gatewayReducer,
        screen: screenReducer
    }
})
export default store