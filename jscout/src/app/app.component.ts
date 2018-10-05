import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { QuestionService } from './question.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

import {PayloadStoreService} from './payload-store.service';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers:  [QuestionService]
})

export class AppComponent {
	setupQuestions: any[];
	autoQuestions: any[];
	teleopQuestions: any[];
	endgameQuestions: any[];

	title = 'StrangeScout';
	year = '2018';
	game = 'Power Up';

	visiblePage = 'splash';

	scouter: string;
	team: number;
	run: number;

	constructor(private toastr: ToastrService, private location: PlatformLocation, qservice: QuestionService, private updates: SwUpdate, private cookieService: CookieService) {

		location.onPopState(() => {
			console.log('pressed back!');
			this.visiblePage = 'splash';
		}); history.pushState({}, '');

		this.setupQuestions = qservice.getSetupQuestions();
		this.autoQuestions = qservice.getAutoQuestions();
		this.teleopQuestions = qservice.getTeleopQuestions();
		this.endgameQuestions = qservice.getEndgameQuestions();

		updates.available.subscribe(event => {
			console.log('current version is', event.current);
			console.log('available version is', event.available);
			if(window.confirm("New version available. Load New Version?")) {
				window.location.reload();
			}
		});
		updates.activated.subscribe(event => {
			console.log('old version was', event.previous);
			console.log('new version is', event.current);
		});
		interval(30000).subscribe(() => updates.checkForUpdate());

		if(cookieService.get('scouter') == '') {
			do {
				this.scouter = window.prompt("Enter scouter name:");
			} while(this.scouter == null || this.scouter == "" );
			var expiredDate = new Date();
			expiredDate.setDate( expiredDate.getDate() + 3 );
			cookieService.set('scouter', this.scouter, expiredDate, "/", environment.domain);
		} else {
			this.scouter = cookieService.get('scouter')
		}

	}

	submitCache() {
		PayloadStoreService.submitCache();
	}

	editScouter() {
		do {
			if (this.scouter == null) {this.scouter = ""}
			this.scouter = window.prompt("Enter scouter name:", this.scouter);
		} while(this.scouter == null || this.scouter == "" );
		var expiredDate = new Date();
		expiredDate.setDate( expiredDate.getDate() + 3 );
		this.cookieService.set('scouter', this.scouter, expiredDate, "/", environment.domain);
	}

}
