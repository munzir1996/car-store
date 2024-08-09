import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  CarColorDto,
  CarColorDtoPagedResultDto,
  CarColorsServiceProxy,
  CarVendorDto,
  CarVendorDtoPagedResultDto,
  CarVendorsServiceProxy,
  UserDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateColorDialogComponent } from './create-color/create-color-dialog.component';
import { EditColorDialogComponent } from './edit-color/edit-color-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;  
  isActive: boolean | null;  
}

@Component({
  templateUrl: './colors.component.html',  
  animations: [appModuleAnimation()]
})
export class ColorsComponent extends PagedListingComponentBase<CarVendorDto> {
  CarColors: CarColorDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _carColorsService: CarColorsServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createColor(): void {
    this.showCreateOrEditVendorDialog();
  }

  editColor(user: CarVendorDto): void {
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

    this._carColorsService
      .getAll(
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CarColorDtoPagedResultDto) => {
        this.CarColors = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(user: CarVendorDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', user.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._carColorsService.delete(user.id).subscribe(() => {
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
        CreateColorDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditColorDialogComponent,
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
