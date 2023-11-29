import { Language } from './language.model';

export class AppHeader {
  languages!: Language[];
  defaultLanguageCode!: string;
  currentLanguageCode!: string;
}
