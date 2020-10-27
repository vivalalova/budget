import { BudgetService } from "../index"

describe('total amount between period', function () {

	let budgetService
	let fake_get_all

	beforeEach(() => {
		budgetService = new BudgetService()
		fake_get_all = jest.fn()
		budgetService.getAll = fake_get_all
	})

	it('should no data return 0 ', () => {
		givenBudget([
			{ yearmonth: '202001', amount: 310 }
		])
		scoreShouldBe('Love All')
	})

	function givenBudget(budget) {
		fake_get_all.mockReturnValueOnce(budget)
	}

});
