import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Canvas } from './components/ImageGenerator/Canvas';
import { Controls } from './components/ImageGenerator/Controls';
import { Toolbar } from './components/ImageGenerator/Toolbar';
import type { GeneratorState, TextStyles } from './components/ImageGenerator/types';
import { DEFAULT_STYLES } from './components/ImageGenerator/types';
import './App.css';

function App() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [state, setState] = useState<GeneratorState>({
    headerImage: '/default_header.png',
    footerImage: null, // User can upload or we can add a default later
    text: 'Welcome to the Huerfano County History Project\n\nCreate your own social media posts to share local stories.',
    styles: { ...DEFAULT_STYLES },
    aspectRatio: '1:1'
  });

  const handleStateChange = (updates: Partial<GeneratorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleStyleChange = (updates: Partial<TextStyles>) => {
    setState(prev => ({
      ...prev,
      styles: { ...prev.styles, ...updates }
    }));
  };

  const handleReset = () => {
    setState({
      headerImage: '/default_header.png',
      footerImage: null,
      text: 'Welcome to the Huerfano County History Project\n\nCreate your own social media posts to share local stories.',
      styles: { ...DEFAULT_STYLES },
      aspectRatio: '1:1'
    });
  };

  const handleDownload = useCallback(async () => {
    if (canvasRef.current === null) {
      return;
    }

    setIsGenerating(true);

    try {
      // We need to wait a moment for any images to fully load if they were just changed
      // html-to-image usually handles this, but a small delay can be safer for external assets

      const dataUrl = await toPng(canvasRef.current, { cacheBust: true, pixelRatio: 1 });

      const link = document.createElement('a');
      link.download = `social-post-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [canvasRef]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Social Media Image Generator</h1>
      </header>

      <main className="main-content">
        <div className="sidebar">
          <Controls
            state={state}
            onChange={handleStateChange}
            onStyleChange={handleStyleChange}
          />
        </div>

        <div className="preview-area">
          <Toolbar
            onDownload={handleDownload}
            onReset={handleReset}
            isGenerating={isGenerating}
          />

          <div className="canvas-wrapper">
            <div className="canvas-scaler">
              <Canvas ref={canvasRef} state={state} />
            </div>
          </div>

          <p className="preview-hint">
            Preview scaled to fit screen. Downloaded image will be high resolution ({state.aspectRatio === '1:1' ? '1080x1080' : state.aspectRatio === '4:5' ? '1080x1350' : '1080x566'}).
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
