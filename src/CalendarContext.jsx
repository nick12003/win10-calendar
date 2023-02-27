import { createContext, useContext, useReducer, useEffect } from "react";

import dateformat, { getDateArray, getLunar } from "./util";

const CalendarContext = createContext();

CalendarContext.displayName = "CalendarContext";

export const CalendarProvider = CalendarContext.Provider;

export default function useCalendarContext() {
  const ld = useContext(CalendarContext);
  return ld;
}

const CalendarReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_NOW_TIME":
      const { newDateTime } = payload;
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
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: payload.newDate };
    case "SET_SELECTED_MONTH":
      const { newMonth } = payload;
      return {
        ...state,
        selectedMonth: newMonth,
        dateArray: getDateArray(newMonth),
        text: {
          ...state.text,
          selectedChYM: dateformat(newMonth, "yyyy年mm月"),
        },
      };
    default:
      return state;
  }
};

function getInitialData() {
  const nowDateTime = new Date();
  return {
    nowDateTime,
    mode: "date",
    selectedDate: nowDateTime,
    selectedMonth: nowDateTime,
    dateArray: getDateArray(nowDateTime),
    text: {
      nowTimeClock: dateformat(nowDateTime, "t hh:MM:ss"),
      nowChYMD: dateformat(nowDateTime, "yyyy年mm月dd日"),
      nowLunarDate: getLunar(nowDateTime).monthCn + getLunar(nowDateTime).dayCn,
      selectedChYM: dateformat(nowDateTime, "yyyy年mm月"),
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

  useEffect(() => {
    setTimeout(() => {
      setNowDateTime(new Date());
    }, 1000);
  }, [state.nowDateTime]);

  return {
    ...state,
    setSelectedDate,
    setSelectedMonth,
  };
}
