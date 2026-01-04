import html2pdf from 'html2pdf.js';

export function generateResumePdf(selector = '.resume', filename = 'resume.pdf') {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  const opt = {
    margin:       0,
    filename:     filename,
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  { scale: 2, useCORS: true, logging: false },
    jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
  };

  // Return promise so callers can await if needed
  return html2pdf().set(opt).from(element).save();
}
