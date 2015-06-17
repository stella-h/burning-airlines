class FlightsController < ApplicationController
  before_action :set_flight, only: [:show, :edit, :update, :destroy]

  # GET /flights
  # GET /flights.json

  def index
    if params[:plane_id]
      @plane = Plane.find params[:plane_id]
      if @plane.flights
        @flights = @plane.flights
      else
        @flights = []
      end
    else
      @flights = Flight.all
    end
    respond_to do |format| 
      format.html { }
      format.json { render :json => @flights }
    end 
  end

  # GET /flights/1
  # GET /flights/1.json
  def show
    @plane = Plane.find params[:plane_id]
    @flight = Flight.find params[:id]
  end

  # GET /flights/new
  def new
    @flight = Flight.new
    @plane = Plane.find params[:plane_id]
  end

  # GET /flights/1/edit
  def edit
    @flight = Flight.find params[:id]
    @plane = Plane.find params[:plane_id]
  end

  # POST /flights
  # POST /flights.json
  def create
    @plane = Plane.find params[:plane_id]
    @flight = Flight.new flight_params
    @flight.plane_id = @plane.id
    if @flight.save
      redirect_to plane_flights_path 
    else 
      render :new
    end

    rows = @flight.plane.rows
    columns = @flight.plane.columns

    for row in (0..(rows-1)) 
      for column in (0..(columns-1))
        @reservation = Reservation.new
        @reservation.row = row
        @reservation.column = column
        @reservation.user_id = nil
        @reservation.save;
        @flight.reservations << @reservation
      end
    end

  end

    # @flight = Flight.new(flight_params)

    # respond_to do |format|
    #   if @flight.save
    #     format.html { redirect_to @flight, notice: 'Flight was successfully created.' }
    #     format.json { render :show, status: :created, location: @flight }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @flight.errors, status: :unprocessable_entity }
    #   end
    # end
  # end

  # PATCH/PUT /flights/1
  # PATCH/PUT /flights/1.json
  def update
    @flight = Flight.find params[:id]
    @flight.update flight_params
    redirect_to plane_flight_path
  end

  # DELETE /flights/1
  # DELETE /flights/1.json
  def destroy
    @flight = Flight.find params[:id]
    @flight.destroy
    redirect_to plane_flights_path
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_flight
      @flight = Flight.find params[:id]   
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def flight_params
      params.require(:flight).permit(:id, :origin, :destination, :date, :plane_id)
    end

