"use client"


import { FiAlertTriangle, FiLoader } from 'react-icons/fi';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PdfViewerProps {
    fileUrl: string;
    scale: number;
}

const LoadingViewer = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-12 px-4 gap-3 animate-pulse">
            <FiLoader className="w-6 h-6 text-indigo-500 animate-spin" />
            <p className="text-zinc-400 font-mono text-xs tracking-wide">
                Carregando currículo...
            </p>
        </div>
    )
}

const ErrorViewer = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-12 px-4 gap-3 border border-red-900/30 bg-red-950/10 rounded-xl">
            <FiAlertTriangle className="w-6 h-6 text-red-400" />
            <p className="text-red-400 font-mono text-xs tracking-wide text-center">
                Erro ao abrir o currículo.
            </p>
        </div>
    )
}

export default function PdfViewer({ fileUrl, scale }: PdfViewerProps) {
    return (
        <div className="w-full h-full min-h-[450px] overflow-auto bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/50 block text-center [scrollbar-width:thin] [scrollbar-color:#27272a_transparent]">
            <Document
                file={fileUrl}
                loading={<LoadingViewer />}
                error={<ErrorViewer />}
            >
                <Page
                    pageNumber={1}
                    scale={scale}
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                    className="transition-transform duration-200 ease-out inline-block origin-top-center shrink-0 select-none max-w-none"
                />
            </Document>
        </div>
    )
}