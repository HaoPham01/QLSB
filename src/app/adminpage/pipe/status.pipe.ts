import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    if (value=='1') {
      return 'Đang hoạt động';
    }else if(value=='-1') {
      return 'Tạm ngừng hoạt động'
    }else
    return 'Đã xóa';
  }

}
