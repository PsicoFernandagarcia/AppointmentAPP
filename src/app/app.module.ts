import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { TranslateModule } from './_pipes/resource.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './_services/httpInterceptorProviders';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { LoaderModule } from './loader/loader.module';
import { AlertDialog, ConfirmationDialog } from './_services/notification.service';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import { BottomMenuComponent } from './bottom-menu/bottom-menu.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { AddPaymentDialog } from './payments/add-payment-dialog.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { MAT_LEGACY_AUTOCOMPLETE_SCROLL_STRATEGY as MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/legacy-autocomplete';
import { CloseScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const moment = _rollupMoment || _moment;
moment.locale('es');

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/yyyy',
  },
  display: {
    dateInput: 'DD/MM/yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/yyyy',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
	return () => overlay.scrollStrategies.close();
}

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialog,
    AlertDialog,
    BottomMenuComponent,
    AddPaymentDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    TranslateModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    LoaderModule,
    MatBottomSheetModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ScrollingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] },
    httpInterceptorProviders,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
