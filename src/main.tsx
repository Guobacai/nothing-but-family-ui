import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Home from './pages/home/HomePage.tsx';
import FinancialHome from './pages/fin/FinancialHome.tsx';
import MonthFinance from './pages/fin/MonthFinance.tsx';
import CalendarMonth from './pages/fin/CalendarMonth.tsx';
import LoginPage from './pages/login/LoginPage.tsx';
import RegisterUser from './pages/signup/RegisterUser.tsx';
import FamilyMain from './pages/family/FamilyMain.tsx';
import UserMain from './pages/user/UserMain.tsx';

import { store } from './store.ts';
import { Provider } from 'react-redux';

import { registerAllModules } from 'handsontable/registry';

import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';

registerAllModules();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterUser />,
      },
      {
        path: '/users/:userId?',
        element: <UserMain />,
      },
      {
        path: '/family',
        element: <Home />,
        children: [
          {
            path: ':familyId',
            element: <FamilyMain />,
          },
          {
            path: 'finance',
            element: <FinancialHome />,
            children: [
              {
                path: ':year',
                element: <CalendarMonth />,
                children: [],
              },
              {
                path: ':year/:month',
                element: <MonthFinance />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
