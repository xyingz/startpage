declare interface SearchEngine {
  name: string;
  icon: string;
  comment: string;
  website: string;
  searchs?: {
    url: string;
    name: string;
    params?: string;
  }[];
}
