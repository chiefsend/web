import dayjs from "dayjs";

/**
 * gives out the filesize in a fitting unit
 * @param {*} value filesize in bytes
 */
export function filesize(value) {
  const exponent = Math.floor(Math.log10(value));
  if (exponent < 3) return `${Math.floor(value)} B`;
  if (exponent < 6) return `${Math.floor(value / Math.pow(10, 3))} KB`;
  if (exponent < 9) return `${Math.floor(value / Math.pow(10, 6))} MB`;
  if (exponent < 12) return `${Math.floor(value / Math.pow(10, 9))} GB`;
}

/**
 * gives out a time in datetime format
 * @param {*} value iso timestamp
 */
export function datetime(value) {
  return dayjs(value).format("D.M.YYYY - h:mm");
}
