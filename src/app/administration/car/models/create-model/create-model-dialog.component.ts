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
  CarModelsServiceProxy,
  CreateCarModelDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import * as moment from 'moment';

@Component({
  templateUrl: './create-model-dialog.component.html'
})
export class CreateModelDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  model = new CreateCarModelDto();
  vendors: CarVendorDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _carVendorsService: CarVendorsServiceProxy,
    private _carModelsService: CarModelsServiceProxy,

    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {

    // this._userService.getRoles().subscribe((result) => {
    //   this.roles = result.items;
    //   this.setInitialRolesStatus();
    // });

    this.getVendors();
  }

  getVendors()  
  {
     this._carVendorsService
      .getAllNoPaging()
      .subscribe((result) => {
        this.vendors = result.items;  
      });
  }
  selectedVendorId(val : any)
  {
    this.model.carVendorId = val;   
  }
  save(): void {
    this.saving = true;
    this.model.created_date = moment();
    this.model.updated_date = moment();
    this.model.deleted_date = null;
    
    this._carModelsService.create(this.model).subscribe(
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
