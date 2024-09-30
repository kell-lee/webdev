export const formatDateTS = (dateTS) => {
  const date = new Date(dateTS);

  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
};
