import { BundledTheme } from "shiki";
import { DiffChar, DiffLine } from "..";
interface HTMLOptions {
    theme?: string;
    customCSS?: string;
    containerClass?: string;
}
interface ConversionOptions extends HTMLOptions {
    transparent?: boolean;
    imageType: "svg";
    fontSize: number;
    fontFamily: string;
    dimensions: Dimensions;
    lineHeight: number;
}
interface Dimensions {
    width: number;
    height: number;
}
type DataUri = PngUri | SvgUri;
type PngUri = string;
type SvgUri = string;
export declare class CodeRenderer {
    private static instance;
    private currentTheme;
    private editorBackground;
    private editorForeground;
    private editorLineHighlight;
    private highlighter;
    private constructor();
    static getInstance(): CodeRenderer;
    setTheme(themeName: string): Promise<void>;
    init(): Promise<void>;
    close(): Promise<void>;
    themeExists(themeNameKebab: string): themeNameKebab is BundledTheme;
    highlightCode(code: string, language: string | undefined, currLineOffsetFromTop: number, newDiffLines: DiffLine[]): Promise<string>;
    convertToSVG(code: string, language: string | undefined, options: ConversionOptions, currLineOffsetFromTop: number, newDiffLines: DiffLine[], newDiffChars: DiffChar[]): Promise<Buffer>;
    convertShikiHtmlToSvgGut(shikiHtml: string, options: ConversionOptions, diffChars: DiffChar[]): {
        guts: string;
        lineBackgrounds: string;
    };
    getBackgroundColor(shikiHtml: string): string;
    getDataUri(code: string, language: string | undefined, options: ConversionOptions, currLineOffsetFromTop: number, newDiffLines: DiffLine[], newDiffChars: DiffChar[]): Promise<DataUri>;
}
export {};
//# sourceMappingURL=CodeRenderer.d.ts.map