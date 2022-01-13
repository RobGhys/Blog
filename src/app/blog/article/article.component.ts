import { Component, OnInit } from '@angular/core';
import { Article } from '../../article';

import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

import { BlogService } from '../blog.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article | undefined

  constructor(
    // Holds the ArticleComponent
    private route: ActivatedRoute,
    // Gets the article from a remote server
    private blogService: BlogService,
    // Angular's built-in service for interacting with the browser
    private location: Location
  ) {}

  getArticle(): void {
    // route.snapshot: static image of the route information shortly after the component was created
    // paramMap: dictionary of route parameter values extracted from the URL
    // "id" key returns the id of the hero to fetch
    // JavaScript Number function converts the string to a number
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getArticle(id)
      .subscribe(article => this.article = article);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.article) {
      this.blogService.updateArticle(this.article)
        .subscribe(() => this.goBack());
    }
  }

  ngOnInit(): void {
    this.getArticle();
  }

}
