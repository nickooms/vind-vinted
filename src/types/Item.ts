export type Item = {
  id: string;
  title: string;
  photos: { thumbnails: { url: string }[] }[];
  [key: string]: string | object | object[];
};
