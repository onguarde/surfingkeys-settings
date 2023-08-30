// arken fox override

 /* 0102: set startup page [SETUP-CHROME]
  * 0=blank, 1=home, 2=last visited page, 3=resume previous session
  * [NOTE] Session Restore is cleared with history (2811), and not used in Private Browsing mode
  * [SETTING] General>Startup>Restore previous session ***/
 user_pref("browser.startup.page", 3);

 /* 2022: disable all DRM content (EME: Encryption Media Extension)
  * Optionally hide the setting which also disables the DRM prompt
  * [SETUP-WEB] e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
  * [SETTING] General>DRM Content>Play DRM-controlled content
  * [TEST] https://bitmovin.com/demos/drm
  * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
  user_pref("media.eme.enabled", true);

 /* 2810: enable Firefox to clear items on shutdown
  * [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes | Settings ***/
 user_pref("privacy.sanitize.sanitizeOnShutdown", false);

 /* 2822: reset default "Time range to clear" for "Clear Recent History" (2820)
  * Firefox remembers your last choice. This will reset the value when you start Firefox
  * 0=everything, 1=last hour, 2=last two hours, 3=last four hours, 4=today
  * [NOTE] Values 5 (last 5 minutes) and 6 (last 24 hours) are not listed in the dropdown,
  * which will display a blank value, and are not guaranteed to work ***/
 user_pref("privacy.sanitize.timeSpan", 3);

    

// 0000: Personal settings 
// Put at the BOTTOM (go to end of file)
// If a pref is listed twice, the last one will be applied last
user_pref("browser.compactmode.show", true);
user_pref("app.update.silent", true);
user_pref("browser.tabs.closeWindowWithLastTab", false);
user_pref("browser.formfill.enable", false);
user_pref("browser.sessionstore.restore_on_demand", false);
user_pref("browser.urlbar.maxRichResults", 4);
user_pref("services.sync.prefs.dangerously_allow_arbitrary", true);
user_pref("services.sync.prefs.sync-seen.browser.formfill.enable", true);
user_pref("app.update.silent", true);
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);