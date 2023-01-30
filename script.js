let nextMoveX = true;
let complete = false;
let moves = 0;

$(document).ready(() => {
    const finish = () => {
        complete = true;
        $('.col.square').css('cursor', 'default');
        $('button.restart').css('display', 'block');
        if (nextMoveX) {
            $('.winning-line').css('display', 'block');
            $('.winning-line').css('background-color', 'var(--clr-blue)');
            $('h2').html('Player 2 (O) has won!');
        } else {
            $('.winning-line').css('display', 'block');
            $('.winning-line').css('background-color', 'var(--clr-red)');
            $('h2').html('Player 1 (X) has won!');
        }
    };

    const check = (num1, num2, num3) => {
        if (($('.col.square').children('.cross').eq(num1).css('opacity') == 1 && $('.col.square').children('.cross').eq(num2).css('opacity') == 1 && $('.col.square').children('.cross').eq(num3).css('opacity') == 1) || ($('.col.square').children('.circle').eq(num1).css('opacity') == 1 && $('.col.square').children('.circle').eq(num2).css('opacity') == 1 && $('.col.square').children('.circle').eq(num3).css('opacity') == 1)) {
            finish();
            let colHeight = $('.col.square').css('height');
            let colWidth = colHeight;

            // horizontal line
            if (num1 + 1 == num2) {
                $('.winning-line').css('transform', 'rotate(0deg)');
                $('.winning-line').css('margin-left', '0');
                $('.winning-line').css('height', '10px');
                $('.winning-line').css('width', '100%');
                // first row
                if (num1 == 0) $('.winning-line').css('margin-top', `calc(${colHeight}/2 - 10px)`);
                // second row
                else if (num1 == 3) $('.winning-line').css('margin-top', 'calc(50% - 5px)');
                // third row
                else $('.winning-line').css('margin-top', `calc(${colHeight}*2 + ${colHeight}/2 + 20px)`);
            }

            // vertical line
            else if (num1 + 3 == num2) {
                $('.winning-line').css('transform', 'rotate(0deg)');
                $('.winning-line').css('height', '100%');
                $('.winning-line').css('width', '10px');
                $('.winning-line').css('margin-top', '0');
                // first column
                if (num1 == 0) $('.winning-line').css('margin-left', `calc(${colWidth}/2 - 10px)`);
                // second row
                else if (num1 == 1) $('.winning-line').css('margin-left', `calc(50% - 5px)`);
                // third row
                else $('.winning-line').css('margin-left', `calc(${colWidth}*2 + ${colWidth}/2 + 20px)`);
            }

            // diagonal line
            else {
                $('.winning-line').css('margin-top', 'calc(50% - 5px)');
                $('.winning-line').css('margin-left', '-20%');
                $('.winning-line').css('height', '10px');
                $('.winning-line').css('width', '140%');
                // from left top to bottom right corner
                if (num1 == 0) $('.winning-line').css('transform', 'rotate(45deg)');
                // from right top to bottom left corner
                else $('.winning-line').css('transform', 'rotate(-45deg)');
            }
        }
    };

    $('.col.square')
        .hover(
            (e) => {
                if (!$(e.currentTarget).hasClass('used') && !complete) {
                    if (nextMoveX) {
                        $(e.currentTarget).children('.cross').css('display', 'block');
                        $(e.currentTarget).children('.cross').css('opacity', '0.5');
                        $(e.currentTarget).children('.circle').css('display', 'none');
                    } else {
                        $(e.currentTarget).children('.cross').css('display', 'none');
                        $(e.currentTarget).children('.circle').css('display', 'block');
                        $(e.currentTarget).children('.circle').css('opacity', '0.5');
                    }
                }
            },
            (e) => {
                if (!$(e.currentTarget).hasClass('used') && !complete) {
                    $(e.currentTarget).children('.circle').css('display', 'none');
                    $(e.currentTarget).children('.cross').css('display', 'none');
                }
            }
        )
        .click((e) => {
            if (!$(e.currentTarget).hasClass('used') && !complete) {
                moves++;
                $(e.currentTarget).addClass('used');
                $(e.currentTarget).css('cursor', 'default');
                if (nextMoveX) {
                    $(e.currentTarget).children('.cross').css('display', 'block');
                    $(e.currentTarget).children('.cross').css('opacity', '1');
                    $(e.currentTarget).children('.circle').css('display', 'none');
                    $('h2').html('Player 2 (O) move');
                } else {
                    $(e.currentTarget).children('.cross').css('display', 'none');
                    $(e.currentTarget).children('.circle').css('display', 'block');
                    $(e.currentTarget).children('.circle').css('opacity', '1');
                    $('h2').html('Player 1 (X) move');
                }
                nextMoveX = !nextMoveX;
                if (moves == 9) $('h2').html('Tie!');
                for (let i = 0; i < 3; i++) {
                    if (complete) break;
                    check(i * 3, i * 3 + 1, i * 3 + 2); // check rows
                    check(i, i + 3, i + 6); // check columns
                }
                if (!complete) {
                    check(0, 4, 8); // check diagonal 1
                    check(2, 4, 6); // check diagonal 2
                }
            }
        });
    $('button.restart').click(() => {
        moves = 0;
        complete = false;
        if (nextMoveX) $('h2').html('Player 1 (X) move');
        else $('h2').html('Player 2 (O) move');
        $('.col.square').children('.cross').css('display', 'none');
        $('.col.square').children('.circle').css('display', 'none');
        $('.col.square').children('.cross').css('opacity', '0');
        $('.col.square').children('.circle').css('opacity', '0');
        $('.col.square').removeClass('used');
        $('.col.square').css('cursor', 'pointer');
        $('.winning-line').css('display', 'none');
        $('button.restart').css('display', 'none');
    });
});
