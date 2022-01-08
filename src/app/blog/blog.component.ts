import { Component, OnInit } from '@angular/core';

import { Article} from "../article";

import {BlogService} from "./blog.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articles: Article[] = [];

  constructor(private blogService: BlogService) { }

  // Async method
  getArticles(): void {
    // Wait to get the list of heroes
    // The subscribe() method passes the emitted array to the callback,
    // which sets the component's heroes property.
    this.blogService.getArticles()
      .subscribe(articles => this.articles = articles);
  }

  ngOnInit(): void {
    this.getArticles()
  }

}
