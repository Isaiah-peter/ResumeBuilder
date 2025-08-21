import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateResumePDF = async (resumeData) => {
  try {
    // Get the resume preview element
    const resumeElement = document.getElementById('resume-preview');
    
    if (!resumeElement) {
      throw new Error('Resume preview element not found');
    }

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(resumeElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 595, // A4 width in pixels at 72 DPI
      height: 842, // A4 height in pixels at 72 DPI
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    // Calculate dimensions to fit A4
    const imgWidth = 595;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add the canvas as an image to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Generate filename with user's name
    const firstName = resumeData.personalInfo.firstName || 'Resume';
    const lastName = resumeData.personalInfo.lastName || '';
    const filename = `${firstName}_${lastName}_Resume.pdf`.replace(/\s+/g, '_');

    // Download the PDF
    pdf.save(filename);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: error.message };
  }
};

export const generateResumeJSON = (resumeData) => {
  try {
    // Create a clean copy of resume data
    const cleanData = {
      ...resumeData,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(cleanData, null, 2);
    
    // Create blob and download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const firstName = resumeData.personalInfo.firstName || 'Resume';
    const lastName = resumeData.personalInfo.lastName || '';
    const filename = `${firstName}_${lastName}_Resume_Data.json`.replace(/\s+/g, '_');
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Error generating JSON:', error);
    return { success: false, error: error.message };
  }
};