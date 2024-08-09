import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  UserDto,
  RoleDto,
  CarVendorsServiceProxy,
  CarVendorDto  
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

@Component({
  templateUrl: './edit-vendor-dialog.component.html'
})
export class EditVendorDialogComponent extends AppComponentBase
  implements OnInit {
    saving = false;
    vendor = new CarVendorDto();
    id: number;
    @Output() onSave = new EventEmitter<any>();
  
    constructor(
      injector: Injector,
      private _carVendorsService: CarVendorsServiceProxy,
      public bsModalRef: BsModalRef
    ) {
      super(injector);
    }
  
    ngOnInit(): void {
  
      this._carVendorsService.get(this.id).subscribe((result: CarVendorDto) => {
        this.vendor = result;
      });
    }
    
    
    save(): void {
      this.saving = true;
      this.vendor.updated_date = moment();  
      this.vendor.deleted_date = null;
      this.vendor.updated_by = this.appSession.userId;
      this._carVendorsService.update(this.vendor).subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    }
}
