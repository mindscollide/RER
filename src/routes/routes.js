import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import NotFound from "../container/404-Not-Found/404_not_found";
import BranchAdmin from "../container/branch-admin/BranchAdmin";
import CounterMain from "../container/counter-main/CounterMain";
import BranchService from "../container/branch-service/BranchService";
import CityAdmin from "../container/city-admin/CityAdmin";
import CityBranchService from "../container/city-branch-service/CityBranchServices";
import Dashboard from "../container/dashboard/Dashboard";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route exact path="/" element={<Dashboard />}>
          <Route path="" element={<BranchAdmin />} />
          <Route path="CounterMain" element={<CounterMain />} />
          <Route path="BranchService" element={<BranchService />} />
          <Route path="CityAdmin" element={<CityAdmin />} />
          <Route path="CityBranchService" element={<CityBranchService />} />
        </Route>
      </Route>
    </>
  )
);
