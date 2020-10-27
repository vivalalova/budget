import { BudgetService } from "../index"
const Dayjs = require('dayjs')

describe('total amount between period', function () {

	let budgetService
	let fake_get_all

	beforeEach(() => {
		budgetService = new BudgetService()
		fake_get_all = jest.fn()
		budgetService.getBudgets = fake_get_all
	})

	it('should no data return 0 ', () => {
		// givenBudget([
		// 	{ yearmonth: '202001', amount: 310 }
		// ])
		shouldReturnBudget('1970-10-10', '1970-10-10', 0)
	})

	it.skip('same day return one day amount', () => {
		givenBudget([
			{ yearmonth: '202001', amount: 310 }
		])
		shouldReturnBudget('2020-01-01', '2020-01-01', 10)
	})

	it.skip('five day return five day amount', () => {
		givenBudget([
			{ yearmonth: '202001', amount: 310 }
		])
		shouldReturnBudget('2020-10-01', '2020-10-05', 50)
	})

	it.skip('same month', () => {
		givenBudget([
			{ yearmonth: '202009', amount: 30 }
		])
		shouldReturnBudget('2020-09-01', '2020-09-30', 30)
	})

	it.skip('same month', () => {
		givenBudget([
			{ yearmonth: '202009', amount: 300 },
			{ yearmonth: '202010', amount: 3100 }
		])
		shouldReturnBudget('2020-09-30', '2020-10-02', 210)
	})

	it.skip('invalid date', () => {
		givenBudget([
			{ yearmonth: '202001', amount: 310 }
		])
		shouldReturnBudget('2020-10-01', '2020-09-01', 0)
	})

	it.skip('閏年', () => {
		givenBudget([
			{ yearmonth: '202002', amount: 290 }
		])
		shouldReturnBudget('2020-02-01', '2020-02-01', 10)
	})

	function shouldReturnBudget(start, end, amount) {
		let startDate = Dayjs(start)
		let endDate = Dayjs(end)
		expect(budgetService.query(startDate, endDate)).toBe(amount)

	}





	function givenBudget(budget) {
		fake_get_all.mockReturnValueOnce(budget)
	}

});
