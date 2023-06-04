import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TokenService } from './demo/service/tokenService';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        private tokenService:TokenService
        ) { }

    ngOnInit() {
        this.tokenService.ngOnInit()
    }
}
