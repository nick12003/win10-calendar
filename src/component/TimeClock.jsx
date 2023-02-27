import useCalendarContext from "../CalendarContext";

const TimeClock = () => {
  const {
    text: { nowTimeClock, nowChYMD, nowLunarDate },
  } = useCalendarContext();
  return (
    <div className='p-5'>
      <div className='text-[2.5rem] tracking-[0.15rem] font-thin'>{nowTimeClock}</div>
      <div className='text-tertiary text-[0.8rem]'>{`${nowChYMD} ${nowLunarDate}`}</div>
    </div>
  );
};

export default TimeClock;
