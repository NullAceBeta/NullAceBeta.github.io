import { TestBed } from '@angular/core/testing';

import { Interests } from './interests';

describe('Interests', () => {
  let service: Interests;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Interests);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
