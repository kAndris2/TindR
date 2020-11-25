import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  {path: "registration", component: RegistrationComponent},
  {path: "",component: WelcomePageComponent},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  RegistrationComponent, LoginComponent
];
