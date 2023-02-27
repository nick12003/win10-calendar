import dateformat, { i18n } from "dateformat";
import solarLunar from "solarlunar-es";

i18n.timeNames[0] = "上午";
i18n.timeNames[1] = "下午";
i18n.dayNames = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const chWeek = ["日", "一", "二", "三", "四", "五", "六"];

/**
 * @param {Date} dateTime
 * @returns {Object} lunar information object
 * @example
 * getLunar(new Date(2015, 8, 26))
 *
 * // return {"lYear":2015,"lMonth":8,"lDay":26,"animal":"羊","monthCn":"八月","dayCn":"廿六","cYear":2015,"cMonth":10,"cDay":8,"gzYear":"乙未","gzMonth":"丙戌","gzDay":"丁巳","isToday":false,"isLeap":false,"nWeek":4,"ncWeek":"星期四","isTerm":true,"term":"寒露","lunarFestival":"","festival":""}
 */
export const getLunar = (dateTime) =>
  solarLunar.solar2lunar(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate());

/**
 * @param {Date} d1 date1
 * @param {Date} d2 date1
 * @param {string} [format=yyyymmdd] format string, default : yyyymmdd
 * @returns {boolean}
 */
export const isSameDateTime = (d1, d2, format = "yyyymmdd") =>
  dateformat(d1, format) === dateformat(d2, format);

/**
 * @param {number} year year
 * @param {number} mon mon
 * @returns {number} days count in month
 */
const countDaysInMonth = (year, mon) => new Date(year, mon + 1, 0).getDate();

/**
 * @param {string} datePart y、m、d
 * @param {number} number
 * @param {Date} date
 * @returns {Date} result date
 */
export const dateAdd = (datePart, number, date) => {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  if (datePart === "y") return new Date(y + number, m, d);
  if (datePart === "m") return new Date(y, m + number, d);
  if (datePart === "d") return new Date(y, m, d + number);
  return new Date(y, m, d);
};

/**
 * 取得選擇月份在月曆上顯示的日期陣列
 *
 * 月曆上一共會顯示42個日期，包含上個月、當月以及下個月
 *
 * 例如選擇 2023/02/，則會顯示`2023/01`部分尾段日期(29-31)`2023/02`所有日期(1-28)以及`2023/03`的部分前段日期(1-11)
 *
 * @param {Date} selectedMonth month
 * @returns {Array} date object array
 *
 */
export const getDateArray = (selectedMonth) => {
  const currentYear = selectedMonth.getFullYear();
  const currentMonth = selectedMonth.getMonth();
  /** 上個月份天數 */
  const preMonDays = new Date(currentYear, currentMonth, 1).getDay() % 7;
  /** 當前月份天數 */
  const currentMonDays = countDaysInMonth(currentMonth, currentMonth);
  /** 下個月份天數 */
  const nextMonDays = 42 - (preMonDays + currentMonDays);

  const transform = (d, currentMonth = false) => ({
    date: d,
    lunar: getLunar(d).dayCn,
    currentMonth,
  });

  return [
    ...Array(preMonDays)
      .fill()
      .map((_, i) => transform(new Date(currentYear, currentMonth, i + 1 - preMonDays))),
    ...Array(currentMonDays)
      .fill()
      .map((_, i) => transform(new Date(currentYear, currentMonth, i + 1), true)),
    ...Array(nextMonDays)
      .fill()
      .map((_, i) => transform(new Date(currentYear, currentMonth + 1, i + 1))),
  ];
};

export default dateformat;
