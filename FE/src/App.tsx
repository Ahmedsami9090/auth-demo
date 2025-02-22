import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import NotFound from './components/NotFound/NotFound'
import { Provider } from 'react-redux'
import { reduxStore } from './redux/store'
import { ToastContainer } from 'react-toastify'
import Guard from './components/Guard/Guard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function App() {
  const queryClient = new QueryClient()
  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/profile', element: <Guard><Profile /></Guard> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
        { path: "*", element: <NotFound /> }
      ]
    },

  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={reduxStore}>
          <RouterProvider router={router} />
          <ToastContainer />
        </Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
