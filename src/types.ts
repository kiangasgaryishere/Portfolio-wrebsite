export interface SocialLink {
  name: string;
  url: string;
  label: string;
}

export interface ProjectHighlight {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  status?: string;
  stats?: string;
}

export type ToastType = 'success' | 'info';

export interface ToastMessage {
  id: string;
  text: string;
  type?: ToastType;
}

