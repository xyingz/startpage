declare interface Tool {
  readonly id: string;
  url?: string;
  comment?: string;

  [key: string]: any;
}
