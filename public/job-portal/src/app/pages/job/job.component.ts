import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/shared/models/job.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  job: Job = new Job();
  isLoggedIn: boolean = false;

  constructor(private _jobService: JobService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    const jobId = this._activatedRoute.snapshot.params["jobId"];
    if (jobId) {
      this.getJobDetails(jobId);
      this.getAuth();
    }
  }

  getAuth() {
    this._authService.isLoggedIn().subscribe({
      next: (status) => {
        this.isLoggedIn = status;
      },
      error: (error) => {
        console.log("Error from job", error);
      }
    })
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

  deleteJob(jobId: string) {
    this._jobService.deleteJobById(jobId).subscribe({
      next: (response) => {
        alert("Job has been deleted!")
        this._router.navigate(["jobs"]);
      },
      error: (error) => {
        console.log("Error from job", error);
      }
    })
  }

}
