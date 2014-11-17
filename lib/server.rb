
require 'json'

enable :sessions

get '/' do
  erb :index
end

get '/game/new' do
  session[:game] = Game.new(Board.new, Human.new(:X), AI.new(:O))
end

post '/move' do
  game = session[:game]
  spot = params[:spot].to_i
  game.turn(spot)
  spot = game.turn()
  { :aimove => spot }.to_json
end




