import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  baseUrl = "http://localhost:3000/jobs";

  constructor(private _http: HttpClient) { }

  getJobs(params: string): Observable<Job[]> {
    return this._http.get<Job[]>(this.baseUrl + "?" + params);
  }

  getJobByJobId(jobId: string): Observable<Job> {
    return this._http.get<Job>(this.baseUrl + "/" + jobId);
  }

  getJobCount(search: string): Observable<Number> {
    return this._http.get<Number>(this.baseUrl + "/count?search=" + search);
  }
}
