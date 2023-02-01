import { Component, OnInit } from '@angular/core';
import { AppConfigService } from "@app/services/config.service";
import { CookieService } from "@app/services/cookie.service";
import { MessageService } from "primeng/api";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [MessageService]
})
export class AppComponent implements OnInit {
	title = 'angular-games';

	constructor(
		private config: AppConfigService,
		private cookie: CookieService
	) {
	}

	ngOnInit() {
	}
}
