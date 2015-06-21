class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :edit, :update, :destroy]

  # GET /reservations
  # GET /reservations.json
  def index
    if params[:flight_id]
      @flight = Flight.find params[:flight_id]
      if @flight.reservations
        @reservations = @flight.reservations
      else
        @reservations = []
      end
    else
      @reservations = Reservation.all
    end
    respond_to do |format| 
      format.html {}
      format.json {render :json => @reservations}
    end 
  end

  # GET /reservations/1
  # GET /reservations/1.json
  def show
  end

  # GET /reservations/new
  def new
    @reservation = Reservation.new
    @flight = Flight.find params[:flight_id]
  end

  # GET /reservations/1/edit
  def edit
  end

  # POST /reservations
  # POST /reservations.json
  def create
    @reservation = Reservation.where(:flight_id => params[:flight_id], :row => params[:row], :column => params[:column])
    @flight = Flight.find params[:flight_id]
    
    @reservation[0].user_id = params[:user_id]
    @reservation[0].save

    render :json => { :status => 'okay' }
    # respond_to do |format|
    #     # if @reservation.save
    #     #   format.html { redirect_to @reservation, notice: 'Reservation was successfully created.' }
    #     #   format.json { render :show, status: :created, location: @reservation }
    #     # else
    #     #   format.html { render :new }
    #     #   format.json { render json: @reservation.errors, status: :unprocessable_entity }
    #     # end
  end

  # PATCH/PUT /reservations/1
  # PATCH/PUT /reservations/1.json
  def update
    respond_to do |format|
      if @reservation.update(reservation_params)
        format.html { redirect_to @reservation, notice: 'Reservation was successfully updated.' }
        format.json { render :show, status: :ok, location: @reservation }
      else
        format.html { render :edit }
        format.json { render json: @reservation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reservations/1
  # DELETE /reservations/1.json
  def destroy
    @reservation.destroy
    respond_to do |format|
      format.html { redirect_to reservations_url, notice: 'Reservation was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def reservation_params
      params.require(:reservation).permit(:row, :column, :flight_id, :user_id)
    end
end
