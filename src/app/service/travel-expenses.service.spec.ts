import { TestBed } from '@angular/core/testing';

import { TravelExpensesService } from './travel-expenses.service';

describe('TravelExpensesService', () => {
  let service: TravelExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
