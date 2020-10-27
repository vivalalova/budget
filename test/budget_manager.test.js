import { BudgetService } from "../index"
const Dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
Dayjs.extend(utc)
Dayjs.extend(timezone)
Dayjs.tz.setDefault("Asia/Taipei")

describe('total amount between period', function () {

	let budgetService
	let fake_get_all

	beforeEach(() => {
		budgetService = new BudgetService()
		fake_get_all = jest.fn()
		budgetService.getBudgets = fake_get_all
	})

	it('should no data return 0 ', () => {
		shouldReturnBudget('1970-10-10', '1970-10-10', 0)
	})

	it('same day return one day amount', () => {
		givenBudget([
			{ yearMonth: '202001', amount: 310 }
		])
		shouldReturnBudget('2020-01-01', '2020-01-01', 10)
	})

	it('five day return five day amount', () => {
		givenBudget([
			{ yearMonth: '202010', amount: 310 }
		])
		shouldReturnBudget('2020-10-01', '2020-10-05', 50)
	})

	it('same month', () => {
		givenBudget([
			{ yearMonth: '202009', amount: 30 }
		])
		shouldReturnBudget('2020-09-01', '2020-09-30', 30)
	})

	it('same month no amount', () => {
		givenBudget([
			{ yearMonth: '202009', amount: 0 }
		])
		shouldReturnBudget('2020-09-01', '2020-09-03', 0)
	})

	it('two month', () => {
		givenBudget([
			{ yearMonth: '202009', amount: 300 },
			{ yearMonth: '202010', amount: 3100 }
		])
		shouldReturnBudget('2020-09-30', '2020-10-02', 210)
	})

	it('three month', () => {
		givenBudget([
			{ yearMonth: '202009', amount: 300 },
			{ yearMonth: '202010', amount: 3100 },
			{ yearMonth: '202011', amount: 30 }
		])
		shouldReturnBudget('2020-09-30', '2020-11-07', 3117)
	})

	it('跨年', () => {
		givenBudget([
			{ yearMonth: '201912', amount: 310 },
			{ yearMonth: '202001', amount: 3100 },
		])
		shouldReturnBudget('2019-12-30', '2020-01-01', 120)
	})

	it('中間有空', () => {
		givenBudget([
			{ yearMonth: '202009', amount: 300 },
			{ yearMonth: '202010', amount: 0 },
			{ yearMonth: '202011', amount: 3000 }
		])
		shouldReturnBudget('2020-09-01', '2020-11-30', 3300)
	})

	it('invalid date', () => {
		givenBudget([
			{ yearMonth: '202001', amount: 310 }
		])
		shouldReturnBudget('2020-10-01', '2020-09-01', 0)
	})

	it('閏年2月', () => {
		givenBudget([
			{ yearMonth: '202002', amount: 290 }
		])
		shouldReturnBudget('2020-02-01', '2020-02-01', 10)
	})

	it('平年2月', () => {
		givenBudget([
			{ yearMonth: '202102', amount: 280 }
		])
		shouldReturnBudget('2021-02-01', '2021-02-01', 10)
	})

	it('2100年2月', () => {
		givenBudget([
			{ yearMonth: '210002', amount: 280 }
		])
		shouldReturnBudget('2100-02-01', '2100-02-01', 10)
	})

	function shouldReturnBudget(start, end, amount) {

		let startDate = new Dayjs(start)
		let endDate = new Dayjs(end)
		expect(budgetService.query(startDate, endDate)).toBe(amount)

	}

	function givenBudget(budget) {
		fake_get_all.mockReturnValueOnce(budget)
	}

});
