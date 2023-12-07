// our base url or machine api
const baseURL = "http://192.168.18.241";

// our service URLs
const auth_END_Point = ":9370/Auth";
const admin_END_Point = ":9371/Admin";

//our Final Api
const authURL = baseURL + auth_END_Point;
const adminURL = baseURL + admin_END_Point;

export { authURL, adminURL };
