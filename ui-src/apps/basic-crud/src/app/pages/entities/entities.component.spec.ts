import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntitiesComponent } from './entities.component';
import { createSpyObj, SpyObj } from '@sandbox/testing';
import { EntitiesApiService } from '@sandbox/entities-api';
import { TestLoggingModule } from '@sandbox/logging';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('EntitiesComponent', () => {
  let component: EntitiesComponent;
  let fixture: ComponentFixture<EntitiesComponent>;
  let apiSpy: SpyObj<EntitiesApiService>;

  beforeEach(async () => {
    apiSpy = createSpyObj<EntitiesApiService>('EntitiesApiService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [EntitiesComponent, TestLoggingModule],
      providers: [
        provideAnimations(),
        { provide: EntitiesApiService, useValue: apiSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
