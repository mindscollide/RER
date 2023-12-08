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
import BranchAdminRoutes from "./Branch_Admin_routes";
import CityAdminRoutes from "./City_Admin_routes";
import CountryAdminRoutes from "./Country_Admin_routes";
import GlobalAdminRoutes from "./Global_Admin_routes";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/Forgot" element={<ForgotPassword />} />

      <Route element={<BranchAdminRoutes />}>
        <Route exact path="/BranchAdmin/" element={<Dashboard />}>
          <Route path="" element={<BranchAdmin />} />
          <Route path="Shift" element={<BranchAdmin />} />
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
      <Route element={<CityAdminRoutes />}>
        <Route exact path="/CityAdmin/" element={<Dashboard />}>
          <Route path="" element={<BranchAdmin />} />
          <Route path="Shift" element={<BranchAdmin />} />
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
      <Route element={<CountryAdminRoutes />}>
        <Route exact path="/CountryAdmin/" element={<Dashboard />}>
          <Route path="" element={<BranchAdmin />} />
          <Route path="Shift" element={<BranchAdmin />} />
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
      <Route element={<GlobalAdminRoutes />}>
        <Route exact path="/GlobalAdmin/" element={<Dashboard />}>
          <Route path="" element={<BranchAdmin />} />
          <Route path="Shift" element={<BranchAdmin />} />
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
