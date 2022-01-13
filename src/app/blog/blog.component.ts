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
    // which sets the component's articles property.
    this.blogService.getArticles()
      .subscribe(articles => this.articles = articles);
  }

  add(title: string, description: string, category: string, content: string): void {
    title = title.trim();
    description = description.trim();
    content = content.trim();

    // Check if a parameter is missing
    if (!title || !description || !content) { return; }

    this.blogService.addArticle(
      { id: 1, title: title, description: description,
        categories: [
          {id: 1, name: "some categ"},
          {id: 2, name: "some other"}
        ],
        content: content, createDate: "11/01/2022", modifyDate: "11/01/2022",
        creator: "Rob", imagePath: "<img class='img-fluid rounded' src='\"assets/images/standard_blog.jpeg\"' alt='Article image' />'"
      } as Article)
      .subscribe(article => {
        this.articles.push(article);
      });
  }

  delete(article: Article): void {
    this.articles = this.articles.filter(a => a !== article);
    this.blogService.deleteArticle(article.id).subscribe();
  }

  ngOnInit(): void {
    this.getArticles()
  }

}
