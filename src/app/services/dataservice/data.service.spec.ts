import { TestBed, inject } from '@angular/core/testing';

import { LabeldataService } from './data.service';

describe('LabeldataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabeldataService]
    });
  });

  it('should be created', inject([LabeldataService], (service: LabeldataService) => {
    expect(service).toBeTruthy();
  }));
});
