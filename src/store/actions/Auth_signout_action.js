import * as actions from "../action_types";
import { BroadcastChannel } from "broadcast-channel";

const logoutChannel = new BroadcastChannel("logout");

const signOut = (navigate, message) => {
  logoutChannel.postMessage("Logout");
  window.location.href = window.location.origin + "/";
  let i18nextLng = localStorage.getItem("i18nextLng");
  localStorage.clear();
  console.log("i18nextLng", i18nextLng);
  localStorage.setItem("i18nextLng", i18nextLng);
};

const logoutAllTabs = () => {
  logoutChannel.onmessage = () => {
    signOut();
    logoutChannel.close();
  };
};

export { signOut, logoutAllTabs };
