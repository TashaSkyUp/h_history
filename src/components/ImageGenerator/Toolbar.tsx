import React from 'react';
import { Download, RefreshCw } from 'lucide-react';

interface ToolbarProps {
    onDownload: () => void;
    onReset: () => void;
    isGenerating: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onDownload, onReset, isGenerating }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            padding: '16px',
            background: '#fff',
            borderBottom: '1px solid #e9ecef',
            marginBottom: '20px'
        }}>
            <button
                onClick={onReset}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    background: '#fff',
                    color: '#495057',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                }}
            >
                <RefreshCw size={16} /> Reset
            </button>
            <button
                onClick={onDownload}
                disabled={isGenerating}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    background: isGenerating ? '#6c757d' : '#28a745',
                    color: '#fff',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                }}
            >
                <Download size={16} /> {isGenerating ? 'Generating...' : 'Download Image'}
            </button>
        </div>
    );
};
