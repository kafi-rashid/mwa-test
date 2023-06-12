import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  newJob!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _jobService: JobService,
    private _router: Router) { }

  ngOnInit(): void {
    this.newJob = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      salary: ["", Validators.required],
      experience: ["", Validators.required],
      location: this.formBuilder.group({
        lat: ["", Validators.required],
        lng: ["", Validators.required]
      }),
      skills: ["", Validators.required],
      postDate: [new Date()]
    })
  }

  addJob() {
    const toSubmit = this.newJob.value;
    if (toSubmit.skills) {
      toSubmit.skills = toSubmit.skills.split(',')
    } 72
    this._jobService.addJob(this.newJob.value).subscribe({
      next: (response: any) => {
        alert("Job has been posted!");
        this._router.navigate(["jobs/" + response.data._id])
      },
      error: (error) => {
        alert("Job posting failed!")
        console.log("Error from add-job", error);        
      }
    })
  }

}
