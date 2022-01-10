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

/*  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.blogService.addArticle({ name } as Article)
      .subscribe(article => {
        this.articles.push(article);
      });
  }*/

  delete(article: Article): void {
    this.articles = this.articles.filter(a => a !== article);
    this.blogService.deleteArticle(article.id).subscribe();
  }

  ngOnInit(): void {
    this.getArticles()
  }

}
