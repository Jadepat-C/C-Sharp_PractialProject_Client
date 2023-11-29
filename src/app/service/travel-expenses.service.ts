import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TravelExpensesEntity } from '../model/travel-expenses-entity';

@Injectable({
  providedIn: 'root'
})
export class TravelExpensesService {

  private baseUrl: string = 'https://localhost:7187/api/TravelExpenses/'// Inject BASE_URL
  constructor(
    private http: HttpClient
  ) { }

  delete(id: string) {
    return this.http.delete(this.baseUrl + 'DeleteTravelExpense?id=' + id, { responseType: 'text' });
  }

  update(updateItem: TravelExpensesEntity) {
    return this.http.put(this.baseUrl + 'PutTravelExpense', updateItem, { responseType: 'text' });
  }

  get(numOfInstance: number, numOfSkip: number) {
    return this.http.get<TravelExpensesEntity[]>(this.baseUrl + 'GetTravelExpenses?numOfInstances=' + numOfInstance + '&numOfSkip=' + numOfSkip);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'GetTravelExpensesCount');
  }

  search(query: string) {
    return this.http.get<TravelExpensesEntity[]>(this.baseUrl + 'GetTravelExpensesSearch?query=' + query);
  }

  getByID(id: string) {
    return this.http.get<TravelExpensesEntity>(this.baseUrl + 'GetTravelExpenseByID?id=' + id);
  }

  insert(insertItem: TravelExpensesEntity) {
    return this.http.post(this.baseUrl + 'PostTravelExpense', insertItem, { responseType: 'text' });
  }
}
