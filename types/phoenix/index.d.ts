declare module 'phoenix' {
  export class Socket {
    constructor(endPoint: string, opts?: any);
    connect(params?: any): void;
    disconnect(callback?: () => void): void;
    channel(topic: string, chanParams?: any): Channel;
  }
  export class Channel {
    join(timeout?: number): Push;
    leave(timeout?: number): Push;
    on(event: string, callback: (payload: any) => void): void;
    off(event: string, ref?: any): void;
    push(event: string, payload: any, timeout?: number): Push;
  }
  export class Push {
    receive(status: string, callback: (response: any) => any): Push;
  }
}

