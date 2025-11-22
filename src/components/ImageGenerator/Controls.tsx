import React from 'react';
import { GeneratorState, TextStyles } from './types';
import { Upload, Type, Palette, Layout, Image as ImageIcon } from 'lucide-react';

interface ControlsProps {
    state: GeneratorState;
    onChange: (updates: Partial<GeneratorState>) => void;
    onStyleChange: (updates: Partial<TextStyles>) => void;
}

export const Controls: React.FC<ControlsProps> = ({ state, onChange, onStyleChange }) => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: 'headerImage' | 'footerImage') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onChange({ [key]: event.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="controls-container" style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', height: '100%', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Palette size={20} /> Editor Controls
            </h2>

            {/* Layout Section */}
            <div className="control-section" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', color: '#495057', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layout size={16} /> Layout
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {(['1:1', '4:5', '1.91:1'] as const).map((ratio) => (
                        <button
                            key={ratio}
                            onClick={() => onChange({ aspectRatio: ratio })}
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ced4da',
                                borderRadius: '4px',
                                background: state.aspectRatio === ratio ? '#007bff' : '#fff',
                                color: state.aspectRatio === ratio ? '#fff' : '#495057',
                                cursor: 'pointer',
                                flex: 1
                            }}
                        >
                            {ratio}
                        </button>
                    ))}
                </div>
            </div>

            {/* Images Section */}
            <div className="control-section" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', color: '#495057', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ImageIcon size={16} /> Images
                </h3>

                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Header Image</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <label style={{
                            flex: 1,
                            padding: '8px',
                            border: '1px dashed #ced4da',
                            borderRadius: '4px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: '#fff',
                            fontSize: '0.9rem'
                        }}>
                            <Upload size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Upload
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'headerImage')} style={{ display: 'none' }} />
                        </label>
                        {state.headerImage && (
                            <button
                                onClick={() => onChange({ headerImage: null })}
                                style={{ padding: '8px', border: '1px solid #dc3545', color: '#dc3545', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Footer Image</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <label style={{
                            flex: 1,
                            padding: '8px',
                            border: '1px dashed #ced4da',
                            borderRadius: '4px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: '#fff',
                            fontSize: '0.9rem'
                        }}>
                            <Upload size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Upload
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'footerImage')} style={{ display: 'none' }} />
                        </label>
                        {state.footerImage && (
                            <button
                                onClick={() => onChange({ footerImage: null })}
                                style={{ padding: '8px', border: '1px solid #dc3545', color: '#dc3545', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className="control-section" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', color: '#495057', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Type size={16} /> Content
                </h3>
                <textarea
                    value={state.text}
                    onChange={(e) => onChange({ text: e.target.value })}
                    placeholder="Enter your post text here..."
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '8px',
                        border: '1px solid #ced4da',
                        borderRadius: '4px',
                        fontSize: '0.95rem',
                        resize: 'vertical'
                    }}
                />
            </div>

            {/* Typography Styles */}
            <div className="control-section">
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '12px', color: '#495057' }}>Typography</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.8rem' }}>Font Size</label>
                        <input
                            type="number"
                            value={state.styles.fontSize}
                            onChange={(e) => onStyleChange({ fontSize: Number(e.target.value) })}
                            style={{ width: '100%', padding: '6px', border: '1px solid #ced4da', borderRadius: '4px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.8rem' }}>Padding</label>
                        <input
                            type="number"
                            value={state.styles.padding}
                            onChange={(e) => onStyleChange({ padding: Number(e.target.value) })}
                            style={{ width: '100%', padding: '6px', border: '1px solid #ced4da', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.8rem' }}>Text Color</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="color"
                            value={state.styles.color}
                            onChange={(e) => onStyleChange({ color: e.target.value })}
                            style={{ height: '38px', width: '50px', padding: '0', border: 'none', cursor: 'pointer' }}
                        />
                        <input
                            type="text"
                            value={state.styles.color}
                            onChange={(e) => onStyleChange({ color: e.target.value })}
                            style={{ flex: 1, padding: '6px', border: '1px solid #ced4da', borderRadius: '4px' }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.8rem' }}>Background Color</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="color"
                            value={state.styles.backgroundColor === 'transparent' ? '#ffffff' : state.styles.backgroundColor}
                            onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
                            style={{ height: '38px', width: '50px', padding: '0', border: 'none', cursor: 'pointer' }}
                        />
                        <button
                            onClick={() => onStyleChange({ backgroundColor: 'transparent' })}
                            style={{ padding: '0 12px', border: '1px solid #ced4da', background: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.8rem' }}>Alignment</label>
                    <div style={{ display: 'flex', border: '1px solid #ced4da', borderRadius: '4px', overflow: 'hidden' }}>
                        {(['left', 'center', 'right'] as const).map((align) => (
                            <button
                                key={align}
                                onClick={() => onStyleChange({ textAlign: align })}
                                style={{
                                    flex: 1,
                                    padding: '6px',
                                    border: 'none',
                                    borderRight: align !== 'right' ? '1px solid #ced4da' : 'none',
                                    background: state.styles.textAlign === align ? '#e9ecef' : '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                {align.charAt(0).toUpperCase() + align.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
