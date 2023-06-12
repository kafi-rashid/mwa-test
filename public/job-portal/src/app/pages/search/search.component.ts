import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job.model';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  jobs: Job[] = new Array<Job>();
  totalJob: number = 0;
  currentPage: number = 0;
  
  search: string = "";
  lat!: number;
  lng!: number;
  min!: number;
  max!: number;
  maxDate!: Date;
  
  offset: number = 0;
  count: number = 10;

  query: string = "";

  constructor(private _jobService: JobService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let search = this._activatedRoute.snapshot.queryParams["search"];        
    if (search) {
      this.search = search;
    }
  }

  searchJob(searchForm: NgForm) {
    if (searchForm.value.search) {
      this.getJobs();
      this.getJobCount();
    }
  }

  searchJobByLocation(searchFormByLocation: NgForm) {
    let query = "";
    if (this.lat && this.lat) {
      query += "lat=" + this.lat;
    }
    if (this.lng && this.lng) {
      query += "&lng=" + this.lng;
    }
    if (this.min && this.min) {
      query += "&min=" + this.min;
    }
    if (this.max && this.max) {
      query += "&max=" + this.max;
    }
    if (this.offset) {
      query += "&offset=" + this.offset;
    }
    if (this.count) {
      query += "&count=" + this.count;
    }
    this._jobService.searchJobByLocation(query).subscribe({
      next: (jobs: any) => {
        if (jobs.status === 200) {
          this.jobs = jobs.data;
        } else {
          this.jobs = [];
        }
      },
      error: (error) => {
        this.jobs = [];
        console.log("Error from jobs", error);
      }
    });
  }

  getJobs() {
    let query = "";
    if (this.search && this.search.trim().length > 0) {
      query += "search=" + this.search;
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
        this.jobs = [];
        console.log("Error from jobs", error);
      }
    });
  }

  filterByDate(filterByDateForm: NgForm) {
    console.log(filterByDateForm.value.maxDate);
  }

  getJobCount() {
    this._jobService.getJobCount(this.search).subscribe({
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
    console.log(this.offset + ', ' + this.count);
    this.getJobs();
  }
  
  next() {
    this.offset += this.count;
    console.log(this.offset + ', ' + this.count);
    this.getJobs();
  }

}
