import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { CreateVendorDialogComponent } from './administration/car/vendors/create-vendor/create-vendor-dialog.component';
import { EditVendorDialogComponent } from './administration/car/vendors/edit-vendor/edit-vendor-dialog.component';
import { VendorsComponent } from './administration/car/vendors/vendors.component';
import { ModelsComponent } from './administration/car/models/models.component';
import { CreateModelDialogComponent } from './administration/car/models/create-model/create-model-dialog.component';
import { EditModelDialogComponent } from './administration/car/models/edit-model/edit-model-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarModelsEnginesComponent } from './administration/car/carModelsEngines/carModelsEngines.component';
import { CreateCarModelsEnginDialogComponent } from './administration/car/carModelsEngines/create-carModelsEngin/create-carModelsEngin-dialog.component';
import { EditCarModelsEnginDialogComponent } from './administration/car/carModelsEngines/edit-carModelsEngin/edit-carModelsEngin-dialog.component';
import { FuleTypesComponent } from './administration/car/fuleTypes/fuleTypes.component';
import { CreateFuleTypeDialogComponent } from './administration/car/fuleTypes/create-fuleType/create-fuleType-dialog.component';
import { EditFuleTypeDialogComponent } from './administration/car/fuleTypes/edit-fuleType/edit-fuleType-dialog.component';
import { ColorsComponent } from './administration/car/colors/colors.component';
import { CreateColorDialogComponent } from './administration/car/colors/create-color/create-color-dialog.component';
import { EditColorDialogComponent } from './administration/car/colors/edit-color/edit-color-dialog.component';
import { AdsComponent } from './ads/ads.component';
import { CreateAdDialogComponent } from './ads/create-ad/create-ad-dialog.component';
import { EditAdDialogComponent } from './ads/edit-ad/edit-ad-dialog.component';
import { CustomerAdsComponent } from './customer/customerAds/customerAds.component';
import { CreateCustomerAdDialogComponent } from './customer/customerAds/create-customerAd/create-customerAd-dialog.component';
import { EditCustomerAdDialogComponent } from './customer/customerAds/edit-customerAd/edit-customerAd-dialog.component';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { ViewCustomerAdDialogComponent } from './customer/customerAds/view-customerAd/view-customerAd-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,

        // roles
        RolesComponent,  
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,

        // administrations
        //vendor
        VendorsComponent,
        CreateVendorDialogComponent,
        EditVendorDialogComponent,
        //models
        ModelsComponent,
        CreateModelDialogComponent,
        EditModelDialogComponent,
        //Car Models Engines
        CarModelsEnginesComponent,
        CreateCarModelsEnginDialogComponent,
        EditCarModelsEnginDialogComponent,
        //Car Models Engines
        FuleTypesComponent,
        CreateFuleTypeDialogComponent,
        EditFuleTypeDialogComponent,
        //Colors
        ColorsComponent,
        CreateColorDialogComponent,
        EditColorDialogComponent,
        //Ads
        AdsComponent,
        CreateAdDialogComponent,
        EditAdDialogComponent,
        //customerAds
        CustomerAdsComponent,
        CreateCustomerAdDialogComponent,
        EditCustomerAdDialogComponent,
        ViewCustomerAdDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
        NgSelectModule,
        FileUploadModule,  

    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],  
})
export class AppModule {}  
