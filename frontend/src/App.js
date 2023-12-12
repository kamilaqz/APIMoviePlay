import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles'
import './App.css';
import Login from './pages/Login/Login';
import CreateUser from './pages/CreateUser/CreateUser'
import Library from './pages/Library/Library'
import Home from './pages/Home/Home'
import Description from './pages/Description/Description'
import Purchased from './pages/Purchased/Purchased'

function App() {
  const defaultRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/user/create",
      element: <CreateUser/>
    },
    {
      path: "/library",
      element: <Library/>
    },
    {
      path: "/home",
      element: <Home/>
    },
    {
      path: "/description",
      element: <Description/>
    },
    {
      path: "/purchased",
      element: <Purchased/>
    }
  ])

  const defaultTheme = createTheme({
    palette: {
        primary: {
          main: '#2D165A'
        },
        secondary: {
          main: '#000000'
        }
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        <RouterProvider router={defaultRouter}/>
      </div>
    </ThemeProvider>
  )
}

export default App;
