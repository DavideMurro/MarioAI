import { Language } from './language.model';

export class AppHeader {
  title!: string;
  languages!: Language[];
  defaultLanguageCode!: string;
  currentLanguageCode!: string;
  currentStableDiffusionApiUrl!: string;
}
