import { Component, OnInit } from '@angular/core';
import { AppConfigService } from "@app/services/config.service";
import { CookieService } from "@app/services/cookie.service";
import { Title } from "@angular/platform-browser";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		private config: AppConfigService,
		private cookie: CookieService,
		private titleService: Title
	) {
	}

	ngOnInit() {
		this.titleService.setTitle("Phil's Angular Game Room");
	}
}
