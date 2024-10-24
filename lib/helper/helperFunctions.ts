export const dataFormatter = (number: number) =>
  `€${Intl.NumberFormat('us').format(number).toString()}`;
