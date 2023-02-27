import classNames from "classnames";

import useCalendarContext from "../../CalendarContext";
import { isSameDateTime } from "../../util";

const MonthPick = () => {
  const { nowDateTime, selectedYear, monthArray, setMode, setSelectedMonth } = useCalendarContext();
  return (
    <div className='w-full flex flex-wrap'>
      {monthArray.map((month, i) => {
        const isCurrentMonth = isSameDateTime(month, nowDateTime, "yyyymm");
        const isCurrentYear = isSameDateTime(month, selectedYear, "yyyy");
        return (
          <div
            key={i}
            className={classNames(
              "w-[calc(100%*(1/4)-2px)] h-[75px] flex items-center justify-center m-[1px] border-[transparent] border-[0.15rem] cursor-pointer",
              {
                "bg-tertiary-dark2 hover:border-tertiary-light": isCurrentMonth,
                "hover:border-primary-light": !isCurrentMonth,
                "text-primary-light": !isCurrentYear,
              }
            )}
            onClick={() => {
              setSelectedMonth(month);
              setMode("date");
            }}
          >{`${month.getMonth() + 1}月`}</div>
        );
      })}
    </div>
  );
};

export default MonthPick;
