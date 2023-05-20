import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonListComponent } from './button-list.component';

describe('ButtonListComponent', () => {
  let component: ButtonListComponent<string>;
  let fixture: ComponentFixture<ButtonListComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonListComponent<string>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
