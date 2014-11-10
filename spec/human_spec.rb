require 'human'
require 'board'

describe 'Human' do

  let(:board)   { Board.new }
  let(:console) { instance_double('Console', {
    :draw_board => nil,
    :prompt_for_move => 4
    }) }
  let(:human)   { Human.new(:X, console) }

  context '#move' do
    it 'displays the board' do
      expect(console).to receive(:draw_board)
      human.move(board)
    end

    it 'takes an input from the user.' do
      expect(console).to receive(:prompt_for_move)
      human.move(board)
    end

    it 'makes a move on the board' do
      human.move(board)
      expect(board.empty?).to eq(false)
    end

    it 'will run until the user picks an empty spot on the board' do
      board.place(human.token, 4)
      board.place(human.token, 0)
      board.place(human.token, 1)
      board.place(human.token, 2)
      allow(console).to receive(:prompt_for_move).and_return(4, 4, 4, 0, 1, 4, 2, 3)
      human.move(board)
      expect(board[3]).to eq(human.token)
    end
  end
end