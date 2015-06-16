class ChangePasswordFormatInUsers < ActiveRecord::Migration
  def up
    change_column :users, :password_digest, :string
  end

  def down
    change_column :users, :password_digest, :text
  end
end
