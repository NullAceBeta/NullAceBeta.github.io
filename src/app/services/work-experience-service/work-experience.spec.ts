import { TestBed } from '@angular/core/testing';

import { WorkExperience } from './work-experience';

describe('WorkExperience', () => {
  let service: WorkExperience;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkExperience);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
