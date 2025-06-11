import { configureStore } from '@reduxjs/toolkit'
import { dishReducer } from './Dish/dish'
import { featureReducer } from './Featured/featured'
import { searchReducer } from './Search/search'

export const store =  configureStore({
  reducer: {
    menu: dishReducer,
    categoryy : featureReducer,
    searching : searchReducer
  }
})