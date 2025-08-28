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
    'catanuniverse.com',
    'excel.officeapps.live.com',
    'hp.sharepoint.com'
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

// disable find on google, so by default google '/' will go to search box
if( /^(.*\.)?google\./.test(window.location.host) ){
    unmap('/');
}


// open 1 link (and close hints)
map('w', 'f');  // open 1 link in current tab (f)
map('W', 'q');  // open 1 image link in current tab (q)

// open 1 link in background (and close hints)
map('q', 'gf');  // open 1 link in background tab (gf/C)
// (??) open 1 image link in background tab (skipped rarely used)

// open multiple links (don't close hints)
map('a', 'cf');  // open links in background tab (cf)
// open multiple image links in background tab (in development - doesn't work) (skipped rarely used)
// mapkey('A', '#1Click on an Image or a button in background, multiple', function () {
//     Hints.create("img, button", Hints.dispatchMouseClick, { multipleHits: true, tabbed: true, active: false });
// });

map('f', 'd');  // scroll page down
map('d', 'e');  // scroll page up

map('e', 'E');  // previous tab  // overrides reload
map('r', 'R');  // next tab  // overrides open link in current tab (f)

map('<Alt-shift-s>', '<Alt-s>');  // disable current site // alt s is mapped externally in browser to undo close tab


mapkey(';j', '#12Close Downloads Shelf', function() {  // prevent default clearing history for download shelf https://github.com/brookhong/Surfingkeys/issues/1408
    RUNTIME("closeDownloadsShelf");
});
// rarely use this though, only effect the popup menu close. gd - Open Chrome Downloads (but not the popup, no way to open popup in edge browser)


// darkreader extension compatbility - hints visibility
// https://github.com/brookhong/Surfingkeys/issues/1654
api.Hints.style(
    "padding: 1px; color:#efe1eb; background: none; background-color: #b16286"
);
api.Hints.style(
    "div{color:#efe1eb; background: none; background-color: #e78a4e;} div.begin{color:#ea6962;}",
    "text"
);

// set theme
settings.theme = `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 10pt;
    background: #24272e;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #3e4452;
}
#sk_status, #sk_find {
    font-size: 20pt;
}`;
// click `Save` button to make above settings to take effect.</ctrl-i></ctrl-y>


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

