import React, { useState } from 'react';
import { useResumeContext } from '../Editor';

const ExperienceForm = () => {
  const { resumeData, updateResumeData, goToNextSection, goToPreviousSection } = useResumeContext();
  const { experience } = resumeData;
  
  const [currentExperience, setCurrentExperience] = useState({
    id: Date.now(),
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    description: ''
  });

  const handleInputChange = (field, value) => {
    setCurrentExperience(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addExperience = () => {
    if (currentExperience.jobTitle && currentExperience.company) {
      updateResumeData('experience', [...experience, currentExperience]);
      setCurrentExperience({
        id: Date.now(),
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentJob: false,
        description: ''
      });
    }
  };

  const removeExperience = (id) => {
    updateResumeData('experience', experience.filter(exp => exp.id !== id));
  };

  const editExperience = (exp) => {
    setCurrentExperience(exp);
    removeExperience(exp.id);
  };

  const handleSaveAndContinue = () => {
    goToNextSection();
  };

  const handleClear = () => {
    setCurrentExperience({
      id: Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Experience List */}
      {experience.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--gray-dark)]">Added Experience</h3>
          {experience.map((exp) => (
            <div key={exp.id} className="p-4 border border-[var(--gray-light)] rounded-lg bg-[var(--gray-light)]/30">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--black)]">{exp.jobTitle}</h4>
                  <p className="text-[var(--gray-dark)]">{exp.company} • {exp.location}</p>
                  <p className="text-sm text-[var(--gray-medium)]">
                    {exp.startDate} - {exp.isCurrentJob ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-[var(--gray-dark)] mt-2 line-clamp-2">{exp.description}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => editExperience(exp)}
                    className="p-2 text-[var(--blue-primary)] hover:bg-[var(--blue-primary)]/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="p-2 text-[var(--red-primary)] hover:bg-[var(--red-primary)]/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience Form */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[var(--gray-dark)]">
          {experience.length > 0 ? 'Add Another Experience' : 'Add Work Experience'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Job Title *
            </label>
            <input
              type="text"
              id="jobTitle"
              value={currentExperience.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Software Engineer"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Company *
            </label>
            <input
              type="text"
              id="company"
              value={currentExperience.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Google Inc."
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={currentExperience.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            placeholder="e.g. San Francisco, CA"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Start Date *
            </label>
            <input
              type="month"
              id="startDate"
              value={currentExperience.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              End Date
            </label>
            <input
              type="month"
              id="endDate"
              value={currentExperience.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              disabled={currentExperience.isCurrentJob}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all disabled:bg-[var(--gray-light)] disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Current Job Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isCurrentJob"
            checked={currentExperience.isCurrentJob}
            onChange={(e) => handleInputChange('isCurrentJob', e.target.checked)}
            className="w-4 h-4 text-[var(--blue-primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--blue-primary)] focus:ring-2"
          />
          <label htmlFor="isCurrentJob" className="ml-2 text-sm text-[var(--gray-dark)]">
            I currently work here
          </label>
        </div>

        {/* Job Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Job Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={currentExperience.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Describe your responsibilities and achievements..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t border-[var(--gray-light)]">
          <button
            type="button"
            onClick={goToPreviousSection}
            className="px-6 py-2 border border-[var(--gray-light)] text-[var(--gray-dark)] rounded-lg hover:bg-[var(--gray-light)] transition-colors"
          >
            ← Previous
          </button>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-2 border border-[var(--gray-light)] text-[var(--gray-dark)] rounded-lg hover:bg-[var(--gray-light)] transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={addExperience}
              className="px-6 py-2 bg-[var(--gray-medium)] text-white rounded-lg hover:bg-[var(--gray-dark)] transition-colors"
            >
              Add Experience
            </button>
            <button
              type="button"
              onClick={handleSaveAndContinue}
              className="px-6 py-2 bg-[var(--blue-primary)] text-white rounded-lg hover:bg-[var(--blue-dark)] transition-colors"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;