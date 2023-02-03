import { Injectable } from "@angular/core";
import { CookieService } from "@app/services/cookie.service";

@Injectable({
	providedIn: "root"
})
export class TrophyService {

	constructor(
		private cookie: CookieService
	) {}

	earnTrophy(game:string, trophyCode:string) {
		let gameCookie:any = this.cookie.cookieGet("pbkgame."+game);
		if ( gameCookie ) {
			if ( gameCookie.indexOf(trophyCode) === -1 ) {
				this.cookie.cookieSet("pbkgame."+game,gameCookie+""+trophyCode);
				//this.ces.trackEvent(game+" trophy",trophyCode);
				return true;
			}
		} else {
			this.cookie.cookieSet("pbkgame."+game,trophyCode);
			//this.ces.trackEvent(game+" trophy",trophyCode);
			return true;
		}
		return false;
	}

	getTrophiesEarned(game:string) {
		let gameCookie:any = this.cookie.cookieGet("pbkgame."+game);
		if ( gameCookie ) {
			return gameCookie.length;
		}
		return 0;
	}

	hasTrophy(game:string,trophyCode:string) {
		let gameCookie:any = this.cookie.cookieGet("pbkgame."+game);
		if ( gameCookie ) {
			if ( gameCookie.indexOf(trophyCode) !== -1 ) {
				return true;
			}
		}
		return false;
	}

}