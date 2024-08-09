import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'visitor-header',
  templateUrl: './header.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
