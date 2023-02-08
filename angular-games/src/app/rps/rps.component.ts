import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppConfigService } from "@app/services/config.service";
import { CookieService } from "@app/services/cookie.service";
import { TRANSLOCO_SCOPE, TranslocoService } from "@ngneat/transloco";
import { Meta, Title } from "@angular/platform-browser";
import { TrophyService } from "@app/services/trophy.service";
import { MessageService } from "primeng/api";
import { TrackerService } from "@app/services/tracker.service";

@Component({
	selector: 'app-rps',
	templateUrl: './rps.component.html',
	styleUrls: ['./rps.component.scss'],
	providers: [
		{provide: TRANSLOCO_SCOPE,useValue: "rps"},
		MessageService
	]
})
export class GameRpsComponent implements OnInit, OnDestroy {

	userWins = 0;
	aiWins = 0;
	draws = 0;
	gamesPlayed = 0;

	waitingUser: boolean = true;
	showingScore: boolean = false;

	userChoice: number = -1;
	aiChoice: number = -1;

	ROCK: number = 1;
	PAPER: number = 2;
	SCISSORS: number = 3;

	resWin: boolean = false;
	resDraw: boolean = false;
	resLose: boolean = false;

	nextRoundWaiter:any = null;

	rockWins: number = 0;
	paperWins: number = 0;
	scissorWins: number = 0;
	winStreak: number = 0;
	drawStreak: number = 0;
	loseStreak: number = 0;

	showTrophiesModalButton: boolean = false;

	constructor(
		private config: AppConfigService,
		private cookie: CookieService,
		private titleService: Title,
		public trophy: TrophyService,
		private translate: TranslocoService,
		private msg: MessageService,
		private tracker: TrackerService,
		private meta: Meta
	) {
	}

	ngOnInit() {
		this.waitingUser = true;

		this.titleService.setTitle("Phil's Angular Game Room | Rock Paper Scissors");
		this.meta.updateTag({property:"og:title",content:"Rock Paper Scissors"});
		this.meta.updateTag({property:"og:image",content:"https://philipbkemp.github.io/games/assets/og/rps.png"});
		this.meta.updateTag({property:"og:url",content:"https://philipbkemp.github.io/games/rps"});
		this.meta.updateTag({property:"og:description",content:"Play Rock Paper Scissors @ Phil's Game Room"});

		this.showTrophiesModalButton = this.trophy.getTrophiesEarned("rps") !== 0;
		this.tracker.trackPageView("/rps");
	}
	ngOnDestroy() {
		if ( this.nextRoundWaiter ) { clearTimeout(this.nextRoundWaiter); }
		/* trophy check */
		if ( this.gamesPlayed !== 0 && this.userWins === this.gamesPlayed ) {
			this.winTrophy("e");
		}
		if ( this.gamesPlayed !== 0 && this.aiWins === this.gamesPlayed ) {
			this.winTrophy("j");
		}
	}

	choiceToString(choice:number):string {
		switch (choice) {
			case this.PAPER: return "paper"; break;
			case this.ROCK: return "rock"; break;
			case this.SCISSORS: return "scissors"; break;
		}
		return "";
	}

	nextRound() {
		if ( this.nextRoundWaiter ) { clearTimeout(this.nextRoundWaiter); }
		if ( ! this.showingScore === true ) {
			return;
		}
		this.waitingUser = true;
		this.showingScore = false;
	}

	userChoose(weapon:number) {
		this.showingScore = true;
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

		/* trophy check */
		if ( this.userWins === 1 ) {
			this.winTrophy("a");
		}
		if ( this.gamesPlayed === 50 ) {
			this.winTrophy("i");
		}
		if ( this.resWin ) {
			this.winStreak++;
			this.drawStreak = 0;
			this.loseStreak = 0;
			if ( this.userChoice === this.ROCK ) {
				this.rockWins++;
				if ( this.rockWins === 5 ) {
					this.winTrophy("b");
				}
			}
			if ( this.userChoice === this.PAPER ) {
				this.paperWins++;
				if ( this.paperWins === 5 ) {
					this.winTrophy("c");
				}
			}
			if ( this.userChoice === this.SCISSORS ) {
				this.scissorWins++;
				if ( this.scissorWins === 5 ) {
					this.winTrophy("d");
				}
			}
			if ( this.winStreak === 5 ) {
				this.winTrophy("f");
			}
		} else if ( this.resLose ) {
			this.loseStreak++;
			this.winStreak = 0;
			this.drawStreak = 0;
			if ( this.loseStreak === 5 ) {
				this.winTrophy("g");
			}
		} else if ( this.resDraw ) {
			this.drawStreak++;
			this.winStreak = 0;
			this.loseStreak = 0;
			if ( this.drawStreak === 5 ) {
				this.winTrophy("h");
			}
		}

		this.nextRoundWaiter = setTimeout( ()=> {this.nextRound()}, 3000);
	}

	winTrophy(trophy:string) {
		if ( this.trophy.earnTrophy("rps",trophy) ) {
			this.showTrophiesModalButton = true;
			let tMsg = this.translate.translate("rps.trophy."+trophy).split("|");
			if ( ["e","j"].indexOf(trophy) === -1 ) {
				this.msg.add({
					closable: false,
					detail: tMsg[1],
					life: 3000,
					severity: "success",
					summary: tMsg[0]
				});
			} else {
				localStorage.setItem("pbkgame.trophy",tMsg.join("|"));
			}
		}
	}
}
