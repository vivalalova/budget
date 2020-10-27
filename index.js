
const Dayjs = require('dayjs')
// const dayjs = require('dayjs')
// var dayjs = require('dayjs')

class BudgetService {

	query(start, end) {
		const budgets = this.getBudgets() || []

		// filter
		let currentDay = start
		let sum = 0
		while (currentDay <= end) {

			const [{ amount = 0 } = { amount: 0 }] = budgets.filter(r => {
				return r.yearMonth === currentDay.format('yyyyMM')
			})

			sum += amount / currentDay.daysInMonth()

			currentDay = currentDay.add(1, 'day')
		}

		return sum
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

module.exports = {
	BudgetService,
	IBudgetRepo,
	Budget
}
