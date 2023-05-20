export type FormSchemaType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface FormSchemaBaseProperty {
  type: FormSchemaType;
  label: string;
  description?: string;
  required?: boolean;
}

export interface FormSchemaArrayProperty extends FormSchemaBaseProperty {
  type: 'array';
  items: FormSchemaBaseProperty;
}

export interface FormSchemaObjectProperty extends FormSchemaBaseProperty {
  type: 'object';
  properties: { [key: string]: FormSchemaProperty };
}

export type FormSchemaProperty = FormSchemaBaseProperty | FormSchemaArrayProperty | FormSchemaObjectProperty;

export interface FormSchema {
  properties: { [key: string]: FormSchemaProperty };
}
