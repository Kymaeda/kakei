# == Schema Information
#
# Table name: bank_accounts
#
#  id         :bigint           not null, primary key
#  name       :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class BankAccount < ApplicationRecord
  has_many :bank_sub_accounts, dependent: :destroy

  validates :name, presence: true
end
