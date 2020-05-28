import { Injectable } from '@angular/core';
import { CreateEsnEvent, EsnEvent } from '@esn/client/events/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  addOne(event: CreateEsnEvent): Observable<EsnEvent> {
    return this.http
      .post<object>('api/events', event)
      .pipe(map((res) => plainToClass(EsnEvent, res)));
  }

  findOne(id: string) {
    return this.http
      .get<object>(`api/events/${id}`)
      .pipe(map((res) => plainToClass(EsnEvent, res)));
  }

  findAll() {
    return this.http
      .get<object[]>(`api/events`)
      .pipe(map((res) => plainToClass(EsnEvent, res)));
  }

  update({
    id,
    changes,
  }: {
    id: string;
    changes: Partial<EsnEvent>;
  }): Observable<Partial<EsnEvent>> {
    return this.http
      .patch<object>(`api/events/${id}`, changes)
      .pipe(map((res) => plainToClass(EsnEvent, res)));
  }
}
