# == Schema Information
#
# Table name: budgets
#
#  id          :bigint           not null, primary key
#  amount      :integer          not null
#  finished_at :datetime         not null
#  started_at  :datetime         not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe Budget, type: :model do
  describe 'Validations' do
    it '開始・終了日時と金額に値がある場合、trueを返す' do
      budget = build(:budget, started_at: 1.month.from_now, finished_at: 2.months.from_now, amount: 100_000)
      expect(budget).to be_valid
    end

    it '開始・終了日時と金額に値がない場合、falseを返す' do
      budget = build(:budget, started_at: nil, finished_at: nil, amount: nil)
      expect(budget).to be_invalid
    end
  end
end
