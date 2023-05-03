import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AskQuestionsComponent } from './ask-questions.component';
import { TestLoggingModule } from '@sandbox/logging';

describe('AskQuestionsComponent', () => {
  let component: AskQuestionsComponent;
  let fixture: ComponentFixture<AskQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLoggingModule],
      declarations: [AskQuestionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AskQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
