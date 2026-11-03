export const getDateString = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, dateFormat);
};
