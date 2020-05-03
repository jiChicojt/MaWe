import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CVModel} from '../../../models/cv.model';
import {CvService} from '../../../services/cv.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  jobId: string;
  applicants: Array<CVModel> = [];

  constructor(private activatedRoute: ActivatedRoute, private cvService: CvService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.jobId = params.get('id');
    });
    this.getCVs();
  }

  getCVs() {
    this.cvService.getCVs(this.jobId).subscribe(
        cvs => {
          console.log(cvs);
          this.applicants = cvs;
        },
        error => {
          console.log(error);
        }
    );
  }
}
