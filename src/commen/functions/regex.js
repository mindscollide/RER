// its allow only character  space and number and also didnt allow space as a first character
export const regexOnlyForNumberNCharacters = (data) => {
  // Remove leading space
  const trimmedData = data.replace(/^\s*/, "");

  // Allow Arabic and English characters, spaces, and numbers
  const sanitizedData = trimmedData.replace(
    /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z0-9\s]/gu,
    ""
  );

  return sanitizedData;
};

// its allow only character  space and also didnt allow space as a first character
export const regexOnlyCharacters = (data) => {
  return data.replace(/^\s/, "").replace(/[^a-zA-Z\s]/g, "");
};

// not  allow first charector as an space
export const validateInput = (data) => {
  if (data.charAt(0) === " ") {
    return data.slice(1);
  }
  return data;
};

// replace slash / with \\
export const replaceSlashWithBackslash = (inputString) => {
  // Use the global "g" flag in the regular expression to replace all occurrences
  return inputString.replace(/\//g, "\\");
};

// Validae URL regex
export const urlPatternValidation = (URL) => {
  const regex = new RegExp(
    "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
  );
  return regex.test(URL);
};

// Use the replace method with the regular expression to remove non-alphanumeric characters
export const containsStringandNumericCharacters = (value) => {
  let cleanedValue = value.replace(/[^a-zA-Z0-9 ]/g, "");

  // Return the cleaned value
  return cleanedValue;
};

// for only number input
export const forNumbersOnly = (value) => {
  let numberValue = value.replace(/[^\d]/g, "");
  return numberValue;
};

// for only aplhabets input
export const containsOnlyAlphabets = (value) => {
  let aplhabetsValue = value.replace(/[^a-zA-Z]/g, "");
  return aplhabetsValue;
};
