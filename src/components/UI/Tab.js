// src/components/UI/Tabs.js
import { useState } from 'react';

export default function Tabs({ tabs = [], onTabChange }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <div className="flex gap-2 border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            index === activeIndex
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
