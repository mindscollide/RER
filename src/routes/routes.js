import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
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
