import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import {Article} from "./article";
import {User} from "./user";

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
        imagePath: imageFolder + "standard_blog.jpeg"
      },
      {
        id: 2, title: "Second Article", content: "This is the second article!", description: "Number 2",
        categories: [
          {id: 1, name: "some categ"},
          {id: 2, name: "some other"}
        ],
        createDate: "31/12/2021", modifyDate: "05/01/2022", creator: "Caro", category: "Finance",
        imagePath: imageFolder + "standard_blog.jpeg"
      }
    ];

    const users = [
      {
        id: 1, userName: "Robin", email: "rob@rob.com", firstName: "Robin", lastName: "Ghys",
        signupDate: "12/01/2022", password: "12345678"
      },
      {
        id: 2, userName: "Caroline", email: "caro@rob.com", firstName: "Caroline", lastName: "Hazard",
        signupDate: "12/01/2022", password: "12345678"
      }
    ]

    const companies = [
      {
        id: 1, name: "Tesla",
        revenue: [
          {id: 1, year: 2021, amount: 1000000000},
          {id: 2, year: 2022, amount: 1100000000},
          {id: 3, year: 2023, amount: 1200000000},
          {id: 4, year: 2024, amount: 1300000000},
          {id: 5, year: 2025, amount: 1400000000}
        ],
        ebitda: [
          {id: 1, year: 2021, amount: 500000000},
          {id: 2, year: 2022, amount: 550000000},
          {id: 3, year: 2023, amount: 600000000},
          {id: 4, year: 2024, amount: 650000000},
          {id: 5, year: 2025, amount: 700000000}
        ],
      }
    ]

    return {articles, users};
  }

  // Overrides the genId method to ensure that an article always has an id.
  // If the articles array is empty,
  // the method below returns the initial number (11).
  // if the articles array is not empty, the method below returns the highest
  // article id + 1.
  genIdArticle(articles: Article[]): number {
    return articles.length > 0 ? Math.max(...articles.map(article => article.id)) + 1 : 11;
  }

  genIdUser(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
