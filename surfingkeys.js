// blocklist, disable surfingkeys on all these sites (outlook, gmail etc.)
// this works,
// settings.blocklistPattern = /.*mail\.google\.com.*|.*catanuniverse\.com.*|.*gist\.github\.com.*|.*excel\.officeapps\.live\.com.*|.*hp\.sharepoint\.com.*/
function createBlocklistPattern(urls) {
    const escapedPatterns = urls.map(url => 
        `.*${url.replace(/\./g, '\\.')}.*`
    );
    return new RegExp(escapedPatterns.join('|'));
}
const urlList = [
    'mail.google.com',
    'outlook.live.com',
    'office.com',
    'excel.officeapps.live.com',
    'hp.sharepoint.com',
    'catanuniverse.com'
];
settings.blocklistPattern = createBlocklistPattern(urlList);
// does not work,
// settings.blacklistPattern = /.*mail.google.com.*|.*inbox.google.com.*|trello.com|duolingo.com|youtube.com|udemy.com|localhost/i;
// settings.blocklistPattern = /((calendar|mail).google|trello|duolingo|youtube|udemy).com/i


const {
    aceVimMap,
    mapkey,
    imap,
    imapkey,
    getClickableElements,
    vmapkey,
    map,
    unmap,
    unmapAllExcept,
    vunmap,
    cmap,
    addSearchAlias,
    removeSearchAlias,
    tabOpenLink,
    readText,
    Clipboard,
    Front,
    Hints,
    Visual,
    RUNTIME
} = api;

// only enable the ones that are using, so the rest will pass through
unmapAllExcept([
    'p','?',';ql','.',      // help
    'gi','gf','[[',']]',';fs','O','f','af','C','i','I','<Ctrl-i>','q','w','cf',         // Mouse click
    // 'gi','gf','[[',']]',';fs','O','f','af','C','i','I','<Ctrl-i>','q','w','cf','Q',         // Mouse click
    'e','d','gg','G',       // scroll page / element
    'yt','yT','g0','g$','gxx','E','R','T',';gt','on','x','X','W','<<','>>',       // Tabs
    //'yt','yT','g0','g$','gxx','E','R','T',';gt','zr','zi','zo','on','x','X','W','<<','>>',       // Tabs
    'B','F','S','D',     // Page navigation
    // 'B','F','S','D','r',     // Page navigation
    'sg','sd','se','ss','sh','sy',      // Search selected with
    'yv','yma','ya','yi','yy','yf','yd','cq','cc',';pf',     // Clipboard
    ';e',';v',       // Settings
    'ga','gb','gc','gd','gh','gk','ge','gn','gs',';i',';j',      // Chrome URLs
    ';s',';t',       // Misc
]);
// unmap('<Ctrl-h>');  // history panel 
// unmap('<Ctrl-j>');  // downloads panel 

// only keep E, R and T from Surfingkeys for gmail.com and twitter.com
// api.unmapAllExcept(['E','R','T'], /youtube.com|twitter.com/);
api.unmapAllExcept(['e','d','x','sg','sy','sr'], /youtube.com/);

// disable find on google, so by default google '/' will go to search box
if( /^(.*\.)?google\./.test(window.location.host) ){
    unmap('/');
}

// open 1 link (and close hints)
// map('w', 'f');  // open 1 link in current tab (f)
// map('W', 'q');  // open 1 image link in current tab (q)

// open 1 link in background (and close hints)
// map('q', 'gf');  // open 1 link in background tab (gf/C)
// open 1 image link in background tab (skipped rarely used), eg. google images show hints only on the images

// open multiple links (don't close hints)
// map('a', 'cf');  // open links in background tab (cf)
// open multiple image links in background tab (in development - doesn't work) (skipped rarely used)
// mapkey('A', '#1Click on an Image or a button in background, multiple', function () {
//     Hints.create("img, button", Hints.dispatchMouseClick, { multipleHits: true, tabbed: true, active: false });
// });

// map('f', 'd');  // scroll page down
// map('d', 'e');  // scroll page up

// map('e', 'E');  // previous tab  // overrides reload
// map('r', 'R');  // next tab  // overrides open link in current tab (f)

