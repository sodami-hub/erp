export const numberToCurrency = (value: string) => {
  const number = parseInt(value);
  if (isNaN(number)) return '';
  const intl = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  });
  return intl.format(number);
};
