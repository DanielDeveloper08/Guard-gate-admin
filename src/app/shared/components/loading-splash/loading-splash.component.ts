import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-loading-splash',
  templateUrl: './loading-splash.component.html',
  styleUrls: ['./loading-splash.component.scss']
})
export class LoadingSplashComponent implements OnInit {
  // isLoading = false;
  // private subscription: Subscription;

  constructor(private loadingService: LoadingService) {
    // this.subscription = this.loadingService.loading.subscribe(
    //   (isLoading) => (this.isLoading = isLoading)
    // );
  }

  ngOnInit() {

  }

  get isLoading(){
    return this.loadingService.loading;
  }

}
