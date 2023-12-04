import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import NotFound from "../container/404-Not-Found/404_not_found";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Header from "../components/layout/header/Header";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route>
        {/* <Route path="/" element={<Header />} /> */}
        <Route path="/" element={<Sidebar />} />
      </Route>
    </>
  )
);
