import { INavigator } from './navigator.js';
export declare class HistoryNavigator<T> implements INavigator<T> {
    private _history;
    private _limit;
    private _navigator;
    constructor(history?: readonly T[], limit?: number);
    getHistory(): T[];
    add(t: T): void;
    next(): T | null;
    previous(): T | null;
    current(): T | null;
    first(): T | null;
    last(): T | null;
    isFirst(): boolean;
    isLast(): boolean;
    isNowhere(): boolean;
    has(t: T): boolean;
    clear(): void;
    private _onChange;
    private _reduceToLimit;
    private _currentPosition;
    private _initialize;
    private get _elements();
}
export declare class HistoryNavigator2<T> {
    private capacity;
    private identityFn;
    private valueSet;
    private head;
    private tail;
    private cursor;
    private _size;
    get size(): number;
    constructor(history: readonly T[], capacity?: number, identityFn?: (t: T) => unknown);
    add(value: T): void;
    replaceLast(value: T): T;
    prepend(value: T): void;
    isAtEnd(): boolean;
    current(): T;
    previous(): T;
    next(): T;
    has(t: T): boolean;
    resetCursor(): T;
    [Symbol.iterator](): Iterator<T>;
    private _deleteFromList;
}