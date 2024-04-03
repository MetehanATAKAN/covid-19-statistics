import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CountryInfo from "../pages/CountryInfo";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
      path: ":country",
      element: <CountryInfo/>,
    }
  ]);

  export default router;