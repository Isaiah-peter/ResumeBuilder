import React from 'react';
import { useResumeContext } from '../Editor';

const ContactForm = () => {
  const { resumeData, updateResumeData, goToNextSection, goToPreviousSection } = useResumeContext();
  const { contact } = resumeData;

  const handleInputChange = (field, value) => {
    updateResumeData('contact', {
      ...contact,
      [field]: value
    });
  };

  const contactFields = [
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      placeholder: 'https://linkedin.com/in/your-profile',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      placeholder: 'https://github.com/your-username',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 19C4 20.5 4 16.5 2 16M22 16V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H16C15.4696 21 14.9609 20.7893 14.5858 20.4142C14.2107 20.0391 14 19.5304 14 19V16.13C14.0375 15.6532 13.9731 15.1738 13.811 14.7238C13.6489 14.2738 13.3929 13.8634 13.06 13.52C16.2 13.17 19.5 11.98 19.5 6.52C19.4997 5.12383 18.9627 3.7812 18 2.77C18.4559 1.54851 18.4236 0.196583 17.91 -0.999996C17.91 -0.999996 16.73 -1.35 14 0.66C11.708 0.00999965 9.292 0.00999965 7 0.66C4.27 -1.35 3.09 -0.999996 3.09 -0.999996C2.57638 0.196583 2.54414 1.54851 3 2.77C2.03013 3.78866 1.49252 5.1434 1.5 6.55C1.5 11.97 4.8 13.16 7.94 13.53C7.611 13.8714 7.35726 14.2769 7.19531 14.7224C7.03335 15.1679 6.96681 15.6441 7 16.12V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'website',
      label: 'Personal Website',
      placeholder: 'https://your-website.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      placeholder: 'https://your-portfolio.com',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-lg font-semibold text-[var(--gray-dark)] mb-2">Professional Links</h3>
        <p className="text-[var(--gray-medium)]">
          Add your professional social media profiles and websites to help employers connect with you
        </p>
      </div>

      <div className="space-y-6">
        {contactFields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              {field.label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--gray-medium)]">
                {field.icon}
              </div>
              <input
                type="url"
                id={field.id}
                value={contact[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
                placeholder={field.placeholder}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Preview Section */}
      <div className="mt-8 p-4 bg-[var(--gray-light)]/30 rounded-lg">
        <h4 className="text-sm font-medium text-[var(--gray-dark)] mb-3">Preview</h4>
        <div className="space-y-2">
          {contactFields.map((field) => {
            const value = contact[field.id];
            if (!value) return null;
            
            return (
              <div key={field.id} className="flex items-center gap-3 text-sm">
                <span className="text-[var(--gray-medium)]">{field.icon}</span>
                <span className="text-[var(--gray-dark)]">{field.label}:</span>
                <a 
                  href={value} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--blue-primary)] hover:underline truncate"
                >
                  {value}
                </a>
              </div>
            );
          })}
          
          {!contactFields.some(field => contact[field.id]) && (
            <p className="text-[var(--gray-medium)] text-sm italic">
              No contact information added yet
            </p>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-[var(--blue-primary)]/5 border border-[var(--blue-primary)]/20 rounded-lg">
        <h4 className="text-sm font-medium text-[var(--blue-primary)] mb-2 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Tips for Professional Links
        </h4>
        <ul className="text-sm text-[var(--gray-dark)] space-y-1">
          <li>• Make sure your LinkedIn profile is complete and up-to-date</li>
          <li>• Include your best projects in your GitHub repositories</li>
          <li>• Ensure your portfolio showcases your best work</li>
          <li>• Use a professional domain name for your personal website</li>
          <li>• Test all links to make sure they work correctly</li>
        </ul>
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
            onClick={() => updateResumeData('contact', {
              linkedin: '',
              github: '',
              website: '',
              portfolio: ''
            })}
            className="px-6 py-2 border border-[var(--gray-light)] text-[var(--gray-dark)] rounded-lg hover:bg-[var(--gray-light)] transition-colors"
          >
            Clear All
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
  );
};

export default ContactForm;