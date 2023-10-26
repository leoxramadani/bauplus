export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

export const skeleton = Array.from(
  { length: 10 },
  (_, index) => index + 1
);