// issue, we want to override default alt-s, used to disable surfingkeys on site temporarily. remap to alt-shift-s
// seems not possible, use autohotkey workaround.
// note: to exclude the sites permanently, add it to to blacklist on top
//
// https://github.com/brookhong/Surfingkeys/issues/1430 (not working)
// https://github.com/brookhong/Surfingkeys/issues/1776 (not working)
// 
// relevant autohotkey workaround
// ; Surfingkeys extension - because cannot remap hardcoded need to do it here
// ^!s:: Send !s  ; ctrl alt s, not ctrl shift s

mapkey(';j', '#12Close Downloads Shelf', function() {  // prevent default clearing history for download shelf https://github.com/brookhong/Surfingkeys/issues/1408
    RUNTIME("closeDownloadsShelf"); 
});
// rarely use this though, only effect the popup menu close. gd - Open Chrome Downloads (but not the popup, no way to open popup in edge browser)


// darkreader extension compatbility - hints visibility
// https://github.com/brookhong/Surfingkeys/issues/1654
// api.Hints.style(
//     "padding: 1px; color:#efe1eb; background: none; background-color: #b16286"
// );
// api.Hints.style(
//     "div{color:#efe1eb; background: none; background-color: #e78a4e;} div.begin{color:#ea6962;}",
//     "text"
// );

// set theme
// settings.theme = `
// .sk_theme {
//     font-family: Input Sans Condensed, Charcoal, sans-serif;
//     font-size: 10pt;
//     background: #24272e;
//     color: #abb2bf;
// }
// .sk_theme tbody {
//     color: #fff;
// }
// .sk_theme input {
//     color: #d0d0d0;
// }
// .sk_theme .url {
//     color: #61afef;
// }
// .sk_theme .annotation {
//     color: #56b6c2;
// }
// .sk_theme .omnibar_highlight {
//     color: #528bff;
// }
// .sk_theme .omnibar_timestamp {
//     color: #e5c07b;
// }
// .sk_theme .omnibar_visitcount {
//     color: #98c379;
// }
// .sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
//     background: #303030;
// }
// .sk_theme #sk_omnibarSearchResult ul li.focused {
//     background: #3e4452;
// }
// #sk_status, #sk_find {
//     font-size: 20pt;
// }`;
// click `Save` button to make above settings to take effect.</ctrl-i></ctrl-y>

// pdf reader, ;s to disable surfingkeys each time, to disable permanently,
// but actually we want to use it, easy up/down pages, but now we're using a totally external pdf reader, which is what you're used to 
settings.noPdfViewer=true;

// custom search "sd"
// https://github.com/brookhong/Surfingkeys/blob/master/docs/API.md#parameters-12 (api docs)
// addSearchAlias('d', 'duckduckgo', 'https://duckduckgo.com/?q=', 's', 'https://duckduckgo.com/ac/?q=', function(response) {
//     var res = JSON.parse(response.text);
//     return res.map(function(r){
//         return r.phrase;
//     });
// });
// custom search "sr"
addSearchAlias('r', 'reddit', 'https://www.google.com/search?udm=14&q=reddit+', 's', 'https://www.google.com/search?udm=14&q=reddit+', function(response) {
    var res = JSON.parse(response.text);
    return res.map(function(r){
        return r.phrase;
    });
});
// https://gitlab.com/-/snippets/1970642 
// [INFO] Search in Google Books:
api.addSearchAlias("b", "Google Books", "https://www.google.com/search?tbm=bks&q=");
// [INFO] Search colored images in Google Images:
api.addSearchAlias("i", "Google Images (Colored)", "https://www.google.com/search?tbm=isch&tbs=imgo:1,ic:color&q=");
// [INFO] Search in Yandex:
api.addSearchAlias("x", "Yandex", "https://yandex.ru/search/?text=");


//
// default help reference
//

// an example to create a new mapping `ctrl-y`
// mapkey('<ctrl-y>', 'Show me the money', function() {
//     Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
// });

// an example to replace `T` with `gt`, click `Default mappings` to see how `T` works.
//map('gt', 'T');

// an example to remove mapkey `Ctrl-i`
//unmap('<ctrl-i>');

// disable all keys except 
// unmapAllExcept("?")
// unmapAllExcept(['f','?']);
//iunmap('<'); // to remove Ctrl-i mapping in insert mode

// only keep E, R and T from Surfingkeys for gmail.com and twitter.com
//unmapAllExcept(['E','R','T'], /gmail.com|twitter.com/);
