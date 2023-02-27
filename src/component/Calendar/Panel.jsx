import useCalendarContext from "../../CalendarContext";

import { dateAdd, validateYear } from "../../util";

const Panel = () => {
  const {
    mode,
    setMode,
    nowDateTime,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    rangeStartYear,
    setRangeStartYear,
    text: { selectedChYM, selectedChY, selectedYearsRange },
  } = useCalendarContext();

  return (
    <div className='w-full flex items-center'>
      <div
        className='w-[calc(100%*(2/7))] pl-[13px] text-[0.85rem] cursor-pointer'
        onClick={() => {
          if (mode === "date") setMode("month");
          if (mode === "month") setMode("year");
        }}
      >
        {mode === "date" && selectedChYM}
        {mode === "month" && selectedChY}
        {mode === "year" && selectedYearsRange}
      </div>
      <div className='w-[calc(100%*(3/7))]'></div>
      <div className='w-[calc(100%*(2/7))] flex'>
        <div
          className='w-1/2 text-center cursor-pointer hover:text-secondary-light'
          onClick={() => {
            if (mode === "date") setSelectedMonth(dateAdd("m", -1, selectedMonth));
            if (mode === "month") setSelectedYear(dateAdd("y", -1, selectedYear));
            if (mode === "year")
              setRangeStartYear(
                validateYear(nowDateTime.getFullYear(), rangeStartYear - 10, rangeStartYear)
              );
          }}
        >
          ∧
        </div>
        <div
          className='w-1/2 text-center cursor-pointer hover:text-secondary-light'
          onClick={() => {
            if (mode === "date") setSelectedMonth(dateAdd("m", 1, selectedMonth));
            if (mode === "month") setSelectedYear(dateAdd("y", 1, selectedYear));
            if (mode === "year")
              setRangeStartYear(
                validateYear(nowDateTime.getFullYear(), rangeStartYear + 10, rangeStartYear)
              );
          }}
        >
          ∨
        </div>
      </div>
    </div>
  );
};

export default Panel;
