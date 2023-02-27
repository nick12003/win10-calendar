import { createContext, useContext, useReducer, useEffect } from "react";

import dateformat, {
  getDateArray,
  getMonthArray,
  getYearArray,
  getLunar,
  isSameDateTime,
} from "./util";

const CalendarContext = createContext();

CalendarContext.displayName = "CalendarContext";

export const CalendarProvider = CalendarContext.Provider;

export default function useCalendarContext() {
  const ld = useContext(CalendarContext);
  return ld;
}

const CalendarReducer = (state, action) => {
  const {
    type,
    payload,
    payload: { newDateTime, newMonth, newYear, newRangeStartYear },
  } = action;
  switch (type) {
    case "SET_NOW_TIME":
      return {
        ...state,
        nowDateTime: newDateTime,
        text: {
          ...state.text,
          nowTimeClock: dateformat(newDateTime, "t hh:MM:ss"),
          nowChYMD: dateformat(newDateTime, "yyyy年mm月dd日"),
          nowLunarDate: getLunar(newDateTime).monthCn + getLunar(newDateTime).dayCn,
        },
      };
    case "SET_MODE":
      return { ...state, mode: payload.newMode };
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: payload.newDate };
    case "SET_SELECTED_MONTH":
      return {
        ...state,
        selectedMonth: newMonth,
        dateArray: getDateArray(newMonth),
        text: {
          ...state.text,
          selectedChYM: dateformat(newMonth, "yyyy年mm月"),
        },
      };
    case "SET_SELECTED_YEAR":
      return {
        ...state,
        selectedYear: newYear,
        monthArray: getMonthArray(newYear),
        text: {
          ...state.text,
          selectedChY: dateformat(newYear, "yyyy年"),
        },
      };
    case "SET_RANGE_START_YEAR":
      return {
        ...state,
        rangeStartYear: newRangeStartYear,
        yearArray: getYearArray(state.nowDateTime, newRangeStartYear),
        text: {
          ...state.text,
          selectedYearsRange: `${newRangeStartYear} - ${newRangeStartYear + 9}`,
        },
      };
    default:
      return state;
  }
};

function getInitialData() {
  const nowDateTime = new Date();
  const rangeStartYear = Math.floor(nowDateTime.getFullYear() / 10) * 10;
  return {
    nowDateTime,
    mode: "date",
    selectedDate: nowDateTime,
    selectedMonth: nowDateTime,
    selectedYear: nowDateTime,
    rangeStartYear,
    dateArray: getDateArray(nowDateTime),
    monthArray: getMonthArray(nowDateTime),
    yearArray: getYearArray(nowDateTime, rangeStartYear),
    text: {
      nowTimeClock: dateformat(nowDateTime, "t hh:MM:ss"),
      nowChYMD: dateformat(nowDateTime, "yyyy年mm月dd日"),
      nowLunarDate: getLunar(nowDateTime).monthCn + getLunar(nowDateTime).dayCn,
      selectedChDLunar: (d1, d2) =>
        `${dateformat(d2, isSameDateTime(d1, d2) ? "今天" : "ddd d")} ${
          getLunar(d2).monthCn + getLunar(d2).dayCn
        }`,
      selectedChYM: dateformat(nowDateTime, "yyyy年mm月"),
      selectedChY: dateformat(nowDateTime, "yyyy年"),
      selectedYearsRange: `${rangeStartYear} - ${rangeStartYear + 9}`,
    },
  };
}

export function useCalendar() {
  const [state, dispatch] = useReducer(CalendarReducer, getInitialData());

  const setNowDateTime = (newDateTime) => {
    dispatch({
      type: "SET_NOW_TIME",
      payload: { newDateTime },
    });
  };

  const setMode = (newMode) => {
    dispatch({
      type: "SET_MODE",
      payload: { newMode },
    });
  };

  const setSelectedDate = (newDate) => {
    dispatch({
      type: "SET_SELECTED_DATE",
      payload: { newDate },
    });
  };

  const setSelectedMonth = (newMonth) => {
    dispatch({
      type: "SET_SELECTED_MONTH",
      payload: { newMonth },
    });
  };

  const setSelectedYear = (newYear) => {
    dispatch({
      type: "SET_SELECTED_YEAR",
      payload: { newYear },
    });
  };

  const setRangeStartYear = (newRangeStartYear) => {
    dispatch({
      type: "SET_RANGE_START_YEAR",
      payload: { newRangeStartYear },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setNowDateTime(new Date());
    }, 1000);
  }, [state.nowDateTime]);

  return {
    ...state,
    setMode,
    setSelectedDate,
    setSelectedMonth,
    setSelectedYear,
    setRangeStartYear,
  };
}
