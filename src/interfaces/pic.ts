export default interface Pic {
  file_id: number;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  user_id: number;
  media_type: 'image' | 'video' | 'audio';
  mime_type: string;
  time_added: string;
  screenshot: string;
  thumbnails: Thumbnails;
}

export interface Thumbnails {
  w160: string;
  w320?: string;
  w640?: string;
}
