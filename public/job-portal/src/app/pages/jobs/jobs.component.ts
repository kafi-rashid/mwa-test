import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job.model';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: Job[] = new Array<Job>();
  totalJob: number = 0;
  currentPage: number = 0;
  
  search: string = "";
  offset: number = 0;
  count: number = 10;

  query: string = "";

  constructor(private _jobService: JobService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getJobs();
    this.getJobCount();
  }


  getJobs() {
    let query = "";
    if (this.search && this.search.trim().length > 0) {
      query += this.search;
    }
    if (this.offset) {
      query += "&offset=" + this.offset;
    }
    if (this.count) {
      query += "&count=" + this.count;
    }
    this._jobService.getJobs(query).subscribe({
      next: (jobs: any) => {
        if (jobs.status === 200) {
          this.jobs = jobs.data;
        } else {
          this.jobs = [];
        }
      },
      error: (error) => {
        console.log("Error from jobs", error);
      }
    });
  }

  getJobCount() {
    this._jobService.getJobCount(this.query).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.totalJob = response.data;
        }
      },
      error: (error) => {
        console.log("Error from jobs", error);
      }
    })
  }

  disableBackward(): boolean {
    return this.offset === 0;
  }
  
  disableForward(): boolean {
    return (this.offset + this.count) >= this.totalJob;
  }
  
  prev() {
    this.offset -= this.count;
    this.getJobs();
  }
  
  next() {
    this.offset += this.count;
    this.getJobs();
  }

}
