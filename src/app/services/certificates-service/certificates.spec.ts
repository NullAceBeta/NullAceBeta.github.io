import { TestBed } from '@angular/core/testing';

import { Certificates } from './certificates';

describe('Certificates', () => {
  let service: Certificates;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Certificates);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
