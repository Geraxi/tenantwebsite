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

