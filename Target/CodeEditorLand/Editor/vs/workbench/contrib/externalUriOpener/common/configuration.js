import{Extensions as r}from"../../../../platform/configuration/common/configurationRegistry.js";import{workbenchConfigurationNodeBase as s}from"../../../common/configuration.js";import*as t from"../../../../nls.js";import"../../../../base/common/jsonSchema.js";import{Registry as a}from"../../../../platform/registry/common/platform.js";const p="default",c="workbench.externalUriOpeners",o={type:"string",enum:[]},e="\n- `https://microsoft.com`: Matches this specific domain using https\n- `https://microsoft.com:8080`: Matches this specific domain on this port using https\n- `https://microsoft.com:*`: Matches this specific domain on any port using https\n- `https://microsoft.com/foo`: Matches `https://microsoft.com/foo` and `https://microsoft.com/foo/bar`, but not `https://microsoft.com/foobar` or `https://microsoft.com/bar`\n- `https://*.microsoft.com`: Match all domains ending in `microsoft.com` using https\n- `microsoft.com`: Match this specific domain using either http or https\n- `*.microsoft.com`: Match all domains ending in `microsoft.com` using either http or https\n- `http://192.168.0.1`: Matches this specific IP using http\n- `http://192.168.0.*`: Matches all IP's with this prefix using http\n- `*`: Match all domains using either http or https",m={...s,properties:{[c]:{type:"object",markdownDescription:t.localize("externalUriOpeners","Configure the opener to use for external URIs (http, https)."),defaultSnippets:[{body:{"example.com":"$1"}}],additionalProperties:{anyOf:[{type:"string",markdownDescription:t.localize("externalUriOpeners.uri",`Map URI pattern to an opener id.
Example patterns: 
{0}`,e)},{type:"string",markdownDescription:t.localize("externalUriOpeners.uri",`Map URI pattern to an opener id.
Example patterns: 
{0}`,e),enum:[p],enumDescriptions:[t.localize("externalUriOpeners.defaultId","Open using VS Code's standard opener.")]},o]}}}};function I(i,n){o.enum=i,o.enumDescriptions=n,a.as(r.Configuration).notifyConfigurationSchemaUpdated(m)}export{p as defaultExternalUriOpenerId,m as externalUriOpenersConfigurationNode,c as externalUriOpenersSettingId,I as updateContributedOpeners};