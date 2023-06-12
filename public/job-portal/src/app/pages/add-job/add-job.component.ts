import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  newJob!: FormGroup;
  isUpdating: boolean = false;
  isViewing: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private _jobService: JobService,
    private _router: Router,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAuth();

    const jobId = this._activatedRoute.snapshot.params["jobId"];
    if (jobId) {
      this.getJobDetails(jobId);
      this.isUpdating = false;
      this.isViewing = true;
    }

    this.newJob = this.formBuilder.group({
      _id: [""],
      title: ["", Validators.required],
      description: ["", Validators.required],
      salary: ["", Validators.required],
      experience: ["", Validators.required],
      location: this.formBuilder.group({
        coordinates: this.formBuilder.array([
          ["", Validators.required],
          ["", Validators.required]
        ])
      }),
      skills: ["", Validators.required],
      postDate: [new Date()]
    })
  }

  editPost() {
    this.isUpdating = true;
    this.isViewing = false;
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

  addJob() {
    const toSubmit = this.newJob.value;
    if (toSubmit.skills) {
      toSubmit.skills = toSubmit.skills.split(',')
    }
    if (this.isUpdating) {
      this._jobService.updateJob(this.newJob.value._id, this.newJob.value).subscribe({
        next: (response: any) => {
          alert("Job has been updated!");
          this.isViewing = true;
          this.isUpdating = false;
          this._router.navigate(["jobs/" + response.data._id])
        },
        error: (error) => {
          alert("Job uupdate failed!")
          console.log("Error from add-job", error);        
        }
      });
    } else {
      delete this.newJob.value._id;
      this._jobService.addJob(this.newJob.value).subscribe({
        next: (response: any) => {
          alert("Job has been posted!");
          this._router.navigate(["jobs/" + response.data._id])
        },
        error: (error) => {
          alert("Job posting failed!")
          console.log("Error from add-job", error);        
        }
      });
    }
  }

  getJobDetails(jobId: string) {
    this._jobService.getJobByJobId(jobId).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          if (response.data.skills) {
            response.data.skills = response.data.skills.join(", ");
          }
          this.newJob.patchValue(response.data);
        }
      },
      error: (error) => {
        this._router.navigate(["/"]);
        console.log("Error from job", error);
      }
    })
  }

  deleteJob() {
    this._jobService.deleteJobById(this.newJob.value._id).subscribe({
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
