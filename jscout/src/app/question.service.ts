import { Injectable } from '@angular/core';

import { QuestionBase } from './question-types/question-base';
import { CheckboxQuestion } from './question-types/question-checkbox';
import { DropdownQuestion } from './question-types/question-dropdown';
import { NumberQuestion } from './question-types/question-number';
import { TextareaQuestion } from './question-types/question-textarea';
import { TextQuestion } from './question-types/question-text';

@Injectable()
export class QuestionService {

	// DO NOT EDIT THESE QUESTIONS
	getSetupQuestions() {
		const questions: QuestionBase<any>[] = [
			new NumberQuestion({
				key: 'TeamNumber',
				label: 'Team Number',
				required: true,
				order: 1,
				min: 1
			}),
			new NumberQuestion({
				key: 'MatchNumber',
				label: 'Match Number',
				required: true,
				order: 2,
				min: 1
			}),
			new DropdownQuestion({
				key: 'StartPosition',
				label: 'Robot Starting Position',
				options: [
					{value: '', name: 'Select Starting Position', disabled: true},
					{value: 'red_1',  name: 'Red 1'},
					{value: 'red_2',  name: 'Red 2'},
					{value: 'red_3',   name: 'Red 3'},
					{value: 'blue_1',  name: 'Blue 1'},
					{value: 'blue_2',  name: 'Blue 2'},
					{value: 'blue_3',   name: 'Blue 3'}
				],
				required: true,
				order: 3
			})
		];
		return questions.sort((a, b) => a.order - b.order);
	}
	// ================================================================================

	// Autonomous period questions
	getAutoQuestions() {
		const questions: QuestionBase<any>[] = [

			new CheckboxQuestion({
				key: 'AutoMovementLine',
				label: 'Autonomous Movement Line',
				order: 1
			}),

			new NumberQuestion({
				key: 'AutoSwitchCubes',
				label: 'Autonomous Power Cubes on Switch',
				tickers: true,
				min: 0,
				value: 0,
				order: 2
			}),

			new NumberQuestion({
				key: 'FailedAutoSwitchCubes',
				label: 'Missed Auto Power Cubes on Switch',
				tickers: true,
				min: 0,
				value: 0,
				order: 3
			}),

			new NumberQuestion({
				key: 'AutoScaleCubes',
				label: 'Autonomous Power Cubes on Scale',
				tickers: true,
				min: 0,
				value: 0,
				order: 4
			}),

			new NumberQuestion({
				key: 'FailedAutoScaleCubes',
				label: 'Missed Auto Power Cubes on Scale',
				tickers: true,
				min: 0,
				value: 0,
				order: 5
			}),

			new NumberQuestion({
				key: 'AutoExchange',
				label: 'Autonomous Power Cubes in Exchange',
				tickers: true,
				min: 0,
				value: 0,
				order: 6
			})

		];
		return questions.sort((a, b) => a.order - b.order);
	}

	// Teleop period questions
	getTeleopQuestions() {
		const questions: QuestionBase<any>[] = [

			new NumberQuestion({
				key: 'TeleSwitchCubes',
				label: 'Teleop Power Cubes on Switch',
				tickers: true,
				min: 0,
				value: 0,
				order: 1
			}),

			new NumberQuestion({
				key: 'FailedTeleSwitchCubes',
				label: 'Missed Teleop Power Cubes on Switch',
				tickers: true,
				min: 0,
				value: 0,
				order: 2
			}),

			new NumberQuestion({
				key: 'TeleScaleCubes',
				label: 'Teleop Power Cubes on Scale',
				tickers: true,
				min: 0,
				value: 0,
				order: 3
			}),

			new NumberQuestion({
				key: 'FailedTeleScaleCubes',
				label: 'Missed Teleop Power Cubes on Scale',
				tickers: true,
				min: 0,
				value: 0,
				order: 4
			}),

			new NumberQuestion({
				key: 'TeleExchange',
				label: 'Teleop Power Cubes in Exchange',
				tickers: true,
				min: 0,
				value: 0,
				order: 5
			})

		];
		return questions.sort((a, b) => a.order - b.order);
	}

	// Endgame questions
	getEndgameQuestions() {
		const questions: QuestionBase<any>[] = [

			new DropdownQuestion({
				key: 'EndPosition',
				label: 'Robot End Position',
				options: [
					{key: 'neither',  value: 'Neither'},
					{key: 'park',  value: 'Parked'},
					{key: 'climb',   value: 'Climbed'}
				],
				value: 'neither',
				order: 1
			}),

			new NumberQuestion({
				key: 'YellowCards',
				label: 'Yellow Cards',
				tickers: true,
				min: 0,
				value: 0,
				order: 2
			}),

			new NumberQuestion({
				key: 'RedCards',
				label: 'Red Cards',
				tickers: true,
				min: 0,
				value: 0,
				order: 3
			}),

			new TextareaQuestion({
				key: 'Notes',
				label: 'Additional Notes',
				rows: 5,
				order: 4
			})

		];
		return questions.sort((a, b) => a.order - b.order);
	}
}
