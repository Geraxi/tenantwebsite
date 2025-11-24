declare module 'react' {
  export function useState<T = any>(initial?: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useContext<T>(context: any): T;
  export function useReducer<R, I>(reducer: (state: R, action: any) => R, initializerArg: I, initializer?: (arg: I) => R): [R, (action: any) => void];
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useMemo<T>(factory: () => T, deps: any[] | undefined): T;
  export function useRef<T = any>(initialValue?: T): { current: T };
  export function useImperativeHandle(ref: any, createHandle: () => any, deps?: any[]): void;
  export function useLayoutEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useDebugValue(value: any, format?: (value: any) => any): void;
  export const Fragment: any;
  export const Suspense: any;
  export const lazy: any;
  export const memo: any;
  export const createContext: any;
  export const forwardRef: any;
  export type FormEvent<T = any> = any;
  export type ChangeEvent<T = any> = any;
  export type ReactNode = any;
  export type CSSProperties = any;
  export type ComponentType<P = any> = any;

  const React: any;
  export default React;
}

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
  export type UseFormReturn<T> = any;
  export type SubmitHandler<T> = any;
}

declare module '@hookform/resolvers/zod' {
  export const zodResolver: any;
}

declare module 'next/navigation' {
  export function useRouter(): any;
  export function usePathname(): any;
  export function useSearchParams(): any;
  export function redirect(url: string): any;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'lucide-react' {
  export const Mail: any;
  export const Lock: any;
  export const User: any;
  export const ArrowRight: any;
  export const Loader2: any;
  export const Check: any;
  export const X: any;
  // Add others as needed
}
