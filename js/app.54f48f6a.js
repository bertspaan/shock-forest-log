(function(t){function e(e){for(var a,i,o=e[0],c=e[1],u=e[2],h=0,d=[];h<o.length;h++)i=o[h],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&d.push(s[i][0]),s[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);l&&l(e);while(d.length)d.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,o=1;o<n.length;o++){var c=n[o];0!==s[c]&&(a=!1)}a&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},s={app:0},r=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("64a9"),s=n.n(a);s.a},"0d94":function(t,e,n){"use strict";var a=n("9021"),s=n.n(a);s.a},"11ff":function(t,e,n){},"1ab2":function(t,e,n){},"217f":function(t,e,n){},"269a":function(t,e,n){},"3ac0":function(t,e,n){"use strict";var a=n("870d"),s=n.n(a);s.a},"41a2":function(t,e,n){},5428:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),s=n("8c4f"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Header",{attrs:{toggled:t.headerToggled},on:{toggle:t.toggleHeader}}),n("main",["about"===t.$route.name?[n("Modal",{attrs:{closeRouteName:"main",scroll:""}},[n("About")],1)]:t._e(),t.loading?t._e():[n("div",{staticClass:"hashtags-container"},[n("Hashtags",{attrs:{hashtags:t.hashtags,selected:this.filters.hashtags}})],1),t.$route.query.hashtags||t.$route.query.type?n("div",{staticClass:"messages-container"},[n("CloseButton",{attrs:{to:{name:t.$route.name}}}),n("Messages",{attrs:{messages:t.filteredMessages,hashtagMapping:t.hashtagMapping}})],1):t._e(),t.$route.query.file?[n("Modal",[n("File",{attrs:{data:t.messagesById[t.$route.query.file]}})],1)]:t.$route.query.messageId&&t.messagesById[t.$route.query.messageId]?[n("Modal",[n("Message",{attrs:{hashtagMapping:t.hashtagMapping,data:t.messagesById[t.$route.query.messageId]}})],1)]:t._e()]],2)],1)},i=[],o=(n("8e6e"),n("456d"),n("7f7f"),n("bd86")),c=(n("28a5"),n("96cf"),n("3b8d")),u=n("768b"),l=(n("ac6a"),n("ffc1"),n("bc3a")),h=n.n(l),d="data",f=".json";function p(t){return g.apply(this,arguments)}function g(){return g=Object(c["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.a.get("".concat(d).concat(e).concat(f));case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)}))),g.apply(this,arguments)}n("f559"),n("6762"),n("2fdb");function m(t,e){return e.hashtags.filter((function(e){return t.includes(e)})).length}function v(t,e){var n;function a(t){var e=!1;return t.replies&&(e=t.replies.map(a).some((function(t){return t}))),n(t)||e}return"images"===t?n=function(t){return t.message.photo&&t.message.photo.length}:"documents"===t?n=function(t){return t.files&&t.files.length&&t.files.some((function(t){return"application/pdf"===t.mime_type}))}:"audio"===t?n=function(t){return t.files&&t.files.length&&t.files.some((function(t){return t.mime_type.startsWith("audio")}))}:"video"===t&&(n=function(t){return t.files&&t.files.length&&t.files.some((function(t){return t.mime_type.startsWith("video")}))}),!n||a(e)}var y={hashtags:m,type:v},b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{class:{padding:!0,toggled:t.toggled}},[t.toggled?[n("div",{staticClass:"full"},[n("router-link",{staticClass:"shadow",attrs:{to:{name:t.$route.name,query:t.$route.query}},nativeOn:{click:function(e){return t.$emit("toggle",!1)}}},[t._v("\n        Shock Forest Group")])],1),n("div",{staticClass:"menu"},[n("ul",t._l(t.contentFilters,(function(e,a){return n("li",{key:a},[n("router-link",{class:{active:e.type===t.$route.query.type},attrs:{to:{name:t.$route.name,query:{type:e.type}}},nativeOn:{click:function(e){return t.$emit("toggle",!1)}}},[t._v("\n          "+t._s(e.text)+"\n          ")])],1)})),0),n("span",{staticClass:"divider"},[t._v("\n        —\n      ")]),n("ul",[n("li",[n("router-link",{class:{active:"about"===t.$route.name},attrs:{to:{name:"about"}}},[t._v("about")])],1)])])]:[n("div",{staticClass:"circle"},[n("router-link",{attrs:{to:{name:t.$route.name,query:t.$route.query}},nativeOn:{click:function(e){return t.$emit("toggle",!0)}}},[n("span",[t._v("SFG")])])],1)]],2)},_=[],O={props:{toggled:Boolean},data:function(){return{fontSize:"50px",contentFilters:[{text:"images",type:"images"},{text:"documents",type:"documents"},{text:"audio",type:"audio"},{text:"video",type:"video"}]}}},w=O,x=(n("f0c2"),n("2877")),j=Object(x["a"])(w,b,_,!1,null,"ef544f24",null),k=j.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("h2",[t._v("The Shock Forest Log")]),n("p",[t._v("\n    From September 11, 2019 through December 21, 2019, a group of researchers, artists, and\n    activists called the "),n("L",{attrs:{t:"shockforestgroup"}}),t._v(" lived and worked at "),n("L",{attrs:{t:"hethem"}}),t._v(",\n    a cultural institution in Zaandam, Netherlands. Het Hem is located in the former 0,50 caliber\n    "),n("L",{attrs:{t:"bullets"}}),t._v(" factory on the ex-military "),n("L",{attrs:{t:"hembrug"}}),t._v(" terrain. Although\n    the building was built in 1956, the company that occupied it, Artillerie Inrichtingen,\n    also known as "),n("L",{attrs:{t:"ai"}}),t._v(", had been supplying weapons\n    for Dutch "),n("L",{attrs:{t:"colonialism"}}),t._v(" since 1679. In 1973, AI split, and the 0,50 factory\n    became property of the new company "),n("L",{attrs:{t:"eurometaal"}}),t._v(".\n  ")],1),n("p",[t._v("\n    EuroMetaal continued to use the Shock Forest for "),n("L",{attrs:{t:"weapons"}}),t._v(" and ammunition testing.\n    The Forest was specifically designed and planted to withstand "),n("L",{attrs:{t:"explosions"}}),t._v(". For half\n    a century, it both insulated the "),n("L",{attrs:{t:"sound"}}),t._v(" of explosive tests and hid military activity\n    from view. By studying the terrain, excavating the man-made myths and clay histories that\n    make up the Forest’s foundation, we have hoped to give voice to the "),n("L",{attrs:{t:"trees"}}),t._v(",\n    "),n("L",{attrs:{t:"waves"}}),t._v(", "),n("L",{attrs:{t:"soil"}}),t._v(" and "),n("L",{attrs:{t:"herons"}}),t._v(" that have lived\n    alongside "),n("L",{attrs:{t:"industrialization"}}),t._v(" and "),n("L",{attrs:{t:"militarization"}}),t._v(" in the terrain for decades.\n  ")],1),n("p",[t._v("\n    On November 21, 2019, the day before the 340th anniversary of EuroMetaal, our "),n("L",{attrs:{t:"exhibition"}}),t._v("\n    No Camouflage opened at Het HEM. The exhibition was a milestone in our artistic research to\n    uncover the truth behind the "),n("L",{attrs:{t:"opacity"}}),t._v(" of what was on this terrain and what is. It’s an\n    investigation into the "),n("L",{attrs:{t:"duality"}}),t._v(" that emerges over "),n("L",{attrs:{t:"time"}}),t._v(",\n    into "),n("L",{attrs:{t:"monument"}}),t._v(" and "),n("L",{attrs:{t:"legality"}}),t._v(" as a paternalistic form of environmental\n    protection, into "),n("L",{attrs:{t:"activism"}}),t._v(" and "),n("L",{attrs:{t:"labor"}}),t._v(" and how they might shape our society today.\n  ")],1),n("p",[t._v("\n    Our work has been an ongoing experiment in presence. If traditional research works in a\n    manner akin to traditional music concerts, with categories defined a priori,\n    "),n("L",{attrs:{t:"scores"}}),t._v(" set with pre-ordered patterns and clear end goals, we work more like a\n    free "),n("L",{attrs:{t:"dance"}}),t._v(" of improvisation, excavating a polyphony of truths, and listening\n    to the "),n("L",{attrs:{t:"reverb"}}),t._v(" resonate within and through "),n("L",{attrs:{t:"traces"}}),t._v(" of the building’s past.\n  ")],1),n("p",[t._v("\n    Immersion into this hyperlocal environment has opened our eyes to what it means to work in\n    a collective, to allow for "),n("L",{attrs:{t:"cycles"}}),t._v(" of emergence in former spaces of monodirectional\n    production. We have shown that our process is not only a part of our ongoing work, but also\n    its essence. We have let our voices emerge organically, and we have seen them grow both\n    collectively and individually. We have sought to learn how to incorporate ourselves with\n    the "),n("L",{attrs:{t:"light"}}),t._v(" and "),n("L",{attrs:{t:"violence"}}),t._v(" that surrounds us. We hope that those who\n    follow in our footsteps will do the same.\n  ")],1),n("p",[t._v("\n    Explore this "),n("L",{attrs:{t:"log"}}),t._v(" by clicking on hashtags that interest you. See how the themes\n    interconnect. Ask yourself what it means to be situated in a place that makes so many\n    ripples across global theaters of war. What stories lay camouflaged here?\n    Where does the bullet land?\n  ")],1),t._m(0),n("p",[n("router-link",{attrs:{to:{name:"main"}}},[t._v("Explore the Shock Forest Log")]),t._v(".\n  ")],1)])},$=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[n("em",[t._v("\n    More information about the Shock Forest Group can be found on "),n("a",{attrs:{href:"https://hethem.nl/en/Chapter-Two/Door-Nicolas-Jaar-Shock-Forest-Group"}},[t._v("Het Hem’s website")]),t._v(".\n    The source code of the Shock Forest Log is "),n("a",{attrs:{href:"https://github.com/bertspaan/shock-forest-bot"}},[t._v("available on GitHub")]),t._v(".\n  ")])])}],L=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-link",{attrs:{to:{name:"main",query:{hashtags:t.t}}}},[t._v("#"+t._s(t.t))])},C=[],S={name:"hashtag-link",props:{t:String}},F=S,P=Object(x["a"])(F,L,C,!1,null,null,null),E=P.exports,z={name:"about",components:{L:E}},q=z,H=Object(x["a"])(q,M,$,!1,null,null,null),I=H.exports,D=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"container",staticClass:"container"},[n("svg",{ref:"svg",attrs:{xmlns:"http://www.w3.org/2000/svg",width:t.containerSize[0]+"px",height:t.containerSize[1]+"px",viewBox:[-t.containerSize[0]/2,-t.containerSize[1]/2,t.containerSize[0],t.containerSize[1]].join(" ")},on:{click:t.click}},[t.bounds.minX?n("g",{attrs:{transform:t.transform}},t._l(t.graph.nodes,(function(e,a){return n("g",{key:e.id,style:{transform:"translate("+t.coords[a].x+"px, "+t.coords[a].y+"px)"},on:{mouseover:function(n){return t.nodeMouseOver(e.id)},mouseout:function(n){return t.nodeMouseOut(e.id)}}},[n("circle",{class:{selected:t.nodeIdHovering===e.id||t.selected&&t.selected.includes(e.id),connected:t.connectedNodes.includes(e.id)},attrs:{r:e.radius+t.circlePadding,cx:"0",cy:"0"}}),n("router-link",{style:{transform:"translate(0, 2px)"},attrs:{to:{name:t.$route.name,query:{hashtags:e.id.slice(1)}}}},[n("text",{attrs:{"alignment-baseline":"middle","text-anchor":"middle"}},[t._v("\n            "+t._s(e.id)+"\n            "),n("tspan",[t._v("["+t._s(e.messages)+"]")])])])],1)})),0):t._e()])])},T=[],B=(n("8615"),n("75fc")),N=n("d934"),W=n("00a5"),R=n("0165"),A=n("f33a"),G={props:{hashtags:Array,selected:Array},components:{},data:function(){return{graph:{nodes:[],links:[]},circlePadding:5,nodeIdHovering:void 0,containerSize:[0,0],graphSize:[900,900],transform:null,zoom:null,worker:new Worker("worker.js")}},mounted:function(){this.graph=this.createGraph(this.hashtags),window.addEventListener("resize",this.handleResize),this.handleResize(),this.createForceLayout(),Object(W["a"])(this.$refs.svg).call(this.zoom)},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)},computed:{connectedNodes:function(){var t=this.nodeIdHovering&&[this.nodeIdHovering]||this.selected;return t&&this.graph&&this.graph.links?this.graph.links.filter((function(e){return t.includes(e.source.id)||t.includes(e.target.id)})).map((function(t){return[t.source.id,t.target.id]})).flat():[]},bounds:function(){return{minX:Math.min.apply(Math,Object(B["a"])(this.graph.nodes.map((function(t){return t.x})))),maxX:Math.max.apply(Math,Object(B["a"])(this.graph.nodes.map((function(t){return t.x})))),minY:Math.min.apply(Math,Object(B["a"])(this.graph.nodes.map((function(t){return t.y})))),maxY:Math.max.apply(Math,Object(B["a"])(this.graph.nodes.map((function(t){return t.y}))))}},coords:function(){return this.graph.nodes.map((function(t){return{x:t.x,y:t.y}}))}},methods:{unitVector:function(t,e){var n=e.x-t.x,a=e.y-t.y,s=Math.sqrt(Math.pow(n,2)+Math.pow(a,2));return{x:n/s,y:a/s}},nodeMouseOver:function(t){this.nodeIdHovering=t},nodeMouseOut:function(){this.nodeIdHovering=void 0},click:function(t){t.target===this.$refs.svg&&this.$route.query.hashtags&&this.$router.push({name:this.$route.name})},createForceLayout:function(){var t=this;this.worker.onmessage=function(e){t.graph=e.data},this.worker.postMessage({links:this.graph.links,nodes:this.graph.nodes})},handleResize:function(){var t=this;this.containerSize=[this.$refs.container.clientWidth,this.$refs.container.clientHeight],this.zoom||(this.zoom=Object(N["a"])().scaleExtent([.75,2.5]).on("zoom",(function(){t.transform=R["c"].transform}))),this.zoom.translateExtent([[-this.containerSize[0]-500,-this.containerSize[1]-500],[this.containerSize[0]+500,this.containerSize[1]+500]])},links:function(t){var e=this,n=Object.values(this.hashtagsByMessage(t)).filter((function(t){return t.length>1})).map((function(t){return e.toPairs(t).map((function(e){var n=Object(u["a"])(e,2),a=n[0],s=n[1];return{source:a,target:s,messages:t.length}}))})).flat(),a=Object(A["a"])((function(t){var e=t.source<t.target?t.source:t.target,n=t.source>=t.target?t.source:t.target;return"".concat(e,"-").concat(n)})),s=a(n);return Object.entries(s).map((function(t){var e=Object(u["a"])(t,2),n=e[0],a=e[1];return{id:n,source:a[0].source,target:a[0].target,messages:a.reduce((function(t,e){return t+e.messages}),0),connections:a.length}}))},createGraph:function(t){var e=document.createElement("canvas"),n=e.getContext("2d");n.font='16px "Helvetica Neue"';var a=function(t){return n.measureText(t).width/2+5};return{nodes:t.map((function(t){return{id:t.hashtag,x:null,y:null,messages:t.messages.length,radius:a("".concat(t.hashtag," [").concat(t.messages.length,"]"))}})),links:this.links(t)}},hashtagsByMessage:function(t){var e={};return t.forEach((function(t){t.messages.forEach((function(n){var a=n.reply_to||n.message_id;e[a]||(e[a]=[]),e[a].push(t.hashtag)}))})),e},toPairs:function(t){return t.reduce((function(t,e,n,a){return 0!==n&&t.push(a.slice(n-1,n+1)),t}),[])}}},J=G,X=(n("7a36"),Object(x["a"])(J,D,T,!1,null,"8168837e",null)),Y=X.exports,U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"message shadow",style:{marginLeft:t.depth+"em"}},[n("div",{staticClass:"meta"},[n("span",{staticClass:"name",style:{width:"calc(50% - "+t.depth+"em)"}},[t._v(t._s(t.data.message.from.first_name))]),n("span",{staticClass:"date"},[t._v(t._s(t.formattedDate))])]),0===t.depth&&t.data.hashtags.length?n("div",{staticClass:"hashtags"},[t._l(t.data.hashtags,(function(e,a){return[n("router-link",{key:a,attrs:{to:{name:t.$route.name,query:{hashtags:e.slice(1)}}}},[t._v(t._s(e))]),a<t.data.hashtags.length-1?[t._v(",\n      ")]:t._e()]}))],2):t._e(),n("div",{staticClass:"contents"},[t.thumbnail?n("div",[n("div",{staticClass:"thumb-container"},[n("router-link",{attrs:{to:{name:t.$route.name,query:Object.assign({},t.$route.query,{file:t.data.message.message_id})}}},[n("img",{staticClass:"thumb",attrs:{src:t.thumbnail}})])],1)]):t._e(),n("MessageText",{attrs:{data:t.data,hashtagMapping:t.hashtagMapping}}),!t.thumbnail&&t.data.files&&t.data.files.length?n("div",[n("FileLink",{attrs:{data:t.data}})],1):t._e()],1)])},V=[],Z=(n("c5f6"),n("436a")),K=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t._l(t.textParts,(function(e,a){return[n("span",{key:"t"+a},[t._v(t._s(e))]),a<t.textParts.length-1?n("EntityLink",{key:"a"+a,attrs:{hashtagMapping:t.hashtagMapping,entity:t.linkParts[a].entity,text:t.linkParts[a].text}}):t._e()]}))],2)},Q=[],tt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return"hashtag"===t.entity.type?n("router-link",{attrs:{to:{name:t.$route.name,query:{hashtags:t.formatHashtag(t.text.slice(1))}}}},[t._v(t._s(t.formatHashtag(t.text)))]):"url"===t.entity.type?n("a",{staticClass:"url",attrs:{href:t.text}},[t._v(t._s(t.text))]):"text_link"===t.entity.type?n("a",{staticClass:"url",attrs:{href:t.entity.url}},[t._v(t._s(t.text))]):n("span",[t._v(t._s(t.text))])},et=[],nt={name:"entity-link",props:{text:String,entity:Object,hashtagMapping:Object},methods:{formatHashtag:function(t){var e=this.hashtagMapping[t];return void 0!==e?e:t}}},at=nt,st=Object(x["a"])(at,tt,et,!1,null,"69b5e6e5",null),rt=st.exports,it={name:"message-text",props:{data:Object,hashtagMapping:Object},components:{EntityLink:rt},computed:{textParts:function(){var t=this;return 0===this.entities.length?[this.text]:Object(B["a"])(Array(this.entities.length+1)).map((function(e,n){if(0===n){var a=t.entities[n];return t.text.slice(0,a.offset)}if(n===t.entities.length){var s=t.entities[n-1];return t.text.slice(s.offset+s.length)}var r=t.entities[n],i=t.entities[n-1];return t.text.slice(i.offset+i.length,r.offset)}))},linkParts:function(){var t=this;return this.entities.map((function(e){return{entity:e,text:t.text.slice(e.offset,e.offset+e.length)}}))},entities:function(){return this.data.message.entities||this.data.message.caption_entities||[]},text:function(){return this.data.message.text||this.data.message.caption}}},ot=it,ct=(n("3ac0"),Object(x["a"])(ot,K,Q,!1,null,"eb5ae16e",null)),ut=ct.exports,lt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",t._l(t.data.files,(function(e,a){return n("li",{key:a},[n("code",[n("router-link",{staticClass:"url",attrs:{to:{name:t.$route.name,query:Object.assign({},t.$route.query,{file:t.data.message.message_id})}}},[t._v("\n      "+t._s(e.file_name)+"\n      ")])],1)])})),0)},ht=[],dt={name:"file-link",components:{},props:{data:Object}},ft=dt,pt=(n("aa42"),Object(x["a"])(ft,lt,ht,!1,null,"fce42334",null)),gt=pt.exports,mt="https://files.shockforest.group",vt={name:"message",components:{MessageText:ut,FileLink:gt},props:{data:Object,depth:{type:Number,default:0},hashtagMapping:Object},computed:{thumbnail:function(){var t=this.data.files&&this.data.files.filter((function(t){return t.thumb}))[0];if(t)return"".concat(mt,"/").concat(t.path);if(this.data.files){var e=this.data.files.filter((function(t){return"image/jpeg"===t.mime_type}));if(e.length){var n=e[e.length-1].path;return"".concat(mt,"/").concat(n)}}},formattedDate:function(){return Object(Z["a"])(new Date(1e3*this.data.message.date),new Date)}}},yt=vt,bt=(n("74fd"),Object(x["a"])(yt,U,V,!1,null,"302de0d8",null)),_t=bt.exports,Ot=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t.messages?[n("ol",[t._l(t.messages.slice(0,t.displayCount),(function(e){return n("li",{key:e.message.message_id},[n("div",{staticClass:"message"},[n("Message",{attrs:{data:e,depth:t.depth,hashtagMapping:t.hashtagMapping}})],1),e.replies&&e.replies.length?[n("div",{staticClass:"thread-spacing"}),n("message-list",{attrs:{messages:e.replies,depth:t.depth+1,hashtagMapping:t.hashtagMapping}})]:t.depth>0?[n("div",{staticClass:"thread-spacing"})]:t._e()],2)})),0===t.depth?n("infinite-loading",{on:{infinite:t.infiniteHandler}},[n("div",{attrs:{slot:"spinner"},slot:"spinner"}),n("div",{attrs:{slot:"no-more"},slot:"no-more"}),n("div",{attrs:{slot:"no-results"},slot:"no-results"})]):t._e()],2)]:t._e()],2)},wt=[],xt={name:"message-list",components:{Message:_t},props:{messages:Array,hashtagMapping:Object,depth:{type:Number,default:0},pageSize:{type:Number,default:10}},data:function(){return{displayCount:0===this.depth?this.pageSize:this.messages.length}},methods:{infiniteHandler:function(t){this.displayCount<this.messages.length?(this.displayCount=Math.min(this.displayCount+this.pageSize,this.messages.length),t.loaded()):t.complete()}}},jt=xt,kt=(n("e4bd"),Object(x["a"])(jt,Ot,wt,!1,null,"f5f99536",null)),Mt=kt.exports,$t=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"file-container"},["pdf"===t.type?[n("PDF",{attrs:{url:t.url}})]:"video"===t.type?[n("video",{attrs:{controls:""}},[n("source",{attrs:{src:t.url}})])]:"audio"===t.type?[n("audio",{attrs:{controls:""}},[n("source",{attrs:{src:t.url}})])]:"image"===t.type?[n("img",{attrs:{src:t.url}})]:[n("ul",t._l(t.urls,(function(e,a){return n("li",{key:a},[n("a",{staticClass:"url",attrs:{href:e}},[t._v(t._s(e))])])})),0)]],2)},Lt=[],Ct=(n("55dd"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("iframe",{attrs:{src:"https://bertspaan.nl/pdf.js/web/viewer.html?file="+encodeURIComponent(t.url)}})}),St=[],Ft={components:{},data:function(){return{}},props:{url:String}},Pt=Ft,Et=(n("d2ef"),Object(x["a"])(Pt,Ct,St,!1,null,"dcb3e4da",null)),zt=Et.exports,qt="https://files.shockforest.group",Ht={name:"file",components:{PDF:zt},props:{data:Object},computed:{sortedFiles:function(){return Object(B["a"])(this.data.files).sort((function(t,e){return e.file_size-t.file_size}))},hasFiles:function(){return this.data.files&&this.data.files.length},firstFile:function(){return this.hasFiles&&this.sortedFiles[0]},type:function(){if(this.firstFile){var t=this.firstFile;if("application/pdf"===t.mime_type)return"pdf";if(t.mime_type.startsWith("audio"))return"audio";if(t.mime_type.startsWith("image"))return"image";if(t.mime_type.startsWith("video"))return"video"}},url:function(){if(this.urls)return this.urls[0]},urls:function(){if(this.hasFiles)return this.sortedFiles.map((function(t){var e=t.path;return"".concat(qt,"/").concat(e)}))}}},It=Ht,Dt=(n("a9df"),Object(x["a"])(It,$t,Lt,!1,null,"42138987",null)),Tt=Dt.exports,Bt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"modal",staticClass:"modal padding",on:{click:t.close}},[n("div",{class:{contents:!0,padding:!0,scroll:t.scroll}},[n("CloseButton",{attrs:{to:t.destination}}),t._t("default")],2)])},Nt=[],Wt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"circle close-messages-container padding"},[n("router-link",{staticClass:"shadow-white",attrs:{to:t.to}},[n("span",[t._v("\n    ✕\n    ")])])],1)},Rt=[],At={props:{to:Object}},Gt=At,Jt=(n("6b19"),Object(x["a"])(Gt,Wt,Rt,!1,null,"5142c9c4",null)),Xt=Jt.exports;function Yt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function Ut(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?Yt(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Yt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var Vt={name:"modal",components:{CloseButton:Xt},props:{closeRouteName:String,scroll:Boolean},computed:{destination:function(){return{name:this.closeRouteName||this.$route.name,query:Ut(Ut({},this.$route.query),{},{file:void 0,messageId:void 0})}}},methods:{close:function(t){t.target===this.$refs.modal&&this.$router.push(this.destination)}}},Zt=Vt,Kt=(n("0d94"),Object(x["a"])(Zt,Bt,Nt,!1,null,"ac3c9104",null)),Qt=Kt.exports;function te(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function ee(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?te(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):te(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var ne={name:"app",components:{Header:k,About:I,Hashtags:Y,Message:_t,Messages:Mt,Modal:Qt,File:Tt,CloseButton:Xt},data:function(){return{loading:!0,headerToggled:!1,messages:void 0,hashtags:void 0,hashtagMapping:void 0,filters:{},showMessages:!1}},computed:{messagesById:function(){return Object.fromEntries(this.messages.map((function(t){return[t.message.message_id,t]})))},filteredMessages:function(){var t=Object.entries(this.filters).filter((function(t){var e=Object(u["a"])(t,2),n=(e[0],e[1]);return void 0!==n})).filter((function(t){var e=Object(u["a"])(t,2),n=e[0];e[1];return y[n]}));return t.length?this.messages.filter((function(e){return t.every((function(t){var n=Object(u["a"])(t,2),a=n[0],s=n[1];return y[a](s,e)}))})):this.messages}},methods:{toggleHeader:function(t){this.headerToggled=t},fetchData:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p("/messages");case 2:return this.messages=t.sent,t.next=5,p("/hashtags");case 5:return this.hashtags=t.sent,this.hashtags=this.hashtags.filter((function(t){return t.messages.length>1})),t.next=9,p("/hashtag-mapping");case 9:this.hashtagMapping=t.sent,this.loading=!1;case 11:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),updateFilters:function(){if(this.headerToggled=!1,this.$route.query.hashtags){var t=this.$route.query.hashtags;this.setFilter("hashtags",t.split(",").map((function(t){return"#".concat(t)})))}else this.setFilter("hashtags");this.setFilter("type",this.$route.query.type)},setFilter:function(t,e){this.filters=ee(ee({},this.filters),{},Object(o["a"])({},t,e))}},watch:{"$route.name":function(){"about"===this.$route.name&&(this.headerToggled=!1)},"$route.query.type":function(){this.updateFilters()},"$route.query.hashtags":function(){this.updateFilters()}},mounted:function(){this.updateFilters(),this.fetchData()}},ae=ne,se=(n("034f"),Object(x["a"])(ae,r,i,!1,null,null,null)),re=se.exports,ie=n("e166"),oe=n.n(ie);a["a"].use(s["a"]),a["a"].use(oe.a,{}),a["a"].config.productionTip=!1;var ce=new s["a"]({routes:[{name:"main",path:"/",component:re},{name:"about",path:"/about",component:re}]});new a["a"]({render:function(t){return t(re)},router:ce}).$mount("#app")},"592b":function(t,e,n){},"64a9":function(t,e,n){},6759:function(t,e,n){},"6b19":function(t,e,n){"use strict";var a=n("1ab2"),s=n.n(a);s.a},"74fd":function(t,e,n){"use strict";var a=n("6759"),s=n.n(a);s.a},"7a36":function(t,e,n){"use strict";var a=n("41a2"),s=n.n(a);s.a},"870d":function(t,e,n){},9021:function(t,e,n){},a9df:function(t,e,n){"use strict";var a=n("5428"),s=n.n(a);s.a},aa42:function(t,e,n){"use strict";var a=n("592b"),s=n.n(a);s.a},d2ef:function(t,e,n){"use strict";var a=n("269a"),s=n.n(a);s.a},e4bd:function(t,e,n){"use strict";var a=n("217f"),s=n.n(a);s.a},f0c2:function(t,e,n){"use strict";var a=n("11ff"),s=n.n(a);s.a}});
//# sourceMappingURL=app.54f48f6a.js.map