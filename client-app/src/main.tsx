import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { StoreContext, store } from './app/stores/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes'
import 'react-calendar/dist/Calendar.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
)
