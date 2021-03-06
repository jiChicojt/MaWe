import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BaseComponent} from './base.component';
import {JobComponent} from './components/job/job.component';
import {ProfilesComponent} from './components/profiles/profiles.component';
import {StatsComponent} from './components/stats/stats.component';

const routes: Routes = [{
    path: '', component: BaseComponent, children: [
        {path: '', component: StatsComponent},
        {path: 'jobs', component: JobComponent},
        {path: 'profile/:id', component: ProfilesComponent}
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BaseRoutingModule {
}
