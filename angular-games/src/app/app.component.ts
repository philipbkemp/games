import { Component, OnInit } from '@angular/core';
import { AppConfigService } from "@app/services/config.service";
import { CookieService } from "@app/services/cookie.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'angular-games';

	constructor(
		private config: AppConfigService,
		private cookie: CookieService
	) {
	}

	ngOnInit() {
		console.log(this.config.cookiePrefix);
	}
}
