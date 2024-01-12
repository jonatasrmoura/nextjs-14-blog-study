export interface ISimpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
};

export interface IFullBlog extends ISimpleBlogCard {
  content: any;
}
