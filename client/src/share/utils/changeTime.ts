import dayjs from 'dayjs';

export const UTCToKST = (serverTime: string) => {
  return dayjs(serverTime).add(9, 'hour').format('YYYY-MM-DD HH:mm:ss');
};

export const changeDateType = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
