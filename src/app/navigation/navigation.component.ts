import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(private breakpointObserver:BreakpointObserver,private overlay:OverlayContainer){}

    toggleControl=new FormControl(false);
    @HostBinding('class') className='';
    darkClassName='theme-dark';
    lightClassName='theme-light';

    ngOnInit(){
      this.toggleControl.valueChanges.subscribe((darkMode)=>{
        this.className=darkMode?this.darkClassName:this.lightClassName;
        if(darkMode){
          this.overlay.getContainerElement().classList.add(this.darkClassName)
        }else{
          this.overlay.getContainerElement().classList.remove(this.darkClassName)
        }
      })
    }

  }
