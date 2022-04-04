const { createSlice } = require('@reduxjs/toolkit')

const counterSlice = createSlice({
    name: 'couter',
    initialState: 0,
    reducers: {
        increase(state) {
            return state + 1
        },

        decrease(state) {
            return state - 1
        }
    }
})

export const { actions, reducer } = counterSlice
export const { increase, decrease } = actions //named export
export default reducer //default export 