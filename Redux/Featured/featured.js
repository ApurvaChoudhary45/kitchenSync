import { createSlice } from '@reduxjs/toolkit'

export const featured = createSlice({
  name: 'categoryy',
  initialState: {
    feature : 'Chicken'
  },
  reducers: {
    
    categories: (state, action) => {
      state.feature = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { categories } = featured.actions

export const featureReducer =  featured.reducer