import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { FormBuilder } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let formBuilderSpy: jest.Mocked<FormBuilder>;

  beforeEach(async () => {
    formBuilderSpy = {
      group: jest.fn(),
      array: jest.fn(),
    } as unknown as jest.Mocked<FormBuilder>;

    await TestBed.configureTestingModule({
      providers: [
        // keep split
        { provide: FormBuilder, useValue: formBuilderSpy },
      ],
      imports: [FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
