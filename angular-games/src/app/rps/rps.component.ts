import { Component, OnInit } from '@angular/core';
import { AppConfigService } from "@app/services/config.service";
import { CookieService } from "@app/services/cookie.service";

@Component({
	selector: 'app-rps',
	templateUrl: './rps.component.html',
	styleUrls: ['./rps.component.scss']
})
export class GameRpsComponent implements OnInit {

	userWins = 0;
	aiWins = 0;
	draws = 0;
	gamesPlayed = 0;

	waitingUser: boolean = true;

	userChoice: number = -1;
	aiChoice: number = -1;

	ROCK: number = 1;
	PAPER: number = 2;
	SCISSORS: number = 3;

	resWin: boolean = false;
	resDraw: boolean = false;
	resLose: boolean = false;

	constructor(
		private config: AppConfigService,
		private cookie: CookieService
	) {
	}

	ngOnInit() {
		this.waitingUser = true;
	}

	userChoose(weapon:number) {
		this.waitingUser = false;

		this.resWin = false;
		this.resLose = false;
		this.resDraw = false;

		this.userChoice = weapon;

		this.aiChoice = Math.floor(Math.random()*(3-1+1)+1);

		switch( this.userChoice ) {
			case this.ROCK:
				switch ( this.aiChoice ) {
					case this.ROCK:
						this.resDraw = true;
						break;
					case this.PAPER:
						this.resLose = true;
						break;
					case this.SCISSORS:
						this.resWin = true;
						break;
				}
				break;
			case this.PAPER:
				switch ( this.aiChoice ) {
					case this.ROCK:
						this.resWin = true;
						break;
					case this.PAPER:
						this.resDraw = true;
						break;
					case this.SCISSORS:
						this.resLose = true;
						break;
				}
				break;
			case this.SCISSORS:
				switch ( this.aiChoice ) {
					case this.ROCK:
						this.resLose = true;
						break;
					case this.PAPER:
						this.resWin = true;
						break;
					case this.SCISSORS:
						this.resDraw = true;
						break;
				}
				break;
		}

		this.gamesPlayed++;
		if ( this.resWin ) {
			this.userWins++;
		} else if ( this.resLose ) {
			this.aiWins++;
		} else if ( this.resDraw) {
			this.draws++;
		}

		setTimeout( ()=> {this.waitingUser=true}, 3000);
	}
}