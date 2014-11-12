
enable :sessions

get '/' do
  'Hello World'
end

get '/game/new' do
  session[:game] = Game.new(Board.new, AI.new(:X), AI.new(:O))
end

post '/move' do
  game = session[:game]
  spot = params[:spot].to_i
  game.turn(spot)
end




