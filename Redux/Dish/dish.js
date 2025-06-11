import { createSlice } from '@reduxjs/toolkit'

export const dish = createSlice({
  name: 'menu',
  initialState: {
    dish: []
  },
  reducers: {
    
    dishes: (state, action) => {
      state.dish = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { dishes } = dish.actions

export const dishReducer =  dish.reducer