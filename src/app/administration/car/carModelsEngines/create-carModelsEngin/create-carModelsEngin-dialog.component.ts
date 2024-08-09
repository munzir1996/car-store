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
  CarModelsEngineDto,
  CarModelDto,
  CarModelsServiceProxy,
  CarModelsEnginesServiceProxy
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  templateUrl: './create-carModelsEngin-dialog.component.html'
})
export class CreateCarModelsEnginDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  engin = new CarModelsEngineDto();
  models: CarModelDto[] = [];


  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _carModelsService: CarModelsServiceProxy,
    private _carModelsEnginesService: CarModelsEnginesServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {

    // this._userService.getRoles().subscribe((result) => {
    //   this.roles = result.items;
    //   this.setInitialRolesStatus();
    // });
    this.getModeles();
  }

  getModeles()  
  {
     this._carModelsService
      .getAllNoPaging()
      .subscribe((result) => {
        this.models = result.items;  
      });
  }
  selectedModelId(val : any)
  {
    this.engin.carModelId = val;   
  }
  save(): void {
    this.saving = true;

    this._carModelsEnginesService.create(this.engin).subscribe(
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
