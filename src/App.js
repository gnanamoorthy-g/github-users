import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Users from './components/users';
import UserDetails from './components/userDetails';
import './App.css';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Users></Users>
    },
    {
      path: '/user/:login',
      element: <UserDetails></UserDetails>
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
