import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobModel } from '../models/job.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  url: string;
  thyHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {
    this.url = GLOBAL.URL + 'jobs';
   }

   createJob(job: JobModel): Observable<any> {
    const params = JSON.stringify(job);
    return this.http.post(this.url, params, { headers: this.thyHeaders });
  }

  getJobs(enterprise: string): Observable<any> {
      return this.http.get(this.url + '/' + enterprise, { headers: this.thyHeaders });
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete(this.url + '/' + id, { headers: this.thyHeaders });
  }
}
