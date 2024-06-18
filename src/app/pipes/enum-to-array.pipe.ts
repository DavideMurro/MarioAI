import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray',
})
export class EnumToArrayPipe implements PipeTransform {
  transform(value: any): { key: number; value: string }[] {
    return Object.keys(value)
      .filter((k) => !isNaN(+k))
      .map((k) => ({ key: +k, value: value[k] }));
  }
}
