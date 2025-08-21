import React, { useState } from 'react';
import { useResumeContext } from './Editor';
import { generateResumePDF, generateResumeJSON } from '../../utils/pdfGenerator';

const DownloadButton = () => {
  const { resumeData } = useResumeContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setShowDropdown(false);
    
    try {
      const result = await generateResumePDF(resumeData);
      if (result.success) {
        // Show success message
        alert(`✅ Resume downloaded successfully as ${result.filename}`);
      } else {
        alert(`❌ Error generating PDF: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Error downloading resume: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadJSON = () => {
    setShowDropdown(false);
    
    try {
      const result = generateResumeJSON(resumeData);
      if (result.success) {
        alert(`✅ Resume data downloaded successfully as ${result.filename}`);
      } else {
        alert(`❌ Error generating JSON: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Error downloading data: ${error.message}`);
    }
  };

  const handlePrint = () => {
    setShowDropdown(false);
    
    // Create a new window with just the resume content
    const resumeElement = document.getElementById('resume-preview');
    if (resumeElement) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Resume - ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</title>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: 'Poppins', sans-serif; 
                background: white;
              }
              @media print {
                body { padding: 0; }
                .no-print { display: none; }
              }
              /* Copy your CSS variables here */
              :root {
                --white: #ffffff;
                --black: #000112;
                --gray-dark: #404553;
                --gray-medium: #4E4D4D;
                --gray-light: #E4E7EB;
                --blue-primary: rgb(0, 115, 230);
                --blue-dark: #2A50C1;
              }
            </style>
          </head>
          <body>
            ${resumeElement.outerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Check if resume has minimum required data
  const hasMinimumData = resumeData.personalInfo.firstName && 
                         resumeData.personalInfo.lastName && 
                         resumeData.personalInfo.email;

  if (!hasMinimumData) {
    return null; // Don't show download button if no minimum data
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={isGenerating}
        className="flex items-center gap-2 px-4 py-2 bg-[var(--red-primary)] text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[var(--gray-light)] z-50">
          <div className="py-2">
            <button
              onClick={handleDownloadPDF}
              className="w-full px-4 py-2 text-left hover:bg-[var(--gray-light)] transition-colors flex items-center gap-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="font-medium text-[var(--black)]">Download PDF</div>
                <div className="text-xs text-[var(--gray-medium)]">High-quality resume file</div>
              </div>
            </button>
            
            <button
              onClick={handlePrint}
              className="w-full px-4 py-2 text-left hover:bg-[var(--gray-light)] transition-colors flex items-center gap-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9V2C6 1.46957 6.21071 0.960859 6.58579 0.585786C6.96086 0.210714 7.46957 0 8 0H16C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 14H6V22H18V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="font-medium text-[var(--black)]">Print Resume</div>
                <div className="text-xs text-[var(--gray-medium)]">Print directly from browser</div>
              </div>
            </button>
            
            <button
              onClick={handleDownloadJSON}
              className="w-full px-4 py-2 text-left hover:bg-[var(--gray-light)] transition-colors flex items-center gap-3"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <div className="font-medium text-[var(--black)]">Export Data</div>
                <div className="text-xs text-[var(--gray-medium)]">JSON file for backup</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default DownloadButton;