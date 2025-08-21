import React from 'react';
import { useResumeContext } from '../Editor';

const PersonalInfoForm = () => {
  const { resumeData, updateResumeData, goToNextSection } = useResumeContext();
  const { personalInfo } = resumeData;

  const handleInputChange = (field, value) => {
    updateResumeData('personalInfo', {
      ...personalInfo,
      [field]: value
    });
  };

  const handleSaveAndContinue = () => {
    // Basic validation - check if required fields are filled
    if (personalInfo.firstName && personalInfo.lastName && personalInfo.email && personalInfo.phone) {
      goToNextSection();
    } else {
      alert('Please fill in all required fields (First Name, Last Name, Email, and Phone)');
    }
  };

  const handleClear = () => {
    updateResumeData('personalInfo', {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      summary: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            value={personalInfo.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            value={personalInfo.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={personalInfo.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
          placeholder="City, State, Country"
        />
      </div>

      {/* Professional Summary */}
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
          Professional Summary
        </label>
        <textarea
          id="summary"
          rows={4}
          value={personalInfo.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all resize-none"
          placeholder="Write a brief professional summary about yourself..."
        />
        <p className="text-sm text-[var(--gray-medium)] mt-1">
          {personalInfo.summary.length}/500 characters
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-[var(--gray-light)]">
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-2 border border-[var(--gray-light)] text-[var(--gray-dark)] rounded-lg hover:bg-[var(--gray-light)] transition-colors"
        >
          Clear
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
  );
};

export default PersonalInfoForm;