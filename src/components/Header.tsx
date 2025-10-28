'use client';
import { Menu, Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Logout from "../components/Logout";

interface HeaderProps {
  isCollapsed: boolean;
  onMobileMenuClick: () => void;
  toggleCollapse: () => void;
  toggleMobile: () => void;
}

const Header = ({ isCollapsed, toggleCollapse, toggleMobile, onMobileMenuClick }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  // Sample user data
  const userEmail = "arswift01@gmail.com";
  const userInitial = userEmail.charAt(0).toUpperCase();

  // Live date and time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formatted = now.toLocaleString("en-US", options).replace(",", " -");
      setCurrentTime(formatted);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`
        fixed top-0 z-50 right-0 h-16 px-6 flex items-center justify-between bg-white 
        border-b border-[#E5F0FE] transition-all duration-300
        w-full
        ${isCollapsed ? "md:ml-16 md:w-[calc(100%-4rem)]" : "md:ml-64 md:w-[calc(100%-16rem)]"}
      `}
    >
      {/* Left Side */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMobileMenuClick}
          className="md:hidden rounded-lg hover:bg-gray-100"
        >
          <Menu className="h-6 w-6 " />
        </button>
        <div className="hidden sm:block font-medium">
          {currentTime}
        </div>
        <div className="sm:hidden text-sm font-semibold">
          <p>
          {new Date().toLocaleTimeString([], {day:"2-digit", month:"long",year:"numeric", hour: "2-digit", minute: "2-digit", hour12: true })}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-3">
       

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium hover:bg-blue-600 transition-colors"
          >
            {userInitial}
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {userInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout Section */}
              <div className="border-t border-gray-200 py-1">
                <Logout />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
