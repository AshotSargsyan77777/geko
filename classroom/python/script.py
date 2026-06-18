board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
]

player = "X"


def print_board():
    for row in board:
        print(" | ".join(row))
        print("-" * 9)


def check_winner():
    
    for row in board:
        if row[0] == row[1] == row[2] != " ":
            return True

    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] != " ":
            return True

    if board[0][0] == board[1][1] == board[2][2] != " ":
        return True

    if board[0][2] == board[1][1] == board[2][0] != " ":
        return True

    return False


for turn in range(9):
    print_board()

    row = int(input(f"Player {player}, row (0-2): "))
    col = int(input(f"Player {player}, col (0-2): "))

    if board[row][col] != " ":
        print("Այս վանդակը զբաղված է։")
        continue

    board[row][col] = player

    if check_winner():
        print_board()
        print(f"Player {player} wins!")
        break

    player = "O" if player == "X" else "X"

else:
    print_board()
    print("Draw!")