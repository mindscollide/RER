// this is use in tables its get utc time convert it into current Gmt
export const convertToGMT = (utcTimeString, locale) => {
  if (utcTimeString === "") {
    return "";
  }

  const hours = parseInt(utcTimeString.substring(0, 2), 10);
  const minutes = parseInt(utcTimeString.substring(2, 4), 10);
  const seconds = parseInt(utcTimeString.substring(4, 6), 10);

  const utcDate = new Date();
  utcDate.setUTCHours(hours, minutes, seconds);

  return utcDate.toLocaleTimeString(locale, {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
};

// this is used for time picker convert "hhmmaa" formate wih utc to send in api
export function formatToHHMMSSUTC(value) {
  if (value === "") {
    return "";
  }

  let date = new Date(value);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${hours}${minutes}${seconds}`;
}

// to show date in time picker
export const convertDateforInputUTC = (time) => {
  const currentDate = new Date();
  // Format the time string as "HH:mm:ss"
  const formattedStartTime = time.replace(/(\d{2})(\d{2})(\d{2})/, "$1:$2:$3");

  // Combine the current date with the formatted time
  return `${
    currentDate.toISOString().split("T")[0]
  }T${formattedStartTime}.000Z`;
};

// to show date in time picker
export const convertToHHMMSSOnchange = (value) => {
  if (value === "") {
    return "";
  }

  let date = new Date(value);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}${minutes}${seconds}`;
};

//Current Date UTC Conversion with format YYYYMMDD
export const getCurrentDateUTC = () => {
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getUTCDate().toString().padStart(2, "0");
  return `${year}${month}${day}`;
};
