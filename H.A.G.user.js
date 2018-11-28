// ==UserScript==
// @name        H.A.G
// @description Harvesting automatic of girls
// @version     0.0.1
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @require     https://code.jquery.com/jquery-2.2.1.min.js
// @match       http*://www.hentaiheroes.com/harem*
// @match       http*://test.hentaiheroes.com/harem*
// @match       http*://nutaku.haremheroes.com/harem*
// @author      Leeloo (Discord: <@412738477797539841>)
// ==/UserScript==

const HaGirls= [];
const Harvesting= (index)=> {
	if(typeof index=="undefined") return;
    $.ajax({
        type: "POST",
        url: '/ajax.php',
        data: {'class':'Girl', 'which': HaGirls[index].gData['id_girl'], 'action':'get_salary'},
        success: (i)=> {
            console.log(i);
            index++;
            if(index<HaGirls.length) {
                Harvesting(index);
            } else {
                window.location.reload(true);
            }
        }
    });
};

$("document").ready(()=> {
    var arrayOfPayTime= [];
    for(let a in girls) {
        if(girls[a].readyForCollect) {
            HaGirls.push(girls[a]);
        }
    }
    if(HaGirls.length>0) Harvesting(0);
    for(let a in girlsDataList) {
        if(girlsDataList[a].pay_time) {
            if(girlsDataList[a].pay_in) arrayOfPayTime.push(girlsDataList[a].pay_in);
        }
    } arrayOfPayTime.sort((a,b)=> {
        return a-b;
    });
    if(arrayOfPayTime.length>0) {
        window.setTimeout(()=> {
            window.location.reload(true);
        }, arrayOfPayTime[0]*1000);
    }
});
