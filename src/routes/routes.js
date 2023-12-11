import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import {
  Shift,
  BranchService,
  CounterMain,
  // BranchServiceCounter,
} from "../container/branch-admin";

import {
  CityAdmin,
  EmployeeMain,
  CityBranchShift,
  CityWiseCounter,
  CountryCityWise,
} from "../container/city-admin";

import {
  CityCountry,
  CountryAdminMain,
  ServiceCountryScreen,
  CountryCityBranch,
  CountryCityWiseShift,
} from "../container/country-admin";

import CountryMain from "../container/country-main/CountryMain";

import {
  CityBranchService,
  Dashboard,
  Login,
  ForgotPassword,
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
          <Route path="" element={<Shift />} />
          <Route path="Shift" element={<Shift />} />
          <Route path="CounterMain" element={<CounterMain />} />
          <Route path="BranchService" element={<BranchService />} />
        </Route>
      </Route>

      <Route element={<CityAdminRoutes />}>
        <Route exact path="/CityAdmin/" element={<Dashboard />}>
          <Route path="" element={<Shift />} />
          <Route path="Shift" element={<Shift />} />
          <Route path="CounterMain" element={<CounterMain />} />
          <Route path="BranchService" element={<BranchService />} />
          <Route path="CityAdmin" element={<CityAdmin />} />
          <Route path="CityBranchService" element={<CityBranchService />} />
          <Route path="CityBranchShift" element={<CityBranchShift />} />
          <Route path="CityWiseCounter" element={<CityWiseCounter />} />
          <Route path="EmployeeMain" element={<EmployeeMain />} />
          <Route path="CountryCityWise" element={<CountryCityWise />} />
          {/* <Route
            path="BranchServiceCounter"
            element={<BranchServiceCounter />}
          /> */}
        </Route>
      </Route>

      {/* Country Admin Routes Start */}
      <Route element={<CountryAdminRoutes />}>
        <Route exact path="/CountryAdmin/" element={<Dashboard />}>
          <Route path="" element={<CountryAdminMain />} />
          <Route path="CountryAdminMain" element={<CountryAdminMain />} />
          <Route
            path="ServiceCountryScreen"
            element={<ServiceCountryScreen />}
          />
          <Route path="CountryCityBranch" element={<CountryCityBranch />} />
          <Route
            path="CountryCityWiseShift"
            element={<CountryCityWiseShift />}
          />
          {/* <Route
            path="BranchServiceCounter"
            element={<BranchServiceCounter />}
          /> */}
        </Route>
      </Route>

      {/* Country Admin Routes End */}

      <Route element={<GlobalAdminRoutes />}>
        <Route exact path="/GlobalAdmin/" element={<Dashboard />}>
          <Route path="" element={<Shift />} />
          <Route path="Shift" element={<Shift />} />
          <Route path="CounterMain" element={<CounterMain />} />
          <Route path="BranchService" element={<BranchService />} />
          <Route path="CityAdmin" element={<CityAdmin />} />
          <Route path="CityBranchService" element={<CityBranchService />} />
          <Route path="CityBranchShift" element={<CityBranchShift />} />
          <Route path="CityWiseCounter" element={<CityWiseCounter />} />
          <Route path="EmployeeMain" element={<EmployeeMain />} />
          <Route path="CountryCityWise" element={<CountryCityWise />} />
          {/* <Route
            path="BranchServiceCounter"
            element={<BranchServiceCounter />}
          /> */}
        </Route>
      </Route>
    </>
  )
);
