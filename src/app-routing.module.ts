import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './app/about/about.component';
import { HomeComponent } from './app/home/home.component';
import {BlogComponent} from "./app/blog/blog.component";
import {ProgrammingComponent} from "./app/programming/programming.component";
import {FinanceComponent} from "./app/finance/finance.component";

// "path": matches the URL in the browser's address bar
// "component": the component that the router should create when navigating to this route
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'programming', component: ProgrammingComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
