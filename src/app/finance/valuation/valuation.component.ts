import { Component, OnInit } from '@angular/core';
import {Company} from "../../company";
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../blog/blog.service";
import {Location} from "@angular/common";
import {ValuationService} from "./valuation.service";

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.css']
})
export class ValuationComponent implements OnInit {

  company: Company | undefined

  industries = [
    {id: 1, name: "steel", revevenueMultiple: 1, ebitdaMultiple: 8},
    {id: 2, name: "telco", revevenueMultiple: 1.2, ebitdaMultiple: 9.2},
    {id: 3, name: "fomc", revevenueMultiple: 0.7, ebitdaMultiple: 6.5},
  ];
  selectedIndustry = null;

  constructor(
    // Holds the ArticleComponent
    private route: ActivatedRoute,
    // Gets the article from a remote server
    private valuationService: ValuationService,
    // Angular's built-in service for interacting with the browser
    private location: Location
  ) {}

  getCompany(): void {
    // route.snapshot: static image of the route information shortly after the component was created
    // paramMap: dictionary of route parameter values extracted from the URL
    // "id" key returns the id of the company to fetch
    // JavaScript Number function converts the string to a number
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.valuationService.getCompany(id)
      .subscribe(company => this.company = company);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getCompany();
  }

}
