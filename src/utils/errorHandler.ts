export const handleError = (error: any) => {
  const errorMessage = error.message || "An unexpected error occurred.";
  console.error(errorMessage);
  return errorMessage;
};
