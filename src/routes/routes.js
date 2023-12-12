import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import {
  Shift,
  BranchService,
  CounterMain,
  BranchRoaster,
} from "../container/branch-admin";

import {
  CityAdmin,
  EmployeeMain,
  CityBranchShift,
  CityWiseCounter,
  CountryWiseCity,
} from "../container/city-admin";

import {
  CountryAdminMain,
  ServiceCountryScreen,
  CountryCityBranch,
  CountryCityWiseShift,
  CountryCityWiseCounter,
  CountryWiseEmployee,
  NationalHoliday,
} from "../container/country-admin";

import {
  GlobalService,
  CounteryMain,
  CityScreen,
  BranchScreen,
  EmployeeScreen,
  ShiftScreen,
  BranchServiceCounter,
} from "../container/global-admin";

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
      {/* Branch Admin Routes Start */}
      <Route path="/" element={<Login />} />
      <Route path="/Forgot" element={<ForgotPassword />} />
      <Route element={<BranchAdminRoutes />}>
        <Route exact path="/BranchAdmin/" element={<Dashboard />}>
          <Route path="" element={<Shift />} />
          <Route path="Shift" element={<Shift />} />
          <Route path="CounterMain" element={<CounterMain />} />
          <Route path="BranchService" element={<BranchService />} />
          <Route path="BranchRoaster" element={<BranchRoaster />} />
        </Route>
      </Route>
      {/* Branch Admin Routes End */}

      {/* City Admin Routes Start */}
      <Route element={<CityAdminRoutes />}>
        <Route exact path="/CityAdmin/" element={<Dashboard />}>
          <Route path="" element={<CityAdmin />} />
          <Route path="Branch" element={<CityAdmin />} />
          <Route path="Services" element={<CountryWiseCity />} />
          <Route path="Shifts" element={<CityBranchShift />} />
          <Route path="Counters" element={<CityWiseCounter />} />
          <Route path="Employee" element={<EmployeeMain />} />
        </Route>
      </Route>
      {/* City Admin Routes End */}

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
          <Route
            path="CountryCityWiseCounter"
            element={<CountryCityWiseCounter />}
          />
          <Route path="CountryWiseEmployee" element={<CountryWiseEmployee />} />
          <Route path="NationalHoliday" element={<NationalHoliday />} />
        </Route>
      </Route>
      {/* Country Admin Routes End */}

      {/* Global Admin Routes Start */}
      <Route element={<GlobalAdminRoutes />}>
        <Route exact path="/GlobalAdmin/" element={<Dashboard />}>
          <Route path="" element={<GlobalService />} />
          <Route path="GlobalService" element={<GlobalService />} />
          <Route path="CounteryMain" element={<CounteryMain />} />
          <Route path="CityScreen" element={<CityScreen />} />
          <Route path="BranchScreen" element={<BranchScreen />} />
          <Route path="EmployeeScreen" element={<EmployeeScreen />} />
          <Route path="ShiftScreen" element={<ShiftScreen />} />
          <Route
            path="BranchServiceCounter"
            element={<BranchServiceCounter />}
          />
        </Route>
      </Route>
      {/* Global Admin Routes Start */}
    </>
  )
);
