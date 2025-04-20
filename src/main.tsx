import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Spending from './pages/spending/SpendingPage.tsx';
import Home from './pages/home/HomePage.tsx';
import FinancialHome from './pages/fin/FinancialHome.tsx';
import MonthFinance from './pages/fin/MonthFinance.tsx'
import CalendarMonth from './pages/fin/CalendarMonth.tsx'

import { store } from './store.ts'
import { Provider } from 'react-redux'

import { registerAllModules } from 'handsontable/registry'

import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';

registerAllModules();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/spending",
        element: <Spending />,
      },
      {
        path: "/finance",
        element: <FinancialHome />,
        children: [
          {
            path: ":year",
            element: <CalendarMonth />,
          }
        ]
      },
      {
        path: "/finance/:year/:month",
        element: <MonthFinance />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
