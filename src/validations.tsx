export const isEmailValid = (email: string) => {
  // Regular expression pattern for validating an email address
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};
