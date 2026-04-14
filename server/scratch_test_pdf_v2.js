const { PDFParse } = require('pdf-parse');
console.log('PDFParse type:', typeof PDFParse);
// Attempt a mock call if it's a function
if (typeof PDFParse === 'function') {
    console.log('PDFParse is a function');
} else {
    console.log('PDFParse is not a function');
}
