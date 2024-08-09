import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { VendorsComponent } from './administration/car/vendors/vendors.component';
import { ModelsComponent } from './administration/car/models/models.component';
import { CarModelsEnginesComponent } from './administration/car/carModelsEngines/carModelsEngines.component';
import { FuleTypesComponent } from './administration/car/fuleTypes/fuleTypes.component';
import { ColorsComponent } from './administration/car/colors/colors.component';
import { AdsComponent } from './ads/ads.component';
import { CustomerAdsComponent } from './customer/customerAds/customerAds.component';
import { ViewCustomerAdDialogComponent } from './customer/customerAds/view-customerAd/view-customerAd-dialog.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'administration/car/vendors', component: VendorsComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'administration/car/models', component: ModelsComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'administration/car/carModelsEngines', component: CarModelsEnginesComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'administration/car/fuleTypes', component: FuleTypesComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'administration/car/colors', component: ColorsComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'ads', component: AdsComponent, data: { permission: 'Pages.Ads' }, canActivate: [AppRouteGuard] },
                    { path: 'customer/ads', component: CustomerAdsComponent, data: { permission: 'Pages.CustomerAds' }, canActivate: [AppRouteGuard] },
                    { path: 'customer/ads', component: CustomerAdsComponent, data: { permission: 'Pages.CustomerAds' }, canActivate: [AppRouteGuard] },
                    { path: 'customer/ads/viewAd', component: ViewCustomerAdDialogComponent, data: { permission: 'Pages.CustomerAds' }, canActivate: [AppRouteGuard] },


                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
