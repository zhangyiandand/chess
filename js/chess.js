$(function () {
    /*
    * fn selector dom <tagname>
    * */
    let box = $('.box');
    let flag = false;
    let blank={};
    let ai = true;
    let black = {}, white ={};
    for(let i = 0; i < 15 ; i++){
        for(let j = 0; j < 15; j++){
            $('<div>').addClass('chess').attr('id',i+'_'+j).appendTo(box);
            blank[i+'_'+j]=true;
        }
    }

    box.on('click','.chess',function () {

        let _this = $(this);
        if (_this.hasClass('black') || _this.is('.white')) {
            return ;
        }

        // //开关
        // flag = !flag;
        let coords = _this.attr('id');
        //落子
        if(flag){
            black[coords] = true;
            $(this).addClass('black');
            delete blank[coords];
            flag = !flag;
            if(isSuccess(black,coords)>=5){
                alert('黑棋胜！');
                box.off('click');
            }
        }else{
            white[coords] = true;
            $(this).addClass('gray');
            delete blank[coords];
            flag = !flag;
            if(isSuccess(white,coords)>=5){
                alert('白棋胜！');
                box.off('click');
            }
        }

        if(ai){
            let pos = aifn();
            console.log(pos);
            black[pos] = true;
            delete blank[pos];
            $("#" + pos).addClass("black");
            if (isSuccess(black, pos) >= 5) {
                alert("黑棋胜");
                box.off("click");
            }
            flag = !flag;
        }

    })

    function  isSuccess(obj,coords) {
        let sp = 1, cz = 1, yx = 1, zx = 1;

        let [x,y] = coords.split('_');

        let i = x * 1, j = y * 1;

        while(obj[i+'_'+(++j)]){
            sp++;
        }
        j = y*1;

        while(obj[i+'_'+(--j)]){
            sp++;
        }

        //cz

        j = y*1;

        while(obj[(++i)+'_'+j]){
            cz++;
        }
        i = x*1;
        while(obj[(--i)+'_'+j]){
            cz++;
        }

        //yx

        i = x * 1;
        while(obj[(++i)+'_'+(++j)]){
            yx++;
        }

        i = x * 1;
        j = y * 1;

        while(obj[(--i)+'_'+(--j)]){
            yx++;
        }

        //zx

        i = x * 1;
        j = y * 1;
        while(obj[(++i)+'_'+(--j)]){
            zx++;
        }

        i = x * 1;
        j = y * 1;
        while(obj[(--i)+'_'+(++j)]){
            zx++;
        }

        return  Math.max(sp , cz, yx, zx);

    }

    function aifn() {
        let blackScore = 0, whiteScore = 0;
        let pos1 = "", pos2 = "";
        for (let i in blank) {
            let score = isSuccess(black, i);
            if (score >= blackScore) {
                blackScore = score;
                pos1 = i;
            }
        }
        for (let i in blank) {
            let score = isSuccess(white, i);
            if (score >= whiteScore) {
                whiteScore = score;
                pos2 = i;
            }
        }
        return blackScore >= whiteScore ? pos1 : pos2;
    }

})



