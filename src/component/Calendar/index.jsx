import classNames from "classnames";

import Panel from "./Panel";

import useCalendarContext from "../../CalendarContext";
import { chWeek, isSameDateTime, dateAdd } from "../../util";

const Calendar = () => {
  const { nowDateTime, selectedDate, selectedMonth, dateArray, setSelectedDate } =
    useCalendarContext();

  return (
    <div className='w-full flex flex-col items-center justify-center py-[16px] px-[15px] border-t-[0.1rem] border-solid border-primary-light'>
      <Panel />
      <div className='w-full flex flex-wrap text-[0.7rem]'>
        {chWeek.map((text, i) => (
          <div
            key={i}
            className='w-[calc(100%*(1/7)-2px)] h-[40px] flex items-center justify-center mx-[1px] cursor-default'
          >
            {text}
          </div>
        ))}
        {dateArray.map(({ date, lunar }, i) => {
          const isSelected = isSameDateTime(date, selectedDate);
          const isToday = isSameDateTime(date, nowDateTime);
          const isCurrentMonth = isSameDateTime(date, selectedMonth, "yyyymm");
          return (
            <div
              key={i}
              className={classNames(
                "w-[calc(100%*(1/7)-2px)] flex items-center justify-center m-[1px] border-[transparent] border-[0.15rem] cursor-pointer",
                {
                  "bg-tertiary-dark2": isToday,
                  "border-tertiary-dark2": isSelected,
                  "hover:border-primary-light": !isToday && !isSelected,
                  "hover:border-tertiary-dark": !isToday && isSelected,
                  "hover:border-tertiary-light": isToday && !isSelected,
                  "hover:border-tertiary": isToday && isSelected,
                }
              )}
              onClick={() => {
                setSelectedDate(date);
              }}
            >
              <div
                className={classNames(
                  "w-[90%] h-[95%] flex flex-col items-center justify-center py-[0.05rem]",
                  {
                    "text-primary-light": !isCurrentMonth && !isToday,
                    "outline outline-primary-dark outline-[0.15rem]":
                      isSameDateTime(date, selectedDate) && isSameDateTime(date, nowDateTime),
                  }
                )}
              >
                <div>{date.getDate()}</div>
                <div>{lunar}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
