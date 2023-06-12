import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './pages/search/search.component';
import { AddJobComponent } from './pages/add-job/add-job.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobsComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    LoginComponent,
    SearchComponent,
    AddJobComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "jobs",
        component: JobsComponent
      },
      {
        path: "jobs/:jobId",
        component: AddJobComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "search",
        component: SearchComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "add-job",
        component: AddJobComponent
      },
      {
        path: "**",
        component: HomeComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
