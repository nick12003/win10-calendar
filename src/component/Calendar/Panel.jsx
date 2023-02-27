import useCalendarContext from "../../CalendarContext";

import { dateAdd } from "../../util";

const Panel = () => {
  const {
    mode,
    selectedMonth,
    setSelectedMonth,
    text: { selectedChYM },
  } = useCalendarContext();

  return (
    <div className='w-full flex items-center'>
      <div className='w-[calc(100%*(2/7))] pl-[13px] text-[0.85rem] cursor-pointer'>
        {mode === "date" && selectedChYM}
      </div>
      <div className='w-[calc(100%*(3/7))]'></div>
      <div className='w-[calc(100%*(2/7))] flex'>
        <div
          className='w-1/2 text-center cursor-pointer hover:text-secondary-light'
          onClick={() => {
            if (mode === "date") setSelectedMonth(dateAdd("m", -1, selectedMonth));
          }}
        >
          ∧
        </div>
        <div
          className='w-1/2 text-center cursor-pointer hover:text-secondary-light'
          onClick={() => {
            if (mode === "date") setSelectedMonth(dateAdd("m", 1, selectedMonth));
          }}
        >
          ∨
        </div>
      </div>
    </div>
  );
};

export default Panel;
