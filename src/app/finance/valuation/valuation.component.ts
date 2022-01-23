import { Component, OnInit } from '@angular/core';
import {Company} from "../../company";
import {ActivatedRoute, Router} from "@angular/router";
import {BlogService} from "../../blog/blog.service";
import {Location} from "@angular/common";
import {ValuationService} from "./valuation.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.css']
})
export class ValuationComponent implements OnInit {

  company: Company | undefined

  valForm!: FormGroup;
  //revenue: FormControl;

  industries = [
    {id: 1, name: "steel", revenueMultiple: 1, ebitdaMultiple: 8},
    {id: 2, name: "telco", revenueMultiple: 1.2, ebitdaMultiple: 9.2},
    {id: 3, name: "fomc", revenueMultiple: 0.7, ebitdaMultiple: 6.5},
  ];
  selectedIndustry = null;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              // Holds the ArticleComponent
              private route: ActivatedRoute,
              // Gets the article from a remote server
              private valuationService: ValuationService,
              // Angular's built-in service for interacting with the browser
              private location: Location) {

    //this.revenue = new FormControl('',[Validators.required])

    this.valForm = formBuilder.group({
      revenue: [''],
      ebitda: [''],
      industry: [''],
    })

  }

  getCompany(): void {
    // route.snapshot: static image of the route information shortly after the component was created
    // paramMap: dictionary of route parameter values extracted from the URL
    // "id" key returns the id of the company to fetch
    // JavaScript Number function converts the string to a number
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.valuationService.getCompany(id)
      .subscribe(company => this.company = company);
  }

/*  getValuation(): void {
    this.revenue.setValue(this.valForm.get('revenue')?.value);
  }*/

  getValuation(): void {
    this.valForm.patchValue({
      revenue: this.valForm.get('revenue'),
      ebitda: this.valForm.get('ebitda'),
      industry: this.valForm.get('industry')
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    // Get data
    this.getCompany();

    // Form
    this.valForm = this.formBuilder.group({
      revenue: ['', [Validators.required,]],
      ebitda: ['', [Validators.required,]],
      industry: ['', [Validators.required,]],
    });
  }
}
