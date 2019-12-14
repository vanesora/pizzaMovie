import { TestBed } from '@angular/core/testing';

import { PopupPayService } from './popup-pay.service';

describe('PopupPayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupPayService = TestBed.get(PopupPayService);
    expect(service).toBeTruthy();
  });
});
