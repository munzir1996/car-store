import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Renderer2
} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppComponentBase } from '../shared/app-component-base';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './visitor.component.html',
  //animations: [appModuleAnimation()] 
  encapsulation: ViewEncapsulation.None 
})
export class VisitorComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector,
    private _sessionService: AppSessionService,
    public route: ActivatedRoute,

     private renderer: Renderer2) {
    super(injector);
    //
     //
    //  if(this._sessionService.user)
    //  {
    //      this.showLeftsidebar = false;
    //  }
    
  }

  ngOnInit(): void {
    // this.renderer.addClass(document.body, 'sidebar-mini');
  }
}
