// Post

export interface Category {
  category_id: number;
  name: string;
  reg_user: string;
  mod_user: string;
  sort: number;
}

export interface State {
  state_id: number;
  name: string;
}

export interface Content {
  content_id: number;
  post_id: number;
  state: State;
  content: string;
}

export interface PostView {
  view_id: number;
  post_id: number;
  view: number;
}

export interface PostType {
  post_id: number;
  category: Category;
  content: Content;
  postView: PostView;
  title: string;
  thumbnail: string;
  main_sort: number;
  use_yn: boolean;
  reg_user: string;
  regDate: string; // ISO Date string
  modDate: string; // ISO Date string
}


// Category

export interface CategoryType {
  category_id: number;
  name: string;
  reg_user: string;
  mod_user: string;
  sort: number;
}