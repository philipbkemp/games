import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "@app/home/home.component";
import { GameRpsComponent } from "@app/rps/rps.component";

const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "rps", component: GameRpsComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
