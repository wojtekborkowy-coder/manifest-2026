
export enum AppStep {
  INTRO = 'INTRO',
  WELCOME = 'WELCOME',
  ACTIVATE = 'ACTIVATE',
  WISHES = 'WISHES'
}

export interface WishCategory {
  title: string;
  icon: string;
  message: string;
  color: string;
}
