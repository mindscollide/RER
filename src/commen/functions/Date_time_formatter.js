// this is use in tables its get utc time convert it into current Gmt
export function convertUtcToGmt12HourFormat(utcTimestampSeconds, locale) {
  // Convert UTC timestamp to GMT
  const utcTimestampMilliseconds = utcTimestampSeconds * 1000;
  const date = new Date(utcTimestampMilliseconds);

  // Format the date in 12-hour time with 'am/pm' and specified locale
  const gmtString = date.toLocaleString(locale, {
    timeZone: "GMT",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return gmtString;
}

// this is used for time picker convert "hh:mmA" formate wih utc
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

// this is used for time picker convert "HHmmss" formate
export function convertTo12HourFormat(timeString) {
  if (!timeString) {
    return "";
  }
  console.log("DatePicker", timeString);
  const date = new Date(timeString);
  console.log("DatePicker", date);
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return date;
}
