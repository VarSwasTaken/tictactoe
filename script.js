$(document).ready(()=>{
    // let width = $(".row").first().css("width")
    // $(".vertical-line").css("width", width)
    // const mediaQuery = window.matchMedia('(min-width: 768px)')
    // mediaQuery.addEventListener("change", () => {
    //     $(".vertical-line").css("width", width)
    // })

    const check = (num1, num2, num3) => {
        if($(".col").eq(num1).html().length > 0 && $(".col").eq(num1).html() == $(".col").eq(num2).html() && $(".col").eq(num2).html() == $(".col").eq(num3).html()) {
            complete = true
            $(".col").css("opacity", 0.2);
            $(".col").eq(num1).css("opacity", 1);
            $(".col").eq(num2).css("opacity", 1);
            $(".col").eq(num3).css("opacity", 1);
            $(".col").css("cursor", "default");
            $("#move").text("Play again");
            $("#move").css("cursor", "pointer");
            if(!isX) {
                $("#result").text("Player 1 (X) has won!");
                $("#move").css("background-color", "var(--clr-blue)");
            }
            else {
                $("#result").text("Player 2 (O) has won!");
                $("#move").css("background-color", "var(--clr-orange)");
            }
        }
    }

    let isX = true
    let complete = false
    let counter = 0

    $(".col").hover((e)=>{
        if($(e.target).html().length == 0 && !complete && e.target.tagName.toUpperCase() == 'DIV') {
            if(isX)
                $(e.target).css("background-color", "var(--clr-blue)");
            else
            $(e.target).css("background-color", "var(--clr-orange)");
        }
    }, (e)=>{
        if(e.target.tagName.toUpperCase() == 'DIV')
            $(e.target).css("background-color", "var(--clr-gray)");
    }).click((e)=>{
        if($(e.target).html().length > 0 || complete || e.target.tagName.toUpperCase() == 'I')
            return
        if(isX) {
            $(e.target).append($("<i class='bi bi-x-lg'></i>"));
            $("#move").text("Player 2 (O) turn");
            $("#move").css("background-color", "var(--clr-orange)")
            isX = false;
        }
        else {
            $(e.target).append($("<i class='bi bi-circle'></i>"));
            $("#move").text("Player 1 (X) turn");
            $("#move").css("background-color", "var(--clr-blue)")
            isX = true;
        }
        $(e.target).css("background-color", "var(--clr-gray)");
        $(e.target).css("cursor", "default");
        counter++;
        for(let i=0; i<3; i++) {
            if(complete)
                break;
            check(i*3, i*3+1, i*3+2); // check rows
            check(i, i+3, i+6); // check columns
        }
        if(!complete) {
            check(0, 4, 8); // check diagonal 1
            check(2, 4, 6); // check diagonal 2
        }
        if(counter == 9 && !complete) {
            $("#result").text("Tie.");
            $("#move").text("Play again");
            $("#move").css("cursor", "pointer");
            complete = true
            $(".col").css("cursor", "default");
        }
    });

    $("#move").click(()=>{
        if($("#move").css("cursor") == "pointer") {
            $("#move").css("cursor", "default");
            $("#move").text("Player 1 (X) turn");
            $("#move").css("background-color", "var(--clr-blue)");
            $(".col").html("");
            $(".col").css("opacity", 1)
            $(".col").css("cursor", "pointer");
            $("#result").text("");
            isX = true;
            counter = 0;
            complete = false;
        }
    });
});