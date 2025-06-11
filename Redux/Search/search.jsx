import { createSlice } from '@reduxjs/toolkit'

export const search = createSlice({
  name: 'searching',
  initialState: {
    query: ''
  },
  reducers: {
    
    searched: (state, action) => {
      state.query = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { searched } = search.actions

export const searchReducer = search.reducer