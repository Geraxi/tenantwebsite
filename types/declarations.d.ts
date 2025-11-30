// React types are provided by @types/react - no need to redeclare

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'zod' {
  export const z: any;
  export namespace z {
    export type infer<T> = any;
  }
}

declare module 'react-hook-form' {
  export function useForm<T = any>(props?: any): any;
  export function Controller(props: any): any;
  export function useFormContext<T = any>(): any;
  export function useFormState(props?: any): any;
  export const FormProvider: any;
  export type UseFormReturn<T> = any;
  export type SubmitHandler<T> = any;
  export type ControllerProps<TFieldValues = any, TName extends Path<TFieldValues> = any> = any;
  export type FieldPath<T = any> = any;
  export type FieldValues = any;
  export type Path<T> = any;
  export type PathValue<T, P extends Path<T>> = any;
}

declare module '@hookform/resolvers/zod' {
  export const zodResolver: any;
}

declare module 'next/navigation' {
  export function useRouter(): any;
  export function usePathname(): any;
  export function useSearchParams(): any;
  export function redirect(url: string): any;
  export function notFound(): never;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

// lucide-react types are now in types/lucide-react.d.ts

// Stub type declarations for implicit type libraries
declare module 'cookie' {
  export function parse(str: string, options?: any): any;
  export function serialize(name: string, val: string, options?: any): string;
}

declare module 'd3-array' {
  export const min: any;
  export const max: any;
  export const extent: any;
  export const sum: any;
  export const mean: any;
  export const median: any;
  export const quantile: any;
  export const variance: any;
  export const deviation: any;
  export const bisectLeft: any;
  export const bisectRight: any;
  export const bisector: any;
  export const ascending: any;
  export const descending: any;
  export const group: any;
  export const groups: any;
  export const rollup: any;
  export const rollups: any;
  export const index: any;
  export const indexes: any;
  export const groupSort: any;
  export const count: any;
  export const cross: any;
  export const merge: any;
  export const pairs: any;
  export const permute: any;
  export const range: any;
  export const shuffle: any;
  export const ticks: any;
  export const tickIncrement: any;
  export const tickStep: any;
  export const nice: any;
  export const thresholdFreedmanDiaconis: any;
  export const thresholdScott: any;
  export const thresholdSturges: any;
  export const bin: any;
  export const histogram: any;
  export const union: any;
  export const difference: any;
  export const disjoint: any;
  export const intersection: any;
  export const superset: any;
  export const subset: any;
}

declare module 'd3-ease' {
  export const easeLinear: any;
  export const easePolyIn: any;
  export const easePolyOut: any;
  export const easePolyInOut: any;
  export const easeQuadIn: any;
  export const easeQuadOut: any;
  export const easeQuadInOut: any;
  export const easeCubicIn: any;
  export const easeCubicOut: any;
  export const easeCubicInOut: any;
  export const easeSinIn: any;
  export const easeSinOut: any;
  export const easeSinInOut: any;
  export const easeExpIn: any;
  export const easeExpOut: any;
  export const easeExpInOut: any;
  export const easeCircleIn: any;
  export const easeCircleOut: any;
  export const easeCircleInOut: any;
  export const easeElasticIn: any;
  export const easeElasticOut: any;
  export const easeElasticInOut: any;
  export const easeBackIn: any;
  export const easeBackOut: any;
  export const easeBackInOut: any;
  export const easeBounceIn: any;
  export const easeBounceOut: any;
  export const easeBounceInOut: any;
}

declare module 'd3-interpolate' {
  export const interpolate: any;
  export const interpolateArray: any;
  export const interpolateBasis: any;
  export const interpolateBasisClosed: any;
  export const interpolateDate: any;
  export const interpolateDiscrete: any;
  export const interpolateHue: any;
  export const interpolateNumber: any;
  export const interpolateObject: any;
  export const interpolateRound: any;
  export const interpolateString: any;
  export const interpolateTransformCss: any;
  export const interpolateTransformSvg: any;
  export const interpolateZoom: any;
  export const interpolateRgb: any;
  export const interpolateRgbBasis: any;
  export const interpolateRgbBasisClosed: any;
  export const interpolateHsl: any;
  export const interpolateHslLong: any;
  export const interpolateLab: any;
  export const interpolateHcl: any;
  export const interpolateHclLong: any;
  export const interpolateCubehelix: any;
  export const interpolateCubehelixLong: any;
  export const piecewise: any;
  export const quantize: any;
}

declare module 'd3-scale' {
  export const scaleLinear: any;
  export const scaleIdentity: any;
  export const scaleTime: any;
  export const scaleUtc: any;
  export const scaleSequential: any;
  export const scaleSequentialLog: any;
  export const scaleSequentialPow: any;
  export const scaleSequentialSqrt: any;
  export const scaleSequentialSymlog: any;
  export const scaleSequentialQuantile: any;
  export const scaleDiverging: any;
  export const scaleDivergingLog: any;
  export const scaleDivergingPow: any;
  export const scaleDivergingSqrt: any;
  export const scaleDivergingSymlog: any;
  export const scaleQuantize: any;
  export const scaleQuantile: any;
  export const scaleThreshold: any;
  export const scaleOrdinal: any;
  export const scaleImplicit: any;
  export const scaleBand: any;
  export const scalePoint: any;
  export const scalePow: any;
  export const scaleSqrt: any;
  export const scaleLog: any;
  export const scaleSymlog: any;
}

declare module 'd3-shape' {
  export const arc: any;
  export const area: any;
  export const areaRadial: any;
  export const curveBasis: any;
  export const curveBasisClosed: any;
  export const curveBasisOpen: any;
  export const curveBumpX: any;
  export const curveBumpY: any;
  export const curveBundle: any;
  export const curveCardinal: any;
  export const curveCardinalClosed: any;
  export const curveCardinalOpen: any;
  export const curveCatmullRom: any;
  export const curveCatmullRomClosed: any;
  export const curveCatmullRomOpen: any;
  export const curveLinear: any;
  export const curveLinearClosed: any;
  export const curveMonotoneX: any;
  export const curveMonotoneY: any;
  export const curveNatural: any;
  export const curveStep: any;
  export const curveStepAfter: any;
  export const curveStepBefore: any;
  export const line: any;
  export const lineRadial: any;
  export const link: any;
  export const linkHorizontal: any;
  export const linkRadial: any;
  export const linkVertical: any;
  export const pie: any;
  export const pointRadial: any;
  export const radialArea: any;
  export const radialLine: any;
  export const symbol: any;
  export const symbolAsterisk: any;
  export const symbolCircle: any;
  export const symbolCross: any;
  export const symbolDiamond: any;
  export const symbolSquare: any;
  export const symbolStar: any;
  export const symbolTriangle: any;
  export const symbolWye: any;
  export const symbols: any;
  export const symbolsFill: any;
  export const symbolsStroke: any;
}

declare module 'd3-time' {
  export const timeInterval: any;
  export const timeMillisecond: any;
  export const timeSecond: any;
  export const timeMinute: any;
  export const timeHour: any;
  export const timeDay: any;
  export const timeWeek: any;
  export const timeSunday: any;
  export const timeMonday: any;
  export const timeTuesday: any;
  export const timeWednesday: any;
  export const timeThursday: any;
  export const timeFriday: any;
  export const timeSaturday: any;
  export const timeMonth: any;
  export const timeYear: any;
  export const timeTicks: any;
  export const timeTickInterval: any;
  export const utcMillisecond: any;
  export const utcSecond: any;
  export const utcMinute: any;
  export const utcHour: any;
  export const utcDay: any;
  export const utcWeek: any;
  export const utcSunday: any;
  export const utcMonday: any;
  export const utcTuesday: any;
  export const utcWednesday: any;
  export const utcThursday: any;
  export const utcFriday: any;
  export const utcSaturday: any;
  export const utcMonth: any;
  export const utcYear: any;
  export const utcTicks: any;
  export const utcTickInterval: any;
}

declare module 'd3-timer' {
  export const timer: any;
  export const timerFlush: any;
  export const now: any;
  export const timeout: any;
  export const interval: any;
}

declare module 'estree' {
  export interface Node {
    type: string;
  }
  export interface Program extends Node {
    type: 'Program';
    body: Node[];
  }
  export interface Literal extends Node {
    type: 'Literal';
    value: any;
  }
  export interface Identifier extends Node {
    type: 'Identifier';
    name: string;
  }
}

declare module 'json-schema' {
  export interface JSONSchema {
    type?: string | string[];
    properties?: { [key: string]: JSONSchema };
    items?: JSONSchema | JSONSchema[];
    required?: string[];
    [key: string]: any;
  }
}

declare module 'json5' {
  export function parse(text: string, reviver?: (key: any, value: any) => any): any;
  export function stringify(value: any, replacer?: any, space?: string | number): string;
}

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
