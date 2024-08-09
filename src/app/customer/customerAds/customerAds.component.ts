import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  CarAdDto,
  CarAdDtoPagedResultDto,
  CarAdsServiceProxy,
  CarVendorDto,
  CarVendorDtoPagedResultDto,
  CarVendorsServiceProxy,
  UserDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
import { CreateCustomerAdDialogComponent } from './create-customerAd/create-customerAd-dialog.component';
import { EditCustomerAdDialogComponent } from './edit-customerAd/edit-customerAd-dialog.component';
import { AppSessionService } from '@shared/session/app-session.service';
import { Router } from '@angular/router';

class PagedUsersRequestDto extends PagedRequestDto {
  keyword: string;  
  isActive: boolean | null;  
}

@Component({
  templateUrl: './customerAds.component.html',  
  animations: [appModuleAnimation()]
})
export class CustomerAdsComponent extends PagedListingComponentBase<CarAdDto> {
  myAds: CarAdDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _carVendorsService: CarVendorsServiceProxy,
    private _carAdsService: CarAdsServiceProxy,
    private _modalService: BsModalService,
    private _route : Router,

  ) {
    super(injector);
  }

  createAd(): void {
    this.showCreateOrEditVendorDialog();
  }
 
  editAd(user: CarVendorDto): void {
    this.showCreateOrEditVendorDialog(user.id);
  }


  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }
  viewAd(_carAd : CarAdDto)
  {
    //AppSessionService.carAd = _carAd;
    localStorage.setItem("carAdId",_carAd.id.toString());
    this._route.navigateByUrl('/app/customer/ads/viewAd')
  }
  protected list(
    request: PagedUsersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._carAdsService
      .getCustomerAdsNoPaging(this.appSession.userId)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CarAdDtoPagedResultDto) => {
        this.myAds = result.items;
        //this.showPaging(result, pageNumber);
      });
  }

  protected delete(myad: CarAdDto): void {
    debugger
    abp.message.confirm(
      this.l('UserDeleteWarningMessage', myad.title),
      undefined,
      (result: boolean) => {
        if (result) {
          this._carAdsService.deleteCarAd(myad.id).subscribe(() => {
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
        CreateCustomerAdDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditUserDialog = this._modalService.show(
        EditCustomerAdDialogComponent,
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
