export const getYearMonth = (date: Date): string => {
  return new Intl.DateTimeFormat("ja", {
    year: "numeric",
    month: "2-digit",
  }).format(date);
};
