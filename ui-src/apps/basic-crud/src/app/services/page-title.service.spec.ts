import { TestBed } from '@angular/core/testing';

import { PageTitleService } from './page-title.service';
import { TestLoggingModule } from '@sandbox/logging';

describe('PageTitleService', () => {
  let service: PageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestLoggingModule],
    });
    service = TestBed.inject(PageTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
