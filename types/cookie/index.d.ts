declare module 'cookie' {
  export function parse(str: string, options?: any): any;
  export function serialize(name: string, val: string, options?: any): string;
}

