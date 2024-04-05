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

export const validateOption = (value, options) => {
  return options.some((option) => option.value === value);
};

export const validateUrl = (value) => {
  try {
    const url = new URL(value);

    return ["http:", "https:"].includes(url.protocol);
  } catch (error) {
    return false;
  }
};
