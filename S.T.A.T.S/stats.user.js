// ==UserScript==
// @name       S.T.A.T.S
// @version    0.0.1
// @grant      unsafeWindow
// @grant      GM_xmlhttpRequest
// @grant      GM.xmlHttpRequest
// @require    https://code.jquery.com/jquery-2.2.1.min.js
// @require    https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @match      https://nutaku.haremheroes.com/shop.html*
// @match      https://www.hentaiheroes.com/shop.html*
// @match      https://www.gayharem.com/shop.html*
// @match      https://eroges.haremheroes.com/shop.html*
// @author     Leeloo (D: 412738477797539841, HH: 765244)
// ==/UserScript==

const baseURI= 'https://raw.githubusercontent.com/Chifumy/SfHH/master/S.T.A.T.S/';
const SHf= (a,b,c)=> {
    $(a).attr('style', 'display: none;');
    $(`div#${b}`).parent().removeAttr('style');
    $(`div#${b} > ul > li[data-cible="${$(a).attr('data-cible')}"]`).removeAttr('style');
    if(!$(`div#${c} ul li:not([style^="display: none;"])`).length) {
        $(`div#${c}`).parent().attr('style', 'display: none;');
    }
};

const up= async(ordre, statOfcount, compteur, cur)=> {
    if(statOfcount[ordre[cur]]<0||compteur<statOfcount[ordre[cur]]) {
        compteur++;
        $.ajax({
            type: "POST",
            url: '/ajax.php',
            data: {'class':'Hero', 'carac': ordre[cur], 'action':'pay_up_carac'},
            success: (a)=> {
                if(a.success) {
                    up(ordre, statOfcount, compteur, cur);
                } else {
                    cur++;
                    if(cur<statOfcount.length) {
                        compteur=0;
                        run(ordre, statOfcount, compteur, cur);
                    } else {
                        window.location.reload(true);
                        console.log("end2");
                    }
                }
            }
        });
    } else {
        cur++;
        if(cur<statOfcount.length) {
            compteur=0;
            up(ordre, statOfcount, compteur, cur);
        } else {
            window.location.reload(true);
            console.log("end1");
        }
    }
};

const init= ()=> {
    $.ajax({
        url: `${baseURI}style.css`,
        success: (a)=> {
            $('body').append(`<style>${a}</style>`);
            $.ajax({
                url: `${baseURI}index.html`,
                success: (b)=> {
                    $('body').append(b);
                    run();
                }
            });
        }
    });
};

const run= ()=> {
    $('div#sFORM > ul > li > span').click((e)=> {SHf($(e.currentTarget.parentElement), "sFADD", "sFORM");});
    $('div#sFADD > ul > li').click((e)=> {SHf($(e.currentTarget), "sFORM", "sFADD");});
    $( "#sFORM > ul" ).sortable({
        revert: true,
        placeholder: "ui-state-highlight"
    });
    $('div.stats').click((e)=> {
        if(e.target.className&&e.target.className=="stats") {
            $(e.target).attr('style', 'display:none');
        }
    });
    $( "ul, li" ).disableSelection();
    let buttonTwo= $('<div/>', {
        'class': 'slot',
        'text': 'A',
        'css': {
            'background': 'linear-gradient(180deg,#00aaff 0,#006688 50%,#005577 51%,#00aaff 100%)', 'color': '#fff', 'border': '1px solid #068',
            'border-radius': '7px', 'cursor': 'pointer', 'text-decoration': 'none', 'text-align': 'center', 'line-height': '31px',
            'box-shadow': '-1px 2px 1px 1px rgba(255,255,255,0.8) inset, 1px -2px 1px 3px #057 inset, 0 3px 3px 0 rgba(0,51,68,0.7)'
        }
    });
    $(buttonTwo).click(()=> {$('body > div.stats').removeAttr('style');});
    $('div#equiped > .sub_block > .booster').append([$('<div/>', {'class': "slot empty",'css': {'visibility': 'hidden'}}), buttonTwo]);

    $('#sFORM > button').click((e)=> {
        $(e.target).attr('disabled', 'disabled');
        let sO= [];
        let Od= []
        $('#sFORM > ul > li:not([style^="display"])').each((a,b)=> {
            let x= {HC: 1, C: 2, SF: 3};
            let v= $(b).find('input').val();
            if(/max/gi.test(v)) {v= -1;}
            else {v= parseInt(v||0);}
            sO[x[$(b).attr('data-cible')]]= v;
            Od.push($(b).attr('data-cible'));
        });
        Od= Od.map((a,b)=> {
            switch(a) {
                case "HC": case "hc":
                    return 1;
                case "C": case "C":
                    return 2;
                case "SF": case "sf":
                    return 3;
            } return undefined;
        }).filter(a=>{return!!a});
        up(Od, sO, 0, 0);
    });
};

$("document").ready(()=> {
    init();
});