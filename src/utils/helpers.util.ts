export const formatDateToString = (date: Date) => {
  return date.toLocaleDateString("en-CA", {
    timeZone: "Pacific/Auckland",
  });
};
