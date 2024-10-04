import { IViewLineTokens } from '../../../tokens/lineTokens.js';
import { BracketAstNode, TextAstNode } from './ast.js';
import { BracketTokens, LanguageAgnosticBracketTokens } from './brackets.js';
import { Length } from './length.js';
import { SmallImmutableSet } from './smallImmutableSet.js';
export interface Tokenizer {
    readonly offset: Length;
    readonly length: Length;
    read(): Token | null;
    peek(): Token | null;
    skip(length: Length): void;
    getText(): string;
}
export declare const enum TokenKind {
    Text = 0,
    OpeningBracket = 1,
    ClosingBracket = 2
}
export type OpeningBracketId = number;
export declare class Token {
    readonly length: Length;
    readonly kind: TokenKind;
    readonly bracketId: OpeningBracketId;
    readonly bracketIds: SmallImmutableSet<OpeningBracketId>;
    readonly astNode: BracketAstNode | TextAstNode | undefined;
    constructor(length: Length, kind: TokenKind, bracketId: OpeningBracketId, bracketIds: SmallImmutableSet<OpeningBracketId>, astNode: BracketAstNode | TextAstNode | undefined);
}
export interface ITokenizerSource {
    getValue(): string;
    getLineCount(): number;
    getLineLength(lineNumber: number): number;
    tokenization: {
        getLineTokens(lineNumber: number): IViewLineTokens;
    };
}
export declare class TextBufferTokenizer implements Tokenizer {
    private readonly textModel;
    private readonly bracketTokens;
    private readonly textBufferLineCount;
    private readonly textBufferLastLineLength;
    private readonly reader;
    constructor(textModel: ITokenizerSource, bracketTokens: LanguageAgnosticBracketTokens);
    private _offset;
    get offset(): Length;
    get length(): Length;
    getText(): string;
    skip(length: Length): void;
    private didPeek;
    private peeked;
    read(): Token | null;
    peek(): Token | null;
}
export declare class FastTokenizer implements Tokenizer {
    private readonly text;
    private _offset;
    private readonly tokens;
    private idx;
    constructor(text: string, brackets: BracketTokens);
    get offset(): Length;
    readonly length: Length;
    read(): Token | null;
    peek(): Token | null;
    skip(length: Length): void;
    getText(): string;
}