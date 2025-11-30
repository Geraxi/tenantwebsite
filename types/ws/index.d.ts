declare module 'ws' {
  export class WebSocket {
    constructor(address: string | URL, protocols?: string | string[], options?: any);
    addEventListener(type: string, listener: (...args: any[]) => void): void;
    removeEventListener(type: string, listener: (...args: any[]) => void): void;
    send(data: string | ArrayBuffer | Blob | ArrayBufferView): void;
    close(code?: number, reason?: string): void;
    readonly readyState: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
    readonly CLOSING: number;
    readonly CLOSED: number;
    onopen: ((event: any) => void) | null;
    onclose: ((event: any) => void) | null;
    onerror: ((event: any) => void) | null;
    onmessage: ((event: any) => void) | null;
  }
  export class Server {
    constructor(options?: any);
    on(event: string, callback: (...args: any[]) => void): void;
    close(callback?: () => void): void;
  }
}

