import{isWeb as a,isWindows as o}from"../../../base/common/platform.js";import{localize as e}from"../../../nls.js";import{ConfigurationScope as t,Extensions as i}from"../../configuration/common/configurationRegistry.js";import{Registry as s}from"../../registry/common/platform.js";const n=s.as(i.Configuration);n.registerConfiguration({id:"update",order:15,title:e("updateConfigurationTitle","Update"),type:"object",properties:{"update.mode":{type:"string",enum:["none","manual","start","default"],default:"default",scope:t.APPLICATION,description:e("updateMode","Configure whether you receive automatic updates. Requires a restart after change. The updates are fetched from a Microsoft online service."),tags:["usesOnlineServices"],enumDescriptions:[e("none","Disable updates."),e("manual","Disable automatic background update checks. Updates will be available if you manually check for updates."),e("start","Check for updates only on startup. Disable automatic background update checks."),e("default","Enable automatic update checks. Code will check for updates automatically and periodically.")],policy:{name:"UpdateMode",minimumVersion:"1.67"}},"update.channel":{type:"string",default:"default",scope:t.APPLICATION,description:e("updateMode","Configure whether you receive automatic updates. Requires a restart after change. The updates are fetched from a Microsoft online service."),deprecationMessage:e("deprecated","This setting is deprecated, please use '{0}' instead.","update.mode")},"update.enableWindowsBackgroundUpdates":{type:"boolean",default:!0,scope:t.APPLICATION,title:e("enableWindowsBackgroundUpdatesTitle","Enable Background Updates on Windows"),description:e("enableWindowsBackgroundUpdates","Enable to download and install new VS Code versions in the background on Windows."),included:o&&!a},"update.showReleaseNotes":{type:"boolean",default:!0,scope:t.APPLICATION,description:e("showReleaseNotes","Show Release Notes after an update. The Release Notes are fetched from a Microsoft online service."),tags:["usesOnlineServices"]}}});