import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import {BlogComponent} from "./blog/blog.component";
import {ProgrammingComponent} from "./programming/programming.component";
import {FinanceComponent} from "./finance/finance.component";
import { ArticleComponent } from './blog/article/article.component';
import {SignInComponent} from "./sign-in/sign-in.component";
import { SignUpComponent } from './sign-up/sign-up.component';
import {ValuationComponent} from "./finance/valuation/valuation.component";

// "path": matches the URL in the browser's address bar
// "component": the component that the router should create when navigating to this route
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'programming', component: ProgrammingComponent },
  { path: 'finance', component: FinanceComponent },
  { path: 'finance/valuation', component: ValuationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'show/:id', component: ArticleComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
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
