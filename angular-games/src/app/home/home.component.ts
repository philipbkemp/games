import { Component, OnInit } from '@angular/core';
import { AppConfigService } from "@app/services/config.service";
import { CookieService } from "@app/services/cookie.service";
import { Title } from "@angular/platform-browser";
import { MessageService } from "primeng/api";
import { TrophyService } from "@app/services/trophy.service";
import { TrackerService } from "@app/services/tracker.service";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [MessageService]
})
export class HomeComponent implements OnInit {

	trophies_rsp: number = 0;

	constructor(
		private config: AppConfigService,
		private cookie: CookieService,
		private titleService: Title,
		private msg: MessageService,
		private trophy: TrophyService,
		private tracker: TrackerService
	) {
	}

	ngOnInit() {
		this.titleService.setTitle("Phil's Angular Game Room");

		let previousTrophy = localStorage.getItem("pbkgame.trophy");
		if ( previousTrophy !== null ) {
			setTimeout(()=>{
				let tMsg = previousTrophy?.split("|") || ["",""];
				this.msg.add({
					closable: false,
					detail: tMsg[1],
					life: 3000,
					severity: "success",
					summary: tMsg[0]
				});				
				localStorage.removeItem("pbkgame.trophy");
			},100);
		}

		this.tracker.trackPageView("/");

		this.getTrophies();
	}

	getTrophies() {
		this.trophies_rsp = (this.trophy.getTrophiesEarned("rps") / 10)*100;
	}
}
