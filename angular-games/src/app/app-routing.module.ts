import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "@app/home/home.component";
import { GameRpsComponent } from "@app/rps/rps.component";
import { GameRpslsComponent } from "@app/rpsls/rpsls.component";

const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "rps", component: GameRpsComponent },
	{ path: "rpsls", component: GameRpslsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
