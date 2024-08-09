import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  CarVendorDto,
  CarVendorsServiceProxy,
  CarFuleTypesServiceProxy,
  CarFuleTypeDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './create-fuleType-dialog.component.html'
})
export class CreateFuleTypeDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  fuleType = new CarFuleTypeDto();
  

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _carFuleTypesService: CarFuleTypesServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {

    // this._userService.getRoles().subscribe((result) => {
    //   this.roles = result.items;
    //   this.setInitialRolesStatus();
    // });
  }

  
  save(): void {
    this.saving = true;

    this._carFuleTypesService.create(this.fuleType).subscribe(
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
