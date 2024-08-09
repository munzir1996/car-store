import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  CarFuleTypeDto,
  CarFuleTypeDtoPagedResultDto,
  CarFuleTypesServiceProxy,
  CarVendorDto,
  CarVendorDtoPagedResultDto,
  CarVendorsServiceProxy,
  UserDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateFuleTypeDialogComponent } from './create-fuleType/create-fuleType-dialog.component';
import { EditFuleTypeDialogComponent } from './edit-fuleType/edit-fuleType-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;  
  isActive: boolean | null;  
}

@Component({
  templateUrl: './fuleTypes.component.html',  
  animations: [appModuleAnimation()]
})
export class FuleTypesComponent extends PagedListingComponentBase<CarVendorDto> {
  carFuleTypes: CarFuleTypeDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _carFuleTypesService: CarFuleTypesServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createFuleType(): void {
    this.showCreateOrEditVendorDialog();
  }

  editFuleType(user: CarVendorDto): void {
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

    this._carFuleTypesService
      .getAll(
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CarFuleTypeDtoPagedResultDto) => {
        this.carFuleTypes = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(user: CarVendorDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', user.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._carFuleTypesService.delete(user.id).subscribe(() => {
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
        CreateFuleTypeDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditFuleTypeDialogComponent,
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
