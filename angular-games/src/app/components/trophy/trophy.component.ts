import { Component, Input } from '@angular/core';
import { TRANSLOCO_SCOPE, TranslocoService } from "@ngneat/transloco";
import { TrophyService } from "@app/services/trophy.service";

@Component({
	selector: 'app-trophy',
	templateUrl: './trophy.component.html',
	styleUrls: ['./trophy.component.scss']
})
export class TrophyComponent {

	@Input() game: string = "";
	@Input() trophyList: string[] = [];
	@Input() button: boolean = false;

	constructor(
		public trophy: TrophyService
	) {
	}

	showTrophiesModal: boolean = false;

	toggleTrophies() {
		this.showTrophiesModal = true;
	}

}
