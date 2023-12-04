import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import NotFound from "../container/404-Not-Found/404_not_found";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Header from "../components/layout/header/Header";
import Main from "../components/layout/main/Main";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route>
        {/* <Route path="/" element={<Header />} /> */}
        <Route exact path="/" element={<Main />} />
      </Route>
    </>
  )
);