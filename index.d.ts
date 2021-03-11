export declare namespace md5 {
  export function hash(s: string): string;
}

export declare namespace sha1 {
  export function hash(s: string): string;
  export function sha1(s: string): number[];
}

export declare namespace xxh32 {
  export function hash(s: string, seed?: number): string;
  export function hashBytes(bytes: Uint8Array, seed?: number): string;
  export function xxHash32(buffer: Uint8Array, seed?: number): number;
}
