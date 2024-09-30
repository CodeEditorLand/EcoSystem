import*as e from"../../../../nls.js";import{Registry as n}from"../../../../platform/registry/common/platform.js";import{Extensions as i}from"../../../../platform/jsonschemas/common/jsonContributionRegistry.js";import"../../../../base/common/jsonSchema.js";import{workbenchColorsSchemaId as a}from"../../../../platform/theme/common/colorRegistry.js";import{tokenStylingSchemaId as s}from"../../../../platform/theme/common/tokenClassificationRegistry.js";const r=["comment","comment.block","comment.block.documentation","comment.line","constant","constant.character","constant.character.escape","constant.numeric","constant.numeric.integer","constant.numeric.float","constant.numeric.hex","constant.numeric.octal","constant.other","constant.regexp","constant.rgb-value","emphasis","entity","entity.name","entity.name.class","entity.name.function","entity.name.method","entity.name.section","entity.name.selector","entity.name.tag","entity.name.type","entity.other","entity.other.attribute-name","entity.other.inherited-class","invalid","invalid.deprecated","invalid.illegal","keyword","keyword.control","keyword.operator","keyword.operator.new","keyword.operator.assignment","keyword.operator.arithmetic","keyword.operator.logical","keyword.other","markup","markup.bold","markup.changed","markup.deleted","markup.heading","markup.inline.raw","markup.inserted","markup.italic","markup.list","markup.list.numbered","markup.list.unnumbered","markup.other","markup.quote","markup.raw","markup.underline","markup.underline.link","meta","meta.block","meta.cast","meta.class","meta.function","meta.function-call","meta.preprocessor","meta.return-type","meta.selector","meta.tag","meta.type.annotation","meta.type","punctuation.definition.string.begin","punctuation.definition.string.end","punctuation.separator","punctuation.separator.continuation","punctuation.terminator","storage","storage.modifier","storage.type","string","string.interpolated","string.other","string.quoted","string.quoted.double","string.quoted.other","string.quoted.single","string.quoted.triple","string.regexp","string.unquoted","strong","support","support.class","support.constant","support.function","support.other","support.type","support.type.property-name","support.variable","variable","variable.language","variable.name","variable.other","variable.other.readwrite","variable.parameter"],t="vscode://schemas/textmate-colors",k=`${t}#/definitions/colorGroup`,l={type:"array",definitions:{colorGroup:{default:"#FF0000",anyOf:[{type:"string",format:"color-hex"},{$ref:"#/definitions/settings"}]},settings:{type:"object",description:e.localize("schema.token.settings","Colors and styles for the token."),properties:{foreground:{type:"string",description:e.localize("schema.token.foreground","Foreground color for the token."),format:"color-hex",default:"#ff0000"},background:{type:"string",deprecationMessage:e.localize("schema.token.background.warning","Token background colors are currently not supported.")},fontStyle:{type:"string",description:e.localize("schema.token.fontStyle","Font style of the rule: 'italic', 'bold', 'underline', 'strikethrough' or a combination. The empty string unsets inherited settings."),pattern:"^(\\s*\\b(italic|bold|underline|strikethrough))*\\s*$",patternErrorMessage:e.localize("schema.fontStyle.error","Font style must be 'italic', 'bold', 'underline', 'strikethrough' or a combination or the empty string."),defaultSnippets:[{label:e.localize("schema.token.fontStyle.none","None (clear inherited style)"),bodyText:'""'},{body:"italic"},{body:"bold"},{body:"underline"},{body:"strikethrough"},{body:"italic bold"},{body:"italic underline"},{body:"italic strikethrough"},{body:"bold underline"},{body:"bold strikethrough"},{body:"underline strikethrough"},{body:"italic bold underline"},{body:"italic bold strikethrough"},{body:"italic underline strikethrough"},{body:"bold underline strikethrough"},{body:"italic bold underline strikethrough"}]}},additionalProperties:!1,defaultSnippets:[{body:{foreground:"${1:#FF0000}",fontStyle:"${2:bold}"}}]}},items:{type:"object",defaultSnippets:[{body:{scope:"${1:keyword.operator}",settings:{foreground:"${2:#FF0000}"}}}],properties:{name:{type:"string",description:e.localize("schema.properties.name","Description of the rule.")},scope:{description:e.localize("schema.properties.scope","Scope selector against which this rule matches."),anyOf:[{enum:r},{type:"string"},{type:"array",items:{enum:r}},{type:"array",items:{type:"string"}}]},settings:{$ref:"#/definitions/settings"}},required:["settings"],additionalProperties:!1}},c="vscode://schemas/color-theme",m={type:"object",allowComments:!0,allowTrailingCommas:!0,properties:{colors:{description:e.localize("schema.workbenchColors","Colors in the workbench"),$ref:a,additionalProperties:!1},tokenColors:{anyOf:[{type:"string",description:e.localize("schema.tokenColors.path","Path to a tmTheme file (relative to the current file).")},{description:e.localize("schema.colors","Colors for syntax highlighting"),$ref:t}]},semanticHighlighting:{type:"boolean",description:e.localize("schema.supportsSemanticHighlighting","Whether semantic highlighting should be enabled for this theme.")},semanticTokenColors:{type:"object",description:e.localize("schema.semanticTokenColors","Colors for semantic tokens"),$ref:s}}};function f(){const o=n.as(i.JSONContribution);o.registerSchema(c,m),o.registerSchema(t,l)}export{c as colorThemeSchemaId,f as registerColorThemeSchemas,k as textmateColorGroupSchemaId,t as textmateColorsSchemaId};