import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  url: string;
  public thyHeaders;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.URL + 'cv';
    this.thyHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  }

  insert(cv: any): Observable<any> {
    const params = JSON.stringify(cv);
    return this.http.post(this.url, params, { headers: this.thyHeaders });
  }

  matchJob(jobId, cvId, job): Observable<any> {
    const params = JSON.stringify(job);
    return this.http.post(this.url + '/match/' + jobId + '/' + cvId, params, { headers: this.thyHeaders });
  }

  getCVs(id: string): Observable<any> {
    return this.http.get(this.url + '/' + id, { headers: this.thyHeaders });
  }
}
