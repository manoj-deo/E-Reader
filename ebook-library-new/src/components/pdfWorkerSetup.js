import { pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;