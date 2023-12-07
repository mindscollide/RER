import * as actions from "../action_types";
import { BroadcastChannel } from "broadcast-channel";

const logoutChannel = new BroadcastChannel("logout");

const signOut = (navigate, message) => {
  logoutChannel.postMessage("Logout");
  window.location.href = window.location.origin + "/";
  localStorage.clear();
};

const logoutAllTabs = () => {
  logoutChannel.onmessage = () => {
    signOut();
    logoutChannel.close();
  };
};

export { signOut, logoutAllTabs };
