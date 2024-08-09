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
  CarColorDto,
  CarColorsServiceProxy
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './create-color-dialog.component.html'
})
export class CreateColorDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  carColor = new CarColorDto();
  

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _carColorsService: CarColorsServiceProxy,
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

    this._carColorsService.create(this.carColor).subscribe(
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
