import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiQueryService } from '../api-query.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
	selector: 'app-data',
	templateUrl: './data.component.html',
	styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {
	// sets
	events: string[];
	teams: string[];
	matches: string[];

	// selection
	event: string;
	team: string;
	match: string;

	// query data
	queryData: {}[];
	keys: string[];

	// table datasource
	dataSource: MatTableDataSource<{}>;

	constructor(private query: ApiQueryService) {
		// default selection
		this.event = '';
		this.team = '';
		this.match = '';

		// initial index loads
		this.loadEvents();
		this.loadTeams();
		this.loadMatches();

		// initial query data load
		this.loadQueryData();
	}

	@ViewChild(MatSort) sort: MatSort;

	ngOnInit() {
	}

	// IDEXES ========================================

	// load events index
	loadEvents() {
		const self = this;
		this.query.getEvents(this.team, function(response) {
			if (self.isJSON(response)) {
				self.events = JSON.parse(response);
			} else {
				self.events = [];
			}
			self.events.sort();
		});
	}

	// load teams index
	loadTeams() {
		const self = this;
		this.query.getTeams(this.event, this.match, function(response) {
			if (self.isJSON(response)) {
				self.teams = JSON.parse(response);
			} else {
				self.teams = [];
			}
			self.teams.sort(function(a, b) { return parseInt(a, 10) - parseInt(b, 10); });
		});
	}

	// load matches index
	loadMatches() {
		const self = this;
		this.query.getMatches(this.event, this.team, function(response) {
			if (self.isJSON(response)) {
				self.matches = JSON.parse(response);
			} else {
				self.matches = [];
			}
			self.matches.sort(function(a, b) { return parseInt(a, 10) - parseInt(b, 10); });
		});
	}

	// ===============================================

	// returns an array of all values in an object (uses the master key array generated by the loadQueryData method)
	getValues(obj: {}) {
		const response = [];
		let prop;
		for (prop of this.keys) {
			response.push(obj[prop]);
		}
		return response;
	}

	// download query CSV
	downloadQuery() {
		window.open(this.query.getQueryPath(this.event, this.team, this.match));
	}

	// load query data into object
	loadQueryData() {
		const self = this;
		this.query.getQuery(this.event, this.team, this.match, true, function(response) {
			self.queryData = JSON.parse(response);
			self.keys = Object.keys(self.queryData[0]);
			// set datasource values and sort
			self.dataSource = new MatTableDataSource(self.queryData);
			self.dataSource.sort = self.sort;
		});
	}

	// is a string JSON?
	isJSON(j: string) {
		try {
			JSON.parse(j);
		} catch (e) {
			return false;
		}
		return true;
	}
}
