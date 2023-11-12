import { MessageDirectionEnum } from '../enums/message-direction-enum';

export class Message {
  direction!: MessageDirectionEnum;
  sendingDate?: Date;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  text?: string | null;
  image?: string | null;
}
