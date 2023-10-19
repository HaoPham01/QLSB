import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { field } from 'src/app/adminpage/models/field.model';
import { price } from 'src/app/adminpage/models/price.model';
import { DataService } from 'src/app/adminpage/services/data.service';
import { ImageUploadComponent } from '../image-upload/image-upload.component'
import { fieldimage } from 'src/app/adminpage/models/fieldimage.model';

@Component({
  providers:[ImageUploadComponent ],
  selector: 'app-footballfield',
  templateUrl: './footballfield.component.html',
  styleUrls: ['./footballfield.component.scss']
})
export class FootballfieldComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService, public router: Router, public img: ImageUploadComponent) { }
  public fields: field[] = [];
  public newImagefield: fieldimage = {
    Id: 0,
    fieldId: 0,
    ImageUrl: '',
  };
  public fieldDialog = false;
  private newField: field = {
    fieldId: 0,
    adminId: 0,
    fieldName: '',
    type: '5x5',
    status: 1,
    fullName: '',
    createDate: new Date(),
    updateDate: new Date(),
  };

  public field: field = Object.assign({}, this.newField);
  public submitted = true;
  public loading = true;
  public keyword = '';

  public EmailAdmin = localStorage['emailAdmin'];
  public idAdmin = 0;


  public ngOnInit() {
    this.loadField();
    this.dataService.getIdByEmail(this.EmailAdmin).subscribe((data) => {
      this.idAdmin = data;
    })
  }

  public searchField(keyword: string) {
    this.dataService.searchField(keyword).subscribe((data) => {
      console.log(data);
      this.fields = data;
    });
  }

  public loadField(): void {
    this.loading = true;
    this.dataService.getAllField().subscribe((data) => {
      this.fields = data;
      this.loading = false;
      console.log('fields', data);
    });
  }

  public editField(field: field): void {
    console.log('editField:', field);
    this.field = field;
    this.fieldDialog = true;
    this.hidebtn = false;
  }

  public deleteField(field: field): void {
    console.log('deleteField:', field);
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa ' + field.fieldName + 'không?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dataService.deleteField(field).subscribe((data) => {
          console.log('return data =', data);
          this.loadField();
        });

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Xóa thành công',
          life: 3000,
        });

      }
    });
  }
  public openNew() {
    console.log('open new');
    this.field = Object.assign({}, this.newField);
    this.fieldDialog = true;
    this.hidebtn = true;
  }
  public hideDialog(cancel = true, success = true, edit = true): void {
    console.log('hide dialog');
    this.fieldDialog = false;
    if (cancel) {
      this.messageService.add({
        severity: 'info',
        summary: 'Hủy',
        detail: 'cancel!',
        life: 3000,
      });
    } else if (success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Thêm mới sân bóng thành công',
        life: 3000,
      });
    } else if (edit) {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Chỉnh sửa sân bóng thành công',
        life: 3000,
      });
    } else this.messageService.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Thao tác bị lỗi',
      life: 3000,
    });
    this.loadField();
  }

  public saveField(): void {
    this.field.adminId = this.idAdmin;
    console.log('saveField:', this.field);
    if (this.field.fieldId === 0) {
      this.dataService.postField(this.field).subscribe(
        (data) => {
          this.hideDialog(false, true, false);
        },
        (error) => {
          this.hideDialog(false, false, false);
        }
      );
    } else {
      this.dataService.putField(this.field).subscribe(
        (data) => {
          this.hideDialog(false, false, true);
        },
        (error) => {
          this.hideDialog(false, false, false);
        },
      );
    }
    this.newImagefield.fieldId = this.field.fieldId;
    this.newImagefield.ImageUrl = this.img.currentFile!.name;
    this.dataService.postFieldImageUrl(this.newImagefield).subscribe();
    this.img.postFieldImage();
  }


  public hidebtn = true;
  public prices: price[] = [];
  public priceDialog = false;
  private newPrice: price = {
    priceId: 0,
    fieldId: 0,
    startTime: '',
    endTime: '',
    price1: '',
    createDate: new Date(),
    updateDate: new Date()
  };

  public price: price = Object.assign({}, this.newPrice);
  public openPrice(id: number) {
    this.dataService.getPrice(id).subscribe(
      (data) => {
        this.prices = data;
        console.log(data)
      })
    this.priceDialog = true;
  }

  public savePrice(payload: price) {
    console.log(payload)
    this.dataService.putPrice(payload).subscribe(
      (data) => {
        console.log('return data =', data);
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Cập nhật thành công',
          life: 3000,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: error?.message,
          life: 3000,
        });
      }
    )
  }

  openUploadImage(fieldId: any, event: any) {
    this.img.selectFile(event);
    // this.router.navigate(['admin/pages/images']);
  }

}
