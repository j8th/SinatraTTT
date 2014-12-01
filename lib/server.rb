
require 'json'

enable :sessions

get '/' do
  board = nil
  if params[:board]
    board = Board::from_s(params[:board])
    ai = AI.new(:O)
    ai.move(board)
  else
    board = Board.new
  end
  erb :index, :locals => {:board => board}
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

get '/next-state' do
  board = Board::from_s(params[:board])
  ai = AI.new(:O)
  ai.move(board)
  board.to_s
end




