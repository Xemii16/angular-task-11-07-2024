import {Routes} from '@angular/router';
import {DashboardComponent} from "./page/dashboard/dashboard.component";
import {RecoveryComponent} from "./page/recovery/recovery.component";
import {LandingComponent} from "./page/landing/landing.component";
import {LoginComponent} from "./page/login/login.component";
import {RegisterComponent} from "./page/register/register.component";
import {RegisterPendingComponent} from "./page/register/register-pending/register-pending.component";
import {MainComponent} from "./page/main/main/main.component";
import {SubjectsComponent} from "./page/subjects/subjects/subjects.component";
import {PlanningComponent} from "./page/planning/planning/planning.component";
import {TeachersComponent} from "./page/teachers/teachers/teachers.component";
import {PupilsComponent} from "./page/pupils/pupils/pupils.component";
import {RequestsComponent} from "./page/requests/requests/requests.component";
import {SettingsComponent} from "./page/settings/settings/settings.component";
import {RequestApprovalComponent} from "./page/requests/request-approval/request-approval.component";

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {
        path: 'dashboard', component: DashboardComponent, children: [
            {path: '', component: MainComponent},
            {path: 'subjects', component: SubjectsComponent},
            {path: 'planning', component: PlanningComponent},
            {path: 'teachers', component: TeachersComponent},
            {path: 'pupils', component: PupilsComponent},
            {path: 'requests', component: RequestsComponent},
            {path: 'requests/:id', component: RequestApprovalComponent},
            {path: 'settings', component: SettingsComponent}
        ]
    },
    {path: 'register', component: RegisterComponent},
    {path: 'recovery', component: RecoveryComponent},
    {path: '', component: LandingComponent},
    {path: 'pending', component: RegisterPendingComponent}
];
