import{Codicon as v}from"../../../../base/common/codicons.js";import{ThemeIcon as I}from"../../../../base/common/themables.js";import{localize as d,localize2 as h}from"../../../../nls.js";import{IAccessibilityService as A}from"../../../../platform/accessibility/common/accessibility.js";import{Action2 as k}from"../../../../platform/actions/common/actions.js";import{AccessibilitySignal as g,AcknowledgeDocCommentsToken as G,IAccessibilitySignalService as K}from"../../../../platform/accessibilitySignal/browser/accessibilitySignalService.js";import{IConfigurationService as V}from"../../../../platform/configuration/common/configuration.js";import"../../../../platform/instantiation/common/instantiation.js";import{IQuickInputService as D}from"../../../../platform/quickinput/common/quickInput.js";import{IPreferencesService as C}from"../../../services/preferences/common/preferences.js";import{DisposableStore as P}from"../../../../base/common/lifecycle.js";class Q extends k{static ID="signals.sounds.help";constructor(){super({id:Q.ID,title:h("signals.sound.help","Help: List Signal Sounds"),f1:!0,metadata:{description:d("accessibility.sound.help.description","List all accessibility sounds, noises, or audio cues and configure their settings")}})}async run(c){const S=c.get(K),y=c.get(D),o=c.get(V),m=c.get(A),f=c.get(C),l=[g.save,g.format],p=g.allAccessibilitySignals.map((t,n)=>({label:l.includes(t)?`${t.name} (${o.getValue(t.settingsKey+".sound")})`:t.name,signal:t,buttons:l.includes(t)?[{iconClass:I.asClassName(v.settingsGear),tooltip:d("sounds.help.settings","Configure Sound"),alwaysVisible:!0}]:[]})).sort((t,n)=>t.label.localeCompare(n.label)),a=new P,e=a.add(y.createQuickPick());e.items=p,e.selectedItems=p.filter(t=>S.isSoundEnabled(t.signal)||l.includes(t.signal)&&o.getValue(t.signal.settingsKey+".sound")!=="never"),a.add(e.onDidAccept(()=>{const t=e.selectedItems.map(s=>s.signal),n=e.items.map(s=>s.signal).filter(s=>!t.includes(s));for(const s of t){let{sound:i,announcement:r}=o.getValue(s.settingsKey);i=l.includes(s)?"userGesture":m.isScreenReaderOptimized()?"auto":"on",r?o.updateValue(s.settingsKey,{sound:i,announcement:r}):o.updateValue(s.settingsKey,{sound:i})}for(const s of n){const i=o.getValue(s.settingsKey+".announcement"),r=w(l.includes(s),m.isScreenReaderOptimized()),u=i?{sound:r,announcement:i}:{sound:r};o.updateValue(s.settingsKey,u)}e.hide()})),a.add(e.onDidTriggerItemButton(t=>{f.openUserSettings({jsonEditor:!0,revealSetting:{key:t.item.signal.settingsKey,edit:!0}})})),a.add(e.onDidChangeActive(()=>{S.playSound(e.activeItems[0].signal.sound.getSound(!0),!0,G)})),a.add(e.onDidHide(()=>a.dispose())),e.placeholder=d("sounds.help.placeholder","Select a sound to play and configure"),e.canSelectMany=!0,await e.show()}}function w(b,c){return c?b?"never":"off":b?"never":"auto"}class z extends k{static ID="accessibility.announcement.help";constructor(){super({id:z.ID,title:h("accessibility.announcement.help","Help: List Signal Announcements"),f1:!0,metadata:{description:d("accessibility.announcement.help.description","List all accessibility announcements, alerts, braille messages, and configure their settings")}})}async run(c){const S=c.get(K),y=c.get(D),o=c.get(V),m=c.get(A),f=c.get(C),l=[g.save,g.format],p=g.allAccessibilitySignals.filter(n=>!!n.legacyAnnouncementSettingsKey).map((n,s)=>({label:l.includes(n)?`${n.name} (${o.getValue(n.settingsKey+".announcement")})`:n.name,signal:n,buttons:l.includes(n)?[{iconClass:I.asClassName(v.settingsGear),tooltip:d("announcement.help.settings","Configure Announcement"),alwaysVisible:!0}]:[]})).sort((n,s)=>n.label.localeCompare(s.label)),a=new P,e=a.add(y.createQuickPick());e.items=p,e.selectedItems=p.filter(n=>S.isAnnouncementEnabled(n.signal)||l.includes(n.signal)&&o.getValue(n.signal.settingsKey+".announcement")!=="never");const t=m.isScreenReaderOptimized();a.add(e.onDidAccept(()=>{if(!t){e.hide();return}const n=e.selectedItems.map(i=>i.signal),s=g.allAccessibilitySignals.filter(i=>!!i.legacyAnnouncementSettingsKey&&!n.includes(i));for(const i of n){let{sound:r,announcement:u}=o.getValue(i.settingsKey);u=l.includes(i)?"userGesture":i.announcementMessage&&m.isScreenReaderOptimized()?"auto":void 0,o.updateValue(i.settingsKey,{sound:r,announcement:u})}for(const i of s){const r=w(l.includes(i),!0),u=o.getValue(i.settingsKey+".sound"),x=r?{sound:u,announcement:r}:{sound:u};o.updateValue(i.settingsKey,x)}e.hide()})),a.add(e.onDidTriggerItemButton(n=>{f.openUserSettings({jsonEditor:!0,revealSetting:{key:n.item.signal.settingsKey,edit:!0}})})),a.add(e.onDidHide(()=>a.dispose())),e.placeholder=t?d("announcement.help.placeholder","Select an announcement to configure"):d("announcement.help.placeholder.disabled","Screen reader is not active, announcements are disabled by default."),e.canSelectMany=!0,await e.show()}}export{z as ShowAccessibilityAnnouncementHelp,Q as ShowSignalSoundHelp};