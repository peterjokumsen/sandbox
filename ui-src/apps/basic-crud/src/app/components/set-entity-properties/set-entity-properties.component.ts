import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormComponent,
  FormSchema,
  FormSchemaBaseProperty,
} from '@pj-sandbox/ui';

@Component({
  selector: 'sandbox-set-entity-properties',
  standalone: true,
  imports: [CommonModule, FormComponent],
  template: `
    <pj-ui-form
      [schema]="schema"
      (valueChange)="entityValue = $event"
    ></pj-ui-form>
    <button
      type="button"
      class="btn btn-primary"
      (click)="parseEntitySchema(entityValue)"
    >
      Save
    </button>
  `,
  styles: [``],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetEntityPropertiesComponent {
  entityValue: { props: string[] } = { props: ['value'] };

  @Output() entitySchemaChange = new EventEmitter<FormSchema>();

  schema: FormSchema = {
    title: 'Set Entity Properties',
    description: 'Set the properties to use for entities',
    properties: {
      props: {
        type: 'array',
        label: 'Properties',
        items: { type: 'string' },
        default: [{ type: 'string', disabled: true, default: 'value' }],
      },
    },
  };

  parseEntitySchema(value: { props: string[] }) {
    this.entitySchemaChange.emit({
      title: 'Entity',
      properties: value.props.reduce((acc, curr) => {
        acc[curr] = { type: 'string', label: `Value for [${curr}]` };
        return acc;
      }, {} as { [key: string]: FormSchemaBaseProperty }),
    });
  }
}
