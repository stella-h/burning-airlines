# == Route Map
#
#                        Prefix Verb   URI Pattern                                                              Controller#Action
#                               GET    /                                                                        sessions#new
#                               POST   /                                                                        sessions#create
#                               DELETE /                                                                        sessions#destroy
#                           app GET    /app(.:format)                                                           planes#search
#     plane_flight_reservations GET    /app/planes/:plane_id/flights/:flight_id/reservations(.:format)          reservations#index
#                               POST   /app/planes/:plane_id/flights/:flight_id/reservations(.:format)          reservations#create
#  new_plane_flight_reservation GET    /app/planes/:plane_id/flights/:flight_id/reservations/new(.:format)      reservations#new
# edit_plane_flight_reservation GET    /app/planes/:plane_id/flights/:flight_id/reservations/:id/edit(.:format) reservations#edit
#      plane_flight_reservation GET    /app/planes/:plane_id/flights/:flight_id/reservations/:id(.:format)      reservations#show
#                               PATCH  /app/planes/:plane_id/flights/:flight_id/reservations/:id(.:format)      reservations#update
#                               PUT    /app/planes/:plane_id/flights/:flight_id/reservations/:id(.:format)      reservations#update
#                               DELETE /app/planes/:plane_id/flights/:flight_id/reservations/:id(.:format)      reservations#destroy
#                 plane_flights GET    /app/planes/:plane_id/flights(.:format)                                  flights#index
#                               POST   /app/planes/:plane_id/flights(.:format)                                  flights#create
#              new_plane_flight GET    /app/planes/:plane_id/flights/new(.:format)                              flights#new
#             edit_plane_flight GET    /app/planes/:plane_id/flights/:id/edit(.:format)                         flights#edit
#                  plane_flight GET    /app/planes/:plane_id/flights/:id(.:format)                              flights#show
#                               PATCH  /app/planes/:plane_id/flights/:id(.:format)                              flights#update
#                               PUT    /app/planes/:plane_id/flights/:id(.:format)                              flights#update
#                               DELETE /app/planes/:plane_id/flights/:id(.:format)                              flights#destroy
#                        planes GET    /app/planes(.:format)                                                    planes#index
#                               POST   /app/planes(.:format)                                                    planes#create
#                     new_plane GET    /app/planes/new(.:format)                                                planes#new
#                    edit_plane GET    /app/planes/:id/edit(.:format)                                           planes#edit
#                         plane GET    /app/planes/:id(.:format)                                                planes#show
#                               PATCH  /app/planes/:id(.:format)                                                planes#update
#                               PUT    /app/planes/:id(.:format)                                                planes#update
#                               DELETE /app/planes/:id(.:format)                                                planes#destroy
#                         users GET    /users(.:format)                                                         users#index
#                               POST   /users(.:format)                                                         users#create
#                      new_user GET    /users/new(.:format)                                                     users#new
#                          user PATCH  /users/:id(.:format)                                                     users#update
#                               PUT    /users/:id(.:format)                                                     users#update
#                               DELETE /users/:id(.:format)                                                     users#destroy
#

Rails.application.routes.draw do

  # root 'app/planes#index'

  get '/' => 'sessions#new'
  post '/' => 'sessions#create'
  delete '/' => 'sessions#destroy'

  get '/app' => 'planes#search', :as => 'app'


  scope :app do
    resources :planes do
      resources :flights do
        resources :reservations
      end
    end
  end

  resources :users, :except => [:edit, :show]
end
