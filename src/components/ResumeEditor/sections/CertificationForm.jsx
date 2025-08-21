import React, { useState } from 'react';
import { useResumeContext } from '../Editor';
import DownloadButton from '../DownloadButton';

const CertificationForm = () => {
  const { resumeData, updateResumeData, goToPreviousSection } = useResumeContext();
  const { certifications } = resumeData;
  
  const [currentCertification, setCurrentCertification] = useState({
    id: Date.now(),
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    neverExpires: false,
    description: ''
  });

  const handleInputChange = (field, value) => {
    setCurrentCertification(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addCertification = () => {
    if (currentCertification.name && currentCertification.issuer) {
      updateResumeData('certifications', [...certifications, currentCertification]);
      setCurrentCertification({
        id: Date.now(),
        name: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
        neverExpires: false,
        description: ''
      });
    }
  };

  const removeCertification = (id) => {
    updateResumeData('certifications', certifications.filter(cert => cert.id !== id));
  };

  const editCertification = (cert) => {
    setCurrentCertification(cert);
    removeCertification(cert.id);
  };

  const handleCompleteResume = () => {
    // Show completion message with download options
    const hasMinimumData = resumeData.personalInfo.firstName && 
                           resumeData.personalInfo.lastName && 
                           resumeData.personalInfo.email;
    
    if (hasMinimumData) {
      alert('🎉 Congratulations! Your resume is complete! Use the Download button in the top navigation to get your resume as PDF.');
    } else {
      alert('Please complete at least the Personal Information section (Name and Email) before finishing your resume.');
    }
  };

  const handleClear = () => {
    setCurrentCertification({
      id: Date.now(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      neverExpires: false,
      description: ''
    });
  };

  const popularCertifications = [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services' },
    { name: 'Google Cloud Professional Cloud Architect', issuer: 'Google Cloud' },
    { name: 'Microsoft Azure Fundamentals', issuer: 'Microsoft' },
    { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Cloud Native Computing Foundation' },
    { name: 'PMP - Project Management Professional', issuer: 'Project Management Institute' },
    { name: 'Certified ScrumMaster (CSM)', issuer: 'Scrum Alliance' },
    { name: 'CompTIA Security+', issuer: 'CompTIA' },
    { name: 'Cisco Certified Network Associate (CCNA)', issuer: 'Cisco' }
  ];

  const addPopularCertification = (cert) => {
    // Check if certification already exists
    const isAlreadyAdded = certifications.some(
      existing => existing.name.toLowerCase() === cert.name.toLowerCase()
    );
    
    if (!isAlreadyAdded) {
      const newCertification = {
        id: Date.now() + Math.random(),
        name: cert.name,
        issuer: cert.issuer,
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
        neverExpires: false,
        description: ''
      };
      updateResumeData('certifications', [...certifications, newCertification]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Certifications List */}
      {certifications.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--gray-dark)]">Added Certifications</h3>
          {certifications.map((cert) => (
            <div key={cert.id} className="p-4 border border-[var(--gray-light)] rounded-lg bg-[var(--gray-light)]/30">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--black)]">{cert.name}</h4>
                  <p className="text-[var(--gray-dark)]">{cert.issuer}</p>
                  <div className="text-sm text-[var(--gray-medium)] mt-1">
                    <span>Issued: {cert.issueDate}</span>
                    {cert.expiryDate && !cert.neverExpires && (
                      <span> • Expires: {cert.expiryDate}</span>
                    )}
                    {cert.neverExpires && (
                      <span> • No Expiration</span>
                    )}
                  </div>
                  {cert.credentialId && (
                    <p className="text-sm text-[var(--gray-medium)] mt-1">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--blue-primary)] hover:underline mt-1 inline-block"
                    >
                      View Credential
                    </a>
                  )}
                  {cert.description && (
                    <p className="text-sm text-[var(--gray-dark)] mt-2 line-clamp-2">{cert.description}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => editCertification(cert)}
                    className="p-2 text-[var(--blue-primary)] hover:bg-[var(--blue-primary)]/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => removeCertification(cert.id)}
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

      {/* Popular Certifications */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--gray-dark)]">Popular Certifications (Click to add):</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {popularCertifications.map((cert, index) => {
            const isAlreadyAdded = certifications.some(
              existing => existing.name.toLowerCase() === cert.name.toLowerCase()
            );
            
            return (
              <button
                key={index}
                onClick={() => addPopularCertification(cert)}
                disabled={isAlreadyAdded}
                className={`p-3 text-left border rounded-lg transition-colors ${
                  isAlreadyAdded
                    ? 'border-[var(--blue-primary)]/30 bg-[var(--blue-primary)]/10 cursor-not-allowed opacity-60'
                    : 'border-[var(--gray-light)] hover:bg-[var(--gray-light)]/50 hover:border-[var(--blue-primary)]'
                }`}
                title={isAlreadyAdded ? 'Already added' : `Click to add ${cert.name}`}
              >
                <div className={`font-medium text-sm ${
                  isAlreadyAdded ? 'text-[var(--blue-primary)]' : 'text-[var(--black)]'
                }`}>
                  {isAlreadyAdded ? '✓ ' : ''}{cert.name}
                </div>
                <div className="text-xs text-[var(--gray-medium)]">{cert.issuer}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add New Certification Form */}
      <div className="space-y-6 pt-6 border-t border-[var(--gray-light)]">
        <h3 className="text-lg font-semibold text-[var(--gray-dark)]">
          {certifications.length > 0 ? 'Add Another Certification' : 'Add Certification'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Certification Name */}
          <div>
            <label htmlFor="certName" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Certification Name *
            </label>
            <input
              type="text"
              id="certName"
              value={currentCertification.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. AWS Certified Solutions Architect"
            />
          </div>

          {/* Issuing Organization */}
          <div>
            <label htmlFor="issuer" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Issuing Organization *
            </label>
            <input
              type="text"
              id="issuer"
              value={currentCertification.issuer}
              onChange={(e) => handleInputChange('issuer', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Amazon Web Services"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Issue Date */}
          <div>
            <label htmlFor="issueDate" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Issue Date *
            </label>
            <input
              type="month"
              id="issueDate"
              value={currentCertification.issueDate}
              onChange={(e) => handleInputChange('issueDate', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Expiry Date
            </label>
            <input
              type="month"
              id="expiryDate"
              value={currentCertification.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              disabled={currentCertification.neverExpires}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all disabled:bg-[var(--gray-light)] disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Never Expires Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="neverExpires"
            checked={currentCertification.neverExpires}
            onChange={(e) => handleInputChange('neverExpires', e.target.checked)}
            className="w-4 h-4 text-[var(--blue-primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--blue-primary)] focus:ring-2"
          />
          <label htmlFor="neverExpires" className="ml-2 text-sm text-[var(--gray-dark)]">
            This certification does not expire
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credential ID */}
          <div>
            <label htmlFor="credentialId" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Credential ID
            </label>
            <input
              type="text"
              id="credentialId"
              value={currentCertification.credentialId}
              onChange={(e) => handleInputChange('credentialId', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="e.g. ABC123XYZ"
            />
          </div>

          {/* Credential URL */}
          <div>
            <label htmlFor="credentialUrl" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
              Credential URL
            </label>
            <input
              type="url"
              id="credentialUrl"
              value={currentCertification.credentialUrl}
              onChange={(e) => handleInputChange('credentialUrl', e.target.value)}
              className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all"
              placeholder="https://credential-verification-url.com"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[var(--gray-dark)] mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            rows={3}
            value={currentCertification.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-[var(--gray-light)] rounded-lg focus:ring-2 focus:ring-[var(--blue-primary)] focus:border-transparent outline-none transition-all resize-none"
            placeholder="Brief description of what this certification covers..."
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
              onClick={addCertification}
              className="px-6 py-2 bg-[var(--gray-medium)] text-white rounded-lg hover:bg-[var(--gray-dark)] transition-colors"
            >
              Add Certification
            </button>
            <button
              type="button"
              onClick={handleCompleteResume}
              className="px-6 py-2 bg-[var(--red-primary)] text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              🎉 Complete Resume
            </button>
          </div>
        </div>
      </div>

      {/* Completion Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-[var(--blue-primary)]/10 to-[var(--red-primary)]/10 border border-[var(--blue-primary)]/20 rounded-lg">
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-[var(--black)] mb-2">Resume Complete!</h3>
            <p className="text-[var(--gray-dark)] mb-4">
              Your professional resume is ready. Download it as a PDF or print it directly.
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-4">
            <DownloadButton />
            <div className="text-[var(--gray-medium)]">or</div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 border border-[var(--blue-primary)] text-[var(--blue-primary)] rounded-lg hover:bg-[var(--blue-primary)] hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9V2C6 1.46957 6.21071 0.960859 6.58579 0.585786C6.96086 0.210714 7.46957 0 8 0H16C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 14H6V22H18V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Quick Print
            </button>
          </div>
          
          <div className="mt-4 text-sm text-[var(--gray-medium)]">
            💡 Tip: You can always come back and edit your resume anytime!
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationForm;