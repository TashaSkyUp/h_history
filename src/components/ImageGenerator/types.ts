export interface TextStyles {
    fontSize: number;
    color: string;
    textAlign: 'left' | 'center' | 'right';
    fontFamily: string;
    fontWeight: string;
    textShadow: string;
    backgroundColor: string;
    padding: number;
}

export interface GeneratorState {
    headerImage: string | null;
    footerImage: string | null;
    text: string;
    styles: TextStyles;
    aspectRatio: '1:1' | '4:5' | '1.91:1';
}

export const DEFAULT_STYLES: TextStyles = {
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    textShadow: 'none',
    backgroundColor: 'transparent',
    padding: 20,
};
