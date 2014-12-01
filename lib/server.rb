
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



