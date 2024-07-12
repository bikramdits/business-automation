import moment from "moment";
const DATE_FORMAT = "DD/MM/YYYY hh:mm A";
export const DATE_TIME_FORMAT = "DD/MM/YYYY";

export const format = (date: any, dateFormat = DATE_FORMAT) => {
  // if (date instanceof Date) {
  return moment(date).format(dateFormat);
  // }
  // return moment(date * 1000).format(dateFormat);
};

export const getTs = (date: any) => {
  return moment(date * 1000).unix();
};

export const tsToMs = (ts: any) => {
  return ts * 1000;
};
