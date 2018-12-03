// ==UserScript==
// @name        G.G.I
// @description Get girl image
// @version     0.0.3
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @require     https://code.jquery.com/jquery-2.2.1.min.js
// @match       http*://hh.hh-content.com/pictures/girls/*/
// @author      Leeloo (Discord: <@412738477797539841>)
// ==/UserScript==

const baseURI= 'https://raw.githubusercontent.com/Chifumy/SfHH/master/G.G.I/';

const init= ()=> {
    $.ajax({
        url: `${baseURI}style.css`,
        success: (css)=> {
            $('body').append(`<style>${css}</style>`);
            $.ajax({
                url: `${baseURI}index.html`,
                success: (html)=> {
                    $('body').append(`${html}`);
                    run();
                }
            });
        }
    });
};

const run= ()=> {
	let path= window.location.href;
	let id= window.location.pathname.split('/').reverse().filter(a=>{return!!a})[0];
	for(let a=0;a<5;a++) {
        $('body > div.ava').append(`<a href="${path}ava${a}.png" download="${id}.ava.${a}.png"><img src="${path}ava${a}.png"/></a>`);
        $('body > div.ico').append(`<a href="${path}ico${a}.png" download="${id}.ico.${a}.png"><img src="${path}ico${a}.png"/></a>`);
    }
    window.setTimeout(()=> {
        $('img').each((a,b)=> {
            if(b.naturalHeight<1||b.naturalWidth<1) {
                $(b).parent().remove();
            }
        });
    }, 700);
    $("#btn-download").click(function() {
        if($(this).attr('class')!=="downloaded") {
            $(this).toggleClass("downloaded");
            download($('a').toArray(), 0);
        }
    });
};

const download= (list, index)=> {
    $(list[index]).get(0).click();
    index++;
    if(index<list.length) {
        window.setTimeout(()=> {
            download(list, index);
        }, 150);
    }
};

$("document").ready(()=> {
	$('body').html('');
	init();
});
