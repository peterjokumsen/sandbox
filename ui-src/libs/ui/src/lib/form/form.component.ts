import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ExtractType,
  FormSchema,
  FormSchemaArrayProperty,
  FormSchemaBaseProperty,
  FormSchemaObjectProperty,
  FormSchemaProperty,
} from './models';
import { Subject, takeUntil, tap } from 'rxjs';
import { LoggerService } from '@sandbox/logging';

@Component({
  selector: 'pj-ui-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent<T extends FormSchema = FormSchema>
  implements OnInit, OnDestroy {
  private _onDestroy$ = new Subject();
  private _fb = inject(FormBuilder);
  private _logger = inject(LoggerService);

  @Input() schema: T | undefined;
  @Output() updated = new EventEmitter<ExtractType<T['properties']>>();

  keys: string[] = [];
  keyMapping: {
    [key: string]: FormSchemaArrayProperty | FormSchemaBaseProperty;
  } = {};
  formGroup: FormGroup | undefined;

  private isObjectProperty(
    property: FormSchemaProperty,
  ): property is FormSchemaObjectProperty {
    return property.type === 'object';
  }

  private isArrayProperty(
    property: FormSchemaProperty,
  ): property is FormSchemaArrayProperty {
    return property.type === 'array';
  }

  private buildForm(
    properties: { [p: string]: FormSchemaProperty },
    parentKey?: string,
  ) {
    const formGroup: { [p: string]: unknown } = {};
    for (const [key, property] of Object.entries(properties)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      this.keys.push(newKey);
      this.keyMapping[newKey] = property;

      if (this.isObjectProperty(property)) {
        formGroup[key] = this._fb.group(
          this.buildForm(property.properties, newKey),
        );
      } else if (this.isArrayProperty(property)) {
        const controls: FormControl[] = property.default?.map(
            (d) =>
              typeof d === 'string'
                ? this._fb.control(d)
                : this._fb.control({
                  value: d.default,
                  disabled: d.disabled ?? false,
                }))
          ?? [this._fb.control(property.default)];
        formGroup[key] = this._fb.array(controls);
      } else {
        formGroup[key] = this._fb.control({ value: property.default ?? '', disabled: property.disabled ?? false });
      }
    }

    this._logger.log('buildForm | Form Group: ', formGroup, 'properties', properties);
    return formGroup;
  }

  ngOnInit(): void {
    if (!this.schema) return;

    this.formGroup = this._fb.group(this.buildForm(this.schema.properties));

    this.updated.emit(this.formGroup?.getRawValue());
    this.formGroup.valueChanges
    .pipe(
      takeUntil(this._onDestroy$),
      tap(() => this.updated.emit(this.formGroup?.getRawValue())),
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(null);
    this._onDestroy$.complete();
  }

  isGroup(key: string): boolean {
    return this.isObjectProperty(this.keyMapping[key]);
  }

  isArray(key: string): boolean {
    return this.isArrayProperty(this.keyMapping[key]);
  }

  isControl(key: string): boolean {
    return !this.isArrayProperty(this.keyMapping[key]);
  }

  hasProperties(
    value: FormSchema | FormSchemaProperty | undefined,
  ): value is FormSchema | FormSchemaObjectProperty {
    return 'properties' in (value ?? {});
  }

  getGroupControls(key: string): string[] {
    const prop = key === '' ? this.schema : this.keyMapping[key];
    if (!this.hasProperties(prop)) return [];

    return Object.keys(prop.properties).map((k) => (key ? `${key}.${k}` : k));
  }

  getArrayControl(key: string): FormArray {
    return this.formGroup?.get(key) as FormArray;
  }

  getFormControl(key: string, i?: number): FormControl {
    if (this.isArray(key)) {
      return this.getArrayControl(key).at(i ?? 0) as FormControl;
    }

    return this.formGroup?.get(key) as FormControl;
  }

  getLabel(key: string): string {
    if (key === '') return this.schema?.title ?? '';

    return this.keyMapping[key].label;
  }

  getDescription(key: string): string | undefined {
    if (key === '') return this.schema?.description;

    return this.keyMapping[key].description;
  }

  addItem(key: string): void {
    const prop = this.keyMapping[key];
    if (!this.isArrayProperty(prop)) return;

    this.getArrayControl(key).push(
      this._fb.control(prop.items.default),
    );
  }

  removeItem(key: string, index: number): void {
    this.getArrayControl(key).removeAt(index);
  }
}
