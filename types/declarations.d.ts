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
