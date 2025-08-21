import React, { useState } from 'react';
import { useResumeContext } from './Editor';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { resumeData } = useResumeContext();

  const sidebarItems = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'education',
      label: 'Education',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 10V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V10C2 10.5304 2.21071 11.0391 2.58579 11.4142C2.96086 11.7893 3.46957 12 4 12H20C20.5304 12 21.0391 11.7893 21.4142 11.4142C21.7893 11.0391 22 10.5304 22 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 12V16C6 16.5304 6.21071 17.0391 6.58579 17.4142C6.96086 17.7893 7.46957 18 8 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8L12 8.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.0001 2L15.0901 8.26L22.0001 9.27L17.0001 14.14L18.1801 21.02L12.0001 17.77L5.82006 21.02L7.00006 14.14L2.00006 9.27L8.91006 8.26L12.0001 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'contact',
      label: 'Contact Information',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: 'certification',
      label: 'Certification',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 15L8 12L12 9L16 12L12 15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15V21L8 19L12 17L16 19L12 21V15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  ];

  const handleSectionClick = (sectionId) => {
    if (setActiveSection) {
      setActiveSection(sectionId);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Calculate progress based on completed sections
  const calculateProgress = () => {
    let completedSections = 0;
    const totalSections = 7;

    // Check Personal Info
    if (resumeData.personalInfo.firstName && resumeData.personalInfo.lastName && 
        resumeData.personalInfo.email && resumeData.personalInfo.phone) {
      completedSections++;
    }

    // Check Experience (optional but count if has any)
    if (resumeData.experience.length > 0) {
      completedSections++;
    }

    // Check Education (optional but count if has any)
    if (resumeData.education.length > 0) {
      completedSections++;
    }

    // Check Skills (optional but count if has any)
    if (resumeData.skills.length > 0) {
      completedSections++;
    }

    // Check Projects (optional but count if has any)
    if (resumeData.projects.length > 0) {
      completedSections++;
    }

    // Check Contact (optional but count if has any)
    if (resumeData.contact.linkedin || resumeData.contact.github || 
        resumeData.contact.website || resumeData.contact.portfolio) {
      completedSections++;
    }

    // Check Certifications (optional but count if has any)
    if (resumeData.certifications.length > 0) {
      completedSections++;
    }

    return { completed: completedSections, total: totalSections };
  };

  const progress = calculateProgress();
  const progressPercentage = Math.round((progress.completed / progress.total) * 100);

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[var(--white)] min-h-screen h-full shadow-lg border-r border-[var(--gray-light)] flex flex-col transition-all duration-300 md:relative fixed md:translate-x-0 z-30`}>
      
      {/* Toggle Button */}
      <div className="p-4 border-b border-[var(--gray-light)] flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-[var(--gray-light)] transition-colors duration-200 ml-auto"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2 px-4">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleSectionClick(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-3 rounded-lg text-left transition-all duration-200 hover:bg-[var(--gray-light)] ${
                  activeSection === item.id
                    ? 'bg-[var(--red-primary)] text-[var(--white)] shadow-md hover:bg-[var(--red-primary)]'
                    : 'text-[var(--gray-dark)] hover:text-[var(--black)]'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <span className={`flex-shrink-0 ${
                  activeSection === item.id ? 'text-[var(--white)]' : 'text-[var(--gray-medium)]'
                }`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Progress Indicator */}
      {!isCollapsed && (
        <div className="p-4 border-t border-[var(--gray-light)]">
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-[var(--gray-dark)]">Progress</span>
              <span className="text-sm text-[var(--gray-medium)]">{progress.completed}/{progress.total}</span>
            </div>
            <div className="w-full bg-[var(--gray-light)] rounded-full h-2">
              <div 
                className="bg-[var(--blue-primary)] h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-[var(--gray-medium)]">
            {progressPercentage === 100 ? 
              '🎉 Resume completed! Ready to download.' : 
              'Complete sections to build your resume'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;