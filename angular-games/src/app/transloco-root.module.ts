import { HttpClient } from '@angular/common/http';
import {
	TRANSLOCO_LOADER,
	Translation,
	TranslocoLoader,
	TRANSLOCO_CONFIG,
	translocoConfig,
	TranslocoModule
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppConfigService } from "@app/services/config.service";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
	constructor(private http: HttpClient,private config: AppConfigService) {}

	getTranslation(lang: string) {
		return this.http.get<Translation>(`${this.config.buildPath}/assets/i18n/${lang}.json`);
	}
}

@NgModule({
	exports: [ TranslocoModule ],
	providers: [
		{
			provide: TRANSLOCO_CONFIG,
			useValue: translocoConfig({
				availableLangs: ['en'],
				defaultLang: 'en',
				// Remove this option if your application doesn't support changing language in runtime.
				reRenderOnLangChange: true,
				prodMode: environment.production,
			})
		},
		{ provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
	]
})
export class TranslocoRootModule {}