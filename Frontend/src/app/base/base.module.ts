import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrDropdownModule, ClrMainContainerModule, ClrNavigationModule, ClrVerticalNavModule,
  ClrWizardModule } from '@clr/angular';
import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { JobComponent } from './components/job/job.component';
import { ProfilesComponent } from './components/profiles/profiles.component';


@NgModule({
  declarations: [BaseComponent, JobComponent, ProfilesComponent],
  imports: [
    CommonModule,
    BaseRoutingModule,
    ClarityModule,
    ClrDropdownModule,
    ClrNavigationModule,
    ClrVerticalNavModule,
    ClrMainContainerModule,
    ClrWizardModule,
    FormsModule
  ]
})
export class BaseModule { }
