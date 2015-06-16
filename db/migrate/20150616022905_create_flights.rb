class CreateFlights < ActiveRecord::Migration
  def change
    create_table :flights do |t|
      t.string :origin
      t.string :destination
      t.date :date
      t.integer :plane_id

      t.timestamps null: false
    end
  end
end
