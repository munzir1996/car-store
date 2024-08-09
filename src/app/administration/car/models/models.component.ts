import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  CarModelDto,
  CarModelDtoPagedResultDto,
  CarModelsServiceProxy,
  CarVendorDto,
  CarVendorDtoPagedResultDto,
  CarVendorsServiceProxy,
  UserDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateModelDialogComponent } from './create-model/create-model-dialog.component';
import { EditModelDialogComponent } from './edit-model/edit-model-dialog.component';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;  
  isActive: boolean | null;
}

@Component({
  templateUrl: './models.component.html',
  animations: [appModuleAnimation()]
})
export class ModelsComponent extends PagedListingComponentBase<CarModelDto> {
  models: CarModelDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _carModelsService: CarModelsServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createModel(): void {
    this.showCreateOrEditVendorDialog();
  }

  editModel(user: CarVendorDto): void {
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
debugger
    this._carModelsService
      .getAllNoPaging()
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: any) => {
        this.models = result.items;
        //this.showPaging(result, pageNumber);
      });
  }

  protected delete(user: CarModelDto): void {
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', user.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._carModelsService.delete(user.id).subscribe(() => {
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
        CreateModelDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditModelDialogComponent,
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
