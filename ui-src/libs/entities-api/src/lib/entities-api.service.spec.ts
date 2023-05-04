import { TestBed } from '@angular/core/testing';

import { EntitiesApiService } from './entities-api.service';
import { HttpClient } from "@angular/common/http";
import { TestLoggingModule } from "@sandbox/logging";

type SpyOf<T> = Partial<{ [K in keyof T]: jest.Mock<T[K]> }>;

describe('EntitiesApiService', () => {
  let service: EntitiesApiService;
  let httpClientSpy: SpyOf<HttpClient>;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [TestLoggingModule],
      providers: [
        EntitiesApiService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(EntitiesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
