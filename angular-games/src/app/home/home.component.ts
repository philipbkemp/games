import { Component, OnInit } from '@angular/core';
import { AppConfigService } from "@app/services/config.service";
import { CookieService } from "@app/services/cookie.service";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		private config: AppConfigService,
		private cookie: CookieService
	) {
	}

	ngOnInit() {
		console.log("rock, paper, scissors");
	}
}
