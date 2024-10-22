import { TestBed } from '@angular/core/testing';

import { LogoutInterceptorService } from './logout-interceptor.service';

describe('LogoutInterceptorService', () => {
  let service: LogoutInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoutInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
