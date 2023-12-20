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
  CityBranchShiftNew,
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
import { AppoinmentReportBranch } from "../container/branch-reports";
export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/Forgot" element={<ForgotPassword />} />

      {/* Branch Admin Routes Start */}
      <Route element={<BranchAdminRoutes />}>
        <Route exact path="/BranchAdmin/" element={<Dashboard />}>
          <Route path="" element={<Shift />} />
          <Route path="Shift" element={<Shift />} />
          <Route path="Counter" element={<CounterMain />} />
          <Route path="Services" element={<BranchService />} />
          <Route path="BranchRoaster" element={<BranchRoaster />} />
          <Route path="AppoinmentReport" element={<AppoinmentReportBranch />} />
        </Route>
      </Route>
      {/* Branch Admin Routes End */}

      {/* City Admin Routes Start */}
      <Route element={<CityAdminRoutes />}>
        <Route exact path="/CityAdmin/" element={<Dashboard />}>
          <Route path="" element={<CityAdmin />} />
          <Route path="Branch" element={<CityAdmin />} />
          <Route path="Services" element={<CountryWiseCity />} />
          <Route path="Shifts" element={<CityBranchShiftNew />} />
          <Route path="Counters" element={<CityWiseCounter />} />
          <Route path="Employee" element={<EmployeeMain />} />
          <Route path="CityWiseBranchService" element={<CityBranchService />} />
        </Route>
      </Route>
      {/* City Admin Routes End */}

      {/* Country Admin Routes Start */}
      <Route element={<CountryAdminRoutes />}>
        <Route exact path="/CountryAdmin/" element={<Dashboard />}>
          <Route path="" element={<CountryAdminMain />} />
          <Route path="City" element={<CountryAdminMain />} />
          <Route path="Services" element={<ServiceCountryScreen />} />
          <Route path="Branch" element={<CountryCityBranch />} />
          <Route path="Shifts" element={<CountryCityWiseShift />} />
          <Route path="Counters" element={<CountryCityWiseCounter />} />
          <Route path="Employee" element={<CountryWiseEmployee />} />
          <Route path="Holidays" element={<NationalHoliday />} />
        </Route>
      </Route>
      {/* Country Admin Routes End */}

      {/* Global Admin Routes Start */}
      <Route element={<GlobalAdminRoutes />}>
        <Route exact path="/GlobalAdmin/" element={<Dashboard />}>
          <Route path="" element={<GlobalService />} />
          <Route path="Services" element={<GlobalService />} />
          <Route path="Country" element={<CounteryMain />} />
          <Route path="City" element={<CityScreen />} />
          <Route path="Branch" element={<BranchScreen />} />
          <Route path="Employee" element={<EmployeeScreen />} />
          <Route path="Shifts" element={<ShiftScreen />} />
          <Route path="Counters" element={<BranchServiceCounter />} />
        </Route>
      </Route>
      {/* Global Admin Routes Start */}
    </>
  )
);
