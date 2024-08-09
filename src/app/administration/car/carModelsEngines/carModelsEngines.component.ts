import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  CarModelsEngineDto,
  CarModelsEngineDtoPagedResultDto,
  CarModelsEnginesServiceProxy,
  CarVendorDto,
  CarVendorDtoPagedResultDto,
  CarVendorsServiceProxy,
  UserDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateCarModelsEnginDialogComponent } from './create-carModelsEngin/create-carModelsEngin-dialog.component';
import { EditCarModelsEnginDialogComponent } from './edit-carModelsEngin/edit-carModelsEngin-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;  
  isActive: boolean | null;  
}

@Component({
  templateUrl: './carModelsEngines.component.html',  
  animations: [appModuleAnimation()]
})
export class CarModelsEnginesComponent extends PagedListingComponentBase<CarModelsEngineDto> {

  carModelsEngines: CarModelsEngineDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _carModelsEnginesService: CarModelsEnginesServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createCarEngin(): void {
    this.showCreateOrEditVendorDialog();
  }

  editCarEngin(user: CarVendorDto): void {
    this.showCreateOrEditVendorDialog(user.id);
  }


  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedUsersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._carModelsEnginesService
      .getAllNoPaging()
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CarModelsEngineDtoPagedResultDto) => {
        this.carModelsEngines = result.items;
        //this.showPaging(result, pageNumber);
      });
  }

  protected delete(user: CarModelsEngineDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', user.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._carModelsEnginesService.delete(user.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

 
  private showCreateOrEditVendorDialog(id?: number): void {
    let createOrEditUserDialog: BsModalRef;
    if (!id) {
      createOrEditUserDialog = this._modalService.show(
        CreateCarModelsEnginDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditCarModelsEnginDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditUserDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
