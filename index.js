const osmosis = require('osmosis');
const jsonfile = require('jsonfile');

var url = 'https://mx.lvp.global/lol/division-honor-2019/clasificacion';

osmosis
    .get(url)
    .find('.ladder > tbody > tr')
    .set({
        'name': 'td:nth-child(2) a',
        'position': 'td:nth-child(1)',
        'logo': 'td:nth-child(2) img@src',
        'wins': 'td:nth-child(3)',
        'loses': 'td:nth-child(4)',
        'matches': [
            osmosis
            .find('td:nth-child(2) a')
            .follow('@href')
            .find('.games > ul > li')
            .set({
                'blueteam': '.resultado div:nth-child(1) img@src',
                'redteam': '.resultado div:nth-child(3) img@src',
                'score': '.marcador',
                'result': '.resultado strong',
                'date': '.responsive-date',
                'url': 'a@href'
            })
            .follow('@href')
            .set({
                'youtube': '.video-container > iframe@src',
                'history': 'body > section.container.roost > p > a@href'

            })
        ],
        'players': [
            osmosis
            .find('td:nth-child(2) a')
            .follow('@href')
            .find('.roster div.memberData ul')
            .set({
                'nickname': 'li h5',
                'ellipsis': 'h6.ellipsis',
                'position': '.lane',
                'kda': '.temp time',
                'champs': ['img@src']

            })



        ]
    })
    // .follow('@href')
    // .find('header + div + div li > a')
    // .set('category')
    // .follow('@href')
    // .paginate('.totallink + a.button.next:first')
    // .find('p > a')
    // .follow('@href')
    // .set({
    //     'title': 'section > h2',
    //     'description': '#postingbody',
    //     'subcategory': 'div.breadbox > span[4]',
    //     'date': 'time@datetime',
    //     'latitude': '#map@data-latitude',
    //     'longitude': '#map@data-longitude',
    //     'images': ['img@src']
    // })
    .data(item => console.log(item))
    .data(function(listing) {
        jsonfile.writeFile('results.json', listing, { flag: 'a' })
            // do something with listing data
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log)