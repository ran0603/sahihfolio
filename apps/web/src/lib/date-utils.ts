export const getDateString = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  const dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, dateFormat);
};

export const calculateDaysSince = (date: Date) => {
  return Number(
    ((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)).toFixed(
      0,
    ),
  );
};
