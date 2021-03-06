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
export class ArticleService {

  public user: User;

  constructor(private http: HttpClient) {
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>('/api/map/article/' + id);
  }

}
