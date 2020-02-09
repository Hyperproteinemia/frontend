import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../entities/question';
import {Answer} from '../entities/answer';

@Injectable({
  providedIn: 'root'
})
export class QaService {

  constructor(private http: HttpClient) {
  }

  public createQuestion(text: string): Observable<any> {
    return this.http.post('/api/qa/question', {text}, {responseType: 'text'});
  }

  public postAnswer(text: string, questionId: number): Observable<any> {
    return this.http.post('/api/qa/answer/' + questionId, {text}, {responseType: 'text'});
  }

  public deleteAnswer(questionId: number): Observable<any> {
    return this.http.get<any>('/api/qa/answer/' + questionId);
  }

  public getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('/api/qa/question');
  }

  public getQuestion(id): Observable<Question> {
    return this.http.get<Question>('/api/qa/question/' + id);
  }
}
