import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {JobService} from '../../../services/job.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public pieChartLabels = ['Vistos', 'Matches'];
  public barChartType = 'bar';
  public pieChartType = 'pie';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Vistos'},
    {data: [], label: 'Matches'}
  ];
  public pieChartData = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['#87DCC0', '#998AD3'],
    borderColor: ['#ece9d7', '#ece9d7']
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
          this.pieChartData.push(stats.totalSeen);
          this.pieChartData.push(stats.totalMatches);
          for (const job of stats.jobs) {
            this.barChartLabels.push(job.name);
            this.barChartData[0].data.push(job.seen);
            this.barChartData[1].data.push(job.matches);
          }
        },
        error => {
          console.log(error);
        }
    );
  }
}
