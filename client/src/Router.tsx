import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App";
import Game from './pages/Game';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/:gameType",
      element: <Game />
    }
  ])

  return <RouterProvider router = {router} />;
}

export default Router;