class ModifyNameColumnsUniqueness < ActiveRecord::Migration[7.0]
  def change
    add_index :bank_accounts, :name, unique: true
    add_index :bank_sub_accounts, [:bank_account_id, :name], unique: true
  end
end
