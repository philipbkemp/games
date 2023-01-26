import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { AppConfigService } from "@app/services/config.service";

export function appConfigInit(config:AppConfigService) {
	return() => {
		return config.load();
	}
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		TranslocoRootModule
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
