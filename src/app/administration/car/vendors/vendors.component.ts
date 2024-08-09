import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  CarVendorDto,
  CarVendorDtoPagedResultDto,
  CarVendorsServiceProxy,
  UserDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateVendorDialogComponent } from './create-vendor/create-vendor-dialog.component';
import { EditVendorDialogComponent } from './edit-vendor/edit-vendor-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;  
  isActive: boolean | null;  
}

@Component({
  templateUrl: './vendors.component.html',  
  animations: [appModuleAnimation()]
})
export class VendorsComponent extends PagedListingComponentBase<CarVendorDto> {
  vendros: CarVendorDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _carVendorsService: CarVendorsServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createVendor(): void {
    this.showCreateOrEditVendorDialog();
  }

  editVendor(user: CarVendorDto): void {
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

    this._carVendorsService
      .getAll(
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CarVendorDtoPagedResultDto) => {
        this.vendros = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(user: CarVendorDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', user.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._carVendorsService.delete(user.id).subscribe(() => {
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
        CreateVendorDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditVendorDialogComponent,
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
