export const formatDateTimeString = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  return Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date);
};
