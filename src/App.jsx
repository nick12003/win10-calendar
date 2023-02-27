import { CalendarProvider, useCalendar } from "./CalendarContext";

import TimeClock from "./component/TimeClock";
import Calendar from "./component/Calendar";

function App() {
  const value = useCalendar();
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='bg-primary min-w-[380px] max-w-[380px] text-secondary'>
        <CalendarProvider value={{ ...value }}>
          <TimeClock />
          <Calendar />
        </CalendarProvider>
      </div>
    </div>
  );
}

export default App;
