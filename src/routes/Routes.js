import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import NotFound from "../container/404-Not-Found/404_not_found";
export const router = createHashRouter(
  createRoutesFromElements(<Route path="/" element={<NotFound />} />)
);
