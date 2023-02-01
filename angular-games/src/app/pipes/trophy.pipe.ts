import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:"trophy"})
export class TrophyPipe implements PipeTransform {
	transform(value: string, part: number=0):string {
		return value.split("|")[part];
	}
}