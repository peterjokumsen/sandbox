export type FormSchemaType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface FormSchemaBaseProperty {
  type: FormSchemaType;
  label: string;
  description?: string;
  required?: boolean;
  default?: string | number | unknown;
}

export interface FormSchemaArrayProperty extends FormSchemaBaseProperty {
  type: 'array';
  items: FormSchemaProperty;
}

export interface FormSchemaObjectProperty extends FormSchemaBaseProperty {
  type: 'object';
  properties: { [key: string]: FormSchemaProperty };
  default: never;
}

export type FormSchemaProperty = FormSchemaBaseProperty | FormSchemaArrayProperty | FormSchemaObjectProperty;

export interface FormSchema {
  properties: { [key: string]: FormSchemaProperty };
  title: string;
  description?: string;
}

export type ExtractType<T> = {
  [K in keyof T]: T[K] extends FormSchemaArrayProperty
    ? Array<ExtractType<T[K]['items']>>
    : T[K] extends FormSchemaObjectProperty
      ? ExtractType<T[K]['properties']>
      : T[K] extends FormSchemaBaseProperty & { type: infer Type }
        ? (Type extends 'string' ? string : Type extends 'number' ? number : Type extends 'boolean' ? boolean : unknown)
        : unknown;
};
