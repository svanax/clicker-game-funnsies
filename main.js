$(document).ready(done)

    var moneycount = 0

    var persecond = 0

    var clickpower = 1

    var originalcosts  = [250, 100, 1100, 8000, 32000, 170000 , 1000000, 5300000, 200000000, 1200000000, 7800000000, 51600000000, 348000000000, 2520000000000, 18000000000000, 132000000000000]
    var costs = [250, 100, 1100, 8000, 32000, 170000 , 1000000, 5300000, 200000000, 1200000000, 7800000000, 51600000000, 348000000000, 2520000000000, 18000000000000, 132000000000000]
    var animalcount = [ 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var animalproduce = [ 0, 1, 8, 47, 260, 1400 , 7800, 44000, 260000, 1600000, 10000000, 65000000, 430000000, 2900000000, 21000000000, 150000000000]
    var animalopacity = [ 1, 1, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    var i

    var random

    var temp

    var quacksound = new Audio("sounds/quack.mp3")
    var buysound = new Audio("sounds/buyeffect.mp3")
    var newproductsound = new Audio("sounds/newproduct.mp3")
    var backgroundmusic =new Audio("sounds/background.mp3")

function done()
{
    

    window.onload = function()
    {
        loadgame()
    }

    update()

    console.log("Alles geladen")

    $("body").on("contextmenu", function(e) {
        return false;
    });

    $("#clickduck").hover(duckhover, duckdehover)

    $("#clickduck").mousedown(clicked)

    $("#clickduck").mouseup(afterclick)

    $(".shop").click(buy)

}

function update()
    {
        $('#moneycount').text(moneycount.toLocaleString('en-GB') + " Quacks")
        $('#persecond').text(persecond.toLocaleString('en-GB') + " Quacks per second")

        if(animalcount[0] == 0)
        {
            clickpower = 1
        }
        else
        {
            clickpower = clickpower * Math.pow(2, animalcount[0])
        }

        if(moneycount>=originalcosts[i])
        {
            if($('#' + i).css("opacity") == 0)
            {
                $('#' + i).css("opacity", '1')
                newproductsound.play()
            }

        }
        
        
        
        for(i=0;i<16;i++)
        {
            $('#' + i + ' .cost').text(costs[i].toLocaleString('en-GB'));
            $('#' + i + ' .count').text(animalcount[i].toLocaleString('en-GB'));
        }
    }

function duckhover()
    {
        $("#clickduck").css("transform", "scale(0.80, 0.80)")

    }

function duckdehover()
    {
        $("#clickduck").css("transform", "scale(0.75, 0.75)")

    }

function clicked()
    {
        moneycount = moneycount + clickpower
        $('#moneycount').text(moneycount.toLocaleString('en-GB') + " Quacks")
        $("#clickduck").css("transform", "scale(0.75, 0.75)")
	backgroundmusic.play()

        random = Math.random(1, 10)
        if(random>=0.99)
        {
            quacksound.play()
        }

        
    }

function afterclick()
    {
        $("#clickduck").css("transform", "scale(0.80, 0.80)")

    }

function buy()
    {
        i = $(this).attr('id')

        if(i == 0)
        {
            if(moneycount>= costs[i])
            {
                moneycount = moneycount - costs[i];
                $('#moneycount').text(moneycount.toLocaleString('en-GB') + " Quacks")
                animalcount[i] = animalcount[i] + 1
                costs[i] = costs[i] * 5
                costs[i] = costs[i].toFixed()
                clickpower = clickpower * 2
                $('#' + i + ' .cost').text(costs[i].toLocaleString('en-GB'))
                $('#' + i + ' .count').text(animalcount[i].toLocaleString('en-GB'));
                buysound.play()
            }
        }
        else
        {
            if(moneycount>= costs[i])
            {
                moneycount = moneycount - costs[i];
                $('#moneycount').text(moneycount.toLocaleString('en-GB') + " Quacks")
                animalcount[i] = animalcount[i] + 1
                if(animalcount[i] == 25 || animalcount[i] == 50 || animalcount[i] == 100 || animalcount[i] == 250 || animalcount[i] == 500 || animalcount[i] == 1000)
                {
                    animalproduce[i] = animalproduce[i] * 2
                }
                costs[i] = originalcosts[i] * Math.pow(1.15, animalcount[i])
                costs[i] = costs[i].toFixed()
                $('#' + i + ' .cost').text(costs[i].toLocaleString('en-GB'))
                $('#' + i + ' .count').text(animalcount[i].toLocaleString('en-GB'));
                buysound.play()
            }
        }

    }
 

setInterval(function()
    {
        for(i=0;i<16;i++)
    {
        persecond = persecond + (animalcount[i] * (animalproduce[i] / 4))
        temp = persecond * 4

        if(moneycount>=originalcosts[i] || animalcount[i-1]>= 1)
        {
            if($('#' + i).css("opacity") == 0)
            {
                $('#' + i).css("opacity", '1')
                newproductsound.play()
            }

        }

    }
        moneycount = moneycount + persecond

        $('#moneycount').text(moneycount.toLocaleString('en-GB') + " Quacks")
        $('#persecond').text(temp.toLocaleString('en-GB') + " Quacks per second")
        persecond = 0
        document.title = moneycount.toLocaleString('en-GB') + " Quacks | Sven's Zoo Clicker";
    }, 250)

function saveGame()
    {
        var gamesave = {
            moneycount: moneycount,
            persecond: persecond,
            clickpower: clickpower, 
            costs: costs,  
            animalcount: animalcount,
            animalopacity:  animalopacity,
            animalproduce: animalproduce,
        };
        localStorage.setItem("gamesave", JSON.stringify(gamesave))
    }

setInterval(function()
    {
        var savedGame = JSON.parse(localStorage.getItem("gamesave"))
        saveGame()
        console.log(savedGame)
    }, 30000)

function loadgame()
    {
        var savedGame = JSON.parse(localStorage.getItem("gamesave"))
        if(typeof savedGame.moneycount !== 'undefined') moneycount = savedGame.moneycount
        if(typeof savedGame.persecond !== 'undefined') persecond = savedGame.persecond
        if(typeof savedGame.clickpower !== 'undefined') clickpower = savedGame.clickpower
        if(typeof savedGame.costs !== 'undefined') costs = savedGame.costs
        if(typeof savedGame.animalcount !== 'undefined') animalcount = savedGame.animalcount
        if(typeof savedGame.animalopacity !== 'undefined') animalopacity = savedGame.animalopacity
        if(typeof savedGame.animalproduce !== 'undefined') animalproduce = savedGame.animalproduce
        update()
    }



    

