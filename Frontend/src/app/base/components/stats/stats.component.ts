import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {JobService} from '../../../services/job.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  public jobsChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public jobsChartLabels = [];
  public SMChartLabels = ['Vistos', 'Matches'];
  public schoolingChartLabels = ['Primaria', 'Básicos', 'Diversificado', 'Universidad'];
  public jobsChartType = 'bar';
  public SMChartType = 'pie';
  public schoolingChartType = 'pie';
  public jobsChartLegend = true;
  public jobsChartData = [
    {data: [], label: 'Vistos'},
    {data: [], label: 'Matches'}
  ];
  public SMChartData = [];
  public schoolingChartData = [];
  public SMChartColors: Array < any > = [{
    backgroundColor: ['#78b9ef', '#efea78'],
    borderColor: ['#ece9d7', '#ece9d7']
  }];
  public schoolingChartColors: Array < any > = [{
    backgroundColor: ['#78efae', '#78b9ef', '#ef78b9', '#efae78'],
    borderColor: ['#ece9d7', '#ece9d7', '#ece9d7', '#ece9d7']
  }];

  constructor(private userService: AuthService,
              private jobService: JobService) {
  }

  ngOnInit() {
    this.getStatsData();
  }

  getStatsData() {
    const enterprise = this.userService.getIdentity().enterprise;
    this.jobService.getJobStats(enterprise).subscribe(
        stats => {
          console.log(stats);
          this.SMChartData.push(stats.totalSeen);
          this.SMChartData.push(stats.totalMatches);
          this.schoolingChartData.push(stats.schooling.primaria);
          this.schoolingChartData.push(stats.schooling.basicos);
          this.schoolingChartData.push(stats.schooling.diversificado);
          this.schoolingChartData.push(stats.schooling.universidad);
          for (const job of stats.jobs) {
            this.jobsChartLabels.push(job.name);
            this.jobsChartData[0].data.push(job.seen);
            this.jobsChartData[1].data.push(job.matches);
          }
        },
        error => {
          console.log(error);
        }
    );
  }
}
