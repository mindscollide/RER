import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import NotFound from "../container/404-Not-Found/404_not_found";
import Header from "../components/layout/header/Header";
export const router = createHashRouter(
  createRoutesFromElements(<Route path="/" element={<Header />} />)
);
