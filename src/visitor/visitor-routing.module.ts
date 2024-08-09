import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { VisitorComponent } from './visitor.component';
import { ViewCustomerAdDialogComponent } from './home/view-customerAd/view-customerAd-dialog.component';

@NgModule({
    imports: [
        RouterModule.forChild([ 
            {
                path: '',
                component: VisitorComponent,  
                children: [
                    { path: 'home', component: HomeComponent},  
                    { path: 'home/adDetails', component: ViewCustomerAdDialogComponent},  
                    // { path: 'register', component: RegisterComponent }
                ]
            }
        ])
    ],
    exports: [
        RouterModule  
    ]
})
export class VisitorRoutingModule { }  
