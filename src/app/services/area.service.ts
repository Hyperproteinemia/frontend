import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../entities/user';
import {map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs';
import {AreaDto} from '../entities/area-dto';
import {Area} from '../entities/area';
import {Article} from '../entities/article';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  public user: User;

  constructor(private http: HttpClient) {
  }

  public getAreas(): Observable<AreaDto[]> {
    return this.http.get<AreaDto[]>('/api/map/area');
  }

  public createArea(area: Area, article: Article, tags: string[]): Observable<Area> {
    return this.http.post<Area>('/api/map/area', {
      area,
      article,
      tags
    });
  }
}
