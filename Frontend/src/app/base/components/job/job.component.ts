import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClrWizard } from '@clr/angular';
import { JobModel } from 'src/app/models/job.model';
import { AuthService } from 'src/app/services/auth.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  @ViewChild('wizard', { static: true }) wizard: ClrWizard;
  @ViewChild('number', { static: true }) numberFi: any;

  // tslint:disable-next-line:variable-name
  _open = false;
  job: JobModel;
  xtr = {
    min: 18,
    max: 70,
    language: '',
    aptitude: ''
  };
  message: string;
  error = false;
  success = false;
  enterprise = this._authService.getIdentity().enterprise;
  jobs: Array<JobModel> = [];

  // tslint:disable-next-line:variable-name
  constructor(private _jobService: JobService, private _authService: AuthService, private router: Router) {
    this.job = new JobModel('', '', '', 2500, '', '', 0, '', '', [{ language: '' }], [{ aptitude: '' }], 0, 0, [null], 0, '');
    this.job.languages.pop();
    this.job.aptitudes.pop();
  }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this._jobService.getJobs(this.enterprise).subscribe(
      jobs => {
        console.log(jobs);
        this.jobs = jobs;
      },
      error => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }

  open() {
    this._open = !this._open;
  }

  newLanguage() {
    this.job.languages.push({ language: this.xtr.language });
    this.xtr.language = '';
  }

  delLanguage(language) {
    this.job.languages.splice(this.job.languages.indexOf(language), 1);
  }

  newAptitude() {
    this.job.aptitudes.push({ aptitude: this.xtr.aptitude });
    this.xtr.aptitude = '';
  }

  delAptitude(attributes) {
    this.job.aptitudes.splice(this.job.aptitudes.indexOf(attributes), 1);
  }

  createJob() {
    this.job.age = this.xtr.min.toString() + '-' + this.xtr.max.toString();
    this.job.enterprise = this.enterprise;

    this._jobService.createJob(this.job).subscribe(
      success => {
        this.success = true;
        this.message = success.message;
        this.getJobs();

        this.wizard.reset();
        // tslint:disable-next-line:max-line-length
        this.job = { _id: '', name: '', enterprise: '', salary: 0, description: '', age: '', experience: 0, profession: '', schooling: '', languages: [{ language: '' }], aptitudes: [{ aptitude: '' }], seen: 0, matched: 0, cvs: [null], matchedP: 0, cvId: '' };
        this.job.languages.pop();
        this.job.aptitudes.pop();
      },
      error => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }

  deleteJob(id) {
    this._jobService.deleteJob(id.$oid).subscribe(
      success => {
        this.success = true;
        this.message = success.message;
        this.getJobs();
      },
      error => {
        this.error = true;
        this.message = error.error.message;
      }
    );
  }

  close(option) {
    if (option === 1) {
      this.error = false;
    } else {
      this.success = false;
    }
  }

  show(id) {
    this.router.navigate(['enterprise/profile', id.$oid]);
  }
}

