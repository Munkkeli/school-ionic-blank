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
  160: string;
  320?: string;
  640?: string;
}
