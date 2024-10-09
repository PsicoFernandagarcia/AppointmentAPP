import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState, LoadingService } from '../_services/loading.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  animations: [
    
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ])
  ]
})
export class LoaderComponent implements OnInit, OnDestroy {
  loading = false;
  private intervalId: number | undefined;
  private subscription!: Subscription;

  constructor(private loaderService: LoadingService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.loading = state.show;
        if(state.show){
          this.startFading();
        }else{
          this.stopFading();
        }
      });
  }

  ngOnDestroy() {
    this.stopFading();
  }

  private startFading() {
    this.intervalId = window.setInterval(() => {
      const icon = document.querySelector('.loading-icon') as HTMLElement;
      if (icon) {
        icon.style.opacity = (Math.sin(Date.now() / 500) + 1) / 2 + '';
      }
    }, 50);
  }

  private stopFading() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}