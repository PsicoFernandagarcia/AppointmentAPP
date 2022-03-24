import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState, LoadingService } from '../_services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading = false;
  private subscription!: Subscription;

  constructor(private loaderService: LoadingService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.loading = state.show;
      });
  }
}