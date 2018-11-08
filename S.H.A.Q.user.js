// ==UserScript==
// @name        S.H.A.Q
// @description Starting&Harvesting automatic of quests
// @version     0.0.1
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// @require     https://code.jquery.com/jquery-2.2.1.min.js
// @match       http*://www.hentaiheroes.com/activities*
// @match       http*://test.hentaiheroes.com/activities*
// @match       http*://nutaku.haremheroes.com/activities*
// @author      Leeloo (Discord: <@412738477797539841>)
// @copyright   2018, Leeloo
// @downloadURL https://github.com/Chifumy/SfHH/raw/master/S.H.A.Q.user.js
// ==/UserScript==

const pURI= ()=> {
	let a={}, b=window.location.search.substring(1).split('&');
	for(let c in b) {
		let d=b[c].split('=');
		1<d.length?a[d[0]]=d[1]:a[c]=b
	} return a;
};

$("document").ready(()=> {
    let a= pURI();
    if(a.tab=="missions") {
        $('.missions_wrap > div.mission_object').sort((a,b)=> {
            var x = JSON.parse(a.dataset.d);
            var y = JSON.parse(b.dataset.d);
            return x.duration-y.duration;
        }).each((a,b)=>{
            $('.missions_wrap').append($(b));
        });

        let missions= [
            /* 0: En cours: */
            $('#missions > div > div.missions_wrap > div.mission_object:has(> div.mission_button > button.orange_text_button:not([style^="display"]))').toArray(),
            /* 1: A faire: */
            $('#missions > div > div.missions_wrap > div.mission_object:has(> div.mission_button > button.blue_text_button:not([style^="display"]))').toArray(),
            /* 2: Terminer: */
            $('#missions > div > div.missions_wrap > div.mission_object:has(> div.mission_button > button.purple_text_button:not([style^="display"]))').toArray()
        ];

        let gift= $('#missions > div > div.end_gift[style^="display"] > button').toArray();

        if(missions[0].length>0) {
            for(let x in missions[0]) {
                let y= JSON.parse($(missions[0][x]).attr('data-d'));
                let tR= parseInt(y['remaining_time'])*1000;
                window.setTimeout(()=> {
                    window.location.reload(true);
                }, tR);
            }
        } else if(missions[1].length>0) {
            let y= JSON.parse($(missions[1][0]).attr('data-d'));
            $.ajax({
                type: "POST",
                url: '/ajax.php',
                data: {
                    class: "Missions",
                    action: "start_mission",
                    id_mission: y['id_mission'],
                    id_member_mission: y['id_member_mission']
                },
                success: (i)=> {
                    let tR= (parseInt(y.duration)+1)*1000;
                    window.setTimeout(()=> {
                        window.location.reload(true);
                    }, tR);
                }
            });
        }

        if(missions[2].length>0) {
            for(let x in missions[2]) {
                let y= JSON.parse($(missions[2][x]).attr('data-d'));
                $.ajax({
                    type: "POST",
                    url: '/ajax.php',
                    data: {
                        class: "Missions",
                        action: "claim_reward",
                        id_mission: y['id_mission'],
                        id_member_mission: y['id_member_mission']
                    },
                    success: (i)=> {
                        window.location.reload(true);
                    }
                });
            }
        }

        if(gift.length>0) {
            $.ajax({
                type: "POST",
                url: '/ajax.php',
                data: {class:"Missions", action:"give_gift"},
                success: (i)=> {
                    window.location.reload(true);
                }
            });
        }
    } else if(a.tab=="contests") {
        console.log("Défi!");
    }
});
