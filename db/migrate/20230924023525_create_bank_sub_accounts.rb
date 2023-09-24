class CreateBankSubAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :bank_sub_accounts do |t|
      t.string :name, null: false
      t.references :bank_account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
