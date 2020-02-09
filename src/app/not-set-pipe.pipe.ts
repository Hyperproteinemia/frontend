import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notSetPipe'
})
export class NotSetPipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value == undefined || value == '')
      return 'Not set';
    else
      return value;
  }

}
