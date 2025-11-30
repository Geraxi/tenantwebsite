declare module 'json-schema' {
  export interface JSONSchema {
    type?: string | string[];
    properties?: { [key: string]: JSONSchema };
    items?: JSONSchema | JSONSchema[];
    required?: string[];
    [key: string]: any;
  }
}

