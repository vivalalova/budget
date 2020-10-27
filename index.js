import { Dayjs } from "dayjs"
// const dayjs = require('dayjs')
// var dayjs = require('dayjs')

export class BudgetService {

	query(start, end) {
		const budgets = this.getBudgets()

		const from = new dayjs(start)
		const to = new dayjs(end)

		return 0
	}

	getBudgets() {
		const repo = new IBudgetRepo()
		return repo.getAll()
	}
}


class IBudgetRepo {
	getAll() {

	}
}


class Budget {
	// let yearMonth: String
	// let amount: String
}
