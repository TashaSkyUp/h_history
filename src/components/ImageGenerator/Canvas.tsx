import React, { forwardRef } from 'react';
import { GeneratorState } from './types';

interface CanvasProps {
    state: GeneratorState;
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(({ state }, ref) => {
    const { headerImage, footerImage, text, styles, aspectRatio } = state;

    // Calculate dimensions based on aspect ratio
    // Base width is 1080px (standard high-res social media width)
    const width = 1080;
    let height = 1080; // Default 1:1

    if (aspectRatio === '4:5') {
        height = 1350;
    } else if (aspectRatio === '1.91:1') {
        height = 566;
    }

    // We scale the preview down using CSS transform, but the actual DOM element is high-res

    return (
        <div
            ref={ref}
            className="canvas-node"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Header Image */}
            {headerImage && (
                <div style={{ width: '100%', flexShrink: 0 }}>
                    <img
                        src={headerImage}
                        alt="Header"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>
            )}

            {/* Content Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: `${styles.padding}px`,
                backgroundColor: styles.backgroundColor,
                overflow: 'hidden'
            }}>
                <p style={{
                    fontSize: `${styles.fontSize}px`,
                    color: styles.color,
                    textAlign: styles.textAlign,
                    fontFamily: styles.fontFamily,
                    fontWeight: styles.fontWeight,
                    textShadow: styles.textShadow,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.4,
                    width: '100%'
                }}>
                    {text || 'Your text goes here...'}
                </p>
            </div>

            {/* Footer Image */}
            {footerImage && (
                <div style={{ width: '100%', flexShrink: 0 }}>
                    <img
                        src={footerImage}
                        alt="Footer"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>
            )}
        </div>
    );
});

Canvas.displayName = 'Canvas';
