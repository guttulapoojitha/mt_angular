import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthServiceService } from './auth-service.service';

describe('AuthServiceService', () => {
  let service: AuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule,]
    });
    service = TestBed.inject(AuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
