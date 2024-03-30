export const validateEmail = (email) => {
  // https://stackoverflow.com/a/46181
  const regexp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexp.test(email);
};

export const validateLength = (value, min, max) => {
  if (min && value.length < min) return false;
  if (max && value.length > max) return false;

  return true;
};

export const validateOption = (array, options) => {
  if (!array.length) return false;

  for (const value of array) {
    if (!options.some((option) => option.value === value)) {
      return false;
    }
  }

  return true;
};

export const validateUrl = (value) => {
  try {
    const url = new URL(value);

    return ["http:", "https:"].includes(url.protocol);
  } catch (error) {
    return false;
  }
};
