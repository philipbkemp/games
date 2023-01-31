import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { AppConfigService } from "@app/services/config.service";
import { NgxPiwikProModule, NgxPiwikProRouterModule  } from '@piwikpro/ngx-piwik-pro';

import { HomeComponent } from "@app/home/home.component";
import { GameRpsComponent } from "@app/rps/rps.component";

export function appConfigInit(config:AppConfigService) {
	return() => {
		return config.load();
	}
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		GameRpsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		TranslocoRootModule,
		NgxPiwikProModule.forRoot('2b7b273d-ff1f-4a5d-901c-2fa83b86c8e5', 'https://philipbkemp.containers.piwik.pro'),
		NgxPiwikProRouterModule.forRoot()
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: appConfigInit,
			multi: true,
			deps: [AppConfigService]
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
