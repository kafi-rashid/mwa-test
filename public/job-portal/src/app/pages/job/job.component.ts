import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job.model';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  job: Job = new Job();

  constructor(private _jobService: JobService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    const jobId = this._activatedRoute.snapshot.params["jobId"];
    if (jobId) {
      this.getJobDetails(jobId);
    }
  }
  
  getJobDetails(jobId: string) {
    this._jobService.getJobByJobId(jobId).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.job = response.data;
        }
      },
      error: (error) => {
        this._router.navigate(["/"]);
        console.log("Error from job", error);
      }
    })
  }

}
