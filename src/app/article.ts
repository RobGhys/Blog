export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  createDate: string;
  modifyDate: string;
  creator: string;
  categories: Category[];
  imagePath: string;
}

export interface Category {
  id: number;
  name: string;
}
