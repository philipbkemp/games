import { Component, OnInit } from '@angular/core';
import { AppConfigService } from "@app/services/config.service";
import { CookieService } from "@app/services/cookie.service";
import { Meta, Title } from "@angular/platform-browser";
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

	trophies_rps: number = 0;
	trophies_rpsls: number = 0;

	constructor(
		private config: AppConfigService,
		private cookie: CookieService,
		private titleService: Title,
		private msg: MessageService,
		private trophy: TrophyService,
		private tracker: TrackerService,
		private meta: Meta
	) {
	}

	ngOnInit() {
		this.titleService.setTitle("Phil's Angular Game Room");
		this.meta.updateTag({property:"og:title",content:"Phil's Online Game Room"});
		this.meta.updateTag({property:"og:image",content:"https://philipbkemp.github.io/games/assets/og/games.png"});
		this.meta.updateTag({property:"og:url",content:"https://philipbkemp.github.io/games/"});
		this.meta.updateTag({property:"og:description",content:"Some random games in Angular"});

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
		this.trophies_rps = (this.trophy.getTrophiesEarned("rps") / 10)*100;
		this.trophies_rpsls = (this.trophy.getTrophiesEarned("rpsls") /12) *100;
	}
}
