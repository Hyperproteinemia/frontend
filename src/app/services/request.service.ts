import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../entities/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  sendRequest(username: string, msg: string) {
    return this.http.post('/api/user/'+username+'/request', msg);
  }

  acceptRequest(username: string) {
    return this.http.post('/api/user/'+username+'/request/accept', {});
  }

  declineRequest(username: string) {
    return this.http.post('/api/user/'+username+'/request/decline', {});
  }

  loadIncomingRequests(): Observable<Request[]> {
    return this.http.get<Request[]>('/api/user/request/incoming');
  }

  loadOutgoingRequests(): Observable<Request[]> {
    return this.http.get<Request[]>('/api/user/request/mine');
  }

}
