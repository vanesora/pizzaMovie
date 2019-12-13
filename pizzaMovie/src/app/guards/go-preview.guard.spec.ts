import { TestBed, async, inject } from '@angular/core/testing';

import { GoPreviewGuard } from './go-preview.guard';

describe('GoPreviewGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoPreviewGuard]
    });
  });

  it('should ...', inject([GoPreviewGuard], (guard: GoPreviewGuard) => {
    expect(guard).toBeTruthy();
  }));
});
