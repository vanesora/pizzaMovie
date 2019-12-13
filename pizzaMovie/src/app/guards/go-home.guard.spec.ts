import { TestBed, async, inject } from '@angular/core/testing';

import { GoHomeGuard } from './go-home.guard';

describe('GoHomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoHomeGuard]
    });
  });

  it('should ...', inject([GoHomeGuard], (guard: GoHomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
