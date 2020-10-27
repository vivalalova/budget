
const Dayjs = require('dayjs')

class BudgetService {
	query(start, end) {
		const budgets = this.getBudgets() || []
		let currentDay = start
		let sum = 0
		const endDate = end.add(1, 'day')

		if (currentDay > endDate) {
			return 0
		}

		while (currentDay < endDate) {
			const [{ amount = 0 } = { amount: 0 }] = budgets.filter(r => {
				return r.yearMonth === currentDay.format('YYYYMM')
			})
			sum += amount / currentDay.daysInMonth()
			currentDay = currentDay.add(1, 'day')
		}
		return Math.floor(sum)
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
