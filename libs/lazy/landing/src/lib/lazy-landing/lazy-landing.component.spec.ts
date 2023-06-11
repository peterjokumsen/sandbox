import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyLandingComponent } from './lazy-landing.component';

describe('LazyLandingComponent', () => {
  let component: LazyLandingComponent;
  let fixture: ComponentFixture<LazyLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyLandingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LazyLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
