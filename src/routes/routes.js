import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import NotFound from "../container/404-Not-Found/404_not_found";
import BranchAdmin from "../container/branch-admin/BranchAdmin";
import Dashboard from "../container/dashboard/Dashboard";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route exact path="/" element={<Dashboard />}>
          <Route path="" element={<BranchAdmin />} />
        </Route>
      </Route>
    </>
  )
);
