import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppSessionService } from '@shared/session/app-session.service';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class RootComponent {

    currentRoute: string;
    constructor(private _sessionService: AppSessionService,
        private _route : Router,
        private route : ActivatedRoute) {
        debugger
       let initialUrl = UrlHelper.initialUrl;    
    //    this._tokenService.setToken(localStorage.getItem("accessToken"),undefined);

        if (this._sessionService.user) {
            // router.subscribe((val) => /*whatever*/)
            // this._router.navigate(['/account/login']);
        // if (initialUrl.indexOf('/home') > 0) {
        //     initialUrl = AppConsts.appBaseUrl;
        // }
        // if(initialUrl.includes("suppliersProfile"))
        // {
        //     this._route.navigateByUrl('/app/suppliersProfile');

        //}
        // let title :any = this._route.events.pipe(
        //     filter(event => event instanceof NavigationEnd),
        //     map((event: NavigationEnd) => event.url));
            
        // this._route.events.pipe(
        //     filter(event => event instanceof NavigationEnd)
          
        //   )
        // this._route.events.pipe(
        //     filter((event:Event) => event instanceof NavigationEnd)
        //   ).subscribe(x => console.log(x))
         
        // _route.events.filter(event => event instanceof NavigationEnd)
        //   .subscribe(event => 
        //    {
        //       this.currentRoute = event.url;          
        //       console.log(event);
        //    });
        // debugger
        if(initialUrl.includes("app"))
        {
            let routName : string  = initialUrl.split('/app')[1];  
            this.currentRoute = "/app" + routName;
            this._route.navigateByUrl(this.currentRoute);
        }
        else
        {
            this._route.navigateByUrl('/app/home');
        }
       
        }
        else
        {
            this._route.navigateByUrl('/visitor/home');
        }
       
        
      }
}
