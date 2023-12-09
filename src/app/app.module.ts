import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TemplateComponent } from './components/template/template.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './components/button/button.component';
import { HomeComponent } from './view/home/home.component';
import { NgxEditorModule } from 'ngx-editor';
import { EditorComponent } from './components/editor/editor.component';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ServerErrorInterceptor } from './shared/interceptors/server-erro.interceptor';
import { DialogModule } from '@angular/cdk/dialog';
import { ModalLoginComponent } from './shared/modais/modal-login/modal-login.component';
import { LoginComponent } from './view/login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ToolbarComponent,
    ButtonComponent,
    HomeComponent,
    EditorComponent,
    ModalLoginComponent,
    LoginComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatIconModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    NgFor,
    AsyncPipe,
    MatButtonToggleModule,
    MatButtonModule,
    NgxEditorModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    DialogModule,
    MatTabsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
