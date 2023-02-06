import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { AppConfigService } from "@app/services/config.service";
import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { TrophyPipe } from "@app/pipes/trophy.pipe";
import { TrophyComponent } from "@app/components/trophy/trophy.component";
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
		GameRpsComponent,
		TrophyPipe,
		TrophyComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		TranslocoRootModule,
		ToastModule,
		BrowserAnimationsModule,
		DialogModule
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
