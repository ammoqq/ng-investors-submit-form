import { TestBed, inject } from '@angular/core/testing';

import { PayuService } from './payu.service';

describe('PayuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayuService]
    });
  });

  it('should be created', inject([PayuService], (service: PayuService) => {
    expect(service).toBeTruthy();
  }));
});
