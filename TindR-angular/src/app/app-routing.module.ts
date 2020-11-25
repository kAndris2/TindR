import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SidebarComponent } from "./sidebar/sidebar.component";

const routes: Routes = [
  {path: "",component: WelcomePageComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "login", component: LoginComponent},
  {path: "main", component: SidebarComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  RegistrationComponent, LoginComponent, SidebarComponent
];
