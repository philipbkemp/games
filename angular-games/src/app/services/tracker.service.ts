import { Injectable, OnDestroy } from "@angular/core";
import { AppConfigService } from "@app/services/config.service";
import { CookieService } from "@app/services/cookie.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Subscription, Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ApiResponse } from "@app/interfaces/api-response.interface";

@Injectable({
	providedIn: "root"
})
export class TrackerService implements OnDestroy {

	private pinger?:Subscription;

	constructor(
		private cookie: CookieService,
		private http: HttpClient,
		private config: AppConfigService
	) {}

	ngOnDestroy() {
		if ( this.pinger ) { this.pinger.unsubscribe(); }
	}

	private uniqid() {
		const length: number = 13;
		const chars: string = "0123456789qwertyuiopasdfghjklzxcvbnm";
		let result:string = '';
		let i: number;
		for (i=length ; i>0 ; --i ) {
			result += chars[Math.floor(Math.random() * chars.length)];
		}
		return result;
	}

	private checkGuest() {
		let guest:any = this.cookie.cookieGet("pbk.guest") || null;
		if ( ! guest ) {
			guest = this.uniqid();
			this.cookie.cookieSet("pbk.guest",guest);
		}
	}

	private doTrack(event:string,detail:string) {
		return this.http.post<ApiResponse>(
			this.config.trackPath,
			{
				"visitor": this.cookie.cookieGet("pbk.guest") || "",
				"event": event,
				"desc": detail
			},
			{headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}}
		);
	}

	trackPageView(page:string) {
		this.checkGuest();
		if ( this.pinger ) { this.pinger.unsubscribe(); }
		this.pinger = this.doTrack("angular-games/pageview",page).subscribe((resp:ApiResponse)=>{
			//console.log(resp);
		});
	}

	trackTrophy(game:string,trophy:string) {
		this.checkGuest();
		if ( this.pinger ) { this.pinger.unsubscribe(); }
		this.pinger = this.doTrack("angular-games/trophy",game + "/" + trophy).subscribe((resp:ApiResponse)=>{
			//console.log(resp);
		});
	}

}