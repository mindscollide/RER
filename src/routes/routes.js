import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";
import {
  BranchAdmin,
  BranchService,
  CityAdmin,
  CityBranchService,
  CityBranchShift,
  CityWiseCounter,
  CounterMain,
  Dashboard,
  EmployeeMain,
  Login,
  CountryCityWise,
  ForgotPassword,
  BranchServiceCounter,
} from "../container";
import PrivateRoutes from "./Private_routes";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/Forgot" element={<ForgotPassword />} />

      <Route element={<PrivateRoutes />}>
        <Route exact path="/REM/" element={<Dashboard />}>
          <Route path="" element={<BranchAdmin />} />
          <Route path="BranchAdmin" element={<BranchAdmin />} />
          <Route path="CounterMain" element={<CounterMain />} />
          <Route path="BranchService" element={<BranchService />} />
          <Route path="CityAdmin" element={<CityAdmin />} />
          <Route path="CityBranchService" element={<CityBranchService />} />
          <Route path="CityBranchShift" element={<CityBranchShift />} />
          <Route path="CityWiseCounter" element={<CityWiseCounter />} />
          <Route path="EmployeeMain" element={<EmployeeMain />} />
          <Route path="CountryCityWise" element={<CountryCityWise />} />
          <Route
            path="BranchServiceCounter"
            element={<BranchServiceCounter />}
          />
        </Route>
      </Route>
    </>
  )
);
