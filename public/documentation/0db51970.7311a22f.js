(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{60:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return p}));var r=n(2),o=n(6),a=(n(0),n(99)),l={id:"dq_deploy",title:"DQ/DI - Deployment",sidebar_label:"Deployment"},c={unversionedId:"dq_deploy",id:"dq_deploy",isDocsHomePage:!1,title:"DQ/DI - Deployment",description:"Code deployment",source:"@site/docs/dq_deployment.md",slug:"/dq_deploy",permalink:"/documentation/docs/dq_deploy",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/dq_deployment.md",version:"current",sidebar_label:"Deployment"},i=[{value:"Code deployment",id:"code-deployment",children:[]},{value:"DQ Database deployment",id:"dq-database-deployment",children:[]},{value:"FAQ&#39;S",id:"faqs",children:[]}],s={rightToc:i};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"code-deployment"},"Code deployment"),Object(a.b)("p",null,"  1) Spin up compute layer preferably EC2 instance."),Object(a.b)("p",null,"  2) Install Python 3 and Apache Spark for file based sources "),Object(a.b)("p",null,"  3) Download DQ BOT code in data quality repository from Git hub "),Object(a.b)("p",null,"  4) Refer to requirement.txt for all python packages to be installed."),Object(a.b)("p",null,"  5) Run following command to install all packages: pip install -r requirements.tx"),Object(a.b)("p",null,"  6) Run pip list command to verify all packages are installed."),Object(a.b)("p",null,"  7) Set up corn job to trigger run_dq_bot.sh script based on run schedule created in UI."),Object(a.b)("p",null,"  8) Once DQBOT Database set up is complete edit dq_config.yaml and db_config.cnf files to set up DB's connection details."),Object(a.b)("h2",{id:"dq-database-deployment"},"DQ Database deployment"),Object(a.b)("p",null,"  1) Spin up RDS instance preferably MYSQL."),Object(a.b)("p",null,"  2) Create a DQBOT database. Please refer DQBOT data model for more details."),Object(a.b)("h2",{id:"faqs"},"FAQ'S"),Object(a.b)("p",null,"1) Is process specific to account ? "),Object(a.b)("p",null,"Ans: Yes, dashboards can be shared across organization but only owner of the process can edit it "),Object(a.b)("p",null,"2) Is there limit for number of process ?"),Object(a.b)("p",null,"Ans: No"),Object(a.b)("p",null,"3) Does dashboard gets refreshed real time ?"),Object(a.b)("p",null,"Ans: No, dashboards are refresh after scheduled run "),Object(a.b)("p",null,"4) Data quality checks performed on entire database or on delta's ? "),Object(a.b)("p",null,"Ans: Every run scans entire data set and dash boards reflect data quality at specific time "),Object(a.b)("p",null,"5) What happens when scheduled run fails ?"),Object(a.b)("p",null,"Ans: Users are alerted through registered emails. Please refer alerts guide for more reference."),Object(a.b)("p",null,"6) Most common reason for scheduled run failure or dashboard issue ?"),Object(a.b)("p",null,"Ans: "),Object(a.b)("p",null," 1) Regex or like pattern not properly defined. "),Object(a.b)("p",null," 2) Check for RDS connection. "),Object(a.b)("p",null," 3) Scheduled run is yet to be complete "),Object(a.b)("p",null," 4) computer layer down "),Object(a.b)("p",null,"7) What are file format supported ?"),Object(a.b)("p",null,"Ans: CSV, PSV, Textfile, JSON, AVRO"),Object(a.b)("p",null,"8) Can custom dashboards build ?"),Object(a.b)("p",null,"Ans: No dashboards are per-build. Please reach out to technical team for custom build DQ Checks."))}p.isMDXComponent=!0},99:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),p=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=p(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=p(n),b=r,f=d["".concat(l,".").concat(b)]||d[b]||u[b]||a;return n?o.a.createElement(f,c(c({ref:t},s),{},{components:n})):o.a.createElement(f,c({ref:t},s))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=b;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var s=2;s<a;s++)l[s]=n[s];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);