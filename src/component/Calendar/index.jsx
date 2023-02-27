import Panel from "./Panel";
import DatePick from "./DatePick";
import MonthPick from "./MonthPick";
import YearPick from "./YearPick";

import useCalendarContext from "../../CalendarContext";

const Calendar = () => {
  const { mode } = useCalendarContext();

  return (
    <div className='w-full flex flex-col items-center justify-center py-[16px] px-[15px] border-t-[0.1rem] border-solid border-primary-light'>
      <Panel />
      {mode === "date" && <DatePick />}
      {mode === "month" && <MonthPick />}
      {mode === "year" && <YearPick />}
    </div>
  );
};

export default Calendar;
