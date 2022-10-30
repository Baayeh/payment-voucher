import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'
import Root from './routes/Root'
import ErrorPage from './components/ErrorPage'
import Create from './features/Receipt/CreateReceipt'
import Template from './features/Voucher/Template'
import Login from './routes/Login'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'create',
        element: <Create />
      },
      {
        path: 'template',
        element: <Template />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
