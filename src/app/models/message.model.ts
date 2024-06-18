import { MessageDirectionEnum } from '../enums/message-direction-enum';
import { MessageTypeEnum } from '../enums/message-type-enum';

export class Message {
  direction!: MessageDirectionEnum;
  sendingDate?: Date;
  isLoading?: boolean;
  isError?: boolean;
  type!: MessageTypeEnum;
  text?: string | null;
  image?: string | null;
}
