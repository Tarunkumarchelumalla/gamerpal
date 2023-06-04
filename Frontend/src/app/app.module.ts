import { APP_INITIALIZER, AfterViewInit, NgModule, OnInit } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';

import { CommonModule } from '@angular/common';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { SwipeComponent } from './demo/components/swipe/swipe.component';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { LandingComponent } from './demo/components/landing/landing.component';
import { ToolbarModule } from 'primeng/toolbar';
import { LoginComponent } from './demo/components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './demo/components/register/register.component';
import { ApiService } from './demo/service/Api.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptorService } from './demo/service/token-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './demo/service/tokenService';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ChatsComponent } from './demo/components/chats/chats.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ProfileComponent } from './demo/components/profile/profile.component';
import {MatDividerModule} from '@angular/material/divider';
import { KnobModule } from 'primeng/knob';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { ProgressBarModule } from 'primeng/progressbar';
@NgModule({
    declarations: [AppComponent, NotfoundComponent, SwipeComponent,LandingComponent,LoginComponent, RegisterComponent, ChatsComponent, ProfileComponent],
    imports: [
        CardModule,
        TabViewModule,
        ButtonModule,
        TieredMenuModule,
        MenuModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        ToggleButtonModule,
        PasswordModule,
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        BrowserModule,
        DialogModule,
        ToolbarModule,
        CommonModule,
        ButtonModule,
        CardModule,
        ToolbarModule,
        DialogModule,
        FlexLayoutModule,
        DragDropModule,
        BrowserModule,
        ButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        KnobModule,
        MatChipsModule,
        MatIconModule,
        MatGridListModule,
        MatTabsModule,
        ProgressBarModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        ApiService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass:TokenInterceptorService,
            multi:true
        },

    
        
    ],
    bootstrap: [AppComponent],
})
export class AppModule  {



}
