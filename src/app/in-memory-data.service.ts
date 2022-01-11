import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import {Article} from "./article";

const imageFolder = "assets/images/";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const articles = [
      {
        id: 1, title: "First Article", content: "This is the very first article!", description: "Number 1",
        categories: [
          {id: 1, name: "some categ"},
          {id: 2, name: "some other"}
        ],
        createDate: "31/12/2021", modifyDate: "05/01/2022", creator: "Rob", category: "Programming",
        imagePath: "/assets/images/standard_blog.jpeg"
      },
      {
        id: 2, title: "Second Article", content: "This is the second article!", description: "Number 2",
        categories: [
          {id: 1, name: "some categ"},
          {id: 2, name: "some other"}
        ],
        createDate: "31/12/2021", modifyDate: "05/01/2022", creator: "Caro", category: "Finance",
        imagePath: "<img class='img-fluid rounded' src='\"assets/images/standard_blog.jpeg\"' alt='Article image'/>"
      }
    ];
    return {articles};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the articles array is empty,
  // the method below returns the initial number (11).
  // if the articles array is not empty, the method below returns the highest
  // article id + 1.
  genId(articles: Article[]): number {
    return articles.length > 0 ? Math.max(...articles.map(hero => hero.id)) + 1 : 11;
  }
}
