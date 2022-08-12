// Remove Symbol as a valid keyof type
// See https://github.com/microsoft/TypeScript/issues/23724
export type ExcludeSymbolKeys<T> = Extract<keyof T, string>
