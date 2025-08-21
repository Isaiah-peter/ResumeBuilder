import React, { useState } from 'react';
import { useResumeContext } from '../Editor';

const EducationForm = () => {
  const { resumeData, updateResumeData, goToNextSection, goToPreviousSection } = useResumeContext();
  const { education } = resumeData;
  
  const [currentEducation, setCurrentEducation] = useState({
    id: Date.now(),
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrentlyStudying: false,
    gpa: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setCurrentEducation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addEducation = () => {
    if (currentEducation.degree && currentEducation.institution) {
      updateResumeData('education', [...education, currentEducation]);
      setCurrentEducation({
        id: Date.now(),
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentlyStudying: false,
        gpa: '',
        description: ''
      });
    }
  };

  const removeEducation = (id) => {
    updateResumeData('education', education.filter(edu => edu.id !== id));
  };

  const editEducation = (edu) => {
    setCurrentEducation(edu);
    removeEducation(edu.id);
  };

  return (
    <div className="space-y-6">
      {/* Education List */}
      {education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--gray-dark)]">Added Education</h3>
          {education.map((edu) => (
            <div key={edu.id} className="p-4 border border-[var(--gray-light)] rounded-lg bg-[var(--gray-light)]/30">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--black)]">{edu.degree}</h4>
                  <p className="text-[var(--gray-dark)]">{edu.institution} • {edu.location}</p>
                  <p className="text-sm text-[var(--gray-medium)]">
                    {edu.startDate} - {edu.isCurrentlyStudying ? 'Present' : edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-[var(--gray-dark)] mt-2 line-clamp-2">{edu.description}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => editEducation(edu)}
                    className="p-2 text-[var(--blue-primary)] hover:bg-[var(--blue-primary)]/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => removeEducation(edu.id)}
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

      {/* Add New Education Form */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[var(--gray-dark)]">
          {education.length > 0 ? 'Add Another Education' : 'Add Education'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Degree */}
          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Degree *
            </label>
            <input
              type="text"
              id="degree"
              value={currentEducation.degree}
              onChange={(e) => handleInputChange('degree', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Bachelor of Science in Computer Science"
            />
          </div>

          {/* Institution */}
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Institution *
            </label>
            <input
              type="text"
              id="institution"
              value={currentEducation.institution}
              onChange={(e) => handleInputChange('institution', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Stanford University"
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
            value={currentEducation.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            placeholder="e.g. Stanford, CA"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Start Date *
            </label>
            <input
              type="month"
              id="startDate"
              value={currentEducation.startDate}
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
              value={currentEducation.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              disabled={currentEducation.isCurrentlyStudying}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all disabled:bg-[var(--gray-light)] disabled:cursor-not-allowed"
            />
          </div>

          {/* GPA */}
          <div>
            <label htmlFor="gpa" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              GPA (Optional)
            </label>
            <input
              type="text"
              id="gpa"
              value={currentEducation.gpa}
              onChange={(e) => handleInputChange('gpa', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. 3.8/4.0"
            />
          </div>
        </div>

        {/* Currently Studying Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isCurrentlyStudying"
            checked={currentEducation.isCurrentlyStudying}
            onChange={(e) => handleInputChange('isCurrentlyStudying', e.target.checked)}
            className="w-4 h-4 text-[var(--blue-primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--blue-primary)] focus:ring-2"
          />
          <label htmlFor="isCurrentlyStudying" className="ml-2 text-sm text-[var(--gray-dark)]">
            I am currently studying here
          </label>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Additional Information
          </label>
          <textarea
            id="description"
            rows={3}
            value={currentEducation.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Relevant coursework, honors, activities, etc."
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
              onClick={() => setCurrentEducation({
                id: Date.now(),
                degree: '',
                institution: '',
                location: '',
                startDate: '',
                endDate: '',
                isCurrentlyStudying: false,
                gpa: '',
                description: ''
              })}
              className="px-6 py-2 border border-[var(--gray-light)] text-[var(--gray-dark)] rounded-lg hover:bg-[var(--gray-light)] transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={addEducation}
              className="px-6 py-2 bg-[var(--gray-medium)] text-white rounded-lg hover:bg-[var(--gray-dark)] transition-colors"
            >
              Add Education
            </button>
            <button
              type="button"
              onClick={goToNextSection}
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

export default EducationForm;