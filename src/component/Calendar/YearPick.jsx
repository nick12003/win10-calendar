import classNames from "classnames";

import useCalendarContext from "../../CalendarContext";
import { isSameDateTime } from "../../util";

const YearPick = () => {
  const { setMode, rangeStartYear, selectedYear, setSelectedYear, yearArray } =
    useCalendarContext();
  return (
    <div className='w-full flex flex-wrap'>
      {yearArray.map((year, i) => {
        const isCurrentRange = year >= rangeStartYear && year < rangeStartYear + 10;
        const isCurrentYear = isSameDateTime(new Date(year, 1, 1), selectedYear, "yyyy");
        return (
          <div
            key={i}
            className={classNames(
              "w-[calc(100%*(1/4)-2px)] h-[75px] flex items-center justify-center m-[1px] border-[transparent] border-[0.15rem] cursor-pointer",
              {
                "bg-tertiary-dark2 hover:border-tertiary-light": isCurrentYear,
                "hover:border-primary-light": !isCurrentYear,
                "text-primary-light": !isCurrentRange,
              }
            )}
            onClick={() => {
              setSelectedYear(new Date(year, 1, 1));
              setMode("month");
            }}
          >
            {year}
          </div>
        );
      })}
    </div>
  );
};

export default YearPick;
