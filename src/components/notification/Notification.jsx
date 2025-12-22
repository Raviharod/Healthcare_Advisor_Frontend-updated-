import React from 'react';
import { CircleX, ThumbsUp, Clock } from 'lucide-react';
import { useSelector,useDispatch } from 'react-redux';
import { notificationActions } from '../../slices/notificationSlice';

const NotificationCard = () => {
    const currentTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    
   const notification = useSelector(state=>state.notification. notificationMsg);
   const dispatch = useDispatch();

   const handleCloseNotification = ()=>{
    dispatch(notificationActions.setIsActive(false));
   }

  return (
    
    <div className="flex w-auto items-center justify-center max-h-screen  p-4 fixed top-0 right-0 z-20">
      {/* Main Container */}
      <div className="relative w-full max-w-2xl bg-[#111111] text-white rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105">
        
        {/* Header Section */}
        <div className="flex justify-between items-center px-6 pt-5 text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
          <span>Notification</span>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>7:15PM</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 px-6 py-6">
          <div className="relative">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jay" 
              alt="Avatar" 
              className="w-14 h-14 rounded-full bg-gray-300 border-2 border-gray-700"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse"></span>
              <span className='text-lg text-white'>{notification}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 px-6 pb-8">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white py-3 px-4 rounded-2xl transition-colors duration-200 text-sm font-medium" onClick={handleCloseNotification}>
          <ThumbsUp size={18}></ThumbsUp>
            Get It
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white py-3 px-4 rounded-2xl transition-colors duration-200 text-sm font-medium" onClick={handleCloseNotification}>
          <CircleX size={18}/>
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotificationCard;