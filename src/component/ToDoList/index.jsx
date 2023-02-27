import { useState } from "react";
import classNames from "classnames";

import useCalendarContext from "../../CalendarContext";

const ToDoList = () => {
  const [isOpenList, setIsOpenList] = useState(true);
  const {
    nowDateTime,
    selectedDate,
    text: { selectedChDLunar },
  } = useCalendarContext();
  return (
    <div className='w-full'>
      <div
        className={classNames(
          "px-[16px] py-[2px] border-t-[0.1rem] border-solid border-primary-light",
          {
            block: isOpenList,
            hidden: !isOpenList,
          }
        )}
      >
        <div className='text-[1.15rem] my-[8px]'>{selectedChDLunar(nowDateTime, selectedDate)}</div>
        <div className='p-[0.25rem]'>
          <input
            className='w-full bg-[transparent] p-[0.4rem] text-[0.9rem] outline-0 border-secondary-dark border-solid border-[1px] hover:bg-primary-dark'
            placeholder='新增事件或提醒'
          />
        </div>
        <div className='text-[0.85rem] h-[100px] mt-[0.5rem]'>沒有事件</div>
      </div>
      <div className='flex justify-end p-[1rem]'>
        <div
          className='text-tertiary text-[0.9rem] cursor-pointer hover:text-secondary-dark'
          onClick={() => {
            setIsOpenList((v) => !v);
          }}
        >
          {isOpenList ? "隱藏行程摘要∨" : "顯示行程摘要∧"}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
