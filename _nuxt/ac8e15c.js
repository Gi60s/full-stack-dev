(window.webpackJsonp=window.webpackJsonp||[]).push([[8,7],{354:function(t,e,n){var content=n(356);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(47).default)("0e6ca180",content,!0,{sourceMap:!1})},355:function(t,e,n){"use strict";n(354)},356:function(t,e,n){var r=n(46)(!1);r.push([t.i,".search .title{font-weight:700;font-size:150%;line-height:1.2em;padding:.7em 0 0}.search .crumbs{margin-top:-6px;font-style:italic;opacity:.8}.search .description{font-size:90%;line-height:1.2em;padding:.7em 0 0;margin-bottom:1em;white-space:normal;max-height:4.6em;text-overflow:ellipsis}",""]),t.exports=r},358:function(t,e,n){"use strict";n.r(e);var r=n(3),o=(n(48),{data:function(){return{query:""}},props:["searchFunction","version"],methods:{handleSelect:function(t){this.$router.push(t.realPath)},querySearch:function(t,e){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:n.searchFunction(t,e);case 1:case"end":return r.stop()}}),r)})))()}}}),c=(n(355),n(49)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-autocomplete",{attrs:{"popper-class":"search","fetch-suggestions":t.querySearch,"trigger-on-focus":!1,type:"search",placeholder:"Search"},on:{select:t.handleSelect},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.item;return[n("div",{staticClass:"title"},[t._v(t._s(r.title))]),t._v(" "),r.crumbs?n("div",{staticClass:"crumbs"},[t._v(t._s(r.crumbs))]):t._e(),t._v(" "),n("div",{staticClass:"description"},[t._v(t._s(r.blurb))])]}}]),model:{value:t.query,callback:function(e){t.query=e},expression:"query"}})}),[],!1,null,null,null);e.default=component.exports},383:function(t,e,n){"use strict";n.r(e);var r=n(3),o=(n(48),n(70),n(26),n(144),n(30),n(32),n(145),n(69)),c=n.n(o),l=n(358),v=null;function h(t,e){for(var n=t.length,i=0;i<n;i++)if(t[i]!==e[i])return!1;return!0}function d(t){return t.children?t.children.reduce((function(p,t){return p+d(t)}),""):"text"===t.type?t.value:void 0}function m(t,e){for(var n=t.length,i=0;i<n;i++){var r=t[i];if("element"===r.type&&/h\d/i.test(r.tag)&&r.props.id===e){for(var o=i+1;o<n;o++){var text=d(t[o]);if(/[a-z]+/i.test(text))return text.split(/ +/).slice(0,20).join(" ")}return""}}}function f(t,text){var e,h2,n=[],r=text.toLowerCase().replace(/ {2,}/g," ").replace(/[^a-z ]/g,"").split(" "),o=r.length;return t.forEach((function(t){if("element"===t.type&&/h\d/i.test(t.tag))e={id:t.props.id,text:d(t)},"h2"===t.tag&&(h2=e);else for(var content=d(t).replace(/ {2,}/g," ").split(" "),data=content.map((function(t){return t.replace(/[^a-z ]/g,"")})),c=content.length+1-o,i=0;i<c;i++){var l=data.slice(i,i+o);if(h(r,l)){for(var v=0,m=content.length,f=i-1;f>=0;f--){var _=content[f];if(/[.!?\n\r]$/.test(_)){v=f;break}}for(var C=i;i<c;i++){var y=content[C];if(/[.!?\n\r]$/.test(y)){m=C;break}}n.push({id:e?e.id:"",title:e?e.text:"",crumbs:h2&&h2!==e?h2.text:"",content:content.slice(v,m).join(" ")});break}}})),n}document.addEventListener("click",(function(t){"true"===t.target.getAttribute("aria-hidden")&&(t.target.blur(),t.preventDefault())}));var _={components:{Search:l.default},mounted:function(){console.log("page component mounted"),setTimeout((function(){if(window.location.hash){var t=window.location.hash,e=document.querySelector('a[href="'+t+'"]');e&&e.scrollIntoView()}}),0)},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,data,path,l,h,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.$content,t.$router,r=t.params,v){e.next=7;break}return e.next=4,c.a.get("/full-stack-dev/navigation.json");case 4:o=e.sent,data=o.data,v=data;case 7:return console.log("init"),path=r.pathMatch||"",console.log("Path: "+path),(path=path.replace(/\/+$/,"")).length||(path="/"),l=null,h="/"===path,e.prev=14,e.next=17,n("/"===path?"index":path).fetch();case 17:l=e.sent,e.next=26;break;case 20:return e.prev=20,e.t0=e.catch(14),h=!0,e.next=25,n(path,"index").fetch();case 25:l=e.sent;case 26:return Array.isArray(l)&&(d="/"+path.replace(/^\//,"").replace(/\/$/,""),l=l.filter((function(t){return t.path.replace(/\/index$/,"")===d}))[0]),e.abrupt("return",{editPath:path.replace(/\/$/,"")+(h&&l?"/index":"")+".md",doc:l,navigation:{mode:"ordered",path:path,menu:v},mobile:{overlay:!1,search:"",searchResults:[]},mobileMenu:"Site Navigation",mobileSearch:"",mobileSearchResults:[],overlay:!1,query:""});case 28:case"end":return e.stop()}}),e,null,[[14,20]])})))()},computed:{},methods:{openQueueForm:function(){window.open("https://forms.gle/J1CCHSWpFPkEN5ms7")},setMobileMenu:function(t){this.mobileMenu=t,"Search"===t?setTimeout((function(){return document.getElementById("mobile-search-input").focus()}),50):this.mobileSearch=""},runSearch:function(t,e){var n=this;return Object(r.a)(regeneratorRuntime.mark((function r(){var data,q,o;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=4;break}return r.abrupt("return",e([]));case 4:return r.next=6,n.$content(null,{deep:!0}).search(t).fetch();case 6:data=r.sent,q=t.toLowerCase(),o=[],data.forEach((function(e){(e=Object.assign({},e)).path,e.title;e.blurb=e.description;var title=e.title.toLowerCase(),n=title.indexOf(q);0!==n&&title[n-1];for(var r=e.toc.length,h2="",c=!1,i=0;i<r;i++){var l=e.toc[i],text=l.text.toLowerCase(),v=text.indexOf(q);2===l.depth&&(h2=l.text),text===q?(o.push({title:l.text,crumbs:e.title+(l.depth>2?" > "+h2:""),blurb:m(e.body.children,l.id),realPath:e.path+"#"+l.id,score:5+l.depth}),c=!0):-1!==v&&(o.push({title:l.text,crumbs:e.title+(l.depth>2?" > "+h2:""),blurb:m(e.body.children,l.id),realPath:e.path+"#"+l.id,score:3+(0===v||" "===text[v-1]?1:0)+l.depth}),c=!0)}if(!c){var h=f(e.body.children||[],t);h.length?h.forEach((function(t){o.push({title:t.title||e.title,crumbs:e.title+(t.crumbs?" > "+t.crumbs:""),blurb:t.content,realPath:e.path+(t.id?"#"+t.id:""),score:1})})):o.push({title:e.title,crumbs:e.title,blurb:e.description,realPath:e.path,score:0})}})),o.sort((function(a,b){return a.score>b.score?-1:1})),o=o.slice(0,7),console.log("search results",o.map((function(t){return JSON.parse(JSON.stringify(t))}))),e(o);case 14:case"end":return r.stop()}}),r)})))()}},watch:{mobileSearch:function(t,e){var n=this;this.runSearch(t,(function(t){n.mobileSearchResults=t}))},overlay:function(t){!0===t&&(this.mobileMenu="Site Navigation")}}},C=n(49),component=Object(C.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("div",{staticClass:"overlay",class:{"show-overlay":t.overlay},on:{click:function(e){t.overlay=!1}}}),t._v(" "),n("div",{staticClass:"header"},[n("div",{staticClass:"center"},[n("div",{staticClass:"site-header"},[n("nuxt-link",{attrs:{to:"/"}},[n("h1",[t._v("Full Stack Web")])])],1),t._v(" "),n("div",{staticClass:"spacer"}),t._v(" "),n("div",{staticClass:"queue-button"},[n("el-button",{attrs:{icon:"el-icon-chat-line-round",circle:""},on:{click:function(e){return t.openQueueForm()}}})],1),t._v(" "),n("el-button",{staticClass:"mobile-menu-button",attrs:{icon:"el-icon-menu"},on:{click:function(e){t.overlay=!t.overlay}}}),t._v(" "),n("div",{staticClass:"site-navigation"},[n("search",{attrs:{"search-function":t.runSearch}})],1)],1)]),t._v(" "),n("div",{staticClass:"body center"},[n("div",{staticClass:"aside-left",class:{"show-navigation":t.overlay}},[n("div",{staticClass:"mobile-content"},[n("div",{staticClass:"mobile-menu-group",class:{"active-menu":"Search"===t.mobileMenu}},[n("div",{staticClass:"mobile-menu-button",on:{click:function(e){return t.setMobileMenu("Search")}}},[t._v("Search")]),t._v(" "),n("div",{staticClass:"mobile-menu-group-content mobile-menu-search"},[n("el-input",{attrs:{id:"mobile-search-input",placeholder:"Search",clearable:""},model:{value:t.mobileSearch,callback:function(e){t.mobileSearch=e},expression:"mobileSearch"}}),t._v(" "),n("div",{staticClass:"mobile-search-content"},[""===t.mobileSearch?n("p",[t._v("Search above.")]):t._e(),t._v(" "),""!==t.mobileSearch&&0===t.mobileSearchResults.length?n("p",[t._v("No results.")]):t._e(),t._v(" "),t._l(t.mobileSearchResults,(function(e,r){return n("div",{key:r,staticClass:"mobile-search-result",on:{click:function(n){return t.$router.push(e.path)}}},[n("div",{staticClass:"mobile-search-result-title"},[t._v(t._s(e.title))]),t._v(" "),n("div",{staticClass:"mobile-search-result-blurb"},[t._v(t._s(e.blurb))])])}))],2)],1)]),t._v(" "),n("div",{staticClass:"mobile-menu-group",class:{"active-menu":"Site Navigation"===t.mobileMenu}},[n("div",{staticClass:"mobile-menu-button",on:{click:function(e){return t.setMobileMenu("Site Navigation")}}},[t._v("Site Navigation")]),t._v(" "),n("div",{staticClass:"mobile-menu-group-content"},[n("ul",t._l(t.navigation.menu[t.navigation.mode],(function(e){return n("li",{key:e.path},[e.children?n("div",{staticClass:"nav-group"},[n("div",{staticClass:"nav-group-title"},[t._v(t._s(e.title))]),t._v(" "),e.children?n("ul",t._l(e.children,(function(e){return n("li",{key:e.path},[n("nuxt-link",{attrs:{to:e.path}},[t._v(t._s(e.title))])],1)})),0):t._e()]):n("nuxt-link",{attrs:{to:e.path}},[t._v(t._s(e.title))])],1)})),0)])]),t._v(" "),t.doc&&t.doc.toc&&!t.doc.noRightColumn&&t.doc.toc.length?n("div",{staticClass:"mobile-menu-group",class:{"active-menu":"Page Content"===t.mobileMenu}},[n("div",{staticClass:"mobile-menu-button",on:{click:function(e){return t.setMobileMenu("Page Content")}}},[t._v("Page Content")]),t._v(" "),n("div",{staticClass:"mobile-menu-group-content"},[n("ul",t._l(t.doc.toc,(function(link){return n("li",{key:link.id,class:{toc2:2===link.depth,toc3:3===link.depth}},[n("NuxtLink",{attrs:{to:"#"+link.id}},[t._v(t._s(link.text))])],1)})),0)])]):t._e(),t._v(" "),n("div",{staticClass:"mobile-menu-group",class:{"active-menu":"Ecosystem"===t.mobileMenu}},[n("div",{staticClass:"mobile-menu-button",on:{click:function(e){return t.setMobileMenu("Ecosystem")}}},[t._v("Ecosystem")]),t._v(" "),n("div",{staticClass:"mobile-menu-group-content"},t._l(t.navigation.ecosystem,(function(e){return n("a",{key:e.url,staticClass:"ecosystem",attrs:{href:e.url,target:"_blank"}},[t._v(t._s(e.title))])})),0)])]),t._v(" "),n("ul",{staticClass:"site-navigation"},[n("div",{staticClass:"mode-toggle"},[n("el-switch",{attrs:{"active-value":"topics","active-color":"#13ce66","active-text":"Organize by Topics","inactive-value":"ordered","inactive-color":"#ff4949"},model:{value:t.navigation.mode,callback:function(e){t.$set(t.navigation,"mode",e)},expression:"navigation.mode"}})],1),t._v(" "),t._l(t.navigation.menu[t.navigation.mode],(function(e,i){return n("li",{key:i},[e.children?n("div",{staticClass:"nav-group"},[n("div",{staticClass:"nav-group-title"},[t._v(t._s(e.title))]),t._v(" "),e.children?n("ul",t._l(e.children,(function(e){return n("li",{key:e.path},[n("nuxt-link",{attrs:{to:e.path}},[t._v(t._s(e.title))])],1)})),0):t._e()]):n("nuxt-link",{attrs:{to:e.path}},[t._v(t._s(e.title))])],1)}))],2)]),t._v(" "),n("div",{ref:"content",staticClass:"content"},[t.doc?n("h1",[t._v(t._s(t.doc.title))]):t._e(),t._v(" "),n("nuxt-content",{attrs:{document:t.doc}})],1),t._v(" "),t.doc&&t.doc.toc&&!t.doc.noRightColumn?n("div",{staticClass:"aside-right"},[t.doc.toc.length?n("div",[n("h4",[t._v("Page Content")]),t._v(" "),n("div",{staticClass:"toc"},[n("ul",t._l(t.doc.toc,(function(link){return n("li",{key:link.id,class:{toc2:2===link.depth,toc3:3===link.depth}},[n("NuxtLink",{attrs:{to:"#"+link.id}},[t._v(t._s(link.text))])],1)})),0)])]):t._e()]):t._e()]),t._v(" "),n("div",{staticClass:"footer"},[t._m(0),t._v(" "),n("div",{staticClass:"edit-this-page"},[t._v("\n      Caught a mistake or want to contribute to the documentation?\n      "),n("a",{attrs:{href:"https://github.com/Gi60s/full-stack-dev/tree/master/content/"+t.editPath,target:"_blank"}},[t._v("\n        Edit this page on Github.\n      ")])])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a",{attrs:{href:"https://github.com/gi60s/full-stack-dev",target:"_blank"}},[t._v("Github")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{Search:n(358).default})}}]);