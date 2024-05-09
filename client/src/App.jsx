import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProcessorPage from "./pages/ProcessorPage";
import CreatePage from "./pages/CreatePage";
import {
  getManufacturers,
  getMicroprocessors,
  getReviews,
  getSockets,
  getTypes,
} from "./utils/api";
import EditPage from "./pages/EditPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      loader: async () => {
        const microprocessors = await getMicroprocessors();
        const types = await getTypes();
        const manufacturers = await getManufacturers();
        const sockets = await getSockets();
        const reviews = await getReviews();
        return { microprocessors, types, manufacturers, sockets, reviews };
      },
    },
    {
      path: "/processor/:id",
      element: <ProcessorPage />,
    },
    {
      path: "/create",
      element: <CreatePage />,
    },
    {
      path: "/edit/:id",
      element: <EditPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
