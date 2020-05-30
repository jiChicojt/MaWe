import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobModel } from 'src/app/models/job.model';
import { CvService } from 'src/app/services/cv.service';

interface Job {
  languages: [{ language: string }];
  aptitudes: [{ aptitude: string }];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public formGroup: FormGroup;
  public jobs: Array<any> = [];
  public possibleJobs: Array<JobModel> = [];
  public schools: Array<any> = [];
  public job: Job;
  public isLoading = false;
  public error = 3;
  public message = '';

  // tslint:disable-next-line:variable-name
  constructor(private formBuilder: FormBuilder, private _cvService: CvService) {
    this.job = {
      languages: [{ language: '' }],
      aptitudes: [{ aptitude: '' }]
    };
    this.job.languages.pop();
    this.job.aptitudes.pop();
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        birthdate: [new FormControl(), this.valiDate],
        profession: ['', Validators.required],
        experience: [0, [Validators.required, this.validateNumber]],
        email: ['', [Validators.required, Validators.email]],
        phone: [0, [Validators.required, Validators.minLength(8), Validators.maxLength(8), this.validateNumber]],
        country: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required],
        languages: '',
        aptitudes: ''
      }),
      education: this.formBuilder.group({
        school: [],
        degree: [],
        description: [],
        startDate: new FormControl(),
        endDate: new FormControl()
      }),
      laboral: this.formBuilder.group({
        title: '',
        boss: '',
        enterprise: '',
        phone: [0, [Validators.minLength(8), Validators.maxLength(8), this.validateNumber]],
        description: '',
        startDate: new FormControl(),
        endDate: new FormControl()
      }),
      extra: this.formBuilder.group({})
    });
  }

  validateNumber(control: AbstractControl) {
    // tslint:disable-next-line:variable-name
    const number = control.value;
    let error = null;

    if (isNaN(number)) {
      error = { ...error, number: 'Todos los caracteres deben ser numéricos.' };
    }

    return error;
  }

  valiDate(control: AbstractControl) {
    const date = Date.parse(control.value);
    const currentDate = new Date();
    const minDate = currentDate.setFullYear((currentDate.getFullYear() - 70));
    const maxDate = currentDate.setFullYear((currentDate.getFullYear() + 52));
    let error = null;

    if (date < minDate || date > maxDate) {
      error = { ...error, age: 'Su rango de edad no aplica.' };
    }

    return error;
  }

  addNewJob() {
    const value = this.formGroup.value.laboral;
    this.formGroup.get('laboral').reset();

    this.jobs.push(value);
  }

  addNewSchool() {
    const value = this.formGroup.value.education;

    if (value.school && value.degree && value.description && value.startDate && value.endDate) {
      this.formGroup.get('education').reset();

      value.degree = +value.degree;
      this.schools.push(value);
    }
  }

  newLanguage() {
    this.job.languages.push({ language: this.formGroup.get('personalInfo.languages').value });
    this.formGroup.get('personalInfo.languages').setValue('');
  }

  delLanguage(language) {
    this.job.languages.splice(this.job.languages.findIndex(lang => lang.language === language), 1);
  }

  newAptitude() {
    this.job.aptitudes.push({ aptitude: this.formGroup.get('personalInfo.aptitudes').value });
    this.formGroup.get('personalInfo.aptitudes').setValue('');
  }

  delAptitude(aptitude) {
    this.job.aptitudes.splice(this.job.aptitudes.findIndex(aptit => aptit.aptitude === aptitude), 1);
  }

  submit() {
    this.isLoading = true;
    const data = {
      personalInfo: this.formGroup.value.personalInfo,
      education: this.schools,
      laboral: this.jobs
    };

    data.personalInfo.languages = this.job.languages;
    data.personalInfo.aptitudes = this.job.aptitudes;

    this._cvService.insert(data).subscribe(
      success => {
        this.isLoading = false;
        this.possibleJobs = success;

        if (this.possibleJobs.length <= 0) {
          this.error = 2;
          this.message = 'No se encontró ninguna coincidencia en la base de datos';
        }
      },
      error => {
        this.isLoading = false;
        this.error = 1;
        this.message = error.error.message;
      }
    );
  }

  matchJob(jobId, cvId, i) {
    this.possibleJobs[i].matched += 1;
    this.possibleJobs[i].cvs.push(cvId);
    this._cvService.matchJob(jobId.$oid, cvId, this.possibleJobs[i]).subscribe(
      () => {
        this.possibleJobs.splice(i, 1);
        console.log(i);
        this.error = 0;
        this.message = 'Ha aplicado al trabajo exitosamente';
      },
      error => {
        this.error = 1;
        this.message = error.error.message;
      }
    );
  }

  close() {
    this.error = 3;
  }

}
