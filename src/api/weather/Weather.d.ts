declare interface Weather {
  last_update: Date;
  location: {
    country: string;
    id: string;
    name: string;
    path: string;
    timezone: string;
    timezone_offset: string;
  };
  now: {
    code: string;
    temperature: number;
    text: string;
  };
}
