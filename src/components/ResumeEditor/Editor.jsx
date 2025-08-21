import React, { useState, createContext, useContext } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import PersonalInfoForm from './sections/PersonalInfoForm';
import ExperienceForm from './sections/ExperienceForm';
import EducationForm from './sections/EducationForm';
import SkillsForm from './sections/SkillsForm';
import ProjectsForm from './sections/ProjectsForm';
import ContactForm from './sections/ContactForm';
import CertificationForm from './sections/CertificationForm';
import ResumePreview from './ResumePreview';

// Create Resume Context for managing resume data
const ResumeContext = createContext();

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

const Editor = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  
  // Resume data state
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    contact: {
      linkedin: '',
      github: '',
      website: '',
      portfolio: ''
    },
    certifications: []
  });

  // Function to update specific section of resume data
  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Function to navigate to next section
  const goToNextSection = () => {
    const sectionOrder = ['personal', 'experience', 'education', 'skills', 'projects', 'contact', 'certification'];
    const currentIndex = sectionOrder.indexOf(activeSection);
    
    if (currentIndex < sectionOrder.length - 1) {
      setActiveSection(sectionOrder[currentIndex + 1]);
    }
  };

  // Function to navigate to previous section
  const goToPreviousSection = () => {
    const sectionOrder = ['personal', 'experience', 'education', 'skills', 'projects', 'contact', 'certification'];
    const currentIndex = sectionOrder.indexOf(activeSection);
    
    if (currentIndex > 0) {
      setActiveSection(sectionOrder[currentIndex - 1]);
    }
  };

  // Function to render the active section component
  const renderActiveSection = () => {
    const sectionComponents = {
      personal: <PersonalInfoForm />,
      experience: <ExperienceForm />,
      education: <EducationForm />,
      skills: <SkillsForm />,
      projects: <ProjectsForm />,
      contact: <ContactForm />,
      certification: <CertificationForm />
    };

    return sectionComponents[activeSection] || <PersonalInfoForm />;
  };

  const contextValue = {
    resumeData,
    updateResumeData,
    activeSection,
    setActiveSection,
    goToNextSection,
    goToPreviousSection
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      <div className="bg-[var(--gray-light)] min-h-screen">
        <Navbar />
        
        <div className="flex">
          {/* Sidebar */}
          <Sidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          
          {/* Main Content Area */}
          <div className="flex-1 flex">
            {/* Form Section */}
            <div className={`${showPreview ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
              <div className="p-6">
                {/* Section Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-[var(--black)] capitalize">
                      {activeSection === 'personal' ? 'Personal Information' : 
                       activeSection === 'certification' ? 'Certifications' :
                       activeSection}
                    </h1>
                    <p className="text-[var(--gray-medium)] mt-1">
                      Fill in your {activeSection === 'personal' ? 'personal information' : activeSection} details
                    </p>
                  </div>
                  
                  {/* Preview Toggle Button */}
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--blue-primary)] text-white rounded-lg hover:bg-[var(--blue-dark)] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </button>
                </div>

                {/* Active Section Form */}
                <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-light)] p-6">
                  {renderActiveSection()}
                </div>
              </div>
            </div>

            {/* Resume Preview Section */}
            {showPreview && (
              <div className="w-1/2 border-l border-[var(--gray-light)] bg-white">
                <div className="sticky top-[86px] h-[calc(100vh-86px)] overflow-y-auto">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-[var(--black)]">Live Preview</h2>
                      <button
                        onClick={() => setShowPreview(false)}
                        className="p-2 hover:bg-[var(--gray-light)] rounded-lg transition-colors"
                        aria-label="Close preview"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <ResumePreview />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ResumeContext.Provider>
  );
};

export default Editor;