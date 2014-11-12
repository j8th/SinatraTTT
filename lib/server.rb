
enable :sessions

get '/' do
  'Hello World'
end

get '/game/new' do
  session[:game] = Game.new(Board.new, AI.new(:X), AI.new(:O))
end

post '/move' do
  #game = session[:game].inspect
  #puts session[:board]
  #board = YAML::load(session[:board])
  #puts board
  board = session[:board]
  #puts "BOARD: " + board
  spot = params[:spot]
  board.place(:X, 4)
  #session[:board] = board
  #session[:board] = YAML::dump(board)
  #puts session[:board][4]
  '4'
end




