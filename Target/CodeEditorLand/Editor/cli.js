import"./bootstrap-cli.js";import*as r from"path";import{fileURLToPath as t}from"url";import{configurePortable as i}from"./bootstrap-node.js";import{load as a}from"./bootstrap-esm.js";import{resolveNLSConfiguration as e}from"./vs/base/node/nls.js";import{product as o}from"./bootstrap-meta.js";const m=r.dirname(t(import.meta.url)),n=await e({userLocale:"en",osLocale:"en",commit:o.commit,userDataPath:"",nlsMetadataPath:m});process.env.VSCODE_NLS_CONFIG=JSON.stringify(n),i(o),process.env.VSCODE_CLI="1",a("vs/code/node/cli");