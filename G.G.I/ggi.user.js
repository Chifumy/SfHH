// ==UserScript==
// @name        G.G.I
// @description Get girl image
// @version     0.0.1
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @require     https://code.jquery.com/jquery-2.2.1.min.js
// @match       http*://hh.hh-content.com/pictures/girls/*/
// @author      Leeloo (Discord: <@412738477797539841>)
// ==/UserScript==

const baseURI= 'https://raw.githubusercontent.com/Chifumy/SfHH/master/S.T.A.T.S/';

const init= ()=> {
    $.ajax({
        url: `${baseURI}style.css`,
        success: (css)=> {
            $('body').append(`<div class="ava"></div><div class="ico"></div><style>${css}</style>`);
			run();
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
};

$("document").ready(()=> {
	$('body').html('');
	init();
});
