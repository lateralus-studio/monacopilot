"use strict";var _=Object.defineProperty;var ue=Object.getOwnPropertyDescriptor;var Ce=Object.getOwnPropertyNames;var ge=Object.prototype.hasOwnProperty;var he=(o,e)=>{for(var t in e)_(o,t,{get:e[t],enumerable:!0})},fe=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Ce(e))!ge.call(o,n)&&n!==t&&_(o,n,{get:()=>e[n],enumerable:!(r=ue(e,n))||r.enumerable});return o};var Ee=o=>fe(_({},"__esModule",{value:!0}),o);var _e={};he(_e,{Copilot:()=>I,registerCopilot:()=>me});module.exports=Ee(_e);var F={"llama-3-70b":"llama3-70b-8192","gpt-4o":"gpt-4o-2024-08-06","gpt-4o-mini":"gpt-4o-mini","claude-3.5-sonnet":"claude-3.5-sonnet-20240620","claude-3-opus":"claude-3-opus-20240229","claude-3-sonnet":"claude-3-sonnet-20240229","claude-3-haiku":"claude-3-haiku-20240307"},S={groq:["llama-3-70b"],openai:["gpt-4o","gpt-4o-mini"],anthropic:["claude-3.5-sonnet","claude-3-opus","claude-3-haiku","claude-3-sonnet"]},D="llama-3-70b",T="groq",U={groq:"https://api.groq.com/openai/v1/chat/completions",openai:"https://api.openai.com/v1/chat/completions",anthropic:"https://api.anthropic.com/v1/messages"},V=.3;var j=new Set(['"',"'","`","{","}","[","]","(",")",","," ",":","."]);var x=class o{constructor(){}static getInstance(){return o.instance||(o.instance=new o),o.instance}error(e,t){console.error(this.styleMessage(t.message,e,"error")),t.stack&&console.error(this.styleStackTrace(t.stack))}warn(e,t){console.warn(this.styleMessage(t,e,"warning"))}styleMessage(e,t,r){let n=this.getTimestamp(),i="Please create an issue on GitHub if the issue persists.",l=100,a="\u2500".repeat(l-2),s=`\u250C${a}\u2510`,p=`\u2514${a}\u2518`,c=((N,ce)=>{let de=N.split(" "),w=[],C="";return de.forEach(q=>{(C+q).length>ce&&(w.push(C.trim()),C=""),C+=q+" "}),C.trim()&&w.push(C.trim()),w})(e,l-4),P=[s,...c.map(N=>`\u2502 ${N.padEnd(l-4)} \u2502`),p].join(`
`);return`
\x1B[1m\x1B[37m[${n}]\x1B[0m${r==="error"?"\x1B[31m":"\x1B[33m"} [${t}]\x1B[0m \x1B[2m${i}\x1B[0m
${P}
`}styleStackTrace(e){return e.split(`
`).map((n,i)=>i===0?`\x1B[31m${n}\x1B[0m`:`\x1B[2m${n}\x1B[0m`).join(`
`)}getTimestamp(){return new Date().toISOString()}};var h=class h{constructor(){this.logger=x.getInstance()}static getInstance(){return h.instance}handleError(e,t){let r=this.getErrorDetails(e);return this.logger.error(t,r),r}getErrorDetails(e){return e instanceof Error?{message:e.message,name:e.name,stack:e.stack,context:e.context}:{message:String(e),name:"UnknownError"}}};h.instance=new h;var k=h;var m=(o,e)=>k.getInstance().handleError(o,e);var G={"claude-3.5-sonnet":8192,"claude-3-opus":4096,"claude-3-haiku":4096,"claude-3-sonnet":4096};var y="<<CURSOR>>";var Pe=o=>{switch(o){case"fill-in-the-middle":return"filling in the middle of the code";case"completion":return"completing the code"}},W=o=>"You are an advanced AI coding assistant with expertise in AI prompt engineering and creating concise and efficient AI prompts. Your goal is to provide accurate, efficient, and context-aware code completions. Remember, your role is to act as an extension of the developer's thought process, providing intelligent and contextually appropriate prompt completions.",Te=(o,e)=>!o?.length&&!e?"":"The code is written in markdown and is meant to be used as an AI prompt.",Y=o=>{let{language:e,technologies:t,editorState:{completionMode:r},textBeforeCursor:n,textAfterCursor:i,externalContext:l}=o,s=`You are tasked with ${Pe(r)} for a markdown snippet.

`;return s+=Te(t,e),s+=`

Here are the details about how the completion should be generated:
  - The cursor position is marked with '${y}'.
  - Your completion must start exactly at the cursor position.
  - Do not repeat any code that appears before or after the cursor.
  - Ensure your completion does not introduce any syntactical or logical errors.
`,r==="fill-in-the-middle"?s+=`  - If filling in the middle, replace '${y}' entirely with your completion.
`:r==="completion"&&(s+=`  - If completing the code, start from '${y}' and provide a logical continuation.
`),s+=`  - Optimize for readability and performance where possible.

  Remember to output only the completion code without any additional explanation, and do not wrap it in markdown code syntax, such as three backticks (\`\`\`).

  Here's the code snippet for completion:

  <code>
  ${n}${y}${i}
  </code>`,l&&l.length>0&&(s+=`

Additional context from related files:

`,s+=l.map(p=>`// Path: ${p.path}
${p.content}
`).join(`
`)),s.endsWith(".")?s:`${s}.`};var K=(o,e,t,r)=>{let n=W(o,r),i=Y(o,r),a={model:Re(e),temperature:V},s={openai:{messages:[{role:"system",content:n},{role:"user",content:i}]},groq:{messages:[{role:"system",content:n},{role:"user",content:i}]},anthropic:{system:n,messages:[{role:"user",content:i}],max_tokens:Ie(e)}};return{...a,...s[t]}},X=(o,e)=>{let t={"Content-Type":"application/json"},r={openai:{Authorization:`Bearer ${o}`},groq:{Authorization:`Bearer ${o}`},anthropic:{"x-api-key":o,"anthropic-version":"2023-06-01"}};return{...t,...r[e]}},z=(o,e)=>{let r={openai:xe,groq:ye,anthropic:Me}[e];if(!r)throw new Error(`Unsupported provider: ${e}`);return r(o)},xe=o=>o.choices?.length?{completion:o.choices[0].message.content}:{completion:null,error:"No completion found in the openai response"},ye=o=>o.choices?.length?{completion:o.choices[0].message.content}:{completion:null,error:"No completion found in the groq response"},Me=o=>o.content?typeof o.content!="string"?{completion:null,error:"Completion content is not a string"}:{completion:o.content}:{completion:null,error:"No completion found in the anthropic response"},Re=o=>F[o],J=o=>U[o],Ie=o=>G[o]||4096;var Z=(o,e)=>{let t=null,r=null,n=(...i)=>new Promise((l,a)=>{t&&(clearTimeout(t),r&&r("Cancelled")),r=a,t=setTimeout(()=>{l(o(...i)),r=null},e)});return n.cancel=()=>{t&&(clearTimeout(t),r&&r("Cancelled"),t=null,r=null)},n},Q=o=>!o||o.length===0?"":o.length===1?o[0]:`${o.slice(0,-1).join(", ")} and ${o.slice(-1)}`;var M=(o,e)=>e.getLineContent(o.lineNumber)[o.column-1],ee=(o,e)=>e.getLineContent(o.lineNumber).slice(o.column-1),g=(o,e)=>e.getLineContent(o.lineNumber).slice(0,o.column-1),oe=o=>{let e=o.split(`
`);return e[e.length-1].length+1};var B=(o,e)=>e.getValueInRange({startLineNumber:1,startColumn:1,endLineNumber:o.lineNumber,endColumn:o.column}),$=(o,e)=>e.getValueInRange({startLineNumber:o.lineNumber,startColumn:o.column,endLineNumber:e.getLineCount(),endColumn:e.getLineMaxColumn(e.getLineCount())});var te=async(o,e,t={})=>{let r={"Content-Type":"application/json",...t.headers},n=e==="POST"&&t.body?JSON.stringify(t.body):void 0,i=await fetch(o,{method:e,headers:r,body:n,signal:t.signal});if(!i.ok)throw new Error(`${t.error||"Network error"}: ${i.statusText}`);return i.json()},be=(o,e)=>te(o,"GET",e),Oe=(o,e,t)=>te(o,"POST",{...t,body:e}),R={GET:be,POST:Oe};var re=(o,e)=>{let t=M(o,e);return!!t&&!j.has(t)},ne=(o,e)=>{let t=ee(o,e).trim(),r=g(o,e).trim();return o.column<=3&&(t!==""||r!=="")};var I=class{constructor(e,t={}){this.validateInputs(e,t),this.apiKey=e,this.provider=t.provider??T,this.model=t.model??D}async complete({body:e,options:t}){let{completionMetadata:r}=e,{headers:n={}}=t??{};try{let i=K(r,this.model,this.provider,t),l=J(this.provider),a=X(this.apiKey,this.provider),s={...n,...a},p=await R.POST(l,i,{headers:s});return z(p,this.provider)}catch(i){return{error:m(i,"COPILOT_COMPLETION_FETCH_ERROR").message,completion:null}}}validateInputs(e,t){if(!e)throw new Error(`Please provide ${this.provider??T} API key.`);let{provider:r,model:n}=t;if(r&&!n||!r&&n)throw new Error("Both provider and model must be specified together");let i=r??T,l=n??D;if(!S[i].includes(l)){let a=Q(S[i]);throw new Error(`Model ${l} is not supported by ${i} provider. Supported models: ${a}`)}}};var b=class o{constructor(e){this.formattedCompletion="";this.formattedCompletion=e}static create(e){return new o(e)}setCompletion(e){return this.formattedCompletion=e,this}removeInvalidLineBreaks(){return this.formattedCompletion=this.formattedCompletion.trimEnd(),this}removeMarkdownCodeSyntax(){return this.formattedCompletion=this.removeMarkdownCodeBlocks(this.formattedCompletion),this}removeMarkdownCodeBlocks(e){let t=/```[\s\S]*?```/g,r=e,n;for(;(n=t.exec(e))!==null;){let i=n[0],l=i.split(`
`).slice(1,-1).join(`
`);r=r.replace(i,l)}return r.trim()}removeExcessiveNewlines(){return this.formattedCompletion=this.formattedCompletion.replace(/\n{3,}/g,`

`),this}build(){return this.formattedCompletion}};var O=class{constructor(e,t){this.cursorPosition=e,this.model=t}shouldProvideCompletions(){return!re(this.cursorPosition,this.model)&&!ne(this.cursorPosition,this.model)}};var L=class L{constructor(){this.cache=[]}getCompletionCache(e,t){return this.cache.filter(r=>this.isCacheItemValid(r,e,t))}addCompletionCache(e){this.cache=[...this.cache.slice(-(L.MAX_CACHE_SIZE-1)),e]}clearCompletionCache(){this.cache=[]}isCacheItemValid(e,t,r){let n=r.getValueInRange(e.range);return g(t,r).startsWith(e.textBeforeCursorInLine)&&this.isPositionValid(e,t,n)}isPositionValid(e,t,r){return e.range.startLineNumber===t.lineNumber&&t.column===e.range.startColumn||e.completion.startsWith(r)&&e.range.startLineNumber===t.lineNumber&&t.column>=e.range.startColumn-r.length&&t.column<=e.range.endColumn}};L.MAX_CACHE_SIZE=10;var v=L;var ve="application/json",ie=async({filename:o,endpoint:e,language:t,technologies:r,externalContext:n,model:i,position:l})=>{try{let{completion:a}=await R.POST(e,{body:{completionMetadata:Le({filename:o,position:l,model:i,language:t,technologies:r,externalContext:n})}},{headers:{"Content-Type":ve},error:"Error while fetching completion item"});return a}catch(a){return m(a,"FETCH_COMPLETION_ITEM_ERROR"),null}},Le=({filename:o,position:e,model:t,language:r,technologies:n,externalContext:i})=>{let l=Ae(e,t),a=B(e,t),s=$(e,t);return{filename:o,language:r,technologies:n,externalContext:i,textBeforeCursor:a,textAfterCursor:s,editorState:{completionMode:l}}},Ae=(o,e)=>{let t=B(o,e),r=$(o,e);return t&&r?"fill-in-the-middle":"completion"};var se=(o,e,t,r)=>{let n=(o.match(/\n/g)||[]).length,i=oe(o),l=M(t,r);return{startLineNumber:t.lineNumber,startColumn:t.column,endLineNumber:t.lineNumber+n,endColumn:o.includes(l)?t.lineNumber===e.startLineNumber&&n===0?t.column+(i-1):i:t.column}};function le(o){return b.create(o).removeMarkdownCodeSyntax().removeExcessiveNewlines().removeInvalidLineBreaks().build()}var d=o=>({items:o,enableForwardStability:!0});var Ne=300,ae=Z(ie,Ne),A=new v,we=async({monaco:o,model:e,position:t,token:r,isCompletionAccepted:n,onShowCompletion:i,options:l})=>{if(!new O(t,e).shouldProvideCompletions())return d([]);let a=A.getCompletionCache(t,e).map(s=>({insertText:s.completion,range:s.range}));if(a.length)return i(),d(a);if(r.isCancellationRequested||n)return d([]);try{let s=ae({...l,text:e.getValue(),model:e,position:t});r.onCancellationRequested(()=>{ae.cancel()});let p=await s;if(p){let u=le(p),c=new o.Range(t.lineNumber,t.column,t.lineNumber,t.column),P=se(u,c,t,e);return A.addCompletionCache({completion:u,range:P,textBeforeCursorInLine:g(t,e)}),i(),d([{insertText:u,range:P}])}}catch(s){if(typeof s=="string"&&(s==="Cancelled"||s==="AbortError")||s instanceof Error&&(s.message==="Cancelled"||s.name==="AbortError"))return d([]);m(s,"FETCH_COMPLETION_ITEM_ERROR")}return d([])},pe=we;var f=new WeakMap,E=null,me=(o,e,t)=>{E&&E.deregister();let r=[];f.set(e,{isCompletionAccepted:!1,isCompletionVisible:!1});try{let n=o.languages.registerInlineCompletionsProvider(t.language,{provideInlineCompletions:(a,s,p,u)=>{let c=f.get(e);if(c)return pe({monaco:o,model:a,position:s,token:u,isCompletionAccepted:c.isCompletionAccepted,onShowCompletion:()=>{c.isCompletionVisible=!0},options:t})},freeInlineCompletions:()=>{}});r.push(n);let i=e.onKeyDown(a=>{let s=f.get(e);if(!s)return;let p=a.keyCode===o.KeyCode.Tab||a.keyCode===o.KeyCode.RightArrow&&a.metaKey;s.isCompletionVisible&&p?(s.isCompletionAccepted=!0,s.isCompletionVisible=!1):s.isCompletionAccepted=!1});r.push(i);let l={deregister:()=>{r.forEach(a=>a.dispose()),A.clearCompletionCache(),f.delete(e),E=null}};return E=l,l}catch(n){return m(n,"REGISTER_COPILOT_ERROR"),{deregister:()=>{r.forEach(i=>i.dispose()),f.delete(e),E=null}}}};0&&(module.exports={Copilot,registerCopilot});
