(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gl="170",Lr={ROTATE:0,DOLLY:1,PAN:2},Ar={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kd=0,Nc=1,Jd=2,hu=1,uu=2,Zn=3,wi=0,qe=1,Cn=2,Mi=0,Ir=1,Oc=2,Fc=3,Bc=4,Qd=5,Wi=100,tf=101,ef=102,nf=103,rf=104,sf=200,of=201,af=202,lf=203,Fa=204,Ba=205,cf=206,hf=207,uf=208,df=209,ff=210,pf=211,mf=212,_f=213,gf=214,za=0,ka=1,Ha=2,zr=3,Va=4,Ga=5,Wa=6,Xa=7,Wl=0,vf=1,xf=2,Si=0,yf=1,Mf=2,Sf=3,du=4,Ef=5,bf=6,Tf=7,fu=300,kr=301,Hr=302,Ya=303,qa=304,zo=306,ja=1e3,Yi=1001,Za=1002,Ln=1003,wf=1004,Gs=1005,Bn=1006,Zo=1007,qi=1008,ei=1009,pu=1010,mu=1011,bs=1012,Xl=1013,Qi=1014,Jn=1015,Ns=1016,Yl=1017,ql=1018,Vr=1020,_u=35902,gu=1021,vu=1022,Dn=1023,xu=1024,yu=1025,Ur=1026,Gr=1027,Mu=1028,jl=1029,Su=1030,Zl=1031,$l=1033,vo=33776,xo=33777,yo=33778,Mo=33779,$a=35840,Ka=35841,Ja=35842,Qa=35843,tl=36196,el=37492,nl=37496,il=37808,rl=37809,sl=37810,ol=37811,al=37812,ll=37813,cl=37814,hl=37815,ul=37816,dl=37817,fl=37818,pl=37819,ml=37820,_l=37821,So=36492,gl=36494,vl=36495,Eu=36283,xl=36284,yl=36285,Ml=36286,Af=3200,Rf=3201,bu=0,Cf=1,mi="",vn="srgb",ts="srgb-linear",ko="linear",ee="srgb",lr=7680,zc=519,Pf=512,Df=513,Lf=514,Tu=515,If=516,Uf=517,Nf=518,Of=519,Sl=35044,kc="300 es",Qn=2e3,Ro=2001;class nr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Eo=Math.PI/180,El=180/Math.PI;function Ei(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[i&255]+Ie[i>>8&255]+Ie[i>>16&255]+Ie[i>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function He(i,t,e){return Math.max(t,Math.min(e,i))}function Ff(i,t){return(i%t+t)%t}function $o(i,t,e){return(1-e)*i+e*t}function On(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Bf={DEG2RAD:Eo};class Tt{constructor(t=0,e=0){Tt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(t,e,n,r,s,o,a,l,c){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c)}set(t,e,n,r,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],p=n[2],m=n[5],g=n[8],_=r[0],f=r[3],d=r[6],v=r[1],M=r[4],x=r[7],A=r[2],T=r[5],w=r[8];return s[0]=o*_+a*v+l*A,s[3]=o*f+a*M+l*T,s[6]=o*d+a*x+l*w,s[1]=c*_+h*v+u*A,s[4]=c*f+h*M+u*T,s[7]=c*d+h*x+u*w,s[2]=p*_+m*v+g*A,s[5]=p*f+m*M+g*T,s[8]=p*d+m*x+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,p=a*l-h*s,m=c*s-o*l,g=e*u+n*p+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(r*c-h*n)*_,t[2]=(a*n-r*o)*_,t[3]=p*_,t[4]=(h*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=m*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ko.makeScale(t,e)),this}rotate(t){return this.premultiply(Ko.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ko.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ko=new Ft;function wu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Co(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zf(){const i=Co("canvas");return i.style.display="block",i}const Hc={};function ms(i){i in Hc||(Hc[i]=!0,console.warn(i))}function kf(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Hf(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Vf(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Zt={enabled:!0,workingColorSpace:ts,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ee&&(i.r=ti(i.r),i.g=ti(i.g),i.b=ti(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ee&&(i.r=Nr(i.r),i.g=Nr(i.g),i.b=Nr(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===mi?ko:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Nr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Vc=[.64,.33,.3,.6,.15,.06],Gc=[.2126,.7152,.0722],Wc=[.3127,.329],Xc=new Ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yc=new Ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Zt.define({[ts]:{primaries:Vc,whitePoint:Wc,transfer:ko,toXYZ:Xc,fromXYZ:Yc,luminanceCoefficients:Gc,workingColorSpaceConfig:{unpackColorSpace:vn},outputColorSpaceConfig:{drawingBufferColorSpace:vn}},[vn]:{primaries:Vc,whitePoint:Wc,transfer:ee,toXYZ:Xc,fromXYZ:Yc,luminanceCoefficients:Gc,outputColorSpaceConfig:{drawingBufferColorSpace:vn}}});let cr;class Gf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{cr===void 0&&(cr=Co("canvas")),cr.width=t.width,cr.height=t.height;const n=cr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=cr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Co("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=ti(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ti(e[n]/255)*255):e[n]=ti(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Wf=0;class Au{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Ei(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Jo(r[o].image)):s.push(Jo(r[o]))}else s=Jo(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Jo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xf=0;class Ge extends nr{constructor(t=Ge.DEFAULT_IMAGE,e=Ge.DEFAULT_MAPPING,n=Yi,r=Yi,s=Bn,o=qi,a=Dn,l=ei,c=Ge.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xf++}),this.uuid=Ei(),this.name="",this.source=new Au(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Tt(0,0),this.repeat=new Tt(1,1),this.center=new Tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==fu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ja:t.x=t.x-Math.floor(t.x);break;case Yi:t.x=t.x<0?0:1;break;case Za:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ja:t.y=t.y-Math.floor(t.y);break;case Yi:t.y=t.y<0?0:1;break;case Za:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=fu;Ge.DEFAULT_ANISOTROPY=1;class re{constructor(t=0,e=0,n=0,r=1){re.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],h=l[4],u=l[8],p=l[1],m=l[5],g=l[9],_=l[2],f=l[6],d=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-_)<.01&&Math.abs(g-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+_)<.1&&Math.abs(g+f)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,x=(m+1)/2,A=(d+1)/2,T=(h+p)/4,w=(u+_)/4,R=(g+f)/4;return M>x&&M>A?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=T/n,s=w/n):x>A?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=T/r,s=R/r):A<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(A),n=w/s,r=R/s),this.set(n,r,s,e),this}let v=Math.sqrt((f-g)*(f-g)+(u-_)*(u-_)+(p-h)*(p-h));return Math.abs(v)<.001&&(v=1),this.x=(f-g)/v,this.y=(u-_)/v,this.z=(p-h)/v,this.w=Math.acos((c+m+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yf extends nr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Ge(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Au(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class tr extends Yf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ru extends Ge{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class qf extends Ge{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class er{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3];const p=s[o+0],m=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=p,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==p||c!==m||h!==g){let f=1-a;const d=l*p+c*m+h*g+u*_,v=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const A=Math.sqrt(M),T=Math.atan2(A,d*v);f=Math.sin(f*T)/A,a=Math.sin(a*T)/A}const x=a*v;if(l=l*f+p*x,c=c*f+m*x,h=h*f+g*x,u=u*f+_*x,f===1-a){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[o],p=s[o+1],m=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*m-c*p,t[e+1]=l*g+h*p+c*u-a*m,t[e+2]=c*g+h*m+a*p-l*u,t[e+3]=h*g-a*u-l*p-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(r/2),u=a(s/2),p=l(n/2),m=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=p*h*u+c*m*g,this._y=c*m*u-p*h*g,this._z=c*h*g+p*m*u,this._w=c*h*u-p*m*g;break;case"YXZ":this._x=p*h*u+c*m*g,this._y=c*m*u-p*h*g,this._z=c*h*g-p*m*u,this._w=c*h*u+p*m*g;break;case"ZXY":this._x=p*h*u-c*m*g,this._y=c*m*u+p*h*g,this._z=c*h*g+p*m*u,this._w=c*h*u-p*m*g;break;case"ZYX":this._x=p*h*u-c*m*g,this._y=c*m*u+p*h*g,this._z=c*h*g-p*m*u,this._w=c*h*u+p*m*g;break;case"YZX":this._x=p*h*u+c*m*g,this._y=c*m*u+p*h*g,this._z=c*h*g-p*m*u,this._w=c*h*u-p*m*g;break;case"XZY":this._x=p*h*u-c*m*g,this._y=c*m*u-p*h*g,this._z=c*h*g+p*m*u,this._w=c*h*u+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],p=n+a+u;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(He(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-r*a,this._w=o*h-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*r+e*this._y,this._z=m*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,p=Math.sin(e*h)/c;return this._w=o*u+this._w*p,this._x=n*u+this._x*p,this._y=r*u+this._y*p,this._z=s*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*n),h=2*(a*e-s*r),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Qo.copy(this).projectOnVector(t),this.sub(Qo)}reflect(t){return this.sub(Qo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(He(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qo=new L,qc=new er;class Os{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,wn):wn.fromBufferAttribute(s,o),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ws.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ws.copy(n.boundingBox)),Ws.applyMatrix4(t.matrixWorld),this.union(Ws)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ss),Xs.subVectors(this.max,ss),hr.subVectors(t.a,ss),ur.subVectors(t.b,ss),dr.subVectors(t.c,ss),ai.subVectors(ur,hr),li.subVectors(dr,ur),Ui.subVectors(hr,dr);let e=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Ui.z,Ui.y,ai.z,0,-ai.x,li.z,0,-li.x,Ui.z,0,-Ui.x,-ai.y,ai.x,0,-li.y,li.x,0,-Ui.y,Ui.x,0];return!ta(e,hr,ur,dr,Xs)||(e=[1,0,0,0,1,0,0,0,1],!ta(e,hr,ur,dr,Xs))?!1:(Ys.crossVectors(ai,li),e=[Ys.x,Ys.y,Ys.z],ta(e,hr,ur,dr,Xs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Wn=[new L,new L,new L,new L,new L,new L,new L,new L],wn=new L,Ws=new Os,hr=new L,ur=new L,dr=new L,ai=new L,li=new L,Ui=new L,ss=new L,Xs=new L,Ys=new L,Ni=new L;function ta(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){Ni.fromArray(i,s);const a=r.x*Math.abs(Ni.x)+r.y*Math.abs(Ni.y)+r.z*Math.abs(Ni.z),l=t.dot(Ni),c=e.dot(Ni),h=n.dot(Ni);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const jf=new Os,os=new L,ea=new L;class Ho{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):jf.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;os.subVectors(t,this.center);const e=os.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(os,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(os.copy(t.center).add(ea)),this.expandByPoint(os.copy(t.center).sub(ea))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Xn=new L,na=new L,qs=new L,ci=new L,ia=new L,js=new L,ra=new L;class Vo{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Xn.copy(this.origin).addScaledVector(this.direction,e),Xn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){na.copy(t).add(e).multiplyScalar(.5),qs.copy(e).sub(t).normalize(),ci.copy(this.origin).sub(na);const s=t.distanceTo(e)*.5,o=-this.direction.dot(qs),a=ci.dot(this.direction),l=-ci.dot(qs),c=ci.lengthSq(),h=Math.abs(1-o*o);let u,p,m,g;if(h>0)if(u=o*l-a,p=o*a-l,g=s*h,u>=0)if(p>=-g)if(p<=g){const _=1/h;u*=_,p*=_,m=u*(u+o*p+2*a)+p*(o*u+p+2*l)+c}else p=s,u=Math.max(0,-(o*p+a)),m=-u*u+p*(p+2*l)+c;else p=-s,u=Math.max(0,-(o*p+a)),m=-u*u+p*(p+2*l)+c;else p<=-g?(u=Math.max(0,-(-o*s+a)),p=u>0?-s:Math.min(Math.max(-s,-l),s),m=-u*u+p*(p+2*l)+c):p<=g?(u=0,p=Math.min(Math.max(-s,-l),s),m=p*(p+2*l)+c):(u=Math.max(0,-(o*s+a)),p=u>0?s:Math.min(Math.max(-s,-l),s),m=-u*u+p*(p+2*l)+c);else p=o>0?-s:s,u=Math.max(0,-(o*p+a)),m=-u*u+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(na).addScaledVector(qs,p),m}intersectSphere(t,e){Xn.subVectors(t.center,this.origin);const n=Xn.dot(this.direction),r=Xn.dot(Xn)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,r=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,r=(t.min.x-p.x)*c),h>=0?(s=(t.min.y-p.y)*h,o=(t.max.y-p.y)*h):(s=(t.max.y-p.y)*h,o=(t.min.y-p.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(t.min.z-p.z)*u,l=(t.max.z-p.z)*u):(a=(t.max.z-p.z)*u,l=(t.min.z-p.z)*u),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Xn)!==null}intersectTriangle(t,e,n,r,s){ia.subVectors(e,t),js.subVectors(n,t),ra.crossVectors(ia,js);let o=this.direction.dot(ra),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,t);const l=a*this.direction.dot(js.crossVectors(ci,js));if(l<0)return null;const c=a*this.direction.dot(ia.cross(ci));if(c<0||l+c>o)return null;const h=-a*ci.dot(ra);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,n,r,s,o,a,l,c,h,u,p,m,g,_,f){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c,h,u,p,m,g,_,f)}set(t,e,n,r,s,o,a,l,c,h,u,p,m,g,_,f){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=p,d[3]=m,d[7]=g,d[11]=_,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/fr.setFromMatrixColumn(t,0).length(),s=1/fr.setFromMatrixColumn(t,1).length(),o=1/fr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const p=o*h,m=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=m+g*c,e[5]=p-_*c,e[9]=-a*l,e[2]=_-p*c,e[6]=g+m*c,e[10]=o*l}else if(t.order==="YXZ"){const p=l*h,m=l*u,g=c*h,_=c*u;e[0]=p+_*a,e[4]=g*a-m,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=m*a-g,e[6]=_+p*a,e[10]=o*l}else if(t.order==="ZXY"){const p=l*h,m=l*u,g=c*h,_=c*u;e[0]=p-_*a,e[4]=-o*u,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*h,e[9]=_-p*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const p=o*h,m=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-m,e[8]=p*c+_,e[1]=l*u,e[5]=_*c+p,e[9]=m*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const p=o*l,m=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-p*u,e[8]=g*u+m,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=m*u+g,e[10]=p-_*u}else if(t.order==="XZY"){const p=o*l,m=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=p*u+_,e[5]=o*h,e[9]=m*u-g,e[2]=g*u-m,e[6]=a*h,e[10]=_*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Zf,t,$f)}lookAt(t,e,n){const r=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),hi.crossVectors(n,tn),hi.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),hi.crossVectors(n,tn)),hi.normalize(),Zs.crossVectors(tn,hi),r[0]=hi.x,r[4]=Zs.x,r[8]=tn.x,r[1]=hi.y,r[5]=Zs.y,r[9]=tn.y,r[2]=hi.z,r[6]=Zs.z,r[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],p=n[9],m=n[13],g=n[2],_=n[6],f=n[10],d=n[14],v=n[3],M=n[7],x=n[11],A=n[15],T=r[0],w=r[4],R=r[8],y=r[12],S=r[1],P=r[5],F=r[9],I=r[13],V=r[2],W=r[6],z=r[10],q=r[14],k=r[3],it=r[7],rt=r[11],vt=r[15];return s[0]=o*T+a*S+l*V+c*k,s[4]=o*w+a*P+l*W+c*it,s[8]=o*R+a*F+l*z+c*rt,s[12]=o*y+a*I+l*q+c*vt,s[1]=h*T+u*S+p*V+m*k,s[5]=h*w+u*P+p*W+m*it,s[9]=h*R+u*F+p*z+m*rt,s[13]=h*y+u*I+p*q+m*vt,s[2]=g*T+_*S+f*V+d*k,s[6]=g*w+_*P+f*W+d*it,s[10]=g*R+_*F+f*z+d*rt,s[14]=g*y+_*I+f*q+d*vt,s[3]=v*T+M*S+x*V+A*k,s[7]=v*w+M*P+x*W+A*it,s[11]=v*R+M*F+x*z+A*rt,s[15]=v*y+M*I+x*q+A*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],p=t[10],m=t[14],g=t[3],_=t[7],f=t[11],d=t[15];return g*(+s*l*u-r*c*u-s*a*p+n*c*p+r*a*m-n*l*m)+_*(+e*l*m-e*c*p+s*o*p-r*o*m+r*c*h-s*l*h)+f*(+e*c*u-e*a*m-s*o*u+n*o*m+s*a*h-n*c*h)+d*(-r*a*h-e*l*u+e*a*p+r*o*u-n*o*p+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],p=t[10],m=t[11],g=t[12],_=t[13],f=t[14],d=t[15],v=u*f*c-_*p*c+_*l*m-a*f*m-u*l*d+a*p*d,M=g*p*c-h*f*c-g*l*m+o*f*m+h*l*d-o*p*d,x=h*_*c-g*u*c+g*a*m-o*_*m-h*a*d+o*u*d,A=g*u*l-h*_*l-g*a*p+o*_*p+h*a*f-o*u*f,T=e*v+n*M+r*x+s*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return t[0]=v*w,t[1]=(_*p*s-u*f*s-_*r*m+n*f*m+u*r*d-n*p*d)*w,t[2]=(a*f*s-_*l*s+_*r*c-n*f*c-a*r*d+n*l*d)*w,t[3]=(u*l*s-a*p*s-u*r*c+n*p*c+a*r*m-n*l*m)*w,t[4]=M*w,t[5]=(h*f*s-g*p*s+g*r*m-e*f*m-h*r*d+e*p*d)*w,t[6]=(g*l*s-o*f*s-g*r*c+e*f*c+o*r*d-e*l*d)*w,t[7]=(o*p*s-h*l*s+h*r*c-e*p*c-o*r*m+e*l*m)*w,t[8]=x*w,t[9]=(g*u*s-h*_*s-g*n*m+e*_*m+h*n*d-e*u*d)*w,t[10]=(o*_*s-g*a*s+g*n*c-e*_*c-o*n*d+e*a*d)*w,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*m-e*a*m)*w,t[12]=A*w,t[13]=(h*_*r-g*u*r+g*n*p-e*_*p-h*n*f+e*u*f)*w,t[14]=(g*a*r-o*_*r-g*n*l+e*_*l+o*n*f-e*a*f)*w,t[15]=(o*u*r-h*a*r+h*n*l-e*u*l-o*n*p+e*a*p)*w,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+n,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,p=s*c,m=s*h,g=s*u,_=o*h,f=o*u,d=a*u,v=l*c,M=l*h,x=l*u,A=n.x,T=n.y,w=n.z;return r[0]=(1-(_+d))*A,r[1]=(m+x)*A,r[2]=(g-M)*A,r[3]=0,r[4]=(m-x)*T,r[5]=(1-(p+d))*T,r[6]=(f+v)*T,r[7]=0,r[8]=(g+M)*w,r[9]=(f-v)*w,r[10]=(1-(p+_))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=fr.set(r[0],r[1],r[2]).length();const o=fr.set(r[4],r[5],r[6]).length(),a=fr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],An.copy(this);const c=1/s,h=1/o,u=1/a;return An.elements[0]*=c,An.elements[1]*=c,An.elements[2]*=c,An.elements[4]*=h,An.elements[5]*=h,An.elements[6]*=h,An.elements[8]*=u,An.elements[9]*=u,An.elements[10]*=u,e.setFromRotationMatrix(An),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=Qn){const l=this.elements,c=2*s/(e-t),h=2*s/(n-r),u=(e+t)/(e-t),p=(n+r)/(n-r);let m,g;if(a===Qn)m=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ro)m=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=Qn){const l=this.elements,c=1/(e-t),h=1/(n-r),u=1/(o-s),p=(e+t)*c,m=(n+r)*h;let g,_;if(a===Qn)g=(o+s)*u,_=-2*u;else if(a===Ro)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const fr=new L,An=new ce,Zf=new L(0,0,0),$f=new L(1,1,1),hi=new L,Zs=new L,tn=new L,jc=new ce,Zc=new er;class kn{constructor(t=0,e=0,n=0,r=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],p=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(He(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(He(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(He(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return jc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zc.setFromEuler(this),this.setFromQuaternion(Zc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class Kl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Kf=0;const $c=new L,pr=new er,Yn=new ce,$s=new L,as=new L,Jf=new L,Qf=new er,Kc=new L(1,0,0),Jc=new L(0,1,0),Qc=new L(0,0,1),th={type:"added"},tp={type:"removed"},mr={type:"childadded",child:null},sa={type:"childremoved",child:null};class Ce extends nr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new L,e=new kn,n=new er,r=new L(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ce},normalMatrix:{value:new Ft}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return pr.setFromAxisAngle(t,e),this.quaternion.multiply(pr),this}rotateOnWorldAxis(t,e){return pr.setFromAxisAngle(t,e),this.quaternion.premultiply(pr),this}rotateX(t){return this.rotateOnAxis(Kc,t)}rotateY(t){return this.rotateOnAxis(Jc,t)}rotateZ(t){return this.rotateOnAxis(Qc,t)}translateOnAxis(t,e){return $c.copy(t).applyQuaternion(this.quaternion),this.position.add($c.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kc,t)}translateY(t){return this.translateOnAxis(Jc,t)}translateZ(t){return this.translateOnAxis(Qc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?$s.copy(t):$s.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),as.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(as,$s,this.up):Yn.lookAt($s,as,this.up),this.quaternion.setFromRotationMatrix(Yn),r&&(Yn.extractRotation(r.matrixWorld),pr.setFromRotationMatrix(Yn),this.quaternion.premultiply(pr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(th),mr.child=t,this.dispatchEvent(mr),mr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(tp),sa.child=t,this.dispatchEvent(sa),sa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(th),mr.child=t,this.dispatchEvent(mr),mr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,t,Jf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,Qf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),p=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}Ce.DEFAULT_UP=new L(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new L,qn=new L,oa=new L,jn=new L,_r=new L,gr=new L,eh=new L,aa=new L,la=new L,ca=new L,ha=new re,ua=new re,da=new re;class xn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Rn.subVectors(t,e),r.cross(Rn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Rn.subVectors(r,e),qn.subVectors(n,e),oa.subVectors(t,e);const o=Rn.dot(Rn),a=Rn.dot(qn),l=Rn.dot(oa),c=qn.dot(qn),h=qn.dot(oa),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const p=1/u,m=(c*l-a*h)*p,g=(o*h-a*l)*p;return s.set(1-m-g,g,m)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,n,r,s,o,a,l){return this.getBarycoord(t,e,n,r,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,jn.x),l.addScaledVector(o,jn.y),l.addScaledVector(a,jn.z),l)}static getInterpolatedAttribute(t,e,n,r,s,o){return ha.setScalar(0),ua.setScalar(0),da.setScalar(0),ha.fromBufferAttribute(t,e),ua.fromBufferAttribute(t,n),da.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(ha,s.x),o.addScaledVector(ua,s.y),o.addScaledVector(da,s.z),o}static isFrontFacing(t,e,n,r){return Rn.subVectors(n,e),qn.subVectors(t,e),Rn.cross(qn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Rn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),Rn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return xn.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;_r.subVectors(r,n),gr.subVectors(s,n),aa.subVectors(t,n);const l=_r.dot(aa),c=gr.dot(aa);if(l<=0&&c<=0)return e.copy(n);la.subVectors(t,r);const h=_r.dot(la),u=gr.dot(la);if(h>=0&&u<=h)return e.copy(r);const p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(_r,o);ca.subVectors(t,s);const m=_r.dot(ca),g=gr.dot(ca);if(g>=0&&m<=g)return e.copy(s);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(gr,a);const f=h*g-m*u;if(f<=0&&u-h>=0&&m-g>=0)return eh.subVectors(s,r),a=(u-h)/(u-h+(m-g)),e.copy(r).addScaledVector(eh,a);const d=1/(f+_+p);return o=_*d,a=p*d,e.copy(n).addScaledVector(_r,o).addScaledVector(gr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Ks={h:0,s:0,l:0};function fa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Vt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=vn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Zt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Zt.workingColorSpace){if(t=Ff(t,1),e=He(e,0,1),n=He(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=fa(o,s,t+1/3),this.g=fa(o,s,t),this.b=fa(o,s,t-1/3)}return Zt.toWorkingColorSpace(this,r),this}setStyle(t,e=vn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=vn){const n=Cu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ti(t.r),this.g=ti(t.g),this.b=ti(t.b),this}copyLinearToSRGB(t){return this.r=Nr(t.r),this.g=Nr(t.g),this.b=Nr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=vn){return Zt.fromWorkingColorSpace(Ue.copy(this),t),Math.round(He(Ue.r*255,0,255))*65536+Math.round(He(Ue.g*255,0,255))*256+Math.round(He(Ue.b*255,0,255))}getHexString(t=vn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.fromWorkingColorSpace(Ue.copy(this),e);const n=Ue.r,r=Ue.g,s=Ue.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Zt.workingColorSpace){return Zt.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=vn){Zt.fromWorkingColorSpace(Ue.copy(this),t);const e=Ue.r,n=Ue.g,r=Ue.b;return t!==vn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(ui),this.setHSL(ui.h+t,ui.s+e,ui.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ui),t.getHSL(Ks);const n=$o(ui.h,Ks.h,e),r=$o(ui.s,Ks.s,e),s=$o(ui.l,Ks.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new Vt;Vt.NAMES=Cu;let ep=0;class ir extends nr{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Ei(),this.name="",this.blending=Ir,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fa,this.blendDst=Ba,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=lr,this.stencilZFail=lr,this.stencilZPass=lr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ir&&(n.blending=this.blending),this.side!==wi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Fa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ba&&(n.blendDst=this.blendDst),this.blendEquation!==Wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==lr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==lr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==lr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class We extends ir{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new L,Js=new Tt;class Sn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Sl,this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Js.fromBufferAttribute(this,e),Js.applyMatrix3(t),this.setXY(e,Js.x,Js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=On(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=On(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=On(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=On(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=On(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),r=ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),r=ne(r,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Sl&&(t.usage=this.usage),t}}class Pu extends Sn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Du extends Sn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Oe extends Sn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let np=0;const mn=new ce,pa=new Ce,vr=new L,en=new Os,ls=new Os,Re=new L;class dn extends nr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wu(t)?Du:Pu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ft().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return mn.makeRotationFromQuaternion(t),this.applyMatrix4(mn),this}rotateX(t){return mn.makeRotationX(t),this.applyMatrix4(mn),this}rotateY(t){return mn.makeRotationY(t),this.applyMatrix4(mn),this}rotateZ(t){return mn.makeRotationZ(t),this.applyMatrix4(mn),this}translate(t,e,n){return mn.makeTranslation(t,e,n),this.applyMatrix4(mn),this}scale(t,e,n){return mn.makeScale(t,e,n),this.applyMatrix4(mn),this}lookAt(t){return pa.lookAt(t),pa.updateMatrix(),this.applyMatrix4(pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vr).negate(),this.translate(vr.x,vr.y,vr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Oe(n,3))}else{for(let n=0,r=e.count;n<r;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Os);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];en.setFromBufferAttribute(s),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ho);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];ls.setFromBufferAttribute(a),this.morphTargetsRelative?(Re.addVectors(en.min,ls.min),en.expandByPoint(Re),Re.addVectors(en.max,ls.max),en.expandByPoint(Re)):(en.expandByPoint(ls.min),en.expandByPoint(ls.max))}en.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)Re.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Re));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Re.fromBufferAttribute(a,c),l&&(vr.fromBufferAttribute(t,c),Re.add(vr)),r=Math.max(r,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new L,l[R]=new L;const c=new L,h=new L,u=new L,p=new Tt,m=new Tt,g=new Tt,_=new L,f=new L;function d(R,y,S){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,S),p.fromBufferAttribute(s,R),m.fromBufferAttribute(s,y),g.fromBufferAttribute(s,S),h.sub(c),u.sub(c),m.sub(p),g.sub(p);const P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(P),f.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(P),a[R].add(_),a[y].add(_),a[S].add(_),l[R].add(f),l[y].add(f),l[S].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let R=0,y=v.length;R<y;++R){const S=v[R],P=S.start,F=S.count;for(let I=P,V=P+F;I<V;I+=3)d(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const M=new L,x=new L,A=new L,T=new L;function w(R){A.fromBufferAttribute(r,R),T.copy(A);const y=a[R];M.copy(y),M.sub(A.multiplyScalar(A.dot(y))).normalize(),x.crossVectors(T,y);const P=x.dot(l[R])<0?-1:1;o.setXYZW(R,M.x,M.y,M.z,P)}for(let R=0,y=v.length;R<y;++R){const S=v[R],P=S.start,F=S.count;for(let I=P,V=P+F;I<V;I+=3)w(t.getX(I+0)),w(t.getX(I+1)),w(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Sn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const r=new L,s=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let p=0,m=t.count;p<m;p+=3){const g=t.getX(p+0),_=t.getX(p+1),f=t.getX(p+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,f),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,f),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let p=0,m=e.count;p<m;p+=3)r.fromBufferAttribute(e,p+0),s.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,p=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,f=l.length;_<f;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*h;for(let d=0;d<h;d++)p[g++]=c[m++]}return new Sn(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new dn,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const p=c[h],m=t(p,n);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){const m=c[u];h.push(m.toJSON(t.data))}h.length>0&&(r[l]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let p=0,m=u.length;p<m;p++)h.push(u[p].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nh=new ce,Oi=new Vo,Qs=new Ho,ih=new L,to=new L,eo=new L,no=new L,ma=new L,io=new L,rh=new L,ro=new L;class $ extends Ce{constructor(t=new dn,e=new We){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){io.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(ma.fromBufferAttribute(u,t),o?io.addScaledVector(ma,h):io.addScaledVector(ma.sub(e),h))}e.add(io)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qs.copy(n.boundingSphere),Qs.applyMatrix4(s),Oi.copy(t.ray).recast(t.near),!(Qs.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(Qs,ih)===null||Oi.origin.distanceToSquared(ih)>(t.far-t.near)**2))&&(nh.copy(s).invert(),Oi.copy(t.ray).applyMatrix4(nh),!(n.boundingBox!==null&&Oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Oi)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,p=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const f=p[g],d=o[f.materialIndex],v=Math.max(f.start,m.start),M=Math.min(a.count,Math.min(f.start+f.count,m.start+m.count));for(let x=v,A=M;x<A;x+=3){const T=a.getX(x),w=a.getX(x+1),R=a.getX(x+2);r=so(this,d,t,n,c,h,u,T,w,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let f=g,d=_;f<d;f+=3){const v=a.getX(f),M=a.getX(f+1),x=a.getX(f+2);r=so(this,o,t,n,c,h,u,v,M,x),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){const f=p[g],d=o[f.materialIndex],v=Math.max(f.start,m.start),M=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let x=v,A=M;x<A;x+=3){const T=x,w=x+1,R=x+2;r=so(this,d,t,n,c,h,u,T,w,R),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let f=g,d=_;f<d;f+=3){const v=f,M=f+1,x=f+2;r=so(this,o,t,n,c,h,u,v,M,x),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}}}function ip(i,t,e,n,r,s,o,a){let l;if(t.side===qe?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,t.side===wi,a),l===null)return null;ro.copy(a),ro.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ro);return c<e.near||c>e.far?null:{distance:c,point:ro.clone(),object:i}}function so(i,t,e,n,r,s,o,a,l,c){i.getVertexPosition(a,to),i.getVertexPosition(l,eo),i.getVertexPosition(c,no);const h=ip(i,t,e,n,to,eo,no,rh);if(h){const u=new L;xn.getBarycoord(rh,to,eo,no,u),r&&(h.uv=xn.getInterpolatedAttribute(r,a,l,c,u,new Tt)),s&&(h.uv1=xn.getInterpolatedAttribute(s,a,l,c,u,new Tt)),o&&(h.normal=xn.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new L,materialIndex:0};xn.getNormal(to,eo,no,p.normal),h.face=p,h.barycoord=u}return h}class gt extends dn{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let p=0,m=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Oe(c,3)),this.setAttribute("normal",new Oe(h,3)),this.setAttribute("uv",new Oe(u,2));function g(_,f,d,v,M,x,A,T,w,R,y){const S=x/w,P=A/R,F=x/2,I=A/2,V=T/2,W=w+1,z=R+1;let q=0,k=0;const it=new L;for(let rt=0;rt<z;rt++){const vt=rt*P-I;for(let Pt=0;Pt<W;Pt++){const Kt=Pt*S-F;it[_]=Kt*v,it[f]=vt*M,it[d]=V,c.push(it.x,it.y,it.z),it[_]=0,it[f]=0,it[d]=T>0?1:-1,h.push(it.x,it.y,it.z),u.push(Pt/w),u.push(1-rt/R),q+=1}}for(let rt=0;rt<R;rt++)for(let vt=0;vt<w;vt++){const Pt=p+vt+W*rt,Kt=p+vt+W*(rt+1),Y=p+(vt+1)+W*(rt+1),tt=p+(vt+1)+W*rt;l.push(Pt,Kt,tt),l.push(Kt,Y,tt),k+=6}a.addGroup(m,k,y),m+=k,p+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Wr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function ke(i){const t={};for(let e=0;e<i.length;e++){const n=Wr(i[e]);for(const r in n)t[r]=n[r]}return t}function rp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Lu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const sp={clone:Wr,merge:ke};var op=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ap=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ai extends ir{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=op,this.fragmentShader=ap,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Wr(t.uniforms),this.uniformsGroups=rp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Iu extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=Qn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const di=new L,sh=new Tt,oh=new Tt;class rn extends Iu{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=El*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Eo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return El*2*Math.atan(Math.tan(Eo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(di.x,di.y).multiplyScalar(-t/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(di.x,di.y).multiplyScalar(-t/di.z)}getViewSize(t,e){return this.getViewBounds(t,sh,oh),e.subVectors(oh,sh)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Eo*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const xr=-90,yr=1;class lp extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new rn(xr,yr,t,e);r.layers=this.layers,this.add(r);const s=new rn(xr,yr,t,e);s.layers=this.layers,this.add(s);const o=new rn(xr,yr,t,e);o.layers=this.layers,this.add(o);const a=new rn(xr,yr,t,e);a.layers=this.layers,this.add(a);const l=new rn(xr,yr,t,e);l.layers=this.layers,this.add(l);const c=new rn(xr,yr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Qn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ro)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,h),t.setRenderTarget(u,p,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Uu extends Ge{constructor(t,e,n,r,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:kr,super(t,e,n,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class cp extends tr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Uu(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Bn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new gt(5,5,5),s=new Ai({name:"CubemapFromEquirect",uniforms:Wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qe,blending:Mi});s.uniforms.tEquirect.value=e;const o=new $(r,s),a=e.minFilter;return e.minFilter===qi&&(e.minFilter=Bn),new lp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}const _a=new L,hp=new L,up=new Ft;class fi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=_a.subVectors(n,e).cross(hp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(_a),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||up.getNormalMatrix(t),r=this.coplanarPoint(_a).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fi=new Ho,oo=new L;class Jl{constructor(t=new fi,e=new fi,n=new fi,r=new fi,s=new fi,o=new fi){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Qn){const n=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],p=r[7],m=r[8],g=r[9],_=r[10],f=r[11],d=r[12],v=r[13],M=r[14],x=r[15];if(n[0].setComponents(l-s,p-c,f-m,x-d).normalize(),n[1].setComponents(l+s,p+c,f+m,x+d).normalize(),n[2].setComponents(l+o,p+h,f+g,x+v).normalize(),n[3].setComponents(l-o,p-h,f-g,x-v).normalize(),n[4].setComponents(l-a,p-u,f-_,x-M).normalize(),e===Qn)n[5].setComponents(l+a,p+u,f+_,x+M).normalize();else if(e===Ro)n[5].setComponents(a,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(t){return Fi.center.set(0,0,0),Fi.radius=.7071067811865476,Fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(oo.x=r.normal.x>0?t.max.x:t.min.x,oo.y=r.normal.y>0?t.max.y:t.min.y,oo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(oo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Nu(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function dp(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,h),a.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((m,g)=>m.start-g.start);let p=0;for(let m=1;m<u.length;m++){const g=u[p],_=u[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,u[p]=_)}u.length=p+1;for(let m=0,g=u.length;m<g;m++){const _=u[m];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class es extends dn{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(r),c=a+1,h=l+1,u=t/a,p=e/l,m=[],g=[],_=[],f=[];for(let d=0;d<h;d++){const v=d*p-o;for(let M=0;M<c;M++){const x=M*u-s;g.push(x,-v,0),_.push(0,0,1),f.push(M/a),f.push(1-d/l)}}for(let d=0;d<l;d++)for(let v=0;v<a;v++){const M=v+c*d,x=v+c*(d+1),A=v+1+c*(d+1),T=v+1+c*d;m.push(M,x,T),m.push(x,A,T)}this.setIndex(m),this.setAttribute("position",new Oe(g,3)),this.setAttribute("normal",new Oe(_,3)),this.setAttribute("uv",new Oe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new es(t.width,t.height,t.widthSegments,t.heightSegments)}}var fp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_p=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Sp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ep=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ap=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Up=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Np=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Op=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Yp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$p=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,em=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,im=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,sm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,om=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,am=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,um=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,dm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,fm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,pm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_m=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ym=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Sm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Em=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Am=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Cm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Dm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Um=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Nm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Om=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,km=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Vm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Gm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ym=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Zm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$m=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Km=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Jm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,t0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,e0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,n0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,i0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,r0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,s0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,o0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,a0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,u0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const d0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,f0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,x0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,y0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,M0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,S0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,E0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,b0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,T0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,w0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,A0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,D0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,I0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,U0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,F0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,z0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,H0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,V0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,W0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,X0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:fp,alphahash_pars_fragment:pp,alphamap_fragment:mp,alphamap_pars_fragment:_p,alphatest_fragment:gp,alphatest_pars_fragment:vp,aomap_fragment:xp,aomap_pars_fragment:yp,batching_pars_vertex:Mp,batching_vertex:Sp,begin_vertex:Ep,beginnormal_vertex:bp,bsdfs:Tp,iridescence_fragment:wp,bumpmap_pars_fragment:Ap,clipping_planes_fragment:Rp,clipping_planes_pars_fragment:Cp,clipping_planes_pars_vertex:Pp,clipping_planes_vertex:Dp,color_fragment:Lp,color_pars_fragment:Ip,color_pars_vertex:Up,color_vertex:Np,common:Op,cube_uv_reflection_fragment:Fp,defaultnormal_vertex:Bp,displacementmap_pars_vertex:zp,displacementmap_vertex:kp,emissivemap_fragment:Hp,emissivemap_pars_fragment:Vp,colorspace_fragment:Gp,colorspace_pars_fragment:Wp,envmap_fragment:Xp,envmap_common_pars_fragment:Yp,envmap_pars_fragment:qp,envmap_pars_vertex:jp,envmap_physical_pars_fragment:sm,envmap_vertex:Zp,fog_vertex:$p,fog_pars_vertex:Kp,fog_fragment:Jp,fog_pars_fragment:Qp,gradientmap_pars_fragment:tm,lightmap_pars_fragment:em,lights_lambert_fragment:nm,lights_lambert_pars_fragment:im,lights_pars_begin:rm,lights_toon_fragment:om,lights_toon_pars_fragment:am,lights_phong_fragment:lm,lights_phong_pars_fragment:cm,lights_physical_fragment:hm,lights_physical_pars_fragment:um,lights_fragment_begin:dm,lights_fragment_maps:fm,lights_fragment_end:pm,logdepthbuf_fragment:mm,logdepthbuf_pars_fragment:_m,logdepthbuf_pars_vertex:gm,logdepthbuf_vertex:vm,map_fragment:xm,map_pars_fragment:ym,map_particle_fragment:Mm,map_particle_pars_fragment:Sm,metalnessmap_fragment:Em,metalnessmap_pars_fragment:bm,morphinstance_vertex:Tm,morphcolor_vertex:wm,morphnormal_vertex:Am,morphtarget_pars_vertex:Rm,morphtarget_vertex:Cm,normal_fragment_begin:Pm,normal_fragment_maps:Dm,normal_pars_fragment:Lm,normal_pars_vertex:Im,normal_vertex:Um,normalmap_pars_fragment:Nm,clearcoat_normal_fragment_begin:Om,clearcoat_normal_fragment_maps:Fm,clearcoat_pars_fragment:Bm,iridescence_pars_fragment:zm,opaque_fragment:km,packing:Hm,premultiplied_alpha_fragment:Vm,project_vertex:Gm,dithering_fragment:Wm,dithering_pars_fragment:Xm,roughnessmap_fragment:Ym,roughnessmap_pars_fragment:qm,shadowmap_pars_fragment:jm,shadowmap_pars_vertex:Zm,shadowmap_vertex:$m,shadowmask_pars_fragment:Km,skinbase_vertex:Jm,skinning_pars_vertex:Qm,skinning_vertex:t0,skinnormal_vertex:e0,specularmap_fragment:n0,specularmap_pars_fragment:i0,tonemapping_fragment:r0,tonemapping_pars_fragment:s0,transmission_fragment:o0,transmission_pars_fragment:a0,uv_pars_fragment:l0,uv_pars_vertex:c0,uv_vertex:h0,worldpos_vertex:u0,background_vert:d0,background_frag:f0,backgroundCube_vert:p0,backgroundCube_frag:m0,cube_vert:_0,cube_frag:g0,depth_vert:v0,depth_frag:x0,distanceRGBA_vert:y0,distanceRGBA_frag:M0,equirect_vert:S0,equirect_frag:E0,linedashed_vert:b0,linedashed_frag:T0,meshbasic_vert:w0,meshbasic_frag:A0,meshlambert_vert:R0,meshlambert_frag:C0,meshmatcap_vert:P0,meshmatcap_frag:D0,meshnormal_vert:L0,meshnormal_frag:I0,meshphong_vert:U0,meshphong_frag:N0,meshphysical_vert:O0,meshphysical_frag:F0,meshtoon_vert:B0,meshtoon_frag:z0,points_vert:k0,points_frag:H0,shadow_vert:V0,shadow_frag:G0,sprite_vert:W0,sprite_frag:X0},st={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new Tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new Tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},Nn={basic:{uniforms:ke([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:ke([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Vt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:ke([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:ke([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:ke([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Vt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:ke([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:ke([st.points,st.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:ke([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:ke([st.common,st.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:ke([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:ke([st.sprite,st.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:ke([st.common,st.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:ke([st.lights,st.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};Nn.physical={uniforms:ke([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new Tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new Tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new Tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const ao={r:0,b:0,g:0},Bi=new kn,Y0=new ce;function q0(i,t,e,n,r,s,o){const a=new Vt(0);let l=s===!0?0:1,c,h,u=null,p=0,m=null;function g(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?e:t).get(M)),M}function _(v){let M=!1;const x=g(v);x===null?d(a,l):x&&x.isColor&&(d(x,1),M=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(v,M){const x=g(M);x&&(x.isCubeTexture||x.mapping===zo)?(h===void 0&&(h=new $(new gt(1,1,1),new Ai({name:"BackgroundCubeMaterial",uniforms:Wr(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Bi.copy(M.backgroundRotation),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Y0.makeRotationFromEuler(Bi)),h.material.toneMapped=Zt.getTransfer(x.colorSpace)!==ee,(u!==x||p!==x.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,p=x.version,m=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new $(new es(2,2),new Ai({name:"BackgroundMaterial",uniforms:Wr(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Zt.getTransfer(x.colorSpace)!==ee,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||p!==x.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,p=x.version,m=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function d(v,M){v.getRGB(ao,Lu(i)),n.buffers.color.setClear(ao.r,ao.g,ao.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),l=M,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,d(a,l)},render:_,addToRenderList:f}}function j0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let s=r,o=!1;function a(S,P,F,I,V){let W=!1;const z=u(I,F,P);s!==z&&(s=z,c(s.object)),W=m(S,I,F,V),W&&g(S,I,F,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,x(S,P,F,I),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,P,F){const I=F.wireframe===!0;let V=n[S.id];V===void 0&&(V={},n[S.id]=V);let W=V[P.id];W===void 0&&(W={},V[P.id]=W);let z=W[I];return z===void 0&&(z=p(l()),W[I]=z),z}function p(S){const P=[],F=[],I=[];for(let V=0;V<e;V++)P[V]=0,F[V]=0,I[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:I,object:S,attributes:{},index:null}}function m(S,P,F,I){const V=s.attributes,W=P.attributes;let z=0;const q=F.getAttributes();for(const k in q)if(q[k].location>=0){const rt=V[k];let vt=W[k];if(vt===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(vt=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(vt=S.instanceColor)),rt===void 0||rt.attribute!==vt||vt&&rt.data!==vt.data)return!0;z++}return s.attributesNum!==z||s.index!==I}function g(S,P,F,I){const V={},W=P.attributes;let z=0;const q=F.getAttributes();for(const k in q)if(q[k].location>=0){let rt=W[k];rt===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor));const vt={};vt.attribute=rt,rt&&rt.data&&(vt.data=rt.data),V[k]=vt,z++}s.attributes=V,s.attributesNum=z,s.index=I}function _(){const S=s.newAttributes;for(let P=0,F=S.length;P<F;P++)S[P]=0}function f(S){d(S,0)}function d(S,P){const F=s.newAttributes,I=s.enabledAttributes,V=s.attributeDivisors;F[S]=1,I[S]===0&&(i.enableVertexAttribArray(S),I[S]=1),V[S]!==P&&(i.vertexAttribDivisor(S,P),V[S]=P)}function v(){const S=s.newAttributes,P=s.enabledAttributes;for(let F=0,I=P.length;F<I;F++)P[F]!==S[F]&&(i.disableVertexAttribArray(F),P[F]=0)}function M(S,P,F,I,V,W,z){z===!0?i.vertexAttribIPointer(S,P,F,V,W):i.vertexAttribPointer(S,P,F,I,V,W)}function x(S,P,F,I){_();const V=I.attributes,W=F.getAttributes(),z=P.defaultAttributeValues;for(const q in W){const k=W[q];if(k.location>=0){let it=V[q];if(it===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(it=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(it=S.instanceColor)),it!==void 0){const rt=it.normalized,vt=it.itemSize,Pt=t.get(it);if(Pt===void 0)continue;const Kt=Pt.buffer,Y=Pt.type,tt=Pt.bytesPerElement,St=Y===i.INT||Y===i.UNSIGNED_INT||it.gpuType===Xl;if(it.isInterleavedBufferAttribute){const at=it.data,Ct=at.stride,It=it.offset;if(at.isInstancedInterleavedBuffer){for(let Ht=0;Ht<k.locationSize;Ht++)d(k.location+Ht,at.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Ht=0;Ht<k.locationSize;Ht++)f(k.location+Ht);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let Ht=0;Ht<k.locationSize;Ht++)M(k.location+Ht,vt/k.locationSize,Y,rt,Ct*tt,(It+vt/k.locationSize*Ht)*tt,St)}else{if(it.isInstancedBufferAttribute){for(let at=0;at<k.locationSize;at++)d(k.location+at,it.meshPerAttribute);S.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let at=0;at<k.locationSize;at++)f(k.location+at);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let at=0;at<k.locationSize;at++)M(k.location+at,vt/k.locationSize,Y,rt,vt*tt,vt/k.locationSize*at*tt,St)}}else if(z!==void 0){const rt=z[q];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(k.location,rt);break;case 3:i.vertexAttrib3fv(k.location,rt);break;case 4:i.vertexAttrib4fv(k.location,rt);break;default:i.vertexAttrib1fv(k.location,rt)}}}}v()}function A(){R();for(const S in n){const P=n[S];for(const F in P){const I=P[F];for(const V in I)h(I[V].object),delete I[V];delete P[F]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const F in P){const I=P[F];for(const V in I)h(I[V].object),delete I[V];delete P[F]}delete n[S.id]}function w(S){for(const P in n){const F=n[P];if(F[S.id]===void 0)continue;const I=F[S.id];for(const V in I)h(I[V].object),delete I[V];delete F[S.id]}}function R(){y(),o=!0,s!==r&&(s=r,c(s.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:y,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:f,disableUnusedAttributes:v}}function Z0(i,t,e){let n;function r(c){n=c}function s(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];e.update(m,n,1)}function l(c,h,u,p){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)o(c[g],h[g],p[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,p,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*p[_];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function $0(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(w){return!(w!==Dn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const R=w===Ns&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==ei&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Jn&&!R)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:A,maxSamples:T}}function K0(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new fi,a=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const m=u.length!==0||p||n!==0||r;return r=p,n=u.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,p){e=h(u,p,0)},this.setState=function(u,p,m){const g=u.clippingPlanes,_=u.clipIntersection,f=u.clipShadows,d=i.get(u);if(!r||g===null||g.length===0||s&&!f)s?h(null):c();else{const v=s?0:n,M=v*4;let x=d.clippingState||null;l.value=x,x=h(g,p,M,m);for(let A=0;A!==M;++A)x[A]=e[A];d.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,p,m,g){const _=u!==null?u.length:0;let f=null;if(_!==0){if(f=l.value,g!==!0||f===null){const d=m+_*4,v=p.matrixWorldInverse;a.getNormalMatrix(v),(f===null||f.length<d)&&(f=new Float32Array(d));for(let M=0,x=m;M!==_;++M,x+=4)o.copy(u[M]).applyMatrix4(v,a),o.normal.toArray(f,x),f[x+3]=o.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,f}}function J0(i){let t=new WeakMap;function e(o,a){return a===Ya?o.mapping=kr:a===qa&&(o.mapping=Hr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ya||a===qa)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new cp(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Ou extends Iu{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Rr=4,ah=[.125,.215,.35,.446,.526,.582],Xi=20,ga=new Ou,lh=new Vt;let va=null,xa=0,ya=0,Ma=!1;const Vi=(1+Math.sqrt(5))/2,Mr=1/Vi,ch=[new L(-Vi,Mr,0),new L(Vi,Mr,0),new L(-Mr,0,Vi),new L(Mr,0,Vi),new L(0,Vi,-Mr),new L(0,Vi,Mr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class hh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(va,xa,ya),this._renderer.xr.enabled=Ma,t.scissorTest=!1,lo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===kr||t.mapping===Hr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:Ns,format:Dn,colorSpace:ts,depthBuffer:!1},r=uh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uh(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Q0(s)),this._blurMaterial=t_(s,t,e)}return r}_compileMaterial(t){const e=new $(this._lodPlanes[0],t);this._renderer.compile(e,ga)}_sceneToCubeUV(t,e,n,r){const a=new rn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(lh),h.toneMapping=Si,h.autoClear=!1;const m=new We({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),g=new $(new gt,m);let _=!1;const f=t.background;f?f.isColor&&(m.color.copy(f),t.background=null,_=!0):(m.color.copy(lh),_=!0);for(let d=0;d<6;d++){const v=d%3;v===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):v===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const M=this._cubeSize;lo(r,v*M,d>2?M:0,M,M),h.setRenderTarget(r),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=p,h.autoClear=u,t.background=f}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===kr||t.mapping===Hr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dh());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new $(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;lo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ga)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ch[(r-s-1)%ch.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new $(this._lodPlanes[r],c),p=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Xi-1),_=s/g,f=isFinite(s)?1+Math.floor(h*_):Xi;f>Xi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Xi}`);const d=[];let v=0;for(let w=0;w<Xi;++w){const R=w/_,y=Math.exp(-R*R/2);d.push(y),w===0?v+=y:w<f&&(v+=2*y)}for(let w=0;w<d.length;w++)d[w]=d[w]/v;p.envMap.value=t.texture,p.samples.value=f,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:M}=this;p.dTheta.value=g,p.mipInt.value=M-n;const x=this._sizeLods[r],A=3*x*(r>M-Rr?r-M+Rr:0),T=4*(this._cubeSize-x);lo(e,A,T,3*x,2*x),l.setRenderTarget(e),l.render(u,ga)}}function Q0(i){const t=[],e=[],n=[];let r=i;const s=i-Rr+1+ah.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-Rr?l=ah[o-i+Rr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,p=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,_=3,f=2,d=1,v=new Float32Array(_*g*m),M=new Float32Array(f*g*m),x=new Float32Array(d*g*m);for(let T=0;T<m;T++){const w=T%3*2/3-1,R=T>2?0:-1,y=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];v.set(y,_*g*T),M.set(p,f*g*T);const S=[T,T,T,T,T,T];x.set(S,d*g*T)}const A=new dn;A.setAttribute("position",new Sn(v,_)),A.setAttribute("uv",new Sn(M,f)),A.setAttribute("faceIndex",new Sn(x,d)),t.push(A),r>Rr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function uh(i,t,e){const n=new tr(i,t,e);return n.texture.mapping=zo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function lo(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function t_(i,t,e){const n=new Float32Array(Xi),r=new L(0,1,0);return new Ai({name:"SphericalGaussianBlur",defines:{n:Xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function dh(){return new Ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function fh(){return new Ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ql(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Ql(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function e_(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ya||l===qa,h=l===kr||l===Hr;if(c||h){let u=t.get(a);const p=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new hh(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return c&&m&&m.height>0||h&&m&&r(m)?(e===null&&(e=new hh(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function n_(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&ms("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function i_(i,t,e,n){const r={},s=new WeakMap;function o(u){const p=u.target;p.index!==null&&t.remove(p.index);for(const g in p.attributes)t.remove(p.attributes[g]);for(const g in p.morphAttributes){const _=p.morphAttributes[g];for(let f=0,d=_.length;f<d;f++)t.remove(_[f])}p.removeEventListener("dispose",o),delete r[p.id];const m=s.get(p);m&&(t.remove(m),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(u,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,e.memory.geometries++),p}function l(u){const p=u.attributes;for(const g in p)t.update(p[g],i.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let f=0,d=_.length;f<d;f++)t.update(_[f],i.ARRAY_BUFFER)}}function c(u){const p=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const v=m.array;_=m.version;for(let M=0,x=v.length;M<x;M+=3){const A=v[M+0],T=v[M+1],w=v[M+2];p.push(A,T,T,w,w,A)}}else if(g!==void 0){const v=g.array;_=g.version;for(let M=0,x=v.length/3-1;M<x;M+=3){const A=M+0,T=M+1,w=M+2;p.push(A,T,T,w,w,A)}}else return;const f=new(wu(p)?Du:Pu)(p,1);f.version=_;const d=s.get(u);d&&t.remove(d),s.set(u,f)}function h(u){const p=s.get(u);if(p){const m=u.index;m!==null&&p.version<m.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function r_(i,t,e){let n;function r(p){n=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function l(p,m){i.drawElements(n,m,s,p*o),e.update(m,n,1)}function c(p,m,g){g!==0&&(i.drawElementsInstanced(n,m,s,p*o,g),e.update(m,n,g))}function h(p,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,s,p,0,g);let f=0;for(let d=0;d<g;d++)f+=m[d];e.update(f,n,1)}function u(p,m,g,_){if(g===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<p.length;d++)c(p[d]/o,m[d],_[d]);else{f.multiDrawElementsInstancedWEBGL(n,m,0,s,p,0,_,0,g);let d=0;for(let v=0;v<g;v++)d+=m[v]*_[v];e.update(d,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function s_(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function o_(i,t,e){const n=new WeakMap,r=new re;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==u){let S=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var m=S;p!==void 0&&p.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,f=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),f===!0&&(x=3);let A=a.attributes.position.count*x,T=1;A>t.maxTextureSize&&(T=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const w=new Float32Array(A*T*4*u),R=new Ru(w,A,T,u);R.type=Jn,R.needsUpdate=!0;const y=x*4;for(let P=0;P<u;P++){const F=d[P],I=v[P],V=M[P],W=A*T*4*P;for(let z=0;z<F.count;z++){const q=z*y;g===!0&&(r.fromBufferAttribute(F,z),w[W+q+0]=r.x,w[W+q+1]=r.y,w[W+q+2]=r.z,w[W+q+3]=0),_===!0&&(r.fromBufferAttribute(I,z),w[W+q+4]=r.x,w[W+q+5]=r.y,w[W+q+6]=r.z,w[W+q+7]=0),f===!0&&(r.fromBufferAttribute(V,z),w[W+q+8]=r.x,w[W+q+9]=r.y,w[W+q+10]=r.z,w[W+q+11]=V.itemSize===4?r.w:1)}}p={count:u,texture:R,size:new Tt(A,T)},n.set(a,p),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let f=0;f<c.length;f++)g+=c[f];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function a_(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Fu extends Ge{constructor(t,e,n,r,s,o,a,l,c,h=Ur){if(h!==Ur&&h!==Gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ur&&(n=Qi),n===void 0&&h===Gr&&(n=Vr),super(null,r,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ln,this.minFilter=l!==void 0?l:Ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Bu=new Ge,ph=new Fu(1,1),zu=new Ru,ku=new qf,Hu=new Uu,mh=[],_h=[],gh=new Float32Array(16),vh=new Float32Array(9),xh=new Float32Array(4);function ns(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=mh[r];if(s===void 0&&(s=new Float32Array(r),mh[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function we(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ae(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Go(i,t){let e=_h[t];e===void 0&&(e=new Int32Array(t),_h[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function l_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function c_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2fv(this.addr,t),Ae(e,t)}}function h_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;i.uniform3fv(this.addr,t),Ae(e,t)}}function u_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4fv(this.addr,t),Ae(e,t)}}function d_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(we(e,n))return;xh.set(n),i.uniformMatrix2fv(this.addr,!1,xh),Ae(e,n)}}function f_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(we(e,n))return;vh.set(n),i.uniformMatrix3fv(this.addr,!1,vh),Ae(e,n)}}function p_(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(we(e,n))return;gh.set(n),i.uniformMatrix4fv(this.addr,!1,gh),Ae(e,n)}}function m_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function __(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2iv(this.addr,t),Ae(e,t)}}function g_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3iv(this.addr,t),Ae(e,t)}}function v_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4iv(this.addr,t),Ae(e,t)}}function x_(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function y_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2uiv(this.addr,t),Ae(e,t)}}function M_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3uiv(this.addr,t),Ae(e,t)}}function S_(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4uiv(this.addr,t),Ae(e,t)}}function E_(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(ph.compareFunction=Tu,s=ph):s=Bu,e.setTexture2D(t||s,r)}function b_(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||ku,r)}function T_(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Hu,r)}function w_(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||zu,r)}function A_(i){switch(i){case 5126:return l_;case 35664:return c_;case 35665:return h_;case 35666:return u_;case 35674:return d_;case 35675:return f_;case 35676:return p_;case 5124:case 35670:return m_;case 35667:case 35671:return __;case 35668:case 35672:return g_;case 35669:case 35673:return v_;case 5125:return x_;case 36294:return y_;case 36295:return M_;case 36296:return S_;case 35678:case 36198:case 36298:case 36306:case 35682:return E_;case 35679:case 36299:case 36307:return b_;case 35680:case 36300:case 36308:case 36293:return T_;case 36289:case 36303:case 36311:case 36292:return w_}}function R_(i,t){i.uniform1fv(this.addr,t)}function C_(i,t){const e=ns(t,this.size,2);i.uniform2fv(this.addr,e)}function P_(i,t){const e=ns(t,this.size,3);i.uniform3fv(this.addr,e)}function D_(i,t){const e=ns(t,this.size,4);i.uniform4fv(this.addr,e)}function L_(i,t){const e=ns(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function I_(i,t){const e=ns(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function U_(i,t){const e=ns(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function N_(i,t){i.uniform1iv(this.addr,t)}function O_(i,t){i.uniform2iv(this.addr,t)}function F_(i,t){i.uniform3iv(this.addr,t)}function B_(i,t){i.uniform4iv(this.addr,t)}function z_(i,t){i.uniform1uiv(this.addr,t)}function k_(i,t){i.uniform2uiv(this.addr,t)}function H_(i,t){i.uniform3uiv(this.addr,t)}function V_(i,t){i.uniform4uiv(this.addr,t)}function G_(i,t,e){const n=this.cache,r=t.length,s=Go(e,r);we(n,s)||(i.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Bu,s[o])}function W_(i,t,e){const n=this.cache,r=t.length,s=Go(e,r);we(n,s)||(i.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||ku,s[o])}function X_(i,t,e){const n=this.cache,r=t.length,s=Go(e,r);we(n,s)||(i.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Hu,s[o])}function Y_(i,t,e){const n=this.cache,r=t.length,s=Go(e,r);we(n,s)||(i.uniform1iv(this.addr,s),Ae(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||zu,s[o])}function q_(i){switch(i){case 5126:return R_;case 35664:return C_;case 35665:return P_;case 35666:return D_;case 35674:return L_;case 35675:return I_;case 35676:return U_;case 5124:case 35670:return N_;case 35667:case 35671:return O_;case 35668:case 35672:return F_;case 35669:case 35673:return B_;case 5125:return z_;case 36294:return k_;case 36295:return H_;case 36296:return V_;case 35678:case 36198:case 36298:case 36306:case 35682:return G_;case 35679:case 36299:case 36307:return W_;case 35680:case 36300:case 36308:case 36293:return X_;case 36289:case 36303:case 36311:case 36292:return Y_}}class j_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=A_(e.type)}}class Z_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=q_(e.type)}}class $_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const Sa=/(\w+)(\])?(\[|\.)?/g;function yh(i,t){i.seq.push(t),i.map[t.id]=t}function K_(i,t,e){const n=i.name,r=n.length;for(Sa.lastIndex=0;;){const s=Sa.exec(n),o=Sa.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){yh(e,c===void 0?new j_(a,i,t):new Z_(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new $_(a),yh(e,u)),e=u}}}class bo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);K_(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function Mh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const J_=37297;let Q_=0;function tg(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Sh=new Ft;function eg(i){Zt._getMatrix(Sh,Zt.workingColorSpace,i);const t=`mat3( ${Sh.elements.map(e=>e.toFixed(4))} )`;switch(Zt.getTransfer(i)){case ko:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Eh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+tg(i.getShaderSource(t),o)}else return r}function ng(i,t){const e=eg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function ig(i,t){let e;switch(t){case yf:e="Linear";break;case Mf:e="Reinhard";break;case Sf:e="Cineon";break;case du:e="ACESFilmic";break;case bf:e="AgX";break;case Tf:e="Neutral";break;case Ef:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const co=new L;function rg(){Zt.getLuminanceCoefficients(co);const i=co.x.toFixed(4),t=co.y.toFixed(4),e=co.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_s).join(`
`)}function og(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ag(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function _s(i){return i!==""}function bh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Th(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const lg=/^[ \t]*#include +<([\w\d./]+)>/gm;function bl(i){return i.replace(lg,hg)}const cg=new Map;function hg(i,t){let e=kt[t];if(e===void 0){const n=cg.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return bl(e)}const ug=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wh(i){return i.replace(ug,dg)}function dg(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ah(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function fg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===hu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===uu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Zn&&(t="SHADOWMAP_TYPE_VSM"),t}function pg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case kr:case Hr:t="ENVMAP_TYPE_CUBE";break;case zo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function mg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Hr:t="ENVMAP_MODE_REFRACTION";break}return t}function _g(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Wl:t="ENVMAP_BLENDING_MULTIPLY";break;case vf:t="ENVMAP_BLENDING_MIX";break;case xf:t="ENVMAP_BLENDING_ADD";break}return t}function gg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function vg(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=fg(e),c=pg(e),h=mg(e),u=_g(e),p=gg(e),m=sg(e),g=og(s),_=r.createProgram();let f,d,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_s).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_s).join(`
`),d.length>0&&(d+=`
`)):(f=[Ah(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_s).join(`
`),d=[Ah(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Si?"#define TONE_MAPPING":"",e.toneMapping!==Si?kt.tonemapping_pars_fragment:"",e.toneMapping!==Si?ig("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,ng("linearToOutputTexel",e.outputColorSpace),rg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_s).join(`
`)),o=bl(o),o=bh(o,e),o=Th(o,e),a=bl(a),a=bh(a,e),a=Th(a,e),o=wh(o),a=wh(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",e.glslVersion===kc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=v+f+o,x=v+d+a,A=Mh(r,r.VERTEX_SHADER,M),T=Mh(r,r.FRAGMENT_SHADER,x);r.attachShader(_,A),r.attachShader(_,T),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function w(P){if(i.debug.checkShaderErrors){const F=r.getProgramInfoLog(_).trim(),I=r.getShaderInfoLog(A).trim(),V=r.getShaderInfoLog(T).trim();let W=!0,z=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,A,T);else{const q=Eh(r,A,"vertex"),k=Eh(r,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+F+`
`+q+`
`+k)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(I===""||V==="")&&(z=!1);z&&(P.diagnostics={runnable:W,programLog:F,vertexShader:{log:I,prefix:f},fragmentShader:{log:V,prefix:d}})}r.deleteShader(A),r.deleteShader(T),R=new bo(r,_),y=ag(r,_)}let R;this.getUniforms=function(){return R===void 0&&w(this),R};let y;this.getAttributes=function(){return y===void 0&&w(this),y};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(_,J_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Q_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}let xg=0;class yg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Mg(t),e.set(t,n)),n}}class Mg{constructor(t){this.id=xg++,this.code=t,this.usedTimes=0}}function Sg(i,t,e,n,r,s,o){const a=new Kl,l=new yg,c=new Set,h=[],u=r.logarithmicDepthBuffer,p=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function f(y,S,P,F,I){const V=F.fog,W=I.geometry,z=y.isMeshStandardMaterial?F.environment:null,q=(y.isMeshStandardMaterial?e:t).get(y.envMap||z),k=q&&q.mapping===zo?q.image.height:null,it=g[y.type];y.precision!==null&&(m=r.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const rt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,vt=rt!==void 0?rt.length:0;let Pt=0;W.morphAttributes.position!==void 0&&(Pt=1),W.morphAttributes.normal!==void 0&&(Pt=2),W.morphAttributes.color!==void 0&&(Pt=3);let Kt,Y,tt,St;if(it){const te=Nn[it];Kt=te.vertexShader,Y=te.fragmentShader}else Kt=y.vertexShader,Y=y.fragmentShader,l.update(y),tt=l.getVertexShaderID(y),St=l.getFragmentShaderID(y);const at=i.getRenderTarget(),Ct=i.state.buffers.depth.getReversed(),It=I.isInstancedMesh===!0,Ht=I.isBatchedMesh===!0,me=!!y.map,qt=!!y.matcap,Me=!!q,O=!!y.aoMap,fn=!!y.lightMap,Wt=!!y.bumpMap,Xt=!!y.normalMap,At=!!y.displacementMap,he=!!y.emissiveMap,wt=!!y.metalnessMap,C=!!y.roughnessMap,E=y.anisotropy>0,B=y.clearcoat>0,K=y.dispersion>0,Q=y.iridescence>0,Z=y.sheen>0,Et=y.transmission>0,lt=E&&!!y.anisotropyMap,ft=B&&!!y.clearcoatMap,jt=B&&!!y.clearcoatNormalMap,et=B&&!!y.clearcoatRoughnessMap,pt=Q&&!!y.iridescenceMap,Rt=Q&&!!y.iridescenceThicknessMap,Dt=Z&&!!y.sheenColorMap,mt=Z&&!!y.sheenRoughnessMap,Yt=!!y.specularMap,zt=!!y.specularColorMap,ae=!!y.specularIntensityMap,D=Et&&!!y.transmissionMap,ot=Et&&!!y.thicknessMap,X=!!y.gradientMap,J=!!y.alphaMap,dt=y.alphaTest>0,ht=!!y.alphaHash,Nt=!!y.extensions;let xe=Si;y.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(xe=i.toneMapping);const Le={shaderID:it,shaderType:y.type,shaderName:y.name,vertexShader:Kt,fragmentShader:Y,defines:y.defines,customVertexShaderID:tt,customFragmentShaderID:St,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:Ht,batchingColor:Ht&&I._colorsTexture!==null,instancing:It,instancingColor:It&&I.instanceColor!==null,instancingMorph:It&&I.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:ts,alphaToCoverage:!!y.alphaToCoverage,map:me,matcap:qt,envMap:Me,envMapMode:Me&&q.mapping,envMapCubeUVHeight:k,aoMap:O,lightMap:fn,bumpMap:Wt,normalMap:Xt,displacementMap:p&&At,emissiveMap:he,normalMapObjectSpace:Xt&&y.normalMapType===Cf,normalMapTangentSpace:Xt&&y.normalMapType===bu,metalnessMap:wt,roughnessMap:C,anisotropy:E,anisotropyMap:lt,clearcoat:B,clearcoatMap:ft,clearcoatNormalMap:jt,clearcoatRoughnessMap:et,dispersion:K,iridescence:Q,iridescenceMap:pt,iridescenceThicknessMap:Rt,sheen:Z,sheenColorMap:Dt,sheenRoughnessMap:mt,specularMap:Yt,specularColorMap:zt,specularIntensityMap:ae,transmission:Et,transmissionMap:D,thicknessMap:ot,gradientMap:X,opaque:y.transparent===!1&&y.blending===Ir&&y.alphaToCoverage===!1,alphaMap:J,alphaTest:dt,alphaHash:ht,combine:y.combine,mapUv:me&&_(y.map.channel),aoMapUv:O&&_(y.aoMap.channel),lightMapUv:fn&&_(y.lightMap.channel),bumpMapUv:Wt&&_(y.bumpMap.channel),normalMapUv:Xt&&_(y.normalMap.channel),displacementMapUv:At&&_(y.displacementMap.channel),emissiveMapUv:he&&_(y.emissiveMap.channel),metalnessMapUv:wt&&_(y.metalnessMap.channel),roughnessMapUv:C&&_(y.roughnessMap.channel),anisotropyMapUv:lt&&_(y.anisotropyMap.channel),clearcoatMapUv:ft&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:jt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:mt&&_(y.sheenRoughnessMap.channel),specularMapUv:Yt&&_(y.specularMap.channel),specularColorMapUv:zt&&_(y.specularColorMap.channel),specularIntensityMapUv:ae&&_(y.specularIntensityMap.channel),transmissionMapUv:D&&_(y.transmissionMap.channel),thicknessMapUv:ot&&_(y.thicknessMap.channel),alphaMapUv:J&&_(y.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Xt||E),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!W.attributes.uv&&(me||J),fog:!!V,useFog:y.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ct,skinning:I.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:Pt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:xe,decodeVideoTexture:me&&y.map.isVideoTexture===!0&&Zt.getTransfer(y.map.colorSpace)===ee,decodeVideoTextureEmissive:he&&y.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(y.emissiveMap.colorSpace)===ee,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Cn,flipSided:y.side===qe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Nt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Nt&&y.extensions.multiDraw===!0||Ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function d(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)S.push(P),S.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(v(S,y),M(S,y),S.push(i.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function v(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function M(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const S=g[y.type];let P;if(S){const F=Nn[S];P=sp.clone(F.uniforms)}else P=y.uniforms;return P}function A(y,S){let P;for(let F=0,I=h.length;F<I;F++){const V=h[F];if(V.cacheKey===S){P=V,++P.usedTimes;break}}return P===void 0&&(P=new vg(i,S,y,s),h.push(P)),P}function T(y){if(--y.usedTimes===0){const S=h.indexOf(y);h[S]=h[h.length-1],h.pop(),y.destroy()}}function w(y){l.remove(y)}function R(){l.dispose()}return{getParameters:f,getProgramCacheKey:d,getUniforms:x,acquireProgram:A,releaseProgram:T,releaseShaderCache:w,programs:h,dispose:R}}function Eg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function bg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Rh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ch(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(u,p,m,g,_,f){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:p,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:f},i[t]=d):(d.id=u.id,d.object=u,d.geometry=p,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=f),t++,d}function a(u,p,m,g,_,f){const d=o(u,p,m,g,_,f);m.transmission>0?n.push(d):m.transparent===!0?r.push(d):e.push(d)}function l(u,p,m,g,_,f){const d=o(u,p,m,g,_,f);m.transmission>0?n.unshift(d):m.transparent===!0?r.unshift(d):e.unshift(d)}function c(u,p){e.length>1&&e.sort(u||bg),n.length>1&&n.sort(p||Rh),r.length>1&&r.sort(p||Rh)}function h(){for(let u=t,p=i.length;u<p;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Tg(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new Ch,i.set(n,[o])):r>=s.length?(o=new Ch,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function wg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Vt};break;case"SpotLight":e={position:new L,direction:new L,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Ag(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Rg=0;function Cg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Pg(i){const t=new wg,e=Ag(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const r=new L,s=new ce,o=new ce;function a(c){let h=0,u=0,p=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let m=0,g=0,_=0,f=0,d=0,v=0,M=0,x=0,A=0,T=0,w=0;c.sort(Cg);for(let y=0,S=c.length;y<S;y++){const P=c[y],F=P.color,I=P.intensity,V=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=F.r*I,u+=F.g*I,p+=F.b*I;else if(P.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(P.sh.coefficients[z],I);w++}else if(P.isDirectionalLight){const z=t.get(P);if(z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const q=P.shadow,k=e.get(P);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=W,n.directionalShadowMatrix[m]=P.shadow.matrix,v++}n.directional[m]=z,m++}else if(P.isSpotLight){const z=t.get(P);z.position.setFromMatrixPosition(P.matrixWorld),z.color.copy(F).multiplyScalar(I),z.distance=V,z.coneCos=Math.cos(P.angle),z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),z.decay=P.decay,n.spot[_]=z;const q=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,q.updateMatrices(P),P.castShadow&&T++),n.spotLightMatrix[_]=q.matrix,P.castShadow){const k=e.get(P);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=W,x++}_++}else if(P.isRectAreaLight){const z=t.get(P);z.color.copy(F).multiplyScalar(I),z.halfWidth.set(P.width*.5,0,0),z.halfHeight.set(0,P.height*.5,0),n.rectArea[f]=z,f++}else if(P.isPointLight){const z=t.get(P);if(z.color.copy(P.color).multiplyScalar(P.intensity),z.distance=P.distance,z.decay=P.decay,P.castShadow){const q=P.shadow,k=e.get(P);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,k.shadowCameraNear=q.camera.near,k.shadowCameraFar=q.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=z,g++}else if(P.isHemisphereLight){const z=t.get(P);z.skyColor.copy(P.color).multiplyScalar(I),z.groundColor.copy(P.groundColor).multiplyScalar(I),n.hemi[d]=z,d++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=p;const R=n.hash;(R.directionalLength!==m||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==f||R.hemiLength!==d||R.numDirectionalShadows!==v||R.numPointShadows!==M||R.numSpotShadows!==x||R.numSpotMaps!==A||R.numLightProbes!==w)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=f,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=w,R.directionalLength=m,R.pointLength=g,R.spotLength=_,R.rectAreaLength=f,R.hemiLength=d,R.numDirectionalShadows=v,R.numPointShadows=M,R.numSpotShadows=x,R.numSpotMaps=A,R.numLightProbes=w,n.version=Rg++)}function l(c,h){let u=0,p=0,m=0,g=0,_=0;const f=h.matrixWorldInverse;for(let d=0,v=c.length;d<v;d++){const M=c[d];if(M.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(f),u++}else if(M.isSpotLight){const x=n.spot[m];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(f),x.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(f),m++}else if(M.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(f),o.identity(),s.copy(M.matrixWorld),s.premultiply(f),o.extractRotation(s),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const x=n.point[p];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(f),p++}else if(M.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(f),_++}}}return{setup:a,setupView:l,state:n}}function Ph(i){const t=new Pg(i),e=[],n=[];function r(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Dg(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Ph(i),t.set(r,[a])):s>=o.length?(a=new Ph(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Lg extends ir{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Af,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ig extends ir{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ug=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ng=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Og(i,t,e){let n=new Jl;const r=new Tt,s=new Tt,o=new re,a=new Lg({depthPacking:Rf}),l=new Ig,c={},h=e.maxTextureSize,u={[wi]:qe,[qe]:wi,[Cn]:Cn},p=new Ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Tt},radius:{value:4}},vertexShader:Ug,fragmentShader:Ng}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const g=new dn;g.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $(g,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hu;let d=this.type;this.render=function(T,w,R){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||T.length===0)return;const y=i.getRenderTarget(),S=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Mi),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const I=d!==Zn&&this.type===Zn,V=d===Zn&&this.type!==Zn;for(let W=0,z=T.length;W<z;W++){const q=T[W],k=q.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const it=k.getFrameExtents();if(r.multiply(it),s.copy(k.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/it.x),r.x=s.x*it.x,k.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/it.y),r.y=s.y*it.y,k.mapSize.y=s.y)),k.map===null||I===!0||V===!0){const vt=this.type!==Zn?{minFilter:Ln,magFilter:Ln}:{};k.map!==null&&k.map.dispose(),k.map=new tr(r.x,r.y,vt),k.map.texture.name=q.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const rt=k.getViewportCount();for(let vt=0;vt<rt;vt++){const Pt=k.getViewport(vt);o.set(s.x*Pt.x,s.y*Pt.y,s.x*Pt.z,s.y*Pt.w),F.viewport(o),k.updateMatrices(q,vt),n=k.getFrustum(),x(w,R,k.camera,q,this.type)}k.isPointLightShadow!==!0&&this.type===Zn&&v(k,R),k.needsUpdate=!1}d=this.type,f.needsUpdate=!1,i.setRenderTarget(y,S,P)};function v(T,w){const R=t.update(_);p.defines.VSM_SAMPLES!==T.blurSamples&&(p.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new tr(r.x,r.y)),p.uniforms.shadow_pass.value=T.map.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(w,null,R,p,_,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(w,null,R,m,_,null)}function M(T,w,R,y){let S=null;const P=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)S=P;else if(S=R.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const F=S.uuid,I=w.uuid;let V=c[F];V===void 0&&(V={},c[F]=V);let W=V[I];W===void 0&&(W=S.clone(),V[I]=W,w.addEventListener("dispose",A)),S=W}if(S.visible=w.visible,S.wireframe=w.wireframe,y===Zn?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:u[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=i.properties.get(S);F.light=R}return S}function x(T,w,R,y,S){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===Zn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const I=t.update(T),V=T.material;if(Array.isArray(V)){const W=I.groups;for(let z=0,q=W.length;z<q;z++){const k=W[z],it=V[k.materialIndex];if(it&&it.visible){const rt=M(T,it,y,S);T.onBeforeShadow(i,T,w,R,I,rt,k),i.renderBufferDirect(R,null,I,rt,T,k),T.onAfterShadow(i,T,w,R,I,rt,k)}}}else if(V.visible){const W=M(T,V,y,S);T.onBeforeShadow(i,T,w,R,I,W,null),i.renderBufferDirect(R,null,I,W,T,null),T.onAfterShadow(i,T,w,R,I,W,null)}}const F=T.children;for(let I=0,V=F.length;I<V;I++)x(F[I],w,R,y,S)}function A(T){T.target.removeEventListener("dispose",A);for(const R in c){const y=c[R],S=T.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const Fg={[za]:ka,[Ha]:Wa,[Va]:Xa,[zr]:Ga,[ka]:za,[Wa]:Ha,[Xa]:Va,[Ga]:zr};function Bg(i,t){function e(){let D=!1;const ot=new re;let X=null;const J=new re(0,0,0,0);return{setMask:function(dt){X!==dt&&!D&&(i.colorMask(dt,dt,dt,dt),X=dt)},setLocked:function(dt){D=dt},setClear:function(dt,ht,Nt,xe,Le){Le===!0&&(dt*=xe,ht*=xe,Nt*=xe),ot.set(dt,ht,Nt,xe),J.equals(ot)===!1&&(i.clearColor(dt,ht,Nt,xe),J.copy(ot))},reset:function(){D=!1,X=null,J.set(-1,0,0,0)}}}function n(){let D=!1,ot=!1,X=null,J=null,dt=null;return{setReversed:function(ht){if(ot!==ht){const Nt=t.get("EXT_clip_control");ot?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT);const xe=dt;dt=null,this.setClear(xe)}ot=ht},getReversed:function(){return ot},setTest:function(ht){ht?at(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(ht){X!==ht&&!D&&(i.depthMask(ht),X=ht)},setFunc:function(ht){if(ot&&(ht=Fg[ht]),J!==ht){switch(ht){case za:i.depthFunc(i.NEVER);break;case ka:i.depthFunc(i.ALWAYS);break;case Ha:i.depthFunc(i.LESS);break;case zr:i.depthFunc(i.LEQUAL);break;case Va:i.depthFunc(i.EQUAL);break;case Ga:i.depthFunc(i.GEQUAL);break;case Wa:i.depthFunc(i.GREATER);break;case Xa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=ht}},setLocked:function(ht){D=ht},setClear:function(ht){dt!==ht&&(ot&&(ht=1-ht),i.clearDepth(ht),dt=ht)},reset:function(){D=!1,X=null,J=null,dt=null,ot=!1}}}function r(){let D=!1,ot=null,X=null,J=null,dt=null,ht=null,Nt=null,xe=null,Le=null;return{setTest:function(te){D||(te?at(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(te){ot!==te&&!D&&(i.stencilMask(te),ot=te)},setFunc:function(te,bn,Vn){(X!==te||J!==bn||dt!==Vn)&&(i.stencilFunc(te,bn,Vn),X=te,J=bn,dt=Vn)},setOp:function(te,bn,Vn){(ht!==te||Nt!==bn||xe!==Vn)&&(i.stencilOp(te,bn,Vn),ht=te,Nt=bn,xe=Vn)},setLocked:function(te){D=te},setClear:function(te){Le!==te&&(i.clearStencil(te),Le=te)},reset:function(){D=!1,ot=null,X=null,J=null,dt=null,ht=null,Nt=null,xe=null,Le=null}}}const s=new e,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let h={},u={},p=new WeakMap,m=[],g=null,_=!1,f=null,d=null,v=null,M=null,x=null,A=null,T=null,w=new Vt(0,0,0),R=0,y=!1,S=null,P=null,F=null,I=null,V=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,q=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(k)[1]),z=q>=1):k.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),z=q>=2);let it=null,rt={};const vt=i.getParameter(i.SCISSOR_BOX),Pt=i.getParameter(i.VIEWPORT),Kt=new re().fromArray(vt),Y=new re().fromArray(Pt);function tt(D,ot,X,J){const dt=new Uint8Array(4),ht=i.createTexture();i.bindTexture(D,ht),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Nt=0;Nt<X;Nt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(ot+Nt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ht}const St={};St[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),St[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),St[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),St[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(i.DEPTH_TEST),o.setFunc(zr),Wt(!1),Xt(Nc),at(i.CULL_FACE),O(Mi);function at(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function Ct(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function It(D,ot){return u[D]!==ot?(i.bindFramebuffer(D,ot),u[D]=ot,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ot),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function Ht(D,ot){let X=m,J=!1;if(D){X=p.get(ot),X===void 0&&(X=[],p.set(ot,X));const dt=D.textures;if(X.length!==dt.length||X[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Nt=dt.length;ht<Nt;ht++)X[ht]=i.COLOR_ATTACHMENT0+ht;X.length=dt.length,J=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,J=!0);J&&i.drawBuffers(X)}function me(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const qt={[Wi]:i.FUNC_ADD,[tf]:i.FUNC_SUBTRACT,[ef]:i.FUNC_REVERSE_SUBTRACT};qt[nf]=i.MIN,qt[rf]=i.MAX;const Me={[sf]:i.ZERO,[of]:i.ONE,[af]:i.SRC_COLOR,[Fa]:i.SRC_ALPHA,[ff]:i.SRC_ALPHA_SATURATE,[uf]:i.DST_COLOR,[cf]:i.DST_ALPHA,[lf]:i.ONE_MINUS_SRC_COLOR,[Ba]:i.ONE_MINUS_SRC_ALPHA,[df]:i.ONE_MINUS_DST_COLOR,[hf]:i.ONE_MINUS_DST_ALPHA,[pf]:i.CONSTANT_COLOR,[mf]:i.ONE_MINUS_CONSTANT_COLOR,[_f]:i.CONSTANT_ALPHA,[gf]:i.ONE_MINUS_CONSTANT_ALPHA};function O(D,ot,X,J,dt,ht,Nt,xe,Le,te){if(D===Mi){_===!0&&(Ct(i.BLEND),_=!1);return}if(_===!1&&(at(i.BLEND),_=!0),D!==Qd){if(D!==f||te!==y){if((d!==Wi||x!==Wi)&&(i.blendEquation(i.FUNC_ADD),d=Wi,x=Wi),te)switch(D){case Ir:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oc:i.blendFunc(i.ONE,i.ONE);break;case Fc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ir:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Fc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,M=null,A=null,T=null,w.set(0,0,0),R=0,f=D,y=te}return}dt=dt||ot,ht=ht||X,Nt=Nt||J,(ot!==d||dt!==x)&&(i.blendEquationSeparate(qt[ot],qt[dt]),d=ot,x=dt),(X!==v||J!==M||ht!==A||Nt!==T)&&(i.blendFuncSeparate(Me[X],Me[J],Me[ht],Me[Nt]),v=X,M=J,A=ht,T=Nt),(xe.equals(w)===!1||Le!==R)&&(i.blendColor(xe.r,xe.g,xe.b,Le),w.copy(xe),R=Le),f=D,y=!1}function fn(D,ot){D.side===Cn?Ct(i.CULL_FACE):at(i.CULL_FACE);let X=D.side===qe;ot&&(X=!X),Wt(X),D.blending===Ir&&D.transparent===!1?O(Mi):O(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const J=D.stencilWrite;a.setTest(J),J&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),he(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(D){S!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),S=D)}function Xt(D){D!==Kd?(at(i.CULL_FACE),D!==P&&(D===Nc?i.cullFace(i.BACK):D===Jd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),P=D}function At(D){D!==F&&(z&&i.lineWidth(D),F=D)}function he(D,ot,X){D?(at(i.POLYGON_OFFSET_FILL),(I!==ot||V!==X)&&(i.polygonOffset(ot,X),I=ot,V=X)):Ct(i.POLYGON_OFFSET_FILL)}function wt(D){D?at(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function C(D){D===void 0&&(D=i.TEXTURE0+W-1),it!==D&&(i.activeTexture(D),it=D)}function E(D,ot,X){X===void 0&&(it===null?X=i.TEXTURE0+W-1:X=it);let J=rt[X];J===void 0&&(J={type:void 0,texture:void 0},rt[X]=J),(J.type!==D||J.texture!==ot)&&(it!==X&&(i.activeTexture(X),it=X),i.bindTexture(D,ot||St[D]),J.type=D,J.texture=ot)}function B(){const D=rt[it];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ft(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function jt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Dt(D){Kt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Kt.copy(D))}function mt(D){Y.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Y.copy(D))}function Yt(D,ot){let X=c.get(ot);X===void 0&&(X=new WeakMap,c.set(ot,X));let J=X.get(D);J===void 0&&(J=i.getUniformBlockIndex(ot,D.name),X.set(D,J))}function zt(D,ot){const J=c.get(ot).get(D);l.get(ot)!==J&&(i.uniformBlockBinding(ot,J,D.__bindingPointIndex),l.set(ot,J))}function ae(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},it=null,rt={},u={},p=new WeakMap,m=[],g=null,_=!1,f=null,d=null,v=null,M=null,x=null,A=null,T=null,w=new Vt(0,0,0),R=0,y=!1,S=null,P=null,F=null,I=null,V=null,Kt.set(0,0,i.canvas.width,i.canvas.height),Y.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:at,disable:Ct,bindFramebuffer:It,drawBuffers:Ht,useProgram:me,setBlending:O,setMaterial:fn,setFlipSided:Wt,setCullFace:Xt,setLineWidth:At,setPolygonOffset:he,setScissorTest:wt,activeTexture:C,bindTexture:E,unbindTexture:B,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:pt,texImage3D:Rt,updateUBOMapping:Yt,uniformBlockBinding:zt,texStorage2D:jt,texStorage3D:et,texSubImage2D:Z,texSubImage3D:Et,compressedTexSubImage2D:lt,compressedTexSubImage3D:ft,scissor:Dt,viewport:mt,reset:ae}}function Dh(i,t,e,n){const r=zg(n);switch(e){case gu:return i*t;case xu:return i*t;case yu:return i*t*2;case Mu:return i*t/r.components*r.byteLength;case jl:return i*t/r.components*r.byteLength;case Su:return i*t*2/r.components*r.byteLength;case Zl:return i*t*2/r.components*r.byteLength;case vu:return i*t*3/r.components*r.byteLength;case Dn:return i*t*4/r.components*r.byteLength;case $l:return i*t*4/r.components*r.byteLength;case vo:case xo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case yo:case Mo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ka:case Qa:return Math.max(i,16)*Math.max(t,8)/4;case $a:case Ja:return Math.max(i,8)*Math.max(t,8)/2;case tl:case el:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case nl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case il:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case sl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ol:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case al:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ll:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case cl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case hl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ul:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case dl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case fl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case pl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ml:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case _l:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case So:case gl:case vl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Eu:case xl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case yl:case Ml:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function zg(i){switch(i){case ei:case pu:return{byteLength:1,components:1};case bs:case mu:case Ns:return{byteLength:2,components:1};case Yl:case ql:return{byteLength:2,components:4};case Qi:case Xl:case Jn:return{byteLength:4,components:1};case _u:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function kg(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Tt,h=new WeakMap;let u;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,E){return m?new OffscreenCanvas(C,E):Co("canvas")}function _(C,E,B){let K=1;const Q=wt(C);if((Q.width>B||Q.height>B)&&(K=B/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Z=Math.floor(K*Q.width),Et=Math.floor(K*Q.height);u===void 0&&(u=g(Z,Et));const lt=E?g(Z,Et):u;return lt.width=Z,lt.height=Et,lt.getContext("2d").drawImage(C,0,0,Z,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Z+"x"+Et+")."),lt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),C;return C}function f(C){return C.generateMipmaps}function d(C){i.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(C,E,B,K,Q=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=E;if(E===i.RED&&(B===i.FLOAT&&(Z=i.R32F),B===i.HALF_FLOAT&&(Z=i.R16F),B===i.UNSIGNED_BYTE&&(Z=i.R8)),E===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.R8UI),B===i.UNSIGNED_SHORT&&(Z=i.R16UI),B===i.UNSIGNED_INT&&(Z=i.R32UI),B===i.BYTE&&(Z=i.R8I),B===i.SHORT&&(Z=i.R16I),B===i.INT&&(Z=i.R32I)),E===i.RG&&(B===i.FLOAT&&(Z=i.RG32F),B===i.HALF_FLOAT&&(Z=i.RG16F),B===i.UNSIGNED_BYTE&&(Z=i.RG8)),E===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RG8UI),B===i.UNSIGNED_SHORT&&(Z=i.RG16UI),B===i.UNSIGNED_INT&&(Z=i.RG32UI),B===i.BYTE&&(Z=i.RG8I),B===i.SHORT&&(Z=i.RG16I),B===i.INT&&(Z=i.RG32I)),E===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),B===i.UNSIGNED_INT&&(Z=i.RGB32UI),B===i.BYTE&&(Z=i.RGB8I),B===i.SHORT&&(Z=i.RGB16I),B===i.INT&&(Z=i.RGB32I)),E===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),B===i.UNSIGNED_INT&&(Z=i.RGBA32UI),B===i.BYTE&&(Z=i.RGBA8I),B===i.SHORT&&(Z=i.RGBA16I),B===i.INT&&(Z=i.RGBA32I)),E===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),E===i.RGBA){const Et=Q?ko:Zt.getTransfer(K);B===i.FLOAT&&(Z=i.RGBA32F),B===i.HALF_FLOAT&&(Z=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Z=Et===ee?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function x(C,E){let B;return C?E===null||E===Qi||E===Vr?B=i.DEPTH24_STENCIL8:E===Jn?B=i.DEPTH32F_STENCIL8:E===bs&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Qi||E===Vr?B=i.DEPTH_COMPONENT24:E===Jn?B=i.DEPTH_COMPONENT32F:E===bs&&(B=i.DEPTH_COMPONENT16),B}function A(C,E){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==Ln&&C.minFilter!==Bn?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function T(C){const E=C.target;E.removeEventListener("dispose",T),R(E),E.isVideoTexture&&h.delete(E)}function w(C){const E=C.target;E.removeEventListener("dispose",w),S(E)}function R(C){const E=n.get(C);if(E.__webglInit===void 0)return;const B=C.source,K=p.get(B);if(K){const Q=K[E.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&y(C),Object.keys(K).length===0&&p.delete(B)}n.remove(C)}function y(C){const E=n.get(C);i.deleteTexture(E.__webglTexture);const B=C.source,K=p.get(B);delete K[E.__cacheKey],o.memory.textures--}function S(C){const E=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(E.__webglFramebuffer[K]))for(let Q=0;Q<E.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(E.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(E.__webglFramebuffer[K]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[K])}else{if(Array.isArray(E.__webglFramebuffer))for(let K=0;K<E.__webglFramebuffer.length;K++)i.deleteFramebuffer(E.__webglFramebuffer[K]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let K=0;K<E.__webglColorRenderbuffer.length;K++)E.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[K]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const B=C.textures;for(let K=0,Q=B.length;K<Q;K++){const Z=n.get(B[K]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(B[K])}n.remove(C)}let P=0;function F(){P=0}function I(){const C=P;return C>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),P+=1,C}function V(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function W(C,E){const B=n.get(C);if(C.isVideoTexture&&At(C),C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){const K=C.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(B,C,E);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+E)}function z(C,E){const B=n.get(C);if(C.version>0&&B.__version!==C.version){Y(B,C,E);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+E)}function q(C,E){const B=n.get(C);if(C.version>0&&B.__version!==C.version){Y(B,C,E);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+E)}function k(C,E){const B=n.get(C);if(C.version>0&&B.__version!==C.version){tt(B,C,E);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+E)}const it={[ja]:i.REPEAT,[Yi]:i.CLAMP_TO_EDGE,[Za]:i.MIRRORED_REPEAT},rt={[Ln]:i.NEAREST,[wf]:i.NEAREST_MIPMAP_NEAREST,[Gs]:i.NEAREST_MIPMAP_LINEAR,[Bn]:i.LINEAR,[Zo]:i.LINEAR_MIPMAP_NEAREST,[qi]:i.LINEAR_MIPMAP_LINEAR},vt={[Pf]:i.NEVER,[Of]:i.ALWAYS,[Df]:i.LESS,[Tu]:i.LEQUAL,[Lf]:i.EQUAL,[Nf]:i.GEQUAL,[If]:i.GREATER,[Uf]:i.NOTEQUAL};function Pt(C,E){if(E.type===Jn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===Bn||E.magFilter===Zo||E.magFilter===Gs||E.magFilter===qi||E.minFilter===Bn||E.minFilter===Zo||E.minFilter===Gs||E.minFilter===qi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,it[E.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,it[E.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,it[E.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,rt[E.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,rt[E.minFilter]),E.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,vt[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ln||E.minFilter!==Gs&&E.minFilter!==qi||E.type===Jn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Kt(C,E){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",T));const K=E.source;let Q=p.get(K);Q===void 0&&(Q={},p.set(K,Q));const Z=V(E);if(Z!==C.__cacheKey){Q[Z]===void 0&&(Q[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[Z].usedTimes++;const Et=Q[C.__cacheKey];Et!==void 0&&(Q[C.__cacheKey].usedTimes--,Et.usedTimes===0&&y(E)),C.__cacheKey=Z,C.__webglTexture=Q[Z].texture}return B}function Y(C,E,B){let K=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(K=i.TEXTURE_3D);const Q=Kt(C,E),Z=E.source;e.bindTexture(K,C.__webglTexture,i.TEXTURE0+B);const Et=n.get(Z);if(Z.version!==Et.__version||Q===!0){e.activeTexture(i.TEXTURE0+B);const lt=Zt.getPrimaries(Zt.workingColorSpace),ft=E.colorSpace===mi?null:Zt.getPrimaries(E.colorSpace),jt=E.colorSpace===mi||lt===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let et=_(E.image,!1,r.maxTextureSize);et=he(E,et);const pt=s.convert(E.format,E.colorSpace),Rt=s.convert(E.type);let Dt=M(E.internalFormat,pt,Rt,E.colorSpace,E.isVideoTexture);Pt(K,E);let mt;const Yt=E.mipmaps,zt=E.isVideoTexture!==!0,ae=Et.__version===void 0||Q===!0,D=Z.dataReady,ot=A(E,et);if(E.isDepthTexture)Dt=x(E.format===Gr,E.type),ae&&(zt?e.texStorage2D(i.TEXTURE_2D,1,Dt,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,Dt,et.width,et.height,0,pt,Rt,null));else if(E.isDataTexture)if(Yt.length>0){zt&&ae&&e.texStorage2D(i.TEXTURE_2D,ot,Dt,Yt[0].width,Yt[0].height);for(let X=0,J=Yt.length;X<J;X++)mt=Yt[X],zt?D&&e.texSubImage2D(i.TEXTURE_2D,X,0,0,mt.width,mt.height,pt,Rt,mt.data):e.texImage2D(i.TEXTURE_2D,X,Dt,mt.width,mt.height,0,pt,Rt,mt.data);E.generateMipmaps=!1}else zt?(ae&&e.texStorage2D(i.TEXTURE_2D,ot,Dt,et.width,et.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,et.width,et.height,pt,Rt,et.data)):e.texImage2D(i.TEXTURE_2D,0,Dt,et.width,et.height,0,pt,Rt,et.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){zt&&ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Dt,Yt[0].width,Yt[0].height,et.depth);for(let X=0,J=Yt.length;X<J;X++)if(mt=Yt[X],E.format!==Dn)if(pt!==null)if(zt){if(D)if(E.layerUpdates.size>0){const dt=Dh(mt.width,mt.height,E.format,E.type);for(const ht of E.layerUpdates){const Nt=mt.data.subarray(ht*dt/mt.data.BYTES_PER_ELEMENT,(ht+1)*dt/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,ht,mt.width,mt.height,1,pt,Nt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,mt.width,mt.height,et.depth,pt,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,Dt,mt.width,mt.height,et.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,mt.width,mt.height,et.depth,pt,Rt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,X,Dt,mt.width,mt.height,et.depth,0,pt,Rt,mt.data)}else{zt&&ae&&e.texStorage2D(i.TEXTURE_2D,ot,Dt,Yt[0].width,Yt[0].height);for(let X=0,J=Yt.length;X<J;X++)mt=Yt[X],E.format!==Dn?pt!==null?zt?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,X,Dt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?D&&e.texSubImage2D(i.TEXTURE_2D,X,0,0,mt.width,mt.height,pt,Rt,mt.data):e.texImage2D(i.TEXTURE_2D,X,Dt,mt.width,mt.height,0,pt,Rt,mt.data)}else if(E.isDataArrayTexture)if(zt){if(ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Dt,et.width,et.height,et.depth),D)if(E.layerUpdates.size>0){const X=Dh(et.width,et.height,E.format,E.type);for(const J of E.layerUpdates){const dt=et.data.subarray(J*X/et.data.BYTES_PER_ELEMENT,(J+1)*X/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,et.width,et.height,1,pt,Rt,dt)}E.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,pt,Rt,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Dt,et.width,et.height,et.depth,0,pt,Rt,et.data);else if(E.isData3DTexture)zt?(ae&&e.texStorage3D(i.TEXTURE_3D,ot,Dt,et.width,et.height,et.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,pt,Rt,et.data)):e.texImage3D(i.TEXTURE_3D,0,Dt,et.width,et.height,et.depth,0,pt,Rt,et.data);else if(E.isFramebufferTexture){if(ae)if(zt)e.texStorage2D(i.TEXTURE_2D,ot,Dt,et.width,et.height);else{let X=et.width,J=et.height;for(let dt=0;dt<ot;dt++)e.texImage2D(i.TEXTURE_2D,dt,Dt,X,J,0,pt,Rt,null),X>>=1,J>>=1}}else if(Yt.length>0){if(zt&&ae){const X=wt(Yt[0]);e.texStorage2D(i.TEXTURE_2D,ot,Dt,X.width,X.height)}for(let X=0,J=Yt.length;X<J;X++)mt=Yt[X],zt?D&&e.texSubImage2D(i.TEXTURE_2D,X,0,0,pt,Rt,mt):e.texImage2D(i.TEXTURE_2D,X,Dt,pt,Rt,mt);E.generateMipmaps=!1}else if(zt){if(ae){const X=wt(et);e.texStorage2D(i.TEXTURE_2D,ot,Dt,X.width,X.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt,Rt,et)}else e.texImage2D(i.TEXTURE_2D,0,Dt,pt,Rt,et);f(E)&&d(K),Et.__version=Z.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function tt(C,E,B){if(E.image.length!==6)return;const K=Kt(C,E),Q=E.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+B);const Z=n.get(Q);if(Q.version!==Z.__version||K===!0){e.activeTexture(i.TEXTURE0+B);const Et=Zt.getPrimaries(Zt.workingColorSpace),lt=E.colorSpace===mi?null:Zt.getPrimaries(E.colorSpace),ft=E.colorSpace===mi||Et===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ft);const jt=E.isCompressedTexture||E.image[0].isCompressedTexture,et=E.image[0]&&E.image[0].isDataTexture,pt=[];for(let J=0;J<6;J++)!jt&&!et?pt[J]=_(E.image[J],!0,r.maxCubemapSize):pt[J]=et?E.image[J].image:E.image[J],pt[J]=he(E,pt[J]);const Rt=pt[0],Dt=s.convert(E.format,E.colorSpace),mt=s.convert(E.type),Yt=M(E.internalFormat,Dt,mt,E.colorSpace),zt=E.isVideoTexture!==!0,ae=Z.__version===void 0||K===!0,D=Q.dataReady;let ot=A(E,Rt);Pt(i.TEXTURE_CUBE_MAP,E);let X;if(jt){zt&&ae&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Yt,Rt.width,Rt.height);for(let J=0;J<6;J++){X=pt[J].mipmaps;for(let dt=0;dt<X.length;dt++){const ht=X[dt];E.format!==Dn?Dt!==null?zt?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,0,0,ht.width,ht.height,Dt,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,Yt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,0,0,ht.width,ht.height,Dt,mt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt,Yt,ht.width,ht.height,0,Dt,mt,ht.data)}}}else{if(X=E.mipmaps,zt&&ae){X.length>0&&ot++;const J=wt(pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Yt,J.width,J.height)}for(let J=0;J<6;J++)if(et){zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,pt[J].width,pt[J].height,Dt,mt,pt[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Yt,pt[J].width,pt[J].height,0,Dt,mt,pt[J].data);for(let dt=0;dt<X.length;dt++){const Nt=X[dt].image[J].image;zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,0,0,Nt.width,Nt.height,Dt,mt,Nt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,Yt,Nt.width,Nt.height,0,Dt,mt,Nt.data)}}else{zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Dt,mt,pt[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Yt,Dt,mt,pt[J]);for(let dt=0;dt<X.length;dt++){const ht=X[dt];zt?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,0,0,Dt,mt,ht.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,dt+1,Yt,Dt,mt,ht.image[J])}}}f(E)&&d(i.TEXTURE_CUBE_MAP),Z.__version=Q.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function St(C,E,B,K,Q,Z){const Et=s.convert(B.format,B.colorSpace),lt=s.convert(B.type),ft=M(B.internalFormat,Et,lt,B.colorSpace),jt=n.get(E),et=n.get(B);if(et.__renderTarget=E,!jt.__hasExternalTextures){const pt=Math.max(1,E.width>>Z),Rt=Math.max(1,E.height>>Z);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,Z,ft,pt,Rt,E.depth,0,Et,lt,null):e.texImage2D(Q,Z,ft,pt,Rt,0,Et,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),Xt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Q,et.__webglTexture,0,Wt(E)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Q,et.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(C,E,B){if(i.bindRenderbuffer(i.RENDERBUFFER,C),E.depthBuffer){const K=E.depthTexture,Q=K&&K.isDepthTexture?K.type:null,Z=x(E.stencilBuffer,Q),Et=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=Wt(E);Xt(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,Z,E.width,E.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,Z,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Z,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Et,i.RENDERBUFFER,C)}else{const K=E.textures;for(let Q=0;Q<K.length;Q++){const Z=K[Q],Et=s.convert(Z.format,Z.colorSpace),lt=s.convert(Z.type),ft=M(Z.internalFormat,Et,lt,Z.colorSpace),jt=Wt(E);B&&Xt(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,jt,ft,E.width,E.height):Xt(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,jt,ft,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,ft,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(E.depthTexture);K.__renderTarget=E,(!K.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),W(E.depthTexture,0);const Q=K.__webglTexture,Z=Wt(E);if(E.depthTexture.format===Ur)Xt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(E.depthTexture.format===Gr)Xt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function It(C){const E=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const K=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),K){const Q=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),E.__depthDisposeCallback=Q}E.__boundDepthTexture=K}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ct(E.__webglFramebuffer,C)}else if(B){E.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[K]),E.__webglDepthbuffer[K]===void 0)E.__webglDepthbuffer[K]=i.createRenderbuffer(),at(E.__webglDepthbuffer[K],C,!1);else{const Q=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),at(E.__webglDepthbuffer,C,!1);else{const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ht(C,E,B){const K=n.get(C);E!==void 0&&St(K.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&It(C)}function me(C){const E=C.texture,B=n.get(C),K=n.get(E);C.addEventListener("dispose",w);const Q=C.textures,Z=C.isWebGLCubeRenderTarget===!0,Et=Q.length>1;if(Et||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=E.version,o.memory.textures++),Z){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let ft=0;ft<E.mipmaps.length;ft++)B.__webglFramebuffer[lt][ft]=i.createFramebuffer()}else B.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<E.mipmaps.length;lt++)B.__webglFramebuffer[lt]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Et)for(let lt=0,ft=Q.length;lt<ft;lt++){const jt=n.get(Q[lt]);jt.__webglTexture===void 0&&(jt.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&Xt(C)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<Q.length;lt++){const ft=Q[lt];B.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const jt=s.convert(ft.format,ft.colorSpace),et=s.convert(ft.type),pt=M(ft.internalFormat,jt,et,ft.colorSpace,C.isXRRenderTarget===!0),Rt=Wt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,pt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),at(B.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Pt(i.TEXTURE_CUBE_MAP,E);for(let lt=0;lt<6;lt++)if(E.mipmaps&&E.mipmaps.length>0)for(let ft=0;ft<E.mipmaps.length;ft++)St(B.__webglFramebuffer[lt][ft],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ft);else St(B.__webglFramebuffer[lt],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);f(E)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let lt=0,ft=Q.length;lt<ft;lt++){const jt=Q[lt],et=n.get(jt);e.bindTexture(i.TEXTURE_2D,et.__webglTexture),Pt(i.TEXTURE_2D,jt),St(B.__webglFramebuffer,C,jt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),f(jt)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(lt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,K.__webglTexture),Pt(lt,E),E.mipmaps&&E.mipmaps.length>0)for(let ft=0;ft<E.mipmaps.length;ft++)St(B.__webglFramebuffer[ft],C,E,i.COLOR_ATTACHMENT0,lt,ft);else St(B.__webglFramebuffer,C,E,i.COLOR_ATTACHMENT0,lt,0);f(E)&&d(lt),e.unbindTexture()}C.depthBuffer&&It(C)}function qt(C){const E=C.textures;for(let B=0,K=E.length;B<K;B++){const Q=E[B];if(f(Q)){const Z=v(C),Et=n.get(Q).__webglTexture;e.bindTexture(Z,Et),d(Z),e.unbindTexture()}}}const Me=[],O=[];function fn(C){if(C.samples>0){if(Xt(C)===!1){const E=C.textures,B=C.width,K=C.height;let Q=i.COLOR_BUFFER_BIT;const Z=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Et=n.get(C),lt=E.length>1;if(lt)for(let ft=0;ft<E.length;ft++)e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let ft=0;ft<E.length;ft++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Et.__webglColorRenderbuffer[ft]);const jt=n.get(E[ft]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,jt,0)}i.blitFramebuffer(0,0,B,K,0,0,B,K,Q,i.NEAREST),l===!0&&(Me.length=0,O.length=0,Me.push(i.COLOR_ATTACHMENT0+ft),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Me.push(Z),O.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let ft=0;ft<E.length;ft++){e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,Et.__webglColorRenderbuffer[ft]);const jt=n.get(E[ft]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,jt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const E=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Wt(C){return Math.min(r.maxSamples,C.samples)}function Xt(C){const E=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function At(C){const E=o.render.frame;h.get(C)!==E&&(h.set(C,E),C.update())}function he(C,E){const B=C.colorSpace,K=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==ts&&B!==mi&&(Zt.getTransfer(B)===ee?(K!==Dn||Q!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),E}function wt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=F,this.setTexture2D=W,this.setTexture2DArray=z,this.setTexture3D=q,this.setTextureCube=k,this.rebindTextures=Ht,this.setupRenderTarget=me,this.updateRenderTargetMipmap=qt,this.updateMultisampleRenderTarget=fn,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=St,this.useMultisampledRTT=Xt}function Hg(i,t){function e(n,r=mi){let s;const o=Zt.getTransfer(r);if(n===ei)return i.UNSIGNED_BYTE;if(n===Yl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ql)return i.UNSIGNED_SHORT_5_5_5_1;if(n===_u)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pu)return i.BYTE;if(n===mu)return i.SHORT;if(n===bs)return i.UNSIGNED_SHORT;if(n===Xl)return i.INT;if(n===Qi)return i.UNSIGNED_INT;if(n===Jn)return i.FLOAT;if(n===Ns)return i.HALF_FLOAT;if(n===gu)return i.ALPHA;if(n===vu)return i.RGB;if(n===Dn)return i.RGBA;if(n===xu)return i.LUMINANCE;if(n===yu)return i.LUMINANCE_ALPHA;if(n===Ur)return i.DEPTH_COMPONENT;if(n===Gr)return i.DEPTH_STENCIL;if(n===Mu)return i.RED;if(n===jl)return i.RED_INTEGER;if(n===Su)return i.RG;if(n===Zl)return i.RG_INTEGER;if(n===$l)return i.RGBA_INTEGER;if(n===vo||n===xo||n===yo||n===Mo)if(o===ee)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===vo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===yo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===vo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===yo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$a||n===Ka||n===Ja||n===Qa)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===$a)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ka)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ja)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===tl||n===el||n===nl)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===tl||n===el)return o===ee?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===nl)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===il||n===rl||n===sl||n===ol||n===al||n===ll||n===cl||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===_l)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===il)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===rl)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===sl)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ol)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===al)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ll)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===cl)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===hl)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ul)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===dl)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fl)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pl)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ml)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===_l)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===So||n===gl||n===vl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===So)return o===ee?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===gl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Eu||n===xl||n===yl||n===Ml)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===So)return s.COMPRESSED_RED_RGTC1_EXT;if(n===xl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===yl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ml)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Vg extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ut extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gg={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const f=e.getJointPose(_,n),d=this._getHandJoint(c,_);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&p>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gg)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ut;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Wg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Yg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Ge,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ai({vertexShader:Wg,fragmentShader:Xg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $(new es(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qg extends nr{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,p=null,m=null,g=null;const _=new Yg,f=e.getContextAttributes();let d=null,v=null;const M=[],x=[],A=new Tt;let T=null;const w=new rn;w.viewport=new re;const R=new rn;R.viewport=new re;const y=[w,R],S=new Vg;let P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let tt=M[Y];return tt===void 0&&(tt=new Ea,M[Y]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(Y){let tt=M[Y];return tt===void 0&&(tt=new Ea,M[Y]=tt),tt.getGripSpace()},this.getHand=function(Y){let tt=M[Y];return tt===void 0&&(tt=new Ea,M[Y]=tt),tt.getHandSpace()};function I(Y){const tt=x.indexOf(Y.inputSource);if(tt===-1)return;const St=M[tt];St!==void 0&&(St.update(Y.inputSource,Y.frame,c||o),St.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){r.removeEventListener("select",I),r.removeEventListener("selectstart",I),r.removeEventListener("selectend",I),r.removeEventListener("squeeze",I),r.removeEventListener("squeezestart",I),r.removeEventListener("squeezeend",I),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",W);for(let Y=0;Y<M.length;Y++){const tt=x[Y];tt!==null&&(x[Y]=null,M[Y].disconnect(tt))}P=null,F=null,_.reset(),t.setRenderTarget(d),m=null,p=null,u=null,r=null,v=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(d=t.getRenderTarget(),r.addEventListener("select",I),r.addEventListener("selectstart",I),r.addEventListener("selectend",I),r.addEventListener("squeeze",I),r.addEventListener("squeezestart",I),r.addEventListener("squeezeend",I),r.addEventListener("end",V),r.addEventListener("inputsourceschange",W),f.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(A),r.renderState.layers===void 0){const tt={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,e,tt),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new tr(m.framebufferWidth,m.framebufferHeight,{format:Dn,type:ei,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil})}else{let tt=null,St=null,at=null;f.depth&&(at=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=f.stencil?Gr:Ur,St=f.stencil?Vr:Qi);const Ct={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:s};u=new XRWebGLBinding(r,e),p=u.createProjectionLayer(Ct),r.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),v=new tr(p.textureWidth,p.textureHeight,{format:Dn,type:ei,depthTexture:new Fu(p.textureWidth,p.textureHeight,St,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Kt.setContext(r),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W(Y){for(let tt=0;tt<Y.removed.length;tt++){const St=Y.removed[tt],at=x.indexOf(St);at>=0&&(x[at]=null,M[at].disconnect(St))}for(let tt=0;tt<Y.added.length;tt++){const St=Y.added[tt];let at=x.indexOf(St);if(at===-1){for(let It=0;It<M.length;It++)if(It>=x.length){x.push(St),at=It;break}else if(x[It]===null){x[It]=St,at=It;break}if(at===-1)break}const Ct=M[at];Ct&&Ct.connect(St)}}const z=new L,q=new L;function k(Y,tt,St){z.setFromMatrixPosition(tt.matrixWorld),q.setFromMatrixPosition(St.matrixWorld);const at=z.distanceTo(q),Ct=tt.projectionMatrix.elements,It=St.projectionMatrix.elements,Ht=Ct[14]/(Ct[10]-1),me=Ct[14]/(Ct[10]+1),qt=(Ct[9]+1)/Ct[5],Me=(Ct[9]-1)/Ct[5],O=(Ct[8]-1)/Ct[0],fn=(It[8]+1)/It[0],Wt=Ht*O,Xt=Ht*fn,At=at/(-O+fn),he=At*-O;if(tt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(he),Y.translateZ(At),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ct[10]===-1)Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const wt=Ht+At,C=me+At,E=Wt-he,B=Xt+(at-he),K=qt*me/C*wt,Q=Me*me/C*wt;Y.projectionMatrix.makePerspective(E,B,K,Q,wt,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function it(Y,tt){tt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(tt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let tt=Y.near,St=Y.far;_.texture!==null&&(_.depthNear>0&&(tt=_.depthNear),_.depthFar>0&&(St=_.depthFar)),S.near=R.near=w.near=tt,S.far=R.far=w.far=St,(P!==S.near||F!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,F=S.far),w.layers.mask=Y.layers.mask|2,R.layers.mask=Y.layers.mask|4,S.layers.mask=w.layers.mask|R.layers.mask;const at=Y.parent,Ct=S.cameras;it(S,at);for(let It=0;It<Ct.length;It++)it(Ct[It],at);Ct.length===2?k(S,w,R):S.projectionMatrix.copy(w.projectionMatrix),rt(Y,S,at)};function rt(Y,tt,St){St===null?Y.matrix.copy(tt.matrixWorld):(Y.matrix.copy(St.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(tt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(tt.projectionMatrix),Y.projectionMatrixInverse.copy(tt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=El*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(Y){l=Y,p!==null&&(p.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let vt=null;function Pt(Y,tt){if(h=tt.getViewerPose(c||o),g=tt,h!==null){const St=h.views;m!==null&&(t.setRenderTargetFramebuffer(v,m.framebuffer),t.setRenderTarget(v));let at=!1;St.length!==S.cameras.length&&(S.cameras.length=0,at=!0);for(let It=0;It<St.length;It++){const Ht=St[It];let me=null;if(m!==null)me=m.getViewport(Ht);else{const Me=u.getViewSubImage(p,Ht);me=Me.viewport,It===0&&(t.setRenderTargetTextures(v,Me.colorTexture,p.ignoreDepthValues?void 0:Me.depthStencilTexture),t.setRenderTarget(v))}let qt=y[It];qt===void 0&&(qt=new rn,qt.layers.enable(It),qt.viewport=new re,y[It]=qt),qt.matrix.fromArray(Ht.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(Ht.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(me.x,me.y,me.width,me.height),It===0&&(S.matrix.copy(qt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),at===!0&&S.cameras.push(qt)}const Ct=r.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const It=u.getDepthInformation(St[0]);It&&It.isValid&&It.texture&&_.init(t,It,r.renderState)}}for(let St=0;St<M.length;St++){const at=x[St],Ct=M[St];at!==null&&Ct!==void 0&&Ct.update(at,tt,c||o)}vt&&vt(Y,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const Kt=new Nu;Kt.setAnimationLoop(Pt),this.setAnimationLoop=function(Y){vt=Y},this.dispose=function(){}}}const zi=new kn,jg=new ce;function Zg(i,t){function e(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,Lu(i)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function r(f,d,v,M,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(f,d):d.isMeshToonMaterial?(s(f,d),u(f,d)):d.isMeshPhongMaterial?(s(f,d),h(f,d)):d.isMeshStandardMaterial?(s(f,d),p(f,d),d.isMeshPhysicalMaterial&&m(f,d,x)):d.isMeshMatcapMaterial?(s(f,d),g(f,d)):d.isMeshDepthMaterial?s(f,d):d.isMeshDistanceMaterial?(s(f,d),_(f,d)):d.isMeshNormalMaterial?s(f,d):d.isLineBasicMaterial?(o(f,d),d.isLineDashedMaterial&&a(f,d)):d.isPointsMaterial?l(f,d,v,M):d.isSpriteMaterial?c(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,e(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,e(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===qe&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,e(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===qe&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,e(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,e(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const v=t.get(d),M=v.envMap,x=v.envMapRotation;M&&(f.envMap.value=M,zi.copy(x),zi.x*=-1,zi.y*=-1,zi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),f.envMapRotation.value.setFromMatrix4(jg.makeRotationFromEuler(zi)),f.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,f.aoMapTransform))}function o(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,e(d.map,f.mapTransform))}function a(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function l(f,d,v,M){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*v,f.scale.value=M*.5,d.map&&(f.map.value=d.map,e(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function c(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,e(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function u(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function p(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,v){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===qe&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=v.texture,f.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,d){d.matcap&&(f.matcap.value=d.matcap)}function _(f,d){const v=t.get(d).light;f.referencePosition.value.setFromMatrixPosition(v.matrixWorld),f.nearDistance.value=v.shadow.camera.near,f.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function $g(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){const x=M.program;n.uniformBlockBinding(v,x)}function c(v,M){let x=r[v.id];x===void 0&&(g(v),x=h(v),r[v.id]=x,v.addEventListener("dispose",f));const A=M.program;n.updateUBOMapping(v,A);const T=t.render.frame;s[v.id]!==T&&(p(v),s[v.id]=T)}function h(v){const M=u();v.__bindingPointIndex=M;const x=i.createBuffer(),A=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,x),x}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(v){const M=r[v.id],x=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let T=0,w=x.length;T<w;T++){const R=Array.isArray(x[T])?x[T]:[x[T]];for(let y=0,S=R.length;y<S;y++){const P=R[y];if(m(P,T,y,A)===!0){const F=P.__offset,I=Array.isArray(P.value)?P.value:[P.value];let V=0;for(let W=0;W<I.length;W++){const z=I[W],q=_(z);typeof z=="number"||typeof z=="boolean"?(P.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,F+V,P.__data)):z.isMatrix3?(P.__data[0]=z.elements[0],P.__data[1]=z.elements[1],P.__data[2]=z.elements[2],P.__data[3]=0,P.__data[4]=z.elements[3],P.__data[5]=z.elements[4],P.__data[6]=z.elements[5],P.__data[7]=0,P.__data[8]=z.elements[6],P.__data[9]=z.elements[7],P.__data[10]=z.elements[8],P.__data[11]=0):(z.toArray(P.__data,V),V+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(v,M,x,A){const T=v.value,w=M+"_"+x;if(A[w]===void 0)return typeof T=="number"||typeof T=="boolean"?A[w]=T:A[w]=T.clone(),!0;{const R=A[w];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return A[w]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function g(v){const M=v.uniforms;let x=0;const A=16;for(let w=0,R=M.length;w<R;w++){const y=Array.isArray(M[w])?M[w]:[M[w]];for(let S=0,P=y.length;S<P;S++){const F=y[S],I=Array.isArray(F.value)?F.value:[F.value];for(let V=0,W=I.length;V<W;V++){const z=I[V],q=_(z),k=x%A,it=k%q.boundary,rt=k+it;x+=it,rt!==0&&A-rt<q.storage&&(x+=A-rt),F.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=q.storage}}}const T=x%A;return T>0&&(x+=A-T),v.__size=x,v.__cache={},this}function _(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function f(v){const M=v.target;M.removeEventListener("dispose",f);const x=o.indexOf(M.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function d(){for(const v in r)i.deleteBuffer(r[v]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class Kg{constructor(t={}){const{canvas:e=zf(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),_=new Int32Array(4);let f=null,d=null;const v=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vn,this.toneMapping=Si,this.toneMappingExposure=1;const x=this;let A=!1,T=0,w=0,R=null,y=-1,S=null;const P=new re,F=new re;let I=null;const V=new Vt(0);let W=0,z=e.width,q=e.height,k=1,it=null,rt=null;const vt=new re(0,0,z,q),Pt=new re(0,0,z,q);let Kt=!1;const Y=new Jl;let tt=!1,St=!1;const at=new ce,Ct=new ce,It=new L,Ht=new re,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function Me(){return R===null?k:1}let O=n;function fn(b,U){return e.getContext(b,U)}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Gl}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),O===null){const U="webgl2";if(O=fn(U,b),O===null)throw fn(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Wt,Xt,At,he,wt,C,E,B,K,Q,Z,Et,lt,ft,jt,et,pt,Rt,Dt,mt,Yt,zt,ae,D;function ot(){Wt=new n_(O),Wt.init(),zt=new Hg(O,Wt),Xt=new $0(O,Wt,t,zt),At=new Bg(O,Wt),Xt.reverseDepthBuffer&&p&&At.buffers.depth.setReversed(!0),he=new s_(O),wt=new Eg,C=new kg(O,Wt,At,wt,Xt,zt,he),E=new J0(x),B=new e_(x),K=new dp(O),ae=new j0(O,K),Q=new i_(O,K,he,ae),Z=new a_(O,Q,K,he),Dt=new o_(O,Xt,C),et=new K0(wt),Et=new Sg(x,E,B,Wt,Xt,ae,et),lt=new Zg(x,wt),ft=new Tg,jt=new Dg(Wt),Rt=new q0(x,E,B,At,Z,m,l),pt=new Og(x,Z,Xt),D=new $g(O,he,Xt,At),mt=new Z0(O,Wt,he),Yt=new r_(O,Wt,he),he.programs=Et.programs,x.capabilities=Xt,x.extensions=Wt,x.properties=wt,x.renderLists=ft,x.shadowMap=pt,x.state=At,x.info=he}ot();const X=new qg(x,O);this.xr=X,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const b=Wt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Wt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(b){b!==void 0&&(k=b,this.setSize(z,q,!1))},this.getSize=function(b){return b.set(z,q)},this.setSize=function(b,U,H=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=b,q=U,e.width=Math.floor(b*k),e.height=Math.floor(U*k),H===!0&&(e.style.width=b+"px",e.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(z*k,q*k).floor()},this.setDrawingBufferSize=function(b,U,H){z=b,q=U,k=H,e.width=Math.floor(b*H),e.height=Math.floor(U*H),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(vt)},this.setViewport=function(b,U,H,G){b.isVector4?vt.set(b.x,b.y,b.z,b.w):vt.set(b,U,H,G),At.viewport(P.copy(vt).multiplyScalar(k).round())},this.getScissor=function(b){return b.copy(Pt)},this.setScissor=function(b,U,H,G){b.isVector4?Pt.set(b.x,b.y,b.z,b.w):Pt.set(b,U,H,G),At.scissor(F.copy(Pt).multiplyScalar(k).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(b){At.setScissorTest(Kt=b)},this.setOpaqueSort=function(b){it=b},this.setTransparentSort=function(b){rt=b},this.getClearColor=function(b){return b.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(b=!0,U=!0,H=!0){let G=0;if(b){let N=!1;if(R!==null){const nt=R.texture.format;N=nt===$l||nt===Zl||nt===jl}if(N){const nt=R.texture.type,ut=nt===ei||nt===Qi||nt===bs||nt===Vr||nt===Yl||nt===ql,xt=Rt.getClearColor(),yt=Rt.getClearAlpha(),Lt=xt.r,Ot=xt.g,Mt=xt.b;ut?(g[0]=Lt,g[1]=Ot,g[2]=Mt,g[3]=yt,O.clearBufferuiv(O.COLOR,0,g)):(_[0]=Lt,_[1]=Ot,_[2]=Mt,_[3]=yt,O.clearBufferiv(O.COLOR,0,_))}else G|=O.COLOR_BUFFER_BIT}U&&(G|=O.DEPTH_BUFFER_BIT),H&&(G|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),ft.dispose(),jt.dispose(),wt.dispose(),E.dispose(),B.dispose(),Z.dispose(),ae.dispose(),D.dispose(),Et.dispose(),X.dispose(),X.removeEventListener("sessionstart",Ac),X.removeEventListener("sessionend",Rc),Ii.stop()};function J(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const b=he.autoReset,U=pt.enabled,H=pt.autoUpdate,G=pt.needsUpdate,N=pt.type;ot(),he.autoReset=b,pt.enabled=U,pt.autoUpdate=H,pt.needsUpdate=G,pt.type=N}function ht(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Nt(b){const U=b.target;U.removeEventListener("dispose",Nt),xe(U)}function xe(b){Le(b),wt.remove(b)}function Le(b){const U=wt.get(b).programs;U!==void 0&&(U.forEach(function(H){Et.releaseProgram(H)}),b.isShaderMaterial&&Et.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,H,G,N,nt){U===null&&(U=me);const ut=N.isMesh&&N.matrixWorld.determinant()<0,xt=jd(b,U,H,G,N);At.setMaterial(G,ut);let yt=H.index,Lt=1;if(G.wireframe===!0){if(yt=Q.getWireframeAttribute(H),yt===void 0)return;Lt=2}const Ot=H.drawRange,Mt=H.attributes.position;let $t=Ot.start*Lt,le=(Ot.start+Ot.count)*Lt;nt!==null&&($t=Math.max($t,nt.start*Lt),le=Math.min(le,(nt.start+nt.count)*Lt)),yt!==null?($t=Math.max($t,0),le=Math.min(le,yt.count)):Mt!=null&&($t=Math.max($t,0),le=Math.min(le,Mt.count));const ue=le-$t;if(ue<0||ue===1/0)return;ae.setup(N,G,xt,H,yt);let Xe,Jt=mt;if(yt!==null&&(Xe=K.get(yt),Jt=Yt,Jt.setIndex(Xe)),N.isMesh)G.wireframe===!0?(At.setLineWidth(G.wireframeLinewidth*Me()),Jt.setMode(O.LINES)):Jt.setMode(O.TRIANGLES);else if(N.isLine){let bt=G.linewidth;bt===void 0&&(bt=1),At.setLineWidth(bt*Me()),N.isLineSegments?Jt.setMode(O.LINES):N.isLineLoop?Jt.setMode(O.LINE_LOOP):Jt.setMode(O.LINE_STRIP)}else N.isPoints?Jt.setMode(O.POINTS):N.isSprite&&Jt.setMode(O.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Jt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Wt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const bt=N._multiDrawStarts,Gn=N._multiDrawCounts,Qt=N._multiDrawCount,Tn=yt?K.get(yt).bytesPerElement:1,ar=wt.get(G).currentProgram.getUniforms();for(let Qe=0;Qe<Qt;Qe++)ar.setValue(O,"_gl_DrawID",Qe),Jt.render(bt[Qe]/Tn,Gn[Qe])}else if(N.isInstancedMesh)Jt.renderInstances($t,ue,N.count);else if(H.isInstancedBufferGeometry){const bt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Gn=Math.min(H.instanceCount,bt);Jt.renderInstances($t,ue,Gn)}else Jt.render($t,ue)};function te(b,U,H){b.transparent===!0&&b.side===Cn&&b.forceSinglePass===!1?(b.side=qe,b.needsUpdate=!0,Vs(b,U,H),b.side=wi,b.needsUpdate=!0,Vs(b,U,H),b.side=Cn):Vs(b,U,H)}this.compile=function(b,U,H=null){H===null&&(H=b),d=jt.get(H),d.init(U),M.push(d),H.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),b!==H&&b.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(d.pushLight(N),N.castShadow&&d.pushShadow(N))}),d.setupLights();const G=new Set;return b.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const nt=N.material;if(nt)if(Array.isArray(nt))for(let ut=0;ut<nt.length;ut++){const xt=nt[ut];te(xt,H,N),G.add(xt)}else te(nt,H,N),G.add(nt)}),M.pop(),d=null,G},this.compileAsync=function(b,U,H=null){const G=this.compile(b,U,H);return new Promise(N=>{function nt(){if(G.forEach(function(ut){wt.get(ut).currentProgram.isReady()&&G.delete(ut)}),G.size===0){N(b);return}setTimeout(nt,10)}Wt.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let bn=null;function Vn(b){bn&&bn(b)}function Ac(){Ii.stop()}function Rc(){Ii.start()}const Ii=new Nu;Ii.setAnimationLoop(Vn),typeof self<"u"&&Ii.setContext(self),this.setAnimationLoop=function(b){bn=b,X.setAnimationLoop(b),b===null?Ii.stop():Ii.start()},X.addEventListener("sessionstart",Ac),X.addEventListener("sessionend",Rc),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(U),U=X.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,U,R),d=jt.get(b,M.length),d.init(U),M.push(d),Ct.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(Ct),St=this.localClippingEnabled,tt=et.init(this.clippingPlanes,St),f=ft.get(b,v.length),f.init(),v.push(f),X.enabled===!0&&X.isPresenting===!0){const nt=x.xr.getDepthSensingMesh();nt!==null&&jo(nt,U,-1/0,x.sortObjects)}jo(b,U,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(it,rt),qt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,qt&&Rt.addToRenderList(f,b),this.info.render.frame++,tt===!0&&et.beginShadows();const H=d.state.shadowsArray;pt.render(H,b,U),tt===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=f.opaque,N=f.transmissive;if(d.setupLights(),U.isArrayCamera){const nt=U.cameras;if(N.length>0)for(let ut=0,xt=nt.length;ut<xt;ut++){const yt=nt[ut];Pc(G,N,b,yt)}qt&&Rt.render(b);for(let ut=0,xt=nt.length;ut<xt;ut++){const yt=nt[ut];Cc(f,b,yt,yt.viewport)}}else N.length>0&&Pc(G,N,b,U),qt&&Rt.render(b),Cc(f,b,U);R!==null&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(x,b,U),ae.resetDefaultState(),y=-1,S=null,M.pop(),M.length>0?(d=M[M.length-1],tt===!0&&et.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,v.pop(),v.length>0?f=v[v.length-1]:f=null};function jo(b,U,H,G){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)H=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Y.intersectsSprite(b)){G&&Ht.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ct);const ut=Z.update(b),xt=b.material;xt.visible&&f.push(b,ut,xt,H,Ht.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Y.intersectsObject(b))){const ut=Z.update(b),xt=b.material;if(G&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ht.copy(b.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Ht.copy(ut.boundingSphere.center)),Ht.applyMatrix4(b.matrixWorld).applyMatrix4(Ct)),Array.isArray(xt)){const yt=ut.groups;for(let Lt=0,Ot=yt.length;Lt<Ot;Lt++){const Mt=yt[Lt],$t=xt[Mt.materialIndex];$t&&$t.visible&&f.push(b,ut,$t,H,Ht.z,Mt)}}else xt.visible&&f.push(b,ut,xt,H,Ht.z,null)}}const nt=b.children;for(let ut=0,xt=nt.length;ut<xt;ut++)jo(nt[ut],U,H,G)}function Cc(b,U,H,G){const N=b.opaque,nt=b.transmissive,ut=b.transparent;d.setupLightsView(H),tt===!0&&et.setGlobalState(x.clippingPlanes,H),G&&At.viewport(P.copy(G)),N.length>0&&Hs(N,U,H),nt.length>0&&Hs(nt,U,H),ut.length>0&&Hs(ut,U,H),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function Pc(b,U,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[G.id]===void 0&&(d.state.transmissionRenderTarget[G.id]=new tr(1,1,{generateMipmaps:!0,type:Wt.has("EXT_color_buffer_half_float")||Wt.has("EXT_color_buffer_float")?Ns:ei,minFilter:qi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));const nt=d.state.transmissionRenderTarget[G.id],ut=G.viewport||P;nt.setSize(ut.z,ut.w);const xt=x.getRenderTarget();x.setRenderTarget(nt),x.getClearColor(V),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),qt&&Rt.render(H);const yt=x.toneMapping;x.toneMapping=Si;const Lt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),d.setupLightsView(G),tt===!0&&et.setGlobalState(x.clippingPlanes,G),Hs(b,H,G),C.updateMultisampleRenderTarget(nt),C.updateRenderTargetMipmap(nt),Wt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let Mt=0,$t=U.length;Mt<$t;Mt++){const le=U[Mt],ue=le.object,Xe=le.geometry,Jt=le.material,bt=le.group;if(Jt.side===Cn&&ue.layers.test(G.layers)){const Gn=Jt.side;Jt.side=qe,Jt.needsUpdate=!0,Dc(ue,H,G,Xe,Jt,bt),Jt.side=Gn,Jt.needsUpdate=!0,Ot=!0}}Ot===!0&&(C.updateMultisampleRenderTarget(nt),C.updateRenderTargetMipmap(nt))}x.setRenderTarget(xt),x.setClearColor(V,W),Lt!==void 0&&(G.viewport=Lt),x.toneMapping=yt}function Hs(b,U,H){const G=U.isScene===!0?U.overrideMaterial:null;for(let N=0,nt=b.length;N<nt;N++){const ut=b[N],xt=ut.object,yt=ut.geometry,Lt=G===null?ut.material:G,Ot=ut.group;xt.layers.test(H.layers)&&Dc(xt,U,H,yt,Lt,Ot)}}function Dc(b,U,H,G,N,nt){b.onBeforeRender(x,U,H,G,N,nt),b.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),N.onBeforeRender(x,U,H,G,b,nt),N.transparent===!0&&N.side===Cn&&N.forceSinglePass===!1?(N.side=qe,N.needsUpdate=!0,x.renderBufferDirect(H,U,G,N,b,nt),N.side=wi,N.needsUpdate=!0,x.renderBufferDirect(H,U,G,N,b,nt),N.side=Cn):x.renderBufferDirect(H,U,G,N,b,nt),b.onAfterRender(x,U,H,G,N,nt)}function Vs(b,U,H){U.isScene!==!0&&(U=me);const G=wt.get(b),N=d.state.lights,nt=d.state.shadowsArray,ut=N.state.version,xt=Et.getParameters(b,N.state,nt,U,H),yt=Et.getProgramCacheKey(xt);let Lt=G.programs;G.environment=b.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(b.isMeshStandardMaterial?B:E).get(b.envMap||G.environment),G.envMapRotation=G.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Lt===void 0&&(b.addEventListener("dispose",Nt),Lt=new Map,G.programs=Lt);let Ot=Lt.get(yt);if(Ot!==void 0){if(G.currentProgram===Ot&&G.lightsStateVersion===ut)return Ic(b,xt),Ot}else xt.uniforms=Et.getUniforms(b),b.onBeforeCompile(xt,x),Ot=Et.acquireProgram(xt,yt),Lt.set(yt,Ot),G.uniforms=xt.uniforms;const Mt=G.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Mt.clippingPlanes=et.uniform),Ic(b,xt),G.needsLights=$d(b),G.lightsStateVersion=ut,G.needsLights&&(Mt.ambientLightColor.value=N.state.ambient,Mt.lightProbe.value=N.state.probe,Mt.directionalLights.value=N.state.directional,Mt.directionalLightShadows.value=N.state.directionalShadow,Mt.spotLights.value=N.state.spot,Mt.spotLightShadows.value=N.state.spotShadow,Mt.rectAreaLights.value=N.state.rectArea,Mt.ltc_1.value=N.state.rectAreaLTC1,Mt.ltc_2.value=N.state.rectAreaLTC2,Mt.pointLights.value=N.state.point,Mt.pointLightShadows.value=N.state.pointShadow,Mt.hemisphereLights.value=N.state.hemi,Mt.directionalShadowMap.value=N.state.directionalShadowMap,Mt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Mt.spotShadowMap.value=N.state.spotShadowMap,Mt.spotLightMatrix.value=N.state.spotLightMatrix,Mt.spotLightMap.value=N.state.spotLightMap,Mt.pointShadowMap.value=N.state.pointShadowMap,Mt.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=Ot,G.uniformsList=null,Ot}function Lc(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=bo.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function Ic(b,U){const H=wt.get(b);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function jd(b,U,H,G,N){U.isScene!==!0&&(U=me),C.resetTextureUnits();const nt=U.fog,ut=G.isMeshStandardMaterial?U.environment:null,xt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ts,yt=(G.isMeshStandardMaterial?B:E).get(G.envMap||ut),Lt=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ot=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Mt=!!H.morphAttributes.position,$t=!!H.morphAttributes.normal,le=!!H.morphAttributes.color;let ue=Si;G.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ue=x.toneMapping);const Xe=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Jt=Xe!==void 0?Xe.length:0,bt=wt.get(G),Gn=d.state.lights;if(tt===!0&&(St===!0||b!==S)){const pn=b===S&&G.id===y;et.setState(G,b,pn)}let Qt=!1;G.version===bt.__version?(bt.needsLights&&bt.lightsStateVersion!==Gn.state.version||bt.outputColorSpace!==xt||N.isBatchedMesh&&bt.batching===!1||!N.isBatchedMesh&&bt.batching===!0||N.isBatchedMesh&&bt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&bt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&bt.instancing===!1||!N.isInstancedMesh&&bt.instancing===!0||N.isSkinnedMesh&&bt.skinning===!1||!N.isSkinnedMesh&&bt.skinning===!0||N.isInstancedMesh&&bt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&bt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&bt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&bt.instancingMorph===!1&&N.morphTexture!==null||bt.envMap!==yt||G.fog===!0&&bt.fog!==nt||bt.numClippingPlanes!==void 0&&(bt.numClippingPlanes!==et.numPlanes||bt.numIntersection!==et.numIntersection)||bt.vertexAlphas!==Lt||bt.vertexTangents!==Ot||bt.morphTargets!==Mt||bt.morphNormals!==$t||bt.morphColors!==le||bt.toneMapping!==ue||bt.morphTargetsCount!==Jt)&&(Qt=!0):(Qt=!0,bt.__version=G.version);let Tn=bt.currentProgram;Qt===!0&&(Tn=Vs(G,U,N));let ar=!1,Qe=!1,is=!1;const de=Tn.getUniforms(),In=bt.uniforms;if(At.useProgram(Tn.program)&&(ar=!0,Qe=!0,is=!0),G.id!==y&&(y=G.id,Qe=!0),ar||S!==b){At.buffers.depth.getReversed()?(at.copy(b.projectionMatrix),Hf(at),Vf(at),de.setValue(O,"projectionMatrix",at)):de.setValue(O,"projectionMatrix",b.projectionMatrix),de.setValue(O,"viewMatrix",b.matrixWorldInverse);const si=de.map.cameraPosition;si!==void 0&&si.setValue(O,It.setFromMatrixPosition(b.matrixWorld)),Xt.logarithmicDepthBuffer&&de.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&de.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),S!==b&&(S=b,Qe=!0,is=!0)}if(N.isSkinnedMesh){de.setOptional(O,N,"bindMatrix"),de.setOptional(O,N,"bindMatrixInverse");const pn=N.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),de.setValue(O,"boneTexture",pn.boneTexture,C))}N.isBatchedMesh&&(de.setOptional(O,N,"batchingTexture"),de.setValue(O,"batchingTexture",N._matricesTexture,C),de.setOptional(O,N,"batchingIdTexture"),de.setValue(O,"batchingIdTexture",N._indirectTexture,C),de.setOptional(O,N,"batchingColorTexture"),N._colorsTexture!==null&&de.setValue(O,"batchingColorTexture",N._colorsTexture,C));const rs=H.morphAttributes;if((rs.position!==void 0||rs.normal!==void 0||rs.color!==void 0)&&Dt.update(N,H,Tn),(Qe||bt.receiveShadow!==N.receiveShadow)&&(bt.receiveShadow=N.receiveShadow,de.setValue(O,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(In.envMap.value=yt,In.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(In.envMapIntensity.value=U.environmentIntensity),Qe&&(de.setValue(O,"toneMappingExposure",x.toneMappingExposure),bt.needsLights&&Zd(In,is),nt&&G.fog===!0&&lt.refreshFogUniforms(In,nt),lt.refreshMaterialUniforms(In,G,k,q,d.state.transmissionRenderTarget[b.id]),bo.upload(O,Lc(bt),In,C)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(bo.upload(O,Lc(bt),In,C),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&de.setValue(O,"center",N.center),de.setValue(O,"modelViewMatrix",N.modelViewMatrix),de.setValue(O,"normalMatrix",N.normalMatrix),de.setValue(O,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const pn=G.uniformsGroups;for(let si=0,oi=pn.length;si<oi;si++){const Uc=pn[si];D.update(Uc,Tn),D.bind(Uc,Tn)}}return Tn}function Zd(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function $d(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,U,H){wt.get(b.texture).__webglTexture=U,wt.get(b.depthTexture).__webglTexture=H;const G=wt.get(b);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||Wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,U){const H=wt.get(b);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,H=0){R=b,T=U,w=H;let G=!0,N=null,nt=!1,ut=!1;if(b){const yt=wt.get(b);if(yt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(O.FRAMEBUFFER,null),G=!1;else if(yt.__webglFramebuffer===void 0)C.setupRenderTarget(b);else if(yt.__hasExternalTextures)C.rebindTextures(b,wt.get(b.texture).__webglTexture,wt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Mt=b.depthTexture;if(yt.__boundDepthTexture!==Mt){if(Mt!==null&&wt.has(Mt)&&(b.width!==Mt.image.width||b.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(b)}}const Lt=b.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(ut=!0);const Ot=wt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ot[U])?N=Ot[U][H]:N=Ot[U],nt=!0):b.samples>0&&C.useMultisampledRTT(b)===!1?N=wt.get(b).__webglMultisampledFramebuffer:Array.isArray(Ot)?N=Ot[H]:N=Ot,P.copy(b.viewport),F.copy(b.scissor),I=b.scissorTest}else P.copy(vt).multiplyScalar(k).floor(),F.copy(Pt).multiplyScalar(k).floor(),I=Kt;if(At.bindFramebuffer(O.FRAMEBUFFER,N)&&G&&At.drawBuffers(b,N),At.viewport(P),At.scissor(F),At.setScissorTest(I),nt){const yt=wt.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,yt.__webglTexture,H)}else if(ut){const yt=wt.get(b.texture),Lt=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,yt.__webglTexture,H||0,Lt)}y=-1},this.readRenderTargetPixels=function(b,U,H,G,N,nt,ut){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=wt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ut!==void 0&&(xt=xt[ut]),xt){At.bindFramebuffer(O.FRAMEBUFFER,xt);try{const yt=b.texture,Lt=yt.format,Ot=yt.type;if(!Xt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-G&&H>=0&&H<=b.height-N&&O.readPixels(U,H,G,N,zt.convert(Lt),zt.convert(Ot),nt)}finally{const yt=R!==null?wt.get(R).__webglFramebuffer:null;At.bindFramebuffer(O.FRAMEBUFFER,yt)}}},this.readRenderTargetPixelsAsync=async function(b,U,H,G,N,nt,ut){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=wt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&ut!==void 0&&(xt=xt[ut]),xt){const yt=b.texture,Lt=yt.format,Ot=yt.type;if(!Xt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=b.width-G&&H>=0&&H<=b.height-N){At.bindFramebuffer(O.FRAMEBUFFER,xt);const Mt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Mt),O.bufferData(O.PIXEL_PACK_BUFFER,nt.byteLength,O.STREAM_READ),O.readPixels(U,H,G,N,zt.convert(Lt),zt.convert(Ot),0);const $t=R!==null?wt.get(R).__webglFramebuffer:null;At.bindFramebuffer(O.FRAMEBUFFER,$t);const le=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await kf(O,le,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Mt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,nt),O.deleteBuffer(Mt),O.deleteSync(le),nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,U=null,H=0){b.isTexture!==!0&&(ms("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,b=arguments[1]);const G=Math.pow(2,-H),N=Math.floor(b.image.width*G),nt=Math.floor(b.image.height*G),ut=U!==null?U.x:0,xt=U!==null?U.y:0;C.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,H,0,0,ut,xt,N,nt),At.unbindTexture()},this.copyTextureToTexture=function(b,U,H=null,G=null,N=0){b.isTexture!==!0&&(ms("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,b=arguments[1],U=arguments[2],N=arguments[3]||0,H=null);let nt,ut,xt,yt,Lt,Ot,Mt,$t,le;const ue=b.isCompressedTexture?b.mipmaps[N]:b.image;H!==null?(nt=H.max.x-H.min.x,ut=H.max.y-H.min.y,xt=H.isBox3?H.max.z-H.min.z:1,yt=H.min.x,Lt=H.min.y,Ot=H.isBox3?H.min.z:0):(nt=ue.width,ut=ue.height,xt=ue.depth||1,yt=0,Lt=0,Ot=0),G!==null?(Mt=G.x,$t=G.y,le=G.z):(Mt=0,$t=0,le=0);const Xe=zt.convert(U.format),Jt=zt.convert(U.type);let bt;U.isData3DTexture?(C.setTexture3D(U,0),bt=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(C.setTexture2DArray(U,0),bt=O.TEXTURE_2D_ARRAY):(C.setTexture2D(U,0),bt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);const Gn=O.getParameter(O.UNPACK_ROW_LENGTH),Qt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Tn=O.getParameter(O.UNPACK_SKIP_PIXELS),ar=O.getParameter(O.UNPACK_SKIP_ROWS),Qe=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ue.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ue.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,yt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Lt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ot);const is=b.isDataArrayTexture||b.isData3DTexture,de=U.isDataArrayTexture||U.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const In=wt.get(b),rs=wt.get(U),pn=wt.get(In.__renderTarget),si=wt.get(rs.__renderTarget);At.bindFramebuffer(O.READ_FRAMEBUFFER,pn.__webglFramebuffer),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let oi=0;oi<xt;oi++)is&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,wt.get(b).__webglTexture,N,Ot+oi),b.isDepthTexture?(de&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,wt.get(U).__webglTexture,N,le+oi),O.blitFramebuffer(yt,Lt,nt,ut,Mt,$t,nt,ut,O.DEPTH_BUFFER_BIT,O.NEAREST)):de?O.copyTexSubImage3D(bt,N,Mt,$t,le+oi,yt,Lt,nt,ut):O.copyTexSubImage2D(bt,N,Mt,$t,le+oi,yt,Lt,nt,ut);At.bindFramebuffer(O.READ_FRAMEBUFFER,null),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else de?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(bt,N,Mt,$t,le,nt,ut,xt,Xe,Jt,ue.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(bt,N,Mt,$t,le,nt,ut,xt,Xe,ue.data):O.texSubImage3D(bt,N,Mt,$t,le,nt,ut,xt,Xe,Jt,ue):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,N,Mt,$t,nt,ut,Xe,Jt,ue.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,N,Mt,$t,ue.width,ue.height,Xe,ue.data):O.texSubImage2D(O.TEXTURE_2D,N,Mt,$t,nt,ut,Xe,Jt,ue);O.pixelStorei(O.UNPACK_ROW_LENGTH,Gn),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Qt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Tn),O.pixelStorei(O.UNPACK_SKIP_ROWS,ar),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Qe),N===0&&U.generateMipmaps&&O.generateMipmap(bt),At.unbindTexture()},this.copyTextureToTexture3D=function(b,U,H=null,G=null,N=0){return b.isTexture!==!0&&(ms("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,G=arguments[1]||null,b=arguments[2],U=arguments[3],N=arguments[4]||0),ms('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,U,H,G,N)},this.initRenderTarget=function(b){wt.get(b).__webglFramebuffer===void 0&&C.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),At.unbindTexture()},this.resetState=function(){T=0,w=0,R=null,At.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Zt._getUnpackColorSpace()}}class tc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Vt(t),this.density=e}clone(){return new tc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Jg extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Qg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Sl,this.updateRanges=[],this.version=0,this.uuid=Ei()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[n+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ei()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ze=new L;class Po{constructor(t,e,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=On(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=On(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=On(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=On(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=On(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),r=ne(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),r=ne(r,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new Sn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Po(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Vu extends ir{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Sr;const cs=new L,Er=new L,br=new L,Tr=new Tt,hs=new Tt,Gu=new ce,ho=new L,us=new L,uo=new L,Lh=new Tt,ba=new Tt,Ih=new Tt;class tv extends Ce{constructor(t=new Vu){if(super(),this.isSprite=!0,this.type="Sprite",Sr===void 0){Sr=new dn;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Qg(e,5);Sr.setIndex([0,1,2,0,2,3]),Sr.setAttribute("position",new Po(n,3,0,!1)),Sr.setAttribute("uv",new Po(n,2,3,!1))}this.geometry=Sr,this.material=t,this.center=new Tt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Er.setFromMatrixScale(this.matrixWorld),Gu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),br.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Er.multiplyScalar(-br.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const o=this.center;fo(ho.set(-.5,-.5,0),br,o,Er,r,s),fo(us.set(.5,-.5,0),br,o,Er,r,s),fo(uo.set(.5,.5,0),br,o,Er,r,s),Lh.set(0,0),ba.set(1,0),Ih.set(1,1);let a=t.ray.intersectTriangle(ho,us,uo,!1,cs);if(a===null&&(fo(us.set(-.5,.5,0),br,o,Er,r,s),ba.set(0,1),a=t.ray.intersectTriangle(ho,uo,us,!1,cs),a===null))return;const l=t.ray.origin.distanceTo(cs);l<t.near||l>t.far||e.push({distance:l,point:cs.clone(),uv:xn.getInterpolation(cs,ho,us,uo,Lh,ba,Ih,new Tt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function fo(i,t,e,n,r,s){Tr.subVectors(i,e).addScalar(.5).multiply(n),r!==void 0?(hs.x=s*Tr.x-r*Tr.y,hs.y=r*Tr.x+s*Tr.y):hs.copy(Tr),i.copy(t),i.x+=hs.x,i.y+=hs.y,i.applyMatrix4(Gu)}class Wu extends ir{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Uh=new ce,Tl=new Vo,po=new Ho,mo=new L;class ev extends Ce{constructor(t=new dn,e=new Wu){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(r),po.radius+=s,t.ray.intersectsSphere(po)===!1)return;Uh.copy(r).invert(),Tl.copy(t.ray).applyMatrix4(Uh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const p=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let g=p,_=m;g<_;g++){const f=c.getX(g);mo.fromBufferAttribute(u,f),Nh(mo,f,l,r,t,e,this)}}else{const p=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=p,_=m;g<_;g++)mo.fromBufferAttribute(u,g),Nh(mo,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Nh(i,t,e,n,r,s,o){const a=Tl.distanceSqToPoint(i);if(a<e){const l=new L;Tl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ec extends Ge{constructor(t,e,n,r,s,o,a,l,c){super(t,e,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Bt extends dn{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],p=[],m=[];let g=0;const _=[],f=n/2;let d=0;v(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Oe(u,3)),this.setAttribute("normal",new Oe(p,3)),this.setAttribute("uv",new Oe(m,2));function v(){const x=new L,A=new L;let T=0;const w=(e-t)/n;for(let R=0;R<=s;R++){const y=[],S=R/s,P=S*(e-t)+t;for(let F=0;F<=r;F++){const I=F/r,V=I*l+a,W=Math.sin(V),z=Math.cos(V);A.x=P*W,A.y=-S*n+f,A.z=P*z,u.push(A.x,A.y,A.z),x.set(W,w,z).normalize(),p.push(x.x,x.y,x.z),m.push(I,1-S),y.push(g++)}_.push(y)}for(let R=0;R<r;R++)for(let y=0;y<s;y++){const S=_[y][R],P=_[y+1][R],F=_[y+1][R+1],I=_[y][R+1];(t>0||y!==0)&&(h.push(S,P,I),T+=3),(e>0||y!==s-1)&&(h.push(P,F,I),T+=3)}c.addGroup(d,T,0),d+=T}function M(x){const A=g,T=new Tt,w=new L;let R=0;const y=x===!0?t:e,S=x===!0?1:-1;for(let F=1;F<=r;F++)u.push(0,f*S,0),p.push(0,S,0),m.push(.5,.5),g++;const P=g;for(let F=0;F<=r;F++){const V=F/r*l+a,W=Math.cos(V),z=Math.sin(V);w.x=y*z,w.y=f*S,w.z=y*W,u.push(w.x,w.y,w.z),p.push(0,S,0),T.x=W*.5+.5,T.y=z*.5*S+.5,m.push(T.x,T.y),g++}for(let F=0;F<r;F++){const I=A+F,V=P+F;x===!0?h.push(V,V+1,I):h.push(V+1,V,I),R+=3}c.addGroup(d,R,x===!0?1:2),d+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Xr extends dn{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,p=new L,m=[],g=[],_=[],f=[];for(let d=0;d<=n;d++){const v=[],M=d/n;let x=0;d===0&&o===0?x=.5/e:d===n&&l===Math.PI&&(x=-.5/e);for(let A=0;A<=e;A++){const T=A/e;u.x=-t*Math.cos(r+T*s)*Math.sin(o+M*a),u.y=t*Math.cos(o+M*a),u.z=t*Math.sin(r+T*s)*Math.sin(o+M*a),g.push(u.x,u.y,u.z),p.copy(u).normalize(),_.push(p.x,p.y,p.z),f.push(T+x,1-M),v.push(c++)}h.push(v)}for(let d=0;d<n;d++)for(let v=0;v<e;v++){const M=h[d][v+1],x=h[d][v],A=h[d+1][v],T=h[d+1][v+1];(d!==0||o>0)&&m.push(M,x,T),(d!==n-1||l<Math.PI)&&m.push(x,A,T)}this.setIndex(m),this.setAttribute("position",new Oe(g,3)),this.setAttribute("normal",new Oe(_,3)),this.setAttribute("uv",new Oe(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Wo extends dn{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s},n=Math.floor(n),r=Math.floor(r);const o=[],a=[],l=[],c=[],h=new L,u=new L,p=new L;for(let m=0;m<=n;m++)for(let g=0;g<=r;g++){const _=g/r*s,f=m/n*Math.PI*2;u.x=(t+e*Math.cos(f))*Math.cos(_),u.y=(t+e*Math.cos(f))*Math.sin(_),u.z=e*Math.sin(f),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),p.subVectors(u,h).normalize(),l.push(p.x,p.y,p.z),c.push(g/r),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=r;g++){const _=(r+1)*m+g-1,f=(r+1)*(m-1)+g-1,d=(r+1)*(m-1)+g,v=(r+1)*m+g;o.push(_,f,v),o.push(f,d,v)}this.setIndex(o),this.setAttribute("position",new Oe(a,3)),this.setAttribute("normal",new Oe(l,3)),this.setAttribute("uv",new Oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ct extends ir{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bu,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nc extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Ta=new ce,Oh=new L,Fh=new L;class Xu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Tt(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jl,this._frameExtents=new Tt(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Oh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Oh),Fh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Fh),e.updateMatrixWorld(),Ta.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ta)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Bh=new ce,ds=new L,wa=new L;class nv extends Xu{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Tt(4,2),this._viewportCount=6,this._viewports=[new re(2,1,1,1),new re(0,1,1,1),new re(3,1,1,1),new re(1,1,1,1),new re(3,0,1,1),new re(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ds.setFromMatrixPosition(t.matrixWorld),n.position.copy(ds),wa.copy(n.position),wa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(wa),n.updateMatrixWorld(),r.makeTranslation(-ds.x,-ds.y,-ds.z),Bh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bh)}}class Pn extends nc{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new nv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class iv extends Xu{constructor(){super(new Ou(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rv extends nc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new iv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class sv extends nc{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class ov{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=zh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=zh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function zh(){return performance.now()}const kh=new ce;class av{constructor(t,e,n=0,r=1/0){this.ray=new Vo(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new Kl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return kh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kh),this}intersectObject(t,e=!0,n=[]){return wl(t,this,n,e),n.sort(Hh),n}intersectObjects(t,e=!0,n=[]){for(let r=0,s=t.length;r<s;r++)wl(t[r],this,n,e);return n.sort(Hh),n}}function Hh(i,t){return i.distance-t.distance}function wl(i,t,e,n){let r=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let o=0,a=s.length;o<a;o++)wl(s[o],t,e,!0)}}class Vh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(He(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class lv extends nr{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gl);const Gh={type:"change"},ic={type:"start"},Yu={type:"end"},_o=new Vo,Wh=new fi,cv=Math.cos(70*Bf.DEG2RAD),Te=new L,Ye=2*Math.PI,ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Aa=1e-6;class hv extends lv{constructor(t,e=null){super(t,e),this.state=ie.NONE,this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Lr.ROTATE,MIDDLE:Lr.DOLLY,RIGHT:Lr.PAN},this.touches={ONE:Ar.ROTATE,TWO:Ar.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new er,this._lastTargetPosition=new L,this._quat=new er().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Vh,this._sphericalDelta=new Vh,this._scale=1,this._panOffset=new L,this._rotateStart=new Tt,this._rotateEnd=new Tt,this._rotateDelta=new Tt,this._panStart=new Tt,this._panEnd=new Tt,this._panDelta=new Tt,this._dollyStart=new Tt,this._dollyEnd=new Tt,this._dollyDelta=new Tt,this._dollyDirection=new L,this._mouse=new Tt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=dv.bind(this),this._onPointerDown=uv.bind(this),this._onPointerUp=fv.bind(this),this._onContextMenu=yv.bind(this),this._onMouseWheel=_v.bind(this),this._onKeyDown=gv.bind(this),this._onTouchStart=vv.bind(this),this._onTouchMove=xv.bind(this),this._onMouseDown=pv.bind(this),this._onMouseMove=mv.bind(this),this._interceptControlDown=Mv.bind(this),this._interceptControlUp=Sv.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Gh),this.update(),this.state=ie.NONE}update(t=null){const e=this.object.position;Te.copy(e).sub(this.target),Te.applyQuaternion(this._quat),this._spherical.setFromVector3(Te),this.autoRotate&&this.state===ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Ye:n>Math.PI&&(n-=Ye),r<-Math.PI?r+=Ye:r>Math.PI&&(r-=Ye),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Te.setFromSpherical(this._spherical),Te.applyQuaternion(this._quatInverse),e.copy(this.target).add(Te),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Te.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Te.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(_o.origin.copy(this.object.position),_o.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_o.direction))<cv?this.object.lookAt(this.target):(Wh.setFromNormalAndCoplanarPoint(this.object.up,this.target),_o.intersectPlane(Wh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Aa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Aa||this._lastTargetPosition.distanceToSquared(this.target)>Aa?(this.dispatchEvent(Gh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ye/60*this.autoRotateSpeed*t:Ye/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Te.setFromMatrixColumn(e,0),Te.multiplyScalar(-t),this._panOffset.add(Te)}_panUp(t,e){this.screenSpacePanning===!0?Te.setFromMatrixColumn(e,1):(Te.setFromMatrixColumn(e,0),Te.crossVectors(this.object.up,Te)),Te.multiplyScalar(t),this._panOffset.add(Te)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Te.copy(r).sub(this.target);let s=Te.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/n.clientHeight,this.object.matrix),this._panUp(2*e*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),r=t-n.left,s=e-n.top,o=n.width,a=n.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ye*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ye*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ye*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ye*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ye*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ye*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(n,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),r=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ye*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ye*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Tt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function uv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function dv(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function fv(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yu),this.state=ie.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function pv(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Lr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ie.DOLLY;break;case Lr.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}break;case Lr.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ie.PAN}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(ic)}function mv(i){switch(this.state){case ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function _v(i){this.enabled===!1||this.enableZoom===!1||this.state!==ie.NONE||(i.preventDefault(),this.dispatchEvent(ic),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Yu))}function gv(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function vv(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ar.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ie.TOUCH_ROTATE;break;case Ar.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ie.TOUCH_PAN;break;default:this.state=ie.NONE}break;case 2:switch(this.touches.TWO){case Ar.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ie.TOUCH_DOLLY_PAN;break;case Ar.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ie.TOUCH_DOLLY_ROTATE;break;default:this.state=ie.NONE}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(ic)}function xv(i){switch(this._trackPointer(i),this.state){case ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ie.NONE}}function yv(i){this.enabled!==!1&&i.preventDefault()}function Mv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Sv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function $n(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function qu(i,t){i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.__proto__=t}/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var ln={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Yr={duration:.5,overwrite:!1,delay:0},rc,De,pe,yn=1e8,oe=1/yn,Al=Math.PI*2,Ev=Al/4,bv=0,ju=Math.sqrt,Tv=Math.cos,wv=Math.sin,Pe=function(t){return typeof t=="string"},ye=function(t){return typeof t=="function"},ni=function(t){return typeof t=="number"},sc=function(t){return typeof t>"u"},Hn=function(t){return typeof t=="object"},je=function(t){return t!==!1},oc=function(){return typeof window<"u"},go=function(t){return ye(t)||Pe(t)},Zu=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Fe=Array.isArray,Av=/random\([^)]+\)/g,Rv=/,\s*/g,Xh=/(?:-?\.?\d|\.)+/gi,$u=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Cr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ra=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ku=/[+-]=-?[.\d]+/,Cv=/[^,'"\[\]\s]+/gi,Pv=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ge,Un,Rl,ac,cn={},Do={},Ju,Qu=function(t){return(Do=qr(t,cn))&&Je},lc=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Ts=function(t,e){return!e&&console.warn(t)},td=function(t,e){return t&&(cn[t]=e)&&Do&&(Do[t]=e)||cn},ws=function(){return 0},Dv={suppressEvents:!0,isStart:!0,kill:!1},To={suppressEvents:!0,kill:!1},Lv={suppressEvents:!0},cc={},bi=[],Cl={},ed,nn={},Ca={},Yh=30,wo=[],hc="",uc=function(t){var e=t[0],n,r;if(Hn(e)||ye(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(r=wo.length;r--&&!wo[r].targetTest(e););n=wo[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new Td(t[r],n)))||t.splice(r,1);return t},Zi=function(t){return t._gsap||uc(Mn(t))[0]._gsap},nd=function(t,e,n){return(n=t[e])&&ye(n)?t[e]():sc(n)&&t.getAttribute&&t.getAttribute(e)||n},Ze=function(t,e){return(t=t.split(",")).forEach(e)||t},Se=function(t){return Math.round(t*1e5)/1e5||0},_e=function(t){return Math.round(t*1e7)/1e7||0},Or=function(t,e){var n=e.charAt(0),r=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+r:n==="-"?t-r:n==="*"?t*r:t/r},Iv=function(t,e){for(var n=e.length,r=0;t.indexOf(e[r])<0&&++r<n;);return r<n},Lo=function(){var t=bi.length,e=bi.slice(0),n,r;for(Cl={},bi.length=0,n=0;n<t;n++)r=e[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},dc=function(t){return!!(t._initted||t._startAt||t.add)},id=function(t,e,n,r){bi.length&&!De&&Lo(),t.render(e,n,!!(De&&e<0&&dc(t))),bi.length&&!De&&Lo()},rd=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Cv).length<2?e:Pe(t)?t.trim():t},sd=function(t){return t},hn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Uv=function(t){return function(e,n){for(var r in n)r in e||r==="duration"&&t||r==="ease"||(e[r]=n[r])}},qr=function(t,e){for(var n in e)t[n]=e[n];return t},qh=function i(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Hn(e[n])?i(t[n]||(t[n]={}),e[n]):e[n]);return t},Io=function(t,e){var n={},r;for(r in t)r in e||(n[r]=t[r]);return n},xs=function(t){var e=t.parent||ge,n=t.keyframes?Uv(Fe(t.keyframes)):hn;if(je(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Nv=function(t,e){for(var n=t.length,r=n===e.length;r&&n--&&t[n]===e[n];);return n<0},od=function(t,e,n,r,s){var o=t[r],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[r]=e,e._prev=o,e.parent=e._dp=t,e},Xo=function(t,e,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[r]===e&&(t[r]=s),e._next=e._prev=e.parent=null},Ri=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},$i=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},Ov=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Pl=function(t,e,n,r){return t._startAt&&(De?t._startAt.revert(To):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,r))},Fv=function i(t){return!t||t._ts&&i(t.parent)},jh=function(t){return t._repeat?jr(t._tTime,t=t.duration()+t._rDelay)*t:0},jr=function(t,e){var n=Math.floor(t=_e(t/e));return t&&n===t?n-1:n},Uo=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Yo=function(t){return t._end=_e(t._start+(t._tDur/Math.abs(t._ts||t._rts||oe)||0))},qo=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=_e(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Yo(t),n._dirty||$i(n,t)),t},ad=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Uo(t.rawTime(),e),(!e._dur||Fs(0,e.totalDuration(),n)-e._tTime>oe)&&e.render(n,!0)),$i(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-oe}},Fn=function(t,e,n,r){return e.parent&&Ri(e),e._start=_e((ni(n)?n:n||t!==ge?_n(t,n,e):t._time)+e._delay),e._end=_e(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),od(t,e,"_first","_last",t._sort?"_start":0),Dl(e)||(t._recent=e),r||ad(t,e),t._ts<0&&qo(t,t._tTime),t},ld=function(t,e){return(cn.ScrollTrigger||lc("scrollTrigger",e))&&cn.ScrollTrigger.create(e,t)},cd=function(t,e,n,r,s){if(pc(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!De&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&ed!==sn.frame)return bi.push(t),t._lazy=[s,r],1},Bv=function i(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||i(e))},Dl=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},zv=function(t,e,n,r){var s=t.ratio,o=e<0||!e&&(!t._start&&Bv(t)&&!(!t._initted&&Dl(t))||(t._ts<0||t._dp._ts<0)&&!Dl(t))?0:1,a=t._rDelay,l=0,c,h,u;if(a&&t._repeat&&(l=Fs(0,t._tDur,e),h=jr(l,a),t._yoyo&&h&1&&(o=1-o),h!==jr(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||De||r||t._zTime===oe||!e&&t._zTime){if(!t._initted&&cd(t,e,r,n,l))return;for(u=t._zTime,t._zTime=e||(n?oe:0),n||(n=e&&!u),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Pl(t,e,n,!0),t._onUpdate&&!n&&on(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&on(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&Ri(t,1),!n&&!De&&(on(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},kv=function(t,e,n){var r;if(n>e)for(r=t._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>e)return r;r=r._next}else for(r=t._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<e)return r;r=r._prev}},Zr=function(t,e,n,r){var s=t._repeat,o=_e(e)||0,a=t._tTime/t._tDur;return a&&!r&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:_e(o*(s+1)+t._rDelay*s):o,a>0&&!r&&qo(t,t._tTime=t._tDur*a),t.parent&&Yo(t),n||$i(t.parent,t),t},Zh=function(t){return t instanceof Ve?$i(t):Zr(t,t._dur)},Hv={_start:0,endTime:ws,totalDuration:ws},_n=function i(t,e,n){var r=t.labels,s=t._recent||Hv,o=t.duration()>=yn?s.endTime(!1):t._dur,a,l,c;return Pe(e)&&(isNaN(e)||e in r)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in r||(r[e]=o),r[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(Fe(n)?n[0]:n).totalDuration()),a>1?i(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},ys=function(t,e,n){var r=ni(e[1]),s=(r?2:1)+(t<2?0:1),o=e[s],a,l;if(r&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=je(l.vars.inherit)&&l.parent;o.immediateRender=je(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new be(e[0],o,e[s+1])},Li=function(t,e){return t||t===0?e(t):e},Fs=function(t,e,n){return n<t?t:n>e?e:n},Ne=function(t,e){return!Pe(t)||!(e=Pv.exec(t))?"":e[1]},Vv=function(t,e,n){return Li(n,function(r){return Fs(t,e,r)})},Ll=[].slice,hd=function(t,e){return t&&Hn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Hn(t[0]))&&!t.nodeType&&t!==Un},Gv=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(r){var s;return Pe(r)&&!e||hd(r,1)?(s=n).push.apply(s,Mn(r)):n.push(r)})||n},Mn=function(t,e,n){return pe&&!e&&pe.selector?pe.selector(t):Pe(t)&&!n&&(Rl||!$r())?Ll.call((e||ac).querySelectorAll(t),0):Fe(t)?Gv(t,n):hd(t)?Ll.call(t,0):t?[t]:[]},Il=function(t){return t=Mn(t)[0]||Ts("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Mn(e,n.querySelectorAll?n:n===t?Ts("Invalid scope")||ac.createElement("div"):t)}},ud=function(t){return t.sort(function(){return .5-Math.random()})},dd=function(t){if(ye(t))return t;var e=Hn(t)?t:{each:t},n=Ki(e.ease),r=e.from||0,s=parseFloat(e.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=e.axis,h=r,u=r;return Pe(r)?h=u={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(h=r[0],u=r[1]),function(p,m,g){var _=(g||e).length,f=o[_],d,v,M,x,A,T,w,R,y;if(!f){if(y=e.grid==="auto"?0:(e.grid||[1,yn])[1],!y){for(w=-yn;w<(w=g[y++].getBoundingClientRect().left)&&y<_;);y<_&&y--}for(f=o[_]=[],d=l?Math.min(y,_)*h-.5:r%y,v=y===yn?0:l?_*u/y-.5:r/y|0,w=0,R=yn,T=0;T<_;T++)M=T%y-d,x=v-(T/y|0),f[T]=A=c?Math.abs(c==="y"?x:M):ju(M*M+x*x),A>w&&(w=A),A<R&&(R=A);r==="random"&&ud(f),f.max=w-R,f.min=R,f.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(y>_?_-1:c?c==="y"?_/y:y:Math.max(y,_/y))||0)*(r==="edges"?-1:1),f.b=_<0?s-_:s,f.u=Ne(e.amount||e.each)||0,n=n&&_<0?Sd(n):n}return _=(f[p]-f.min)/f.max||0,_e(f.b+(n?n(_):_)*f.v)+f.u}},Ul=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var r=_e(Math.round(parseFloat(n)/t)*t*e);return(r-r%1)/e+(ni(n)?0:Ne(n))}},fd=function(t,e){var n=Fe(t),r,s;return!n&&Hn(t)&&(r=n=t.radius||yn,t.values?(t=Mn(t.values),(s=!ni(t[0]))&&(r*=r)):t=Ul(t.increment)),Li(e,n?ye(t)?function(o){return s=t(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=yn,h=0,u=t.length,p,m;u--;)s?(p=t[u].x-a,m=t[u].y-l,p=p*p+m*m):p=Math.abs(t[u]-a),p<c&&(c=p,h=u);return h=!r||c<=r?t[h]:o,s||h===o||ni(o)?h:h+Ne(o)}:Ul(t))},pd=function(t,e,n,r){return Li(Fe(t)?!e:n===!0?!!(n=0):!r,function(){return Fe(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*r)/r})},Wv=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return e.reduce(function(s,o){return o(s)},r)}},Xv=function(t,e){return function(n){return t(parseFloat(n))+(e||Ne(n))}},Yv=function(t,e,n){return _d(t,e,0,1,n)},md=function(t,e,n){return Li(n,function(r){return t[~~e(r)]})},qv=function i(t,e,n){var r=e-t;return Fe(t)?md(t,i(0,t.length),e):Li(n,function(s){return(r+(s-t)%r)%r+t})},jv=function i(t,e,n){var r=e-t,s=r*2;return Fe(t)?md(t,i(0,t.length-1),e):Li(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>r?s-o:o)})},As=function(t){return t.replace(Av,function(e){var n=e.indexOf("[")+1,r=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(Rv);return pd(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},_d=function(t,e,n,r,s){var o=e-t,a=r-n;return Li(s,function(l){return n+((l-t)/o*a||0)})},Zv=function i(t,e,n,r){var s=isNaN(t+e)?0:function(m){return(1-m)*t+m*e};if(!s){var o=Pe(t),a={},l,c,h,u,p;if(n===!0&&(r=1)&&(n=null),o)t={p:t},e={p:e};else if(Fe(t)&&!Fe(e)){for(h=[],u=t.length,p=u-2,c=1;c<u;c++)h.push(i(t[c-1],t[c]));u--,s=function(g){g*=u;var _=Math.min(p,~~g);return h[_](g-_)},n=e}else r||(t=qr(Fe(t)?[]:{},t));if(!h){for(l in e)fc.call(a,t,l,"get",e[l]);s=function(g){return gc(g,a)||(o?t.p:t)}}}return Li(n,s)},$h=function(t,e,n){var r=t.labels,s=yn,o,a,l;for(o in r)a=r[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},on=function(t,e,n){var r=t.vars,s=r[e],o=pe,a=t._ctx,l,c,h;if(s)return l=r[e+"Params"],c=r.callbackScope||t,n&&bi.length&&Lo(),a&&(pe=a),h=l?s.apply(c,l):s.call(c),pe=o,h},gs=function(t){return Ri(t),t.scrollTrigger&&t.scrollTrigger.kill(!!De),t.progress()<1&&on(t,"onInterrupt"),t},Pr,gd=[],vd=function(t){if(t)if(t=!t.name&&t.default||t,oc()||t.headless){var e=t.name,n=ye(t),r=e&&!n&&t.init?function(){this._props=[]}:t,s={init:ws,render:gc,add:fc,kill:ux,modifier:hx,rawVars:0},o={targetTest:0,get:0,getSetter:_c,aliases:{},register:0};if($r(),t!==r){if(nn[e])return;hn(r,hn(Io(t,s),o)),qr(r.prototype,qr(s,Io(t,o))),nn[r.prop=e]=r,t.targetTest&&(wo.push(r),cc[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}td(e,r),t.register&&t.register(Je,r,$e)}else gd.push(t)},se=255,vs={aqua:[0,se,se],lime:[0,se,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,se],navy:[0,0,128],white:[se,se,se],olive:[128,128,0],yellow:[se,se,0],orange:[se,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[se,0,0],pink:[se,192,203],cyan:[0,se,se],transparent:[se,se,se,0]},Pa=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*se+.5|0},xd=function(t,e,n){var r=t?ni(t)?[t>>16,t>>8&se,t&se]:0:vs.black,s,o,a,l,c,h,u,p,m,g;if(!r){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),vs[t])r=vs[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return r=parseInt(t.substr(1,6),16),[r>>16,r>>8&se,r&se,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),r=[t>>16,t>>8&se,t&se]}else if(t.substr(0,3)==="hsl"){if(r=g=t.match(Xh),!e)l=+r[0]%360/360,c=+r[1]/100,h=+r[2]/100,o=h<=.5?h*(c+1):h+c-h*c,s=h*2-o,r.length>3&&(r[3]*=1),r[0]=Pa(l+1/3,s,o),r[1]=Pa(l,s,o),r[2]=Pa(l-1/3,s,o);else if(~t.indexOf("="))return r=t.match($u),n&&r.length<4&&(r[3]=1),r}else r=t.match(Xh)||vs.transparent;r=r.map(Number)}return e&&!g&&(s=r[0]/se,o=r[1]/se,a=r[2]/se,u=Math.max(s,o,a),p=Math.min(s,o,a),h=(u+p)/2,u===p?l=c=0:(m=u-p,c=h>.5?m/(2-u-p):m/(u+p),l=u===s?(o-a)/m+(o<a?6:0):u===o?(a-s)/m+2:(s-o)/m+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(h*100+.5)),n&&r.length<4&&(r[3]=1),r},yd=function(t){var e=[],n=[],r=-1;return t.split(Ti).forEach(function(s){var o=s.match(Cr)||[];e.push.apply(e,o),n.push(r+=o.length+1)}),e.c=n,e},Kh=function(t,e,n){var r="",s=(t+r).match(Ti),o=e?"hsla(":"rgba(",a=0,l,c,h,u;if(!s)return t;if(s=s.map(function(p){return(p=xd(p,e,1))&&o+(e?p[0]+","+p[1]+"%,"+p[2]+"%,"+p[3]:p.join(","))+")"}),n&&(h=yd(t),l=n.c,l.join(r)!==h.c.join(r)))for(c=t.replace(Ti,"1").split(Cr),u=c.length-1;a<u;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=t.split(Ti),u=c.length-1;a<u;a++)r+=c[a]+s[a];return r+c[u]},Ti=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in vs)i+="|"+t+"\\b";return new RegExp(i+")","gi")}(),$v=/hsl[a]?\(/,Md=function(t){var e=t.join(" "),n;if(Ti.lastIndex=0,Ti.test(e))return n=$v.test(e),t[1]=Kh(t[1],n),t[0]=Kh(t[0],n,yd(t[1])),!0},Rs,sn=function(){var i=Date.now,t=500,e=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,h,u,p,m,g=function _(f){var d=i()-r,v=f===!0,M,x,A,T;if((d>t||d<0)&&(n+=d-e),r+=d,A=r-n,M=A-o,(M>0||v)&&(T=++u.frame,p=A-u.time*1e3,u.time=A=A/1e3,o+=M+(M>=s?4:s-M),x=1),v||(l=c(_)),x)for(m=0;m<a.length;m++)a[m](A,p,T,f)};return u={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(f){return p/(1e3/(f||60))},wake:function(){Ju&&(!Rl&&oc()&&(Un=Rl=window,ac=Un.document||{},cn.gsap=Je,(Un.gsapVersions||(Un.gsapVersions=[])).push(Je.version),Qu(Do||Un.GreenSockGlobals||!Un.gsap&&Un||{}),gd.forEach(vd)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=h||function(f){return setTimeout(f,o-u.time*1e3+1|0)},Rs=1,g(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Rs=0,c=ws},lagSmoothing:function(f,d){t=f||1/0,e=Math.min(d||33,t)},fps:function(f){s=1e3/(f||240),o=u.time*1e3+s},add:function(f,d,v){var M=d?function(x,A,T,w){f(x,A,T,w),u.remove(M)}:f;return u.remove(f),a[v?"unshift":"push"](M),$r(),M},remove:function(f,d){~(d=a.indexOf(f))&&a.splice(d,1)&&m>=d&&m--},_listeners:a},u}(),$r=function(){return!Rs&&sn.wake()},Gt={},Kv=/^[\d.\-M][\d.\-,\s]/,Jv=/["']/g,Qv=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[r]=isNaN(c)?c.replace(Jv,"").trim():+c,r=l.substr(a+1).trim();return e},tx=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),r=t.indexOf("(",e);return t.substring(e,~r&&r<n?t.indexOf(")",n+1):n)},ex=function(t){var e=(t+"").split("("),n=Gt[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[Qv(e[1])]:tx(t).split(",").map(rd)):Gt._CE&&Kv.test(t)?Gt._CE("",t):n},Sd=function(t){return function(e){return 1-t(1-e)}},Ed=function i(t,e){for(var n=t._first,r;n;)n instanceof Ve?i(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?i(n.timeline,e):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=e)),n=n._next},Ki=function(t,e){return t&&(ye(t)?t:Gt[t]||ex(t))||e},rr=function(t,e,n,r){n===void 0&&(n=function(l){return 1-e(1-l)}),r===void 0&&(r=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:r},o;return Ze(t,function(a){Gt[a]=cn[a]=s,Gt[o=a.toLowerCase()]=n;for(var l in s)Gt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Gt[a+"."+l]=s[l]}),s},bd=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Da=function i(t,e,n){var r=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/Al*(Math.asin(1/r)||0),a=function(h){return h===1?1:r*Math.pow(2,-10*h)*wv((h-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:bd(a);return s=Al/s,l.config=function(c,h){return i(t,c,h)},l},La=function i(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},r=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:bd(n);return r.config=function(s){return i(t,s)},r};Ze("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,t){var e=t<5?t+1:t;rr(i+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});Gt.Linear.easeNone=Gt.none=Gt.Linear.easeIn;rr("Elastic",Da("in"),Da("out"),Da());(function(i,t){var e=1/t,n=2*e,r=2.5*e,s=function(a){return a<e?i*a*a:a<n?i*Math.pow(a-1.5/t,2)+.75:a<r?i*(a-=2.25/t)*a+.9375:i*Math.pow(a-2.625/t,2)+.984375};rr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);rr("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});rr("Circ",function(i){return-(ju(1-i*i)-1)});rr("Sine",function(i){return i===1?1:-Tv(i*Ev)+1});rr("Back",La("in"),La("out"),La());Gt.SteppedEase=Gt.steps=cn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,r=t+(e?0:1),s=e?1:0,o=1-oe;return function(a){return((r*Fs(0,o,a)|0)+s)*n}}};Yr.ease=Gt["quad.out"];Ze("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return hc+=i+","+i+"Params,"});var Td=function(t,e){this.id=bv++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:nd,this.set=e?e.getSetter:_c},Cs=function(){function i(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Zr(this,+e.duration,1,1),this.data=e.data,pe&&(this._ctx=pe,pe.data.push(this)),Rs||sn.wake()}var t=i.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Zr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,r){if($r(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(qo(this,n),!s._dp||s.parent||ad(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Fn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===oe||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),id(this,n,r)),this},t.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+jh(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},t.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+jh(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?jr(this._tTime,s)+1:1},t.timeScale=function(n,r){if(!arguments.length)return this._rts===-oe?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Uo(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-oe?0:this._rts,this.totalTime(Fs(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Yo(this),Ov(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):($r(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==oe&&(this._tTime-=oe)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=_e(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Fn(r,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(je(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Uo(r.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Lv);var r=De;return De=n,dc(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),De=r,this},t.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Zh(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,Zh(this),r?this.time(r):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,r){return this.totalTime(_n(this,n),je(r))},t.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,je(r)),this._dur||(this._zTime=-oe),this},t.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},t.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},t.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-oe:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-oe,this},t.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-oe)},t.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},t.then=function(n){var r=this,s=r._prom;return new Promise(function(o){var a=ye(n)?n:sd,l=function(){var h=r.then;r.then=null,s&&s(),ye(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=h),o(a),r.then=h};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},t.kill=function(){gs(this)},i}();hn(Cs.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-oe,_prom:0,_ps:!1,_rts:1});var Ve=function(i){qu(t,i);function t(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=je(n.sortChildren),ge&&Fn(n.parent||ge,$n(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&ld($n(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(r,s,o){return ys(0,arguments,this),this},e.from=function(r,s,o){return ys(1,arguments,this),this},e.fromTo=function(r,s,o,a){return ys(2,arguments,this),this},e.set=function(r,s,o){return s.duration=0,s.parent=this,xs(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new be(r,s,_n(this,o),1),this},e.call=function(r,s,o){return Fn(this,be.delayedCall(0,r,s),o)},e.staggerTo=function(r,s,o,a,l,c,h){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new be(r,o,_n(this,l)),this},e.staggerFrom=function(r,s,o,a,l,c,h){return o.runBackwards=1,xs(o).immediateRender=je(o.immediateRender),this.staggerTo(r,s,o,a,l,c,h)},e.staggerFromTo=function(r,s,o,a,l,c,h,u){return a.startAt=o,xs(a).immediateRender=je(a.immediateRender),this.staggerTo(r,s,a,l,c,h,u)},e.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=r<=0?0:_e(r),u=this._zTime<0!=r<0&&(this._initted||!c),p,m,g,_,f,d,v,M,x,A,T,w;if(this!==ge&&h>l&&r>=0&&(h=l),h!==this._tTime||o||u){if(a!==this._time&&c&&(h+=this._time-a,r+=this._time-a),p=h,x=this._start,M=this._ts,d=!M,u&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,f=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(f*100+r,s,o);if(p=_e(h%f),h===l?(_=this._repeat,p=c):(A=_e(h/f),_=~~A,_&&_===A&&(p=c,_--),p>c&&(p=c)),A=jr(this._tTime,f),!a&&this._tTime&&A!==_&&this._tTime-A*f-this._dur<=0&&(A=_),T&&_&1&&(p=c-p,w=1),_!==A&&!this._lock){var R=T&&A&1,y=R===(T&&_&1);if(_<A&&(R=!R),a=R?0:h%c?c:h,this._lock=1,this.render(a||(w?0:_e(_*f)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&on(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1,A=_),a&&a!==this._time||d!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,a=R?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!d)return this;Ed(this,w)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=kv(this,_e(a),_e(p)),v&&(h-=p-(p=v._start))),this._tTime=h,this._time=p,this._act=!M,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&h&&c&&!s&&!A&&(on(this,"onStart"),this._tTime!==h))return this;if(p>=a&&r>=0)for(m=this._first;m;){if(g=m._next,(m._act||p>=m._start)&&m._ts&&v!==m){if(m.parent!==this)return this.render(r,s,o);if(m.render(m._ts>0?(p-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(p-m._start)*m._ts,s,o),p!==this._time||!this._ts&&!d){v=0,g&&(h+=this._zTime=-oe);break}}m=g}else{m=this._last;for(var S=r<0?r:p;m;){if(g=m._prev,(m._act||S<=m._end)&&m._ts&&v!==m){if(m.parent!==this)return this.render(r,s,o);if(m.render(m._ts>0?(S-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(S-m._start)*m._ts,s,o||De&&dc(m)),p!==this._time||!this._ts&&!d){v=0,g&&(h+=this._zTime=S?-oe:oe);break}}m=g}}if(v&&!s&&(this.pause(),v.render(p>=a?0:-oe)._zTime=p>=a?1:-1,this._ts))return this._start=x,Yo(this),this.render(r,s,o);this._onUpdate&&!s&&on(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(x===this._start||Math.abs(M)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Ri(this,1),!s&&!(r<0&&!a)&&(h||a||!l)&&(on(this,h===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(r,s){var o=this;if(ni(s)||(s=_n(this,s,r)),!(r instanceof Cs)){if(Fe(r))return r.forEach(function(a){return o.add(a,s)}),this;if(Pe(r))return this.addLabel(r,s);if(ye(r))r=be.delayedCall(0,r);else return this}return this!==r?Fn(this,r,s):this},e.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-yn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof be?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},e.remove=function(r){return Pe(r)?this.removeLabel(r):ye(r)?this.killTweensOf(r):(r.parent===this&&Xo(this,r),r===this._recent&&(this._recent=this._last),$i(this))},e.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=_e(sn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},e.addLabel=function(r,s){return this.labels[r]=_n(this,s),this},e.removeLabel=function(r){return delete this.labels[r],this},e.addPause=function(r,s,o){var a=be.delayedCall(0,s||ws,o);return a.data="isPause",this._hasPause=1,Fn(this,a,_n(this,r))},e.removePause=function(r){var s=this._first;for(r=_n(this,r);s;)s._start===r&&s.data==="isPause"&&Ri(s),s=s._next},e.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)_i!==a[l]&&a[l].kill(r,s);return this},e.getTweensOf=function(r,s){for(var o=[],a=Mn(r),l=this._first,c=ni(s),h;l;)l instanceof be?Iv(l._targets,a)&&(c?(!_i||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(h=l.getTweensOf(a,s)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(r,s){s=s||{};var o=this,a=_n(o,r),l=s,c=l.startAt,h=l.onStart,u=l.onStartParams,p=l.immediateRender,m,g=be.to(o,hn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||oe,onStart:function(){if(o.pause(),!m){var f=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==f&&Zr(g,f,0,1).render(g._time,!0,!0),m=1}h&&h.apply(g,u||[])}},s));return p?g.render(0):g},e.tweenFromTo=function(r,s,o){return this.tweenTo(s,hn({startAt:{time:_n(this,r)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(r){return r===void 0&&(r=this._time),$h(this,_n(this,r))},e.previousLabel=function(r){return r===void 0&&(r=this._time),$h(this,_n(this,r),1)},e.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+oe)},e.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=_e(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return $i(this)},e.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},e.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),$i(this)},e.totalDuration=function(r){var s=0,o=this,a=o._last,l=yn,c,h,u;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(u=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Fn(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(s-=h,(!u&&!o._dp||u&&u.smoothChildTiming)&&(o._start+=_e(h/o._ts),o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Zr(o,o===ge&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(r){if(ge._ts&&(id(ge,Uo(r,ge)),ed=sn.frame),sn.frame>=Yh){Yh+=ln.autoSleep||120;var s=ge._first;if((!s||!s._ts)&&ln.autoSleep&&sn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||sn.sleep()}}},t}(Cs);hn(Ve.prototype,{_lock:0,_hasPause:0,_forcing:0});var nx=function(t,e,n,r,s,o,a){var l=new $e(this._pt,t,e,0,1,Dd,null,s),c=0,h=0,u,p,m,g,_,f,d,v;for(l.b=n,l.e=r,n+="",r+="",(d=~r.indexOf("random("))&&(r=As(r)),o&&(v=[n,r],o(v,t,e),n=v[0],r=v[1]),p=n.match(Ra)||[];u=Ra.exec(r);)g=u[0],_=r.substring(c,u.index),m?m=(m+1)%5:_.substr(-5)==="rgba("&&(m=1),g!==p[h++]&&(f=parseFloat(p[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:f,c:g.charAt(1)==="="?Or(f,g)-f:parseFloat(g)-f,m:m&&m<4?Math.round:0},c=Ra.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(Ku.test(r)||d)&&(l.e=0),this._pt=l,l},fc=function(t,e,n,r,s,o,a,l,c,h){ye(r)&&(r=r(s||0,t,o));var u=t[e],p=n!=="get"?n:ye(u)?c?t[e.indexOf("set")||!ye(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():u,m=ye(u)?c?ax:Cd:mc,g;if(Pe(r)&&(~r.indexOf("random(")&&(r=As(r)),r.charAt(1)==="="&&(g=Or(p,r)+(Ne(p)||0),(g||g===0)&&(r=g))),!h||p!==r||Nl)return!isNaN(p*r)&&r!==""?(g=new $e(this._pt,t,e,+p||0,r-(p||0),typeof u=="boolean"?cx:Pd,0,m),c&&(g.fp=c),a&&g.modifier(a,this,t),this._pt=g):(!u&&!(e in t)&&lc(e,r),nx.call(this,t,e,p,r,m,l||ln.stringFilter,c))},ix=function(t,e,n,r,s){if(ye(t)&&(t=Ms(t,s,e,n,r)),!Hn(t)||t.style&&t.nodeType||Fe(t)||Zu(t))return Pe(t)?Ms(t,s,e,n,r):t;var o={},a;for(a in t)o[a]=Ms(t[a],s,e,n,r);return o},wd=function(t,e,n,r,s,o){var a,l,c,h;if(nn[t]&&(a=new nn[t]).init(s,a.rawVars?e[t]:ix(e[t],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new $e(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==Pr))for(c=n._ptLookup[n._targets.indexOf(s)],h=a._props.length;h--;)c[a._props[h]]=l;return a},_i,Nl,pc=function i(t,e,n){var r=t.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,h=r.runBackwards,u=r.yoyoEase,p=r.keyframes,m=r.autoRevert,g=t._dur,_=t._startAt,f=t._targets,d=t.parent,v=d&&d.data==="nested"?d.vars.targets:f,M=t._overwrite==="auto"&&!rc,x=t.timeline,A,T,w,R,y,S,P,F,I,V,W,z,q;if(x&&(!p||!s)&&(s="none"),t._ease=Ki(s,Yr.ease),t._yEase=u?Sd(Ki(u===!0?s:u,Yr.ease)):0,u&&t._yoyo&&!t._repeat&&(u=t._yEase,t._yEase=t._ease,t._ease=u),t._from=!x&&!!r.runBackwards,!x||p&&!r.stagger){if(F=f[0]?Zi(f[0]).harness:0,z=F&&r[F.prop],A=Io(r,cc),_&&(_._zTime<0&&_.progress(1),e<0&&h&&a&&!m?_.render(-1,!0):_.revert(h&&g?To:Dv),_._lazy=0),o){if(Ri(t._startAt=be.set(f,hn({data:"isStart",overwrite:!1,parent:d,immediateRender:!0,lazy:!_&&je(l),startAt:null,delay:0,onUpdate:c&&function(){return on(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(De||!a&&!m)&&t._startAt.revert(To),a&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&g&&!_){if(e&&(a=!1),w=hn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&je(l),immediateRender:a,stagger:0,parent:d},A),z&&(w[F.prop]=z),Ri(t._startAt=be.set(f,w)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(De?t._startAt.revert(To):t._startAt.render(-1,!0)),t._zTime=e,!a)i(t._startAt,oe,oe);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&je(l)||l&&!g,T=0;T<f.length;T++){if(y=f[T],P=y._gsap||uc(f)[T]._gsap,t._ptLookup[T]=V={},Cl[P.id]&&bi.length&&Lo(),W=v===f?T:v.indexOf(y),F&&(I=new F).init(y,z||A,t,W,v)!==!1&&(t._pt=R=new $e(t._pt,y,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(k){V[k]=R}),I.priority&&(S=1)),!F||z)for(w in A)nn[w]&&(I=wd(w,A,t,W,y,v))?I.priority&&(S=1):V[w]=R=fc.call(t,y,w,"get",A[w],W,v,0,r.stringFilter);t._op&&t._op[T]&&t.kill(y,t._op[T]),M&&t._pt&&(_i=t,ge.killTweensOf(y,V,t.globalTime(e)),q=!t.parent,_i=0),t._pt&&l&&(Cl[P.id]=1)}S&&Ld(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!q,p&&e<=0&&x.render(yn,!0,!0)},rx=function(t,e,n,r,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,p,m;if(!c)for(c=t._ptCache[e]=[],p=t._ptLookup,m=t._targets.length;m--;){if(h=p[m][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Nl=1,t.vars[e]="+=0",pc(t,a),Nl=0,l?Ts(e+" not eligible for reset"):1;c.push(h)}for(m=c.length;m--;)u=c[m],h=u._pt||u,h.s=(r||r===0)&&!s?r:h.s+(r||0)+o*h.c,h.c=n-h.s,u.e&&(u.e=Se(n)+Ne(u.e)),u.b&&(u.b=h.s+Ne(u.b))},sx=function(t,e){var n=t[0]?Zi(t[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return e;s=qr({},e);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},ox=function(t,e,n,r){var s=e.ease||r||"power1.inOut",o,a;if(Fe(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Ms=function(t,e,n,r,s){return ye(t)?t.call(e,n,r,s):Pe(t)&&~t.indexOf("random(")?As(t):t},Ad=hc+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Rd={};Ze(Ad+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Rd[i]=1});var be=function(i){qu(t,i);function t(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:xs(r))||this;var l=a.vars,c=l.duration,h=l.delay,u=l.immediateRender,p=l.stagger,m=l.overwrite,g=l.keyframes,_=l.defaults,f=l.scrollTrigger,d=l.yoyoEase,v=r.parent||ge,M=(Fe(n)||Zu(n)?ni(n[0]):"length"in r)?[n]:Mn(n),x,A,T,w,R,y,S,P;if(a._targets=M.length?uc(M):Ts("GSAP target "+n+" not found. https://gsap.com",!ln.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=m,g||p||go(c)||go(h)){if(r=a.vars,x=a.timeline=new Ve({data:"nested",defaults:_||{},targets:v&&v.data==="nested"?v.vars.targets:M}),x.kill(),x.parent=x._dp=$n(a),x._start=0,p||go(c)||go(h)){if(w=M.length,S=p&&dd(p),Hn(p))for(R in p)~Ad.indexOf(R)&&(P||(P={}),P[R]=p[R]);for(A=0;A<w;A++)T=Io(r,Rd),T.stagger=0,d&&(T.yoyoEase=d),P&&qr(T,P),y=M[A],T.duration=+Ms(c,$n(a),A,y,M),T.delay=(+Ms(h,$n(a),A,y,M)||0)-a._delay,!p&&w===1&&T.delay&&(a._delay=h=T.delay,a._start+=h,T.delay=0),x.to(y,T,S?S(A,y,M):0),x._ease=Gt.none;x.duration()?c=h=0:a.timeline=0}else if(g){xs(hn(x.vars.defaults,{ease:"none"})),x._ease=Ki(g.ease||r.ease||"none");var F=0,I,V,W;if(Fe(g))g.forEach(function(z){return x.to(M,z,">")}),x.duration();else{T={};for(R in g)R==="ease"||R==="easeEach"||ox(R,g[R],T,g.easeEach);for(R in T)for(I=T[R].sort(function(z,q){return z.t-q.t}),F=0,A=0;A<I.length;A++)V=I[A],W={ease:V.e,duration:(V.t-(A?I[A-1].t:0))/100*c},W[R]=V.v,x.to(M,W,F),F+=W.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return m===!0&&!rc&&(_i=$n(a),ge.killTweensOf(M),_i=0),Fn(v,$n(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(u||!c&&!g&&a._start===_e(v._time)&&je(u)&&Fv($n(a))&&v.data!=="nested")&&(a._tTime=-oe,a.render(Math.max(0,-h)||0)),f&&ld($n(a),f),a}var e=t.prototype;return e.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,h=r<0,u=r>l-oe&&!h?l:r<oe?0:r,p,m,g,_,f,d,v,M,x;if(!c)zv(this,r,s,o);else if(u!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(p=u,M=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+r,s,o);if(p=_e(u%_),u===l?(g=this._repeat,p=c):(f=_e(u/_),g=~~f,g&&g===f?(p=c,g--):p>c&&(p=c)),d=this._yoyo&&g&1,d&&(x=this._yEase,p=c-p),f=jr(this._tTime,_),p===a&&!o&&this._initted&&g===f)return this._tTime=u,this;g!==f&&(M&&this._yEase&&Ed(M,d),this.vars.repeatRefresh&&!d&&!this._lock&&p!==_&&this._initted&&(this._lock=o=1,this.render(_e(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(cd(this,h?r:p,o,s,u))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==f))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._tTime=u,this._time=p,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=v=(x||this._ease)(p/c),this._from&&(this.ratio=v=1-v),!a&&u&&!s&&!f&&(on(this,"onStart"),this._tTime!==u))return this;for(m=this._pt;m;)m.r(v,m.d),m=m._next;M&&M.render(r<0?r:M._dur*M._ease(p/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(h&&Pl(this,r,s,o),on(this,"onUpdate")),this._repeat&&g!==f&&this.vars.onRepeat&&!s&&this.parent&&on(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&Pl(this,r,!0,!0),(r||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Ri(this,1),!s&&!(h&&!a)&&(u||a||d)&&(on(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},e.resetTo=function(r,s,o,a,l){Rs||sn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||pc(this,c),h=this._ease(c/this._dur),rx(this,r,s,o,a,h,c,l)?this.resetTo(r,s,o,a,1):(qo(this,0),this.parent||od(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?gs(this):this.scrollTrigger&&this.scrollTrigger.kill(!!De),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,_i&&_i.vars.overwrite!==!0)._first||gs(this),this.parent&&o!==this.timeline.totalDuration()&&Zr(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Mn(r):a,c=this._ptLookup,h=this._pt,u,p,m,g,_,f,d;if((!s||s==="all")&&Nv(a,l))return s==="all"&&(this._pt=0),gs(this);for(u=this._op=this._op||[],s!=="all"&&(Pe(s)&&(_={},Ze(s,function(v){return _[v]=1}),s=_),s=sx(a,s)),d=a.length;d--;)if(~l.indexOf(a[d])){p=c[d],s==="all"?(u[d]=s,g=p,m={}):(m=u[d]=u[d]||{},g=s);for(_ in g)f=p&&p[_],f&&((!("kill"in f.d)||f.d.kill(_)===!0)&&Xo(this,f,"_pt"),delete p[_]),m!=="all"&&(m[_]=1)}return this._initted&&!this._pt&&h&&gs(this),this},t.to=function(r,s){return new t(r,s,arguments[2])},t.from=function(r,s){return ys(1,arguments)},t.delayedCall=function(r,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(r,s,o){return ys(2,arguments)},t.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(r,s)},t.killTweensOf=function(r,s,o){return ge.killTweensOf(r,s,o)},t}(Cs);hn(be.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ze("staggerTo,staggerFrom,staggerFromTo",function(i){be[i]=function(){var t=new Ve,e=Ll.call(arguments,0);return e.splice(i==="staggerFromTo"?5:4,0,0),t[i].apply(t,e)}});var mc=function(t,e,n){return t[e]=n},Cd=function(t,e,n){return t[e](n)},ax=function(t,e,n,r){return t[e](r.fp,n)},lx=function(t,e,n){return t.setAttribute(e,n)},_c=function(t,e){return ye(t[e])?Cd:sc(t[e])&&t.setAttribute?lx:mc},Pd=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},cx=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Dd=function(t,e){var n=e._pt,r="";if(!t&&e.b)r=e.b;else if(t===1&&e.e)r=e.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+r,n=n._next;r+=e.c}e.set(e.t,e.p,r,e)},gc=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},hx=function(t,e,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(t,e,n),s=o},ux=function(t){for(var e=this._pt,n,r;e;)r=e._next,e.p===t&&!e.op||e.op===t?Xo(this,e,"_pt"):e.dep||(n=1),e=r;return!n},dx=function(t,e,n,r){r.mSet(t,e,r.m.call(r.tween,n,r.mt),r)},Ld=function(t){for(var e=t._pt,n,r,s,o;e;){for(n=e._next,r=s;r&&r.pr>e.pr;)r=r._next;(e._prev=r?r._prev:o)?e._prev._next=e:s=e,(e._next=r)?r._prev=e:o=e,e=n}t._pt=s},$e=function(){function i(e,n,r,s,o,a,l,c,h){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||Pd,this.d=l||this,this.set=c||mc,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=i.prototype;return t.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=dx,this.m=n,this.mt=s,this.tween=r},i}();Ze(hc+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return cc[i]=1});cn.TweenMax=cn.TweenLite=be;cn.TimelineLite=cn.TimelineMax=Ve;ge=new Ve({sortChildren:!1,defaults:Yr,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});ln.stringFilter=Md;var Ji=[],Ao={},fx=[],Jh=0,px=0,Ia=function(t){return(Ao[t]||fx).map(function(e){return e()})},Ol=function(){var t=Date.now(),e=[];t-Jh>2&&(Ia("matchMediaInit"),Ji.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=Un.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),Ia("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Jh=t,Ia("matchMedia"))},Id=function(){function i(e,n){this.selector=n&&Il(n),this.data=[],this._r=[],this.isReverted=!1,this.id=px++,e&&this.add(e)}var t=i.prototype;return t.add=function(n,r,s){ye(n)&&(s=r,r=n,n=ye);var o=this,a=function(){var c=pe,h=o.selector,u;return c&&c!==o&&c.data.push(o),s&&(o.selector=Il(s)),pe=o,u=r.apply(o,arguments),ye(u)&&o._r.push(u),pe=c,o.selector=h,o.isReverted=!1,u};return o.last=a,n===ye?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var r=pe;pe=null,n(this),pe=r},t.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof be&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,r){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Ve?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof be)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Ji.length;o--;)Ji[o].id===this.id&&Ji.splice(o,1)},t.revert=function(n){this.kill(n||{})},i}(),mx=function(){function i(e){this.contexts=[],this.scope=e,pe&&pe.data.push(this)}var t=i.prototype;return t.add=function(n,r,s){Hn(n)||(n={matches:n});var o=new Id(0,s||this.scope),a=o.conditions={},l,c,h;pe&&!o.selector&&(o.selector=pe.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?h=1:(l=Un.matchMedia(n[c]),l&&(Ji.indexOf(o)<0&&Ji.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(Ol):l.addEventListener("change",Ol)));return h&&r(o,function(u){return o.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),No={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(r){return vd(r)})},timeline:function(t){return new Ve(t)},getTweensOf:function(t,e){return ge.getTweensOf(t,e)},getProperty:function(t,e,n,r){Pe(t)&&(t=Mn(t)[0]);var s=Zi(t||{}).get,o=n?sd:rd;return n==="native"&&(n=""),t&&(e?o((nn[e]&&nn[e].get||s)(t,e,n,r)):function(a,l,c){return o((nn[a]&&nn[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Mn(t),t.length>1){var r=t.map(function(h){return Je.quickSetter(h,e,n)}),s=r.length;return function(h){for(var u=s;u--;)r[u](h)}}t=t[0]||{};var o=nn[e],a=Zi(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var u=new o;Pr._pt=0,u.init(t,n?h+n:h,Pr,0,[t]),u.render(1,u),Pr._pt&&gc(1,Pr)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var r,s=Je.to(t,hn((r={},r[e]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,h){return s.resetTo(e,l,c,h)};return o.tween=s,o},isTweening:function(t){return ge.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Ki(t.ease,Yr.ease)),qh(Yr,t||{})},config:function(t){return qh(ln,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,r=t.plugins,s=t.defaults,o=t.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!nn[a]&&!cn[a]&&Ts(e+" effect requires "+a+" plugin.")}),Ca[e]=function(a,l,c){return n(Mn(a),hn(l||{},s),c)},o&&(Ve.prototype[e]=function(a,l,c){return this.add(Ca[e](a,Hn(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){Gt[t]=Ki(e)},parseEase:function(t,e){return arguments.length?Ki(t,e):Gt},getById:function(t){return ge.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Ve(t),r,s;for(n.smoothChildTiming=je(t.smoothChildTiming),ge.remove(n),n._dp=0,n._time=n._tTime=ge._time,r=ge._first;r;)s=r._next,(e||!(!r._dur&&r instanceof be&&r.vars.onComplete===r._targets[0]))&&Fn(n,r,r._start-r._delay),r=s;return Fn(ge,n,0),n},context:function(t,e){return t?new Id(t,e):pe},matchMedia:function(t){return new mx(t)},matchMediaRefresh:function(){return Ji.forEach(function(t){var e=t.conditions,n,r;for(r in e)e[r]&&(e[r]=!1,n=1);n&&t.revert()})||Ol()},addEventListener:function(t,e){var n=Ao[t]||(Ao[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Ao[t],r=n&&n.indexOf(e);r>=0&&n.splice(r,1)},utils:{wrap:qv,wrapYoyo:jv,distribute:dd,random:pd,snap:fd,normalize:Yv,getUnit:Ne,clamp:Vv,splitColor:xd,toArray:Mn,selector:Il,mapRange:_d,pipe:Wv,unitize:Xv,interpolate:Zv,shuffle:ud},install:Qu,effects:Ca,ticker:sn,updateRoot:Ve.updateRoot,plugins:nn,globalTimeline:ge,core:{PropTween:$e,globals:td,Tween:be,Timeline:Ve,Animation:Cs,getCache:Zi,_removeLinkedListItem:Xo,reverting:function(){return De},context:function(t){return t&&pe&&(pe.data.push(t),t._ctx=pe),pe},suppressOverwrites:function(t){return rc=t}}};Ze("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return No[i]=be[i]});sn.add(Ve.updateRoot);Pr=No.to({},{duration:0});var _x=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},gx=function(t,e){var n=t._targets,r,s,o;for(r in e)for(s=n.length;s--;)o=t._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=_x(o,r)),o&&o.modifier&&o.modifier(e[r],t,n[s],r))},Ua=function(t,e){return{name:t,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(Pe(s)&&(l={},Ze(s,function(h){return l[h]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}gx(a,s)}}}},Je=No.registerPlugin({name:"attr",init:function(t,e,n,r,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)De?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Ua("roundProps",Ul),Ua("modifiers"),Ua("snap",fd))||No;be.version=Ve.version=Je.version="3.14.2";Ju=1;oc()&&$r();Gt.Power0;Gt.Power1;Gt.Power2;Gt.Power3;Gt.Power4;Gt.Linear;Gt.Quad;Gt.Cubic;Gt.Quart;Gt.Quint;Gt.Strong;Gt.Elastic;Gt.Back;Gt.SteppedEase;Gt.Bounce;Gt.Sine;Gt.Expo;Gt.Circ;/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Qh,gi,Fr,vc,ji,tu,xc,vx=function(){return typeof window<"u"},ii={},Gi=180/Math.PI,Br=Math.PI/180,wr=Math.atan2,eu=1e8,yc=/([A-Z])/g,xx=/(left|right|width|margin|padding|x)/i,yx=/[\s,\(]\S/,zn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Fl=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Mx=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Sx=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Ex=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},bx=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Ud=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Nd=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},Tx=function(t,e,n){return t.style[e]=n},wx=function(t,e,n){return t.style.setProperty(e,n)},Ax=function(t,e,n){return t._gsap[e]=n},Rx=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},Cx=function(t,e,n,r,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},Px=function(t,e,n,r,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},ve="transform",Ke=ve+"Origin",Dx=function i(t,e){var n=this,r=this.target,s=r.style,o=r._gsap;if(t in ii&&s){if(this.tfm=this.tfm||{},t!=="transform")t=zn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Kn(r,a)}):this.tfm[t]=o.x?o[t]:Kn(r,t),t===Ke&&(this.tfm.zOrigin=o.zOrigin);else return zn.transform.split(",").forEach(function(a){return i.call(n,a,e)});if(this.props.indexOf(ve)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Ke,e,"")),t=ve}(s||e)&&this.props.push(t,e,s[t])},Od=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},Lx=function(){var t=this.props,e=this.target,n=e.style,r=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(yc,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=xc(),(!s||!s.isStart)&&!n[ve]&&(Od(n),r.zOrigin&&n[Ke]&&(n[Ke]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Fd=function(t,e){var n={target:t,props:[],revert:Lx,save:Dx};return t._gsap||Je.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(r){return n.save(r)}),n},Bd,Bl=function(t,e){var n=gi.createElementNS?gi.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):gi.createElement(t);return n&&n.style?n:gi.createElement(t)},an=function i(t,e,n){var r=getComputedStyle(t);return r[e]||r.getPropertyValue(e.replace(yc,"-$1").toLowerCase())||r.getPropertyValue(e)||!n&&i(t,Kr(e)||e,1)||""},nu="O,Moz,ms,Ms,Webkit".split(","),Kr=function(t,e,n){var r=e||ji,s=r.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(nu[o]+t in s););return o<0?null:(o===3?"ms":o>=0?nu[o]:"")+t},zl=function(){vx()&&window.document&&(Qh=window,gi=Qh.document,Fr=gi.documentElement,ji=Bl("div")||{style:{}},Bl("div"),ve=Kr(ve),Ke=ve+"Origin",ji.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Bd=!!Kr("perspective"),xc=Je.core.reverting,vc=1)},iu=function(t){var e=t.ownerSVGElement,n=Bl("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=t.cloneNode(!0),s;r.style.display="block",n.appendChild(r),Fr.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),Fr.removeChild(n),s},ru=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},zd=function(t){var e,n;try{e=t.getBBox()}catch{e=iu(t),n=1}return e&&(e.width||e.height)||n||(e=iu(t)),e&&!e.width&&!e.x&&!e.y?{x:+ru(t,["x","cx","x1"])||0,y:+ru(t,["y","cy","y1"])||0,width:0,height:0}:e},kd=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&zd(t))},Ci=function(t,e){if(e){var n=t.style,r;e in ii&&e!==Ke&&(e=ve),n.removeProperty?(r=e.substr(0,2),(r==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(r==="--"?e:e.replace(yc,"-$1").toLowerCase())):n.removeAttribute(e)}},vi=function(t,e,n,r,s,o){var a=new $e(t._pt,e,n,0,1,o?Nd:Ud);return t._pt=a,a.b=r,a.e=s,t._props.push(n),a},su={deg:1,rad:1,turn:1},Ix={grid:1,flex:1},Pi=function i(t,e,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=ji.style,l=xx.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,p=r==="px",m=r==="%",g,_,f,d;if(r===o||!s||su[r]||su[o])return s;if(o!=="px"&&!p&&(s=i(t,e,n,"px")),d=t.getCTM&&kd(t),(m||o==="%")&&(ii[e]||~e.indexOf("adius")))return g=d?t.getBBox()[l?"width":"height"]:t[h],Se(m?s/g*u:s/100*g);if(a[l?"width":"height"]=u+(p?o:r),_=r!=="rem"&&~e.indexOf("adius")||r==="em"&&t.appendChild&&!c?t:t.parentNode,d&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===gi||!_.appendChild)&&(_=gi.body),f=_._gsap,f&&m&&f.width&&l&&f.time===sn.time&&!f.uncache)return Se(s/f.width*u);if(m&&(e==="height"||e==="width")){var v=t.style[e];t.style[e]=u+r,g=t[h],v?t.style[e]=v:Ci(t,e)}else(m||o==="%")&&!Ix[an(_,"display")]&&(a.position=an(t,"position")),_===t&&(a.position="static"),_.appendChild(ji),g=ji[h],_.removeChild(ji),a.position="absolute";return l&&m&&(f=Zi(_),f.time=sn.time,f.width=_[h]),Se(p?g*s/u:g&&s?u/g*s:0)},Kn=function(t,e,n,r){var s;return vc||zl(),e in zn&&e!=="transform"&&(e=zn[e],~e.indexOf(",")&&(e=e.split(",")[0])),ii[e]&&e!=="transform"?(s=Ds(t,r),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Fo(an(t,Ke))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Oo[e]&&Oo[e](t,e,n)||an(t,e)||nd(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Pi(t,e,s,n)+n:s},Ux=function(t,e,n,r){if(!n||n==="none"){var s=Kr(e,t,1),o=s&&an(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=an(t,"borderTopColor"))}var a=new $e(this._pt,t.style,e,0,1,Dd),l=0,c=0,h,u,p,m,g,_,f,d,v,M,x,A;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=an(t,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=t.style[e],t.style[e]=r,r=an(t,e)||r,_?t.style[e]=_:Ci(t,e)),h=[n,r],Md(h),n=h[0],r=h[1],p=n.match(Cr)||[],A=r.match(Cr)||[],A.length){for(;u=Cr.exec(r);)f=u[0],v=r.substring(l,u.index),g?g=(g+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(g=1),f!==(_=p[c++]||"")&&(m=parseFloat(_)||0,x=_.substr((m+"").length),f.charAt(1)==="="&&(f=Or(m,f)+x),d=parseFloat(f),M=f.substr((d+"").length),l=Cr.lastIndex-M.length,M||(M=M||ln.units[e]||x,l===r.length&&(r+=M,a.e+=M)),x!==M&&(m=Pi(t,e,_,M)||0),a._pt={_next:a._pt,p:v||c===1?v:",",s:m,c:d-m,m:g&&g<4||e==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=e==="display"&&r==="none"?Nd:Ud;return Ku.test(r)&&(a.e=0),this._pt=a,a},ou={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Nx=function(t){var e=t.split(" "),n=e[0],r=e[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(t=n,n=r,r=t),e[0]=ou[n]||n,e[1]=ou[r]||r,e.join(" ")},Ox=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,r=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],ii[a]&&(l=1,a=a==="transformOrigin"?Ke:ve),Ci(n,a);l&&(Ci(n,ve),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Ds(n,1),o.uncache=1,Od(r)))}},Oo={clearProps:function(t,e,n,r,s){if(s.data!=="isFromStart"){var o=t._pt=new $e(t._pt,e,n,0,0,Ox);return o.u=r,o.pr=-10,o.tween=s,t._props.push(n),1}}},Ps=[1,0,0,1,0,0],Hd={},Vd=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},au=function(t){var e=an(t,ve);return Vd(e)?Ps:e.substr(7).match($u).map(Se)},Mc=function(t,e){var n=t._gsap||Zi(t),r=t.style,s=au(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ps:s):(s===Ps&&!t.offsetParent&&t!==Fr&&!n.svg&&(l=r.display,r.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,Fr.appendChild(t)),s=au(t),l?r.display=l:Ci(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Fr.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},kl=function(t,e,n,r,s,o){var a=t._gsap,l=s||Mc(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,u=a.xOffset||0,p=a.yOffset||0,m=l[0],g=l[1],_=l[2],f=l[3],d=l[4],v=l[5],M=e.split(" "),x=parseFloat(M[0])||0,A=parseFloat(M[1])||0,T,w,R,y;n?l!==Ps&&(w=m*f-g*_)&&(R=x*(f/w)+A*(-_/w)+(_*v-f*d)/w,y=x*(-g/w)+A*(m/w)-(m*v-g*d)/w,x=R,A=y):(T=zd(t),x=T.x+(~M[0].indexOf("%")?x/100*T.width:x),A=T.y+(~(M[1]||M[0]).indexOf("%")?A/100*T.height:A)),r||r!==!1&&a.smooth?(d=x-c,v=A-h,a.xOffset=u+(d*m+v*_)-d,a.yOffset=p+(d*g+v*f)-v):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=A,a.smooth=!!r,a.origin=e,a.originIsAbsolute=!!n,t.style[Ke]="0px 0px",o&&(vi(o,a,"xOrigin",c,x),vi(o,a,"yOrigin",h,A),vi(o,a,"xOffset",u,a.xOffset),vi(o,a,"yOffset",p,a.yOffset)),t.setAttribute("data-svg-origin",x+" "+A)},Ds=function(t,e){var n=t._gsap||new Td(t);if("x"in n&&!e&&!n.uncache)return n;var r=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=an(t,Ke)||"0",h,u,p,m,g,_,f,d,v,M,x,A,T,w,R,y,S,P,F,I,V,W,z,q,k,it,rt,vt,Pt,Kt,Y,tt;return h=u=p=_=f=d=v=M=x=0,m=g=1,n.svg=!!(t.getCTM&&kd(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[ve]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[ve]!=="none"?l[ve]:"")),r.scale=r.rotate=r.translate="none"),w=Mc(t,n.svg),n.svg&&(n.uncache?(k=t.getBBox(),c=n.xOrigin-k.x+"px "+(n.yOrigin-k.y)+"px",q=""):q=!e&&t.getAttribute("data-svg-origin"),kl(t,q||c,!!q||n.originIsAbsolute,n.smooth!==!1,w)),A=n.xOrigin||0,T=n.yOrigin||0,w!==Ps&&(P=w[0],F=w[1],I=w[2],V=w[3],h=W=w[4],u=z=w[5],w.length===6?(m=Math.sqrt(P*P+F*F),g=Math.sqrt(V*V+I*I),_=P||F?wr(F,P)*Gi:0,v=I||V?wr(I,V)*Gi+_:0,v&&(g*=Math.abs(Math.cos(v*Br))),n.svg&&(h-=A-(A*P+T*I),u-=T-(A*F+T*V))):(tt=w[6],Kt=w[7],rt=w[8],vt=w[9],Pt=w[10],Y=w[11],h=w[12],u=w[13],p=w[14],R=wr(tt,Pt),f=R*Gi,R&&(y=Math.cos(-R),S=Math.sin(-R),q=W*y+rt*S,k=z*y+vt*S,it=tt*y+Pt*S,rt=W*-S+rt*y,vt=z*-S+vt*y,Pt=tt*-S+Pt*y,Y=Kt*-S+Y*y,W=q,z=k,tt=it),R=wr(-I,Pt),d=R*Gi,R&&(y=Math.cos(-R),S=Math.sin(-R),q=P*y-rt*S,k=F*y-vt*S,it=I*y-Pt*S,Y=V*S+Y*y,P=q,F=k,I=it),R=wr(F,P),_=R*Gi,R&&(y=Math.cos(R),S=Math.sin(R),q=P*y+F*S,k=W*y+z*S,F=F*y-P*S,z=z*y-W*S,P=q,W=k),f&&Math.abs(f)+Math.abs(_)>359.9&&(f=_=0,d=180-d),m=Se(Math.sqrt(P*P+F*F+I*I)),g=Se(Math.sqrt(z*z+tt*tt)),R=wr(W,z),v=Math.abs(R)>2e-4?R*Gi:0,x=Y?1/(Y<0?-Y:Y):0),n.svg&&(q=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Vd(an(t,ve)),q&&t.setAttribute("transform",q))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(m*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,v+=v<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=p+o,n.scaleX=Se(m),n.scaleY=Se(g),n.rotation=Se(_)+a,n.rotationX=Se(f)+a,n.rotationY=Se(d)+a,n.skewX=v+a,n.skewY=M+a,n.transformPerspective=x+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(r[Ke]=Fo(c)),n.xOffset=n.yOffset=0,n.force3D=ln.force3D,n.renderTransform=n.svg?Bx:Bd?Gd:Fx,n.uncache=0,n},Fo=function(t){return(t=t.split(" "))[0]+" "+t[1]},Na=function(t,e,n){var r=Ne(e);return Se(parseFloat(e)+parseFloat(Pi(t,"x",n+"px",r)))+r},Fx=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Gd(t,e)},ki="0deg",fs="0px",Hi=") ",Gd=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,p=n.skewX,m=n.skewY,g=n.scaleX,_=n.scaleY,f=n.transformPerspective,d=n.force3D,v=n.target,M=n.zOrigin,x="",A=d==="auto"&&t&&t!==1||d===!0;if(M&&(u!==ki||h!==ki)){var T=parseFloat(h)*Br,w=Math.sin(T),R=Math.cos(T),y;T=parseFloat(u)*Br,y=Math.cos(T),o=Na(v,o,w*y*-M),a=Na(v,a,-Math.sin(T)*-M),l=Na(v,l,R*y*-M+M)}f!==fs&&(x+="perspective("+f+Hi),(r||s)&&(x+="translate("+r+"%, "+s+"%) "),(A||o!==fs||a!==fs||l!==fs)&&(x+=l!==fs||A?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Hi),c!==ki&&(x+="rotate("+c+Hi),h!==ki&&(x+="rotateY("+h+Hi),u!==ki&&(x+="rotateX("+u+Hi),(p!==ki||m!==ki)&&(x+="skew("+p+", "+m+Hi),(g!==1||_!==1)&&(x+="scale("+g+", "+_+Hi),v.style[ve]=x||"translate(0, 0)"},Bx=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,p=n.scaleY,m=n.target,g=n.xOrigin,_=n.yOrigin,f=n.xOffset,d=n.yOffset,v=n.forceCSS,M=parseFloat(o),x=parseFloat(a),A,T,w,R,y;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Br,c*=Br,A=Math.cos(l)*u,T=Math.sin(l)*u,w=Math.sin(l-c)*-p,R=Math.cos(l-c)*p,c&&(h*=Br,y=Math.tan(c-h),y=Math.sqrt(1+y*y),w*=y,R*=y,h&&(y=Math.tan(h),y=Math.sqrt(1+y*y),A*=y,T*=y)),A=Se(A),T=Se(T),w=Se(w),R=Se(R)):(A=u,R=p,T=w=0),(M&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(M=Pi(m,"x",o,"px"),x=Pi(m,"y",a,"px")),(g||_||f||d)&&(M=Se(M+g-(g*A+_*w)+f),x=Se(x+_-(g*T+_*R)+d)),(r||s)&&(y=m.getBBox(),M=Se(M+r/100*y.width),x=Se(x+s/100*y.height)),y="matrix("+A+","+T+","+w+","+R+","+M+","+x+")",m.setAttribute("transform",y),v&&(m.style[ve]=y)},zx=function(t,e,n,r,s){var o=360,a=Pe(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Gi:1),c=l-r,h=r+c+"deg",u,p;return a&&(u=s.split("_")[1],u==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),u==="cw"&&c<0?c=(c+o*eu)%o-~~(c/o)*o:u==="ccw"&&c>0&&(c=(c-o*eu)%o-~~(c/o)*o)),t._pt=p=new $e(t._pt,e,n,r,c,Mx),p.e=h,p.u="deg",t._props.push(n),p},lu=function(t,e){for(var n in e)t[n]=e[n];return t},kx=function(t,e,n){var r=lu({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,u,p,m,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[ve]=e,a=Ds(n,1),Ci(n,ve),n.setAttribute("transform",c)):(c=getComputedStyle(n)[ve],o[ve]=e,a=Ds(n,1),o[ve]=c);for(l in ii)c=r[l],h=a[l],c!==h&&s.indexOf(l)<0&&(m=Ne(c),g=Ne(h),u=m!==g?Pi(n,l,c,g):parseFloat(c),p=parseFloat(h),t._pt=new $e(t._pt,a,l,u,p-u,Fl),t._pt.u=g||0,t._props.push(l));lu(a,r)};Ze("padding,margin,Width,Radius",function(i,t){var e="Top",n="Right",r="Bottom",s="Left",o=(t<3?[e,n,r,s]:[e+s,e+n,r+n,r+s]).map(function(a){return t<2?i+a:"border"+a+i});Oo[t>1?"border"+i:i]=function(a,l,c,h,u){var p,m;if(arguments.length<4)return p=o.map(function(g){return Kn(a,g,c)}),m=p.join(" "),m.split(p[0]).length===5?p[0]:m;p=(h+"").split(" "),m={},o.forEach(function(g,_){return m[g]=p[_]=p[_]||p[(_-1)/2|0]}),a.init(l,m,u)}});var Wd={name:"css",register:zl,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,r,s){var o=this._props,a=t.style,l=n.vars.startAt,c,h,u,p,m,g,_,f,d,v,M,x,A,T,w,R,y;vc||zl(),this.styles=this.styles||Fd(t),R=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(nn[_]&&wd(_,e,n,r,t,s)))){if(m=typeof h,g=Oo[_],m==="function"&&(h=h.call(n,r,t,s),m=typeof h),m==="string"&&~h.indexOf("random(")&&(h=As(h)),g)g(this,t,_,h,n)&&(w=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",Ti.lastIndex=0,Ti.test(c)||(f=Ne(c),d=Ne(h),d?f!==d&&(c=Pi(t,_,c,d)+d):f&&(h+=f)),this.add(a,"setProperty",c,h,r,s,0,0,_),o.push(_),R.push(_,0,a[_]);else if(m!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,r,t,s):l[_],Pe(c)&&~c.indexOf("random(")&&(c=As(c)),Ne(c+"")||c==="auto"||(c+=ln.units[_]||Ne(Kn(t,_))||""),(c+"").charAt(1)==="="&&(c=Kn(t,_))):c=Kn(t,_),p=parseFloat(c),v=m==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),u=parseFloat(h),_ in zn&&(_==="autoAlpha"&&(p===1&&Kn(t,"visibility")==="hidden"&&u&&(p=0),R.push("visibility",0,a.visibility),vi(this,a,"visibility",p?"inherit":"hidden",u?"inherit":"hidden",!u)),_!=="scale"&&_!=="transform"&&(_=zn[_],~_.indexOf(",")&&(_=_.split(",")[0]))),M=_ in ii,M){if(this.styles.save(_),y=h,m==="string"&&h.substring(0,6)==="var(--"){if(h=an(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var S=t.style.perspective;t.style.perspective=h,h=an(t,"perspective"),S?t.style.perspective=S:Ci(t,"perspective")}u=parseFloat(h)}if(x||(A=t._gsap,A.renderTransform&&!e.parseTransform||Ds(t,e.parseTransform),T=e.smoothOrigin!==!1&&A.smooth,x=this._pt=new $e(this._pt,a,ve,0,1,A.renderTransform,A,0,-1),x.dep=1),_==="scale")this._pt=new $e(this._pt,A,"scaleY",A.scaleY,(v?Or(A.scaleY,v+u):u)-A.scaleY||0,Fl),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(Ke,0,a[Ke]),h=Nx(h),A.svg?kl(t,h,0,T,0,this):(d=parseFloat(h.split(" ")[2])||0,d!==A.zOrigin&&vi(this,A,"zOrigin",A.zOrigin,d),vi(this,a,_,Fo(c),Fo(h)));continue}else if(_==="svgOrigin"){kl(t,h,1,T,0,this);continue}else if(_ in Hd){zx(this,A,_,p,v?Or(p,v+h):h);continue}else if(_==="smoothOrigin"){vi(this,A,"smooth",A.smooth,h);continue}else if(_==="force3D"){A[_]=h;continue}else if(_==="transform"){kx(this,h,t);continue}}else _ in a||(_=Kr(_)||_);if(M||(u||u===0)&&(p||p===0)&&!yx.test(h)&&_ in a)f=(c+"").substr((p+"").length),u||(u=0),d=Ne(h)||(_ in ln.units?ln.units[_]:f),f!==d&&(p=Pi(t,_,c,d)),this._pt=new $e(this._pt,M?A:a,_,p,(v?Or(p,v+u):u)-p,!M&&(d==="px"||_==="zIndex")&&e.autoRound!==!1?bx:Fl),this._pt.u=d||0,M&&y!==h?(this._pt.b=c,this._pt.e=y,this._pt.r=Ex):f!==d&&d!=="%"&&(this._pt.b=c,this._pt.r=Sx);else if(_ in a)Ux.call(this,t,_,c,v?v+h:h);else if(_ in t)this.add(t,_,c||t[_],v?v+h:h,r,s);else if(_!=="parseTransform"){lc(_,h);continue}M||(_ in a?R.push(_,0,a[_]):typeof t[_]=="function"?R.push(_,2,t[_]()):R.push(_,1,c||t[_])),o.push(_)}}w&&Ld(this)},render:function(t,e){if(e.tween._time||!xc())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Kn,aliases:zn,getSetter:function(t,e,n){var r=zn[e];return r&&r.indexOf(",")<0&&(e=r),e in ii&&e!==Ke&&(t._gsap.x||Kn(t,"x"))?n&&tu===n?e==="scale"?Rx:Ax:(tu=n||{})&&(e==="scale"?Cx:Px):t.style&&!sc(t.style[e])?Tx:~e.indexOf("-")?wx:_c(t,e)},core:{_removeProperty:Ci,_getMatrix:Mc}};Je.utils.checkPrefix=Kr;Je.core.getStyleSaver=Fd;(function(i,t,e,n){var r=Ze(i+","+t+","+e,function(s){ii[s]=1});Ze(t,function(s){ln.units[s]="deg",Hd[s]=1}),zn[r[13]]=i+","+t,Ze(n,function(s){var o=s.split(":");zn[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ze("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){ln.units[i]="px"});Je.registerPlugin(Wd);var En=Je.registerPlugin(Wd)||Je;En.core.Tween;const fe=[{id:"leo",name:"Leo",fullName:"Leonardo Alloni",role:"Frontend · Commerciale",emoji:"🎨",hex:"#3b82f6",threeColor:3900150,deskColor:14412542,screenColor:165063,position:[-7,0,-3],camPos:[-7,2.2,1.5],camTarget:[-7,1.3,-3],bio:"Il volto del progetto. Trasforma wireframe in interfacce bellissime e poi le vende al cliente con un sorriso.",funFact:"Se gli chiedi un bottone veloce, ti consegna tre varianti, due hover e una vendita chiusa.",tags:["React","CSS","Figma","Sales"],skills:[{name:"Figma",level:95},{name:"React",level:88},{name:"CSS",level:91},{name:"Sales",level:83}],social:{github:"",linkedin:"",email:""},deskType:"designer"},{id:"teo",name:"Teo",fullName:"Matteo Vattimo",role:"Project Owner · Dev · IT",emoji:"📋",hex:"#f97316",threeColor:16347926,deskColor:16772565,screenColor:15357964,position:[-3,0,1.5],camPos:[-3,2.2,6],camTarget:[-3,1.3,1.5],bio:"Il comandante silenzioso. Tiene tutto sotto controllo con milestone, sprint e una quantita industriale di caffe.",funFact:"Non perde mai il filo: al massimo apre una board nuova per spiegare perche non l ha perso.",tags:["Scrum","Jira","Network","Code"],skills:[{name:"Scrum",level:92},{name:"Jira",level:87},{name:"Network",level:74},{name:"Dev",level:70}],social:{github:"",linkedin:"",email:""},deskType:"pm"},{id:"napo",name:"Napo",fullName:"Filippo Napolitano",role:"Ideatore · Dev · Dir. Amm.",emoji:"💡",hex:"#8b5cf6",threeColor:9133302,deskColor:15591934,screenColor:8141549,position:[0,0,-5],camPos:[0,2.5,0],camTarget:[0,1.3,-5],bio:"La mente dietro tutto. Ogni lunedi ha l idea del secolo. Il venerdi e gia cambiata tre volte.",funFact:"Le sue idee arrivano cosi in fretta che il team deve fare deploy solo per stargli dietro.",tags:["Strategy","Vision","Admin","Dev"],skills:[{name:"Strategy",level:96},{name:"Vision",level:93},{name:"Admin",level:81},{name:"Dev",level:67}],social:{github:"",linkedin:"",email:""},deskType:"director"},{id:"andre",name:"Andre",fullName:"Andrea di Pietro",role:"Tester · Supporto Tecnico",emoji:"🔍",hex:"#10b981",threeColor:1096065,deskColor:13761253,screenColor:366185,position:[3,0,1.5],camPos:[3,2.2,6],camTarget:[3,1.3,1.5],bio:"Il cacciatore di bug. Trova errori nel codice che non e ancora stato scritto.",funFact:"Ha rotto 3 ambienti di staging solo guardandoli fissi.",tags:["QA","Testing","Debug","Support"],skills:[{name:"Testing",level:94},{name:"QA",level:91},{name:"Debug",level:89},{name:"Support",level:82}],social:{github:"",linkedin:"",email:""},deskType:"tester"},{id:"dalla",name:"Dalla",fullName:"Matteo Dallavalle",role:"Developer · DB Admin · Support",emoji:"🗄️",hex:"#06b6d4",threeColor:440020,deskColor:13630206,screenColor:561586,position:[7,0,-3],camPos:[7,2.2,1.5],camTarget:[7,1.3,-3],bio:"Il custode dei dati. Sa dove vive ogni record, anche quelli che non sai di avere.",funFact:"I suoi JOIN sono cosi ottimizzati che il database gli manda i complimenti.",tags:["SQL","PostgreSQL","Dev","Support"],skills:[{name:"SQL",level:96},{name:"PostgreSQL",level:93},{name:"Dev",level:79},{name:"Support",level:77}],social:{github:"",linkedin:"",email:""},deskType:"db"}];CanvasRenderingContext2D.prototype.roundRect||(CanvasRenderingContext2D.prototype.roundRect=function(i,t,e,n,r){this.beginPath(),this.moveTo(i+r,t),this.lineTo(i+e-r,t),this.quadraticCurveTo(i+e,t,i+e,t+r),this.lineTo(i+e,t+n-r),this.quadraticCurveTo(i+e,t+n,i+e-r,t+n),this.lineTo(i+r,t+n),this.quadraticCurveTo(i,t+n,i,t+n-r),this.lineTo(i,t+r),this.quadraticCurveTo(i,t,i+r,t),this.closePath()});let xi=!1,gn=null,Bs=!1,Ls=!1,Sc=!0;const Hx=.012,sr={},Ec=[],bc=[];let Is=null;const or=[];let Ss=null,Xd=[];const Tc=[],Us=document.getElementById("canvas"),ri=new Kg({canvas:Us,antialias:!0});ri.setSize(window.innerWidth,window.innerHeight);ri.setPixelRatio(Math.min(window.devicePixelRatio,2));ri.shadowMap.enabled=!0;ri.shadowMap.type=uu;ri.toneMapping=du;ri.toneMappingExposure=.95;const _t=new Jg;_t.background=new Vt(12111840);_t.fog=new tc(12111840,.02);const un=new rn(55,window.innerWidth/window.innerHeight,.1,300);un.position.set(0,20,32);un.lookAt(0,0,0);const Be=new hv(un,ri.domElement);Be.target.set(0,1.2,0);Be.enableDamping=!0;Be.dampingFactor=.06;Be.maxPolarAngle=Math.PI/2.05;Be.minPolarAngle=.15;Be.enablePan=!1;Be.minDistance=6;Be.maxDistance=26;Be.enabled=!1;function j(i,t,e,n,r={}){const s=new $(new gt(i,t,e),new ct({color:n,...r}));return s.castShadow=!0,s.receiveShadow=!0,s}function Di(i,t,e,n,r,s={}){const o=new $(new Bt(i,t,e,n),new ct({color:r,...s}));return o.castShadow=!0,o}function Vx(){_t.add(new sv(16774632,.65));const i=new rv(16773336,1.3);i.position.set(-6,10,4),i.castShadow=!0,i.shadow.mapSize.set(2048,2048),i.shadow.camera.near=.1,i.shadow.camera.far=50,i.shadow.camera.left=-14,i.shadow.camera.right=14,i.shadow.camera.top=14,i.shadow.camera.bottom=-14,i.shadow.bias=-.002,_t.add(i),[[-7,3.9,-1],[0,3.9,-2],[7,3.9,-1],[-4,3.9,3.5],[4,3.9,3.5]].forEach((n,r)=>{const s=new Pn(16775392,.88,9);s.position.set(...n),s.userData.baseIntensity=.88,s.userData.phase=r*1.3,_t.add(s),or.push({light:s,type:"ceil"})}),Ss=new Pn(6514417,1.4,8),Ss.position.set(0,3.5,-9.6),_t.add(Ss),[-7,0,7].forEach((n,r)=>{const s=new Pn(8108244,.28,10);s.position.set(n,2.3,-8.8),s.userData.phase=r*2.1,_t.add(s),Xd.push(s)});const e=new Pn(16757575,.55,12);e.position.set(0,2.8,8),_t.add(e),[[-7,.3,-3],[-3,.3,1.5],[0,.3,-5],[3,.3,1.5],[7,.3,-3]].forEach((n,r)=>{const s=new Pn(1976635,.18,4);s.position.set(...n),_t.add(s)})}function Jr(i,t){const r=document.createElement("canvas");r.width=640,r.height=400;const s=r.getContext("2d");s.fillStyle="#080c14",s.fillRect(0,0,640,400),s.fillStyle="#111827",s.fillRect(0,0,640,30),[["#ff5f57",14],["#ffbd2e",34],["#28ca41",54]].forEach(([a,l])=>{s.fillStyle=a,s.beginPath(),s.arc(l,15,6,0,Math.PI*2),s.fill()});const o={designer:"Figma  —  Dashboard.fig",pm:"Linear  —  Sprint 12",director:"Analytics  —  Q1 2026",tester:"Jest  —  friends-hq suite",db:"psql  —  friends_db"};return s.fillStyle="rgba(255,255,255,0.7)",s.font="10px sans-serif",s.textAlign="center",s.fillText(o[i]||i,640/2,20),s.textAlign="left",i==="designer"&&Gx(s,640,400,t),i==="pm"&&Wx(s,640,400,t),i==="director"&&Xx(s,640,400,t),i==="tester"&&Yx(s,640,400,t),i==="db"&&qx(s,640,400,t),new ec(r)}function Gx(i,t,e,n){const o=t-100-108;i.fillStyle="#1b1f2b",i.fillRect(0,30,100,e-30),i.fillStyle="#23283c",i.fillRect(0,30,100,20),i.fillStyle="rgba(255,255,255,0.45)",i.font="bold 9px sans-serif",i.fillText("LAYERS",8,44),[{d:0,s:!1,ic:"⬡",n:"Frame 1"},{d:1,s:!1,ic:"▭",n:"Navbar"},{d:2,s:!1,ic:"T",n:"Logo"},{d:2,s:!1,ic:"⬡",n:"NavLinks"},{d:1,s:!1,ic:"▭",n:"Hero"},{d:2,s:!1,ic:"T",n:"Headline"},{d:2,s:!0,ic:"▭",n:"CTA Button"},{d:1,s:!1,ic:"▭",n:"Cards"},{d:2,s:!1,ic:"▭",n:"Card_01"},{d:2,s:!1,ic:"▭",n:"Card_02"}].forEach(({d:m,s:g,ic:_,n:f},d)=>{const v=64+d*18;g&&(i.fillStyle=n+"2a",i.fillRect(0,v-12,100,16));const M=m===0?"0.85":m===1?"0.58":"0.38";i.fillStyle=g?n:`rgba(255,255,255,${M})`,i.font=(m===0?"bold ":"")+"8.5px sans-serif",i.fillText(`${_} ${f}`,4+m*10,v)}),i.fillStyle="#2d2d2d",i.fillRect(100,30,o,e-30);for(let m=108;m<100+o;m+=18)for(let g=40;g<e;g+=18)i.fillStyle="rgba(255,255,255,0.035)",i.fillRect(m,g,1.5,1.5);const l=256,c=246,h=100+(o-l)/2,u=44;i.fillStyle="rgba(255,255,255,0.22)",i.font="8px sans-serif",i.fillText("Dashboard / 1440×900",h,u-4),i.fillStyle="#f8fafc",i.fillRect(h,u,l,c),i.fillStyle="#0f172a",i.fillRect(h,u,l,24),i.fillStyle=n,i.font="bold 9px sans-serif",i.fillText("FHQ",h+8,u+16),["Home","Team","Work"].forEach((m,g)=>{i.fillStyle="rgba(255,255,255,0.42)",i.font="7.5px sans-serif",i.fillText(m,h+l-82+g*28,u+16)});const p=i.createLinearGradient(h,u+24,h,u+108);p.addColorStop(0,"#0f172a"),p.addColorStop(1,"#1e3058"),i.fillStyle=p,i.fillRect(h,u+24,l,84),i.fillStyle="rgba(255,255,255,0.92)",i.font="bold 13px sans-serif",i.fillText("Build · Ship · Grow",h+10,u+56),i.fillStyle="rgba(255,255,255,0.42)",i.font="9px sans-serif",i.fillText("Il tuo team, in 3D.",h+10,u+72),i.fillStyle=n,i.beginPath(),i.roundRect(h+10,u+82,70,18,9),i.fill(),i.fillStyle="white",i.font="bold 8px sans-serif",i.fillText("Entra →",h+24,u+94),i.strokeStyle=n,i.lineWidth=1.5,i.beginPath(),i.rect(h+8,u+80,74,22),i.stroke(),[[0,0],[1,0],[0,1],[1,1]].forEach(([m,g])=>{i.fillStyle="white",i.fillRect(h+8+m*74-3,u+80+g*22-3,6,6),i.strokeStyle=n,i.lineWidth=1,i.strokeRect(h+8+m*74-3,u+80+g*22-3,6,6)}),i.fillStyle="#f1f5f9",i.fillRect(h,u+108,l,c-108),i.fillStyle="#64748b",i.font="bold 8px sans-serif",i.fillText("Features",h+10,u+122),[0,1,2].forEach(m=>{const g=h+8+m*82,_=74,f=u+130;i.fillStyle="white",i.beginPath(),i.roundRect(g,f,_,68,5),i.fill(),i.fillStyle=[n,"#f472b6","#34d399"][m],i.beginPath(),i.roundRect(g,f,_,16,[5,5,0,0]),i.fill(),i.fillStyle="white",i.font="bold 8px sans-serif",i.fillText(["Design","Dev","Launch"][m],g+7,f+12),i.fillStyle="#334155",i.font="7.5px sans-serif",i.fillText(["UI/UX first","API robusta","Deploy 🚀"][m],g+7,f+27),[0,1,2].forEach(d=>{i.fillStyle=d===0?"#e2e8f0":"#f8fafc",i.fillRect(g+7,f+34+d*9,_-14,5)})}),i.fillStyle="#1b1f2b",i.fillRect(t-108,30,108,e-30),i.fillStyle="#23283c",i.fillRect(t-108,30,108,20),i.fillStyle="rgba(255,255,255,0.45)",i.font="bold 9px sans-serif",i.fillText("DESIGN",t-108+8,44),[["W","70px"],["H","18px"],["X","8"],["Y","80"],["R","9"],["O","100%"]].forEach(([m,g],_)=>{const f=t-108+_%2*52+6,d=60+Math.floor(_/2)*28;i.fillStyle="#252b3a",i.beginPath(),i.roundRect(f,d-13,48,18,3),i.fill(),i.fillStyle="rgba(255,255,255,0.28)",i.font="7px sans-serif",i.fillText(m,f+4,d-1),i.fillStyle="rgba(255,255,255,0.82)",i.font="8.5px sans-serif",i.fillText(g,f+20,d)}),i.fillStyle="rgba(255,255,255,0.06)",i.fillRect(t-108+6,150,96,1),i.fillStyle="rgba(255,255,255,0.32)",i.font="8px sans-serif",i.fillText("Fill",t-108+6,165),i.fillStyle=n,i.beginPath(),i.roundRect(t-108+6,168,20,20,4),i.fill(),i.fillStyle="#252b3a",i.beginPath(),i.roundRect(t-108+30,168,72,20,4),i.fill(),i.fillStyle="rgba(255,255,255,0.7)",i.font="8.5px monospace",i.fillText(n.slice(1).toUpperCase(),t-108+34,181),i.fillStyle="rgba(255,255,255,0.06)",i.fillRect(t-108+6,196,96,1),i.fillStyle="rgba(255,255,255,0.32)",i.font="8px sans-serif",i.fillText("Stroke",t-108+6,212),i.strokeStyle=n,i.lineWidth=1.5,i.beginPath(),i.roundRect(t-108+6,215,20,20,3),i.stroke(),i.fillStyle="rgba(255,255,255,0.45)",i.font="8px sans-serif",i.fillText("1.5  Outside",t-108+32,228),i.fillStyle="rgba(255,255,255,0.06)",i.fillRect(t-108+6,244,96,1),i.fillStyle="rgba(255,255,255,0.32)",i.font="8px sans-serif",i.fillText("Effects",t-108+6,260),i.fillStyle="#1e2a3e",i.beginPath(),i.roundRect(t-108+6,263,96,20,3),i.fill(),i.fillStyle="rgba(255,255,255,0.5)",i.font="8px sans-serif",i.fillText("↓  Drop Shadow",t-108+10,276),i.fillStyle=n+"20",i.beginPath(),i.roundRect(t-108+6,294,96,24,5),i.fill(),i.strokeStyle=n,i.lineWidth=1,i.beginPath(),i.roundRect(t-108+6,294,96,24,5),i.stroke(),i.fillStyle=n,i.font="bold 9.5px sans-serif",i.fillText("Export 1×",t-108+24,310)}function Wx(i,t,e,n){i.fillStyle="#0d1117",i.fillRect(0,30,t,e-30),i.fillStyle="#161b27",i.fillRect(0,30,t,32),i.fillStyle=n,i.font="bold 11px sans-serif",i.fillText("Sprint 12",14,50),i.fillStyle="rgba(255,255,255,0.38)",i.font="9px sans-serif",i.fillText("8 Mar – 22 Mar  ·  8 issues  ·  67% done",104,50),i.fillStyle="rgba(255,255,255,0.08)",i.beginPath(),i.roundRect(14,57,t-28,5,3),i.fill(),i.fillStyle=n+"cc",i.beginPath(),i.roundRect(14,57,(t-28)*.67,5,3),i.fill();const r={high:"#ef4444",med:"#f59e0b",low:"#6b7280"},s={Bug:"#ef444420",Docs:"#3b82f620",Review:"#a78bfa20",Planning:n+"20",Dev:"#34d39920",DevOps:"#f9731620",DB:"#06b6d420",Release:"#22c55e20"},o={Bug:"#ef4444",Docs:"#3b82f6",Review:"#a78bfa",Planning:n,Dev:"#34d399",DevOps:"#f97316",DB:"#06b6d4",Release:"#22c55e"},a=[{name:"Backlog",clr:"#64748b",tasks:[{title:"Fix login 401",pri:"high",tag:"Bug",usr:"T"},{title:"Update README",pri:"low",tag:"Docs",usr:"L"},{title:"Code review #18",pri:"med",tag:"Review",usr:"N"}]},{name:"In Progress",clr:n,tasks:[{title:"Sprint planning",pri:"high",tag:"Planning",usr:"T"},{title:"API design v2",pri:"high",tag:"Dev",usr:"D"}]},{name:"Done ✓",clr:"#22c55e",tasks:[{title:"Setup CI pipeline",pri:"med",tag:"DevOps",usr:"N"},{title:"DB migration",pri:"high",tag:"DB",usr:"D"},{title:"v1.0 deploy 🚀",pri:"high",tag:"Release",usr:"T"}]}],l=Math.floor((t-24)/3);a.forEach((c,h)=>{const u=8+h*(l+4);i.fillStyle="#161b27",i.beginPath(),i.roundRect(u,68,l,e-76,7),i.fill(),i.fillStyle=c.clr+"18",i.beginPath(),i.roundRect(u,68,l,28,[7,7,0,0]),i.fill(),i.fillStyle=c.clr,i.font="bold 10px sans-serif",i.fillText(c.name,u+10,87),i.fillStyle=c.clr+"30",i.beginPath(),i.roundRect(u+l-28,73,20,16,8),i.fill(),i.fillStyle=c.clr,i.font="bold 8.5px sans-serif",i.fillText(String(c.tasks.length),u+l-21,85),c.tasks.forEach((p,m)=>{const g=102+m*72;if(g+64>e)return;i.fillStyle="#1e2538",i.beginPath(),i.roundRect(u+4,g,l-8,64,6),i.fill(),i.fillStyle=r[p.pri],i.beginPath(),i.roundRect(u+4,g,3,64,[6,0,0,6]),i.fill(),i.fillStyle=h===2?"rgba(255,255,255,0.35)":"rgba(255,255,255,0.88)",i.font="9.5px sans-serif";const _=l-24,f=p.title.split(" ");let d="",v=0;f.forEach(x=>{const A=d+x+" ";i.measureText(A).width>_?(i.fillText(d.trim(),u+12,g+17+v*14),d=x+" ",v++):d=A}),i.fillText(d.trim(),u+12,g+17+v*14);const M=i.measureText(p.tag).width+12;i.fillStyle=s[p.tag]||"rgba(255,255,255,0.06)",i.beginPath(),i.roundRect(u+11,g+44,M,14,7),i.fill(),i.fillStyle=o[p.tag]||"rgba(255,255,255,0.4)",i.font="7.5px sans-serif",i.fillText(p.tag,u+17,g+54),i.fillStyle=n+"38",i.beginPath(),i.arc(u+l-16,g+51,8,0,Math.PI*2),i.fill(),i.fillStyle=n,i.font="bold 8px sans-serif",i.fillText(p.usr,u+l-19,g+55)})})}function Xx(i,t,e,n){const r=i.createLinearGradient(0,30,0,e);r.addColorStop(0,"#07081a"),r.addColorStop(1,"#0b0f22"),i.fillStyle=r,i.fillRect(0,30,t,e-30),i.fillStyle="rgba(255,255,255,0.9)",i.font="bold 15px sans-serif",i.fillText("Strategic Overview",20,60),i.fillStyle="rgba(255,255,255,0.32)",i.font="9.5px sans-serif",i.fillText("Q1 2026  ·  FriendsHQ  ·  Live",20,76),i.fillStyle="#22c55e",i.beginPath(),i.arc(t-20,66,4,0,Math.PI*2),i.fill(),i.fillStyle="#22c55e44",i.beginPath(),i.arc(t-20,66,8,0,Math.PI*2),i.fill();const s=[{label:"MRR",value:"€ 18K",delta:"+24%",up:!0},{label:"Users",value:"1.24K",delta:"+12%",up:!0},{label:"NPS",value:"72",delta:"+8pt",up:!0},{label:"Sprint",value:"94%",delta:"47/50",up:!0}],o=Math.floor((t-28)/4);s.forEach((f,d)=>{const v=8+d*(o+4);i.fillStyle="rgba(255,255,255,0.04)",i.beginPath(),i.roundRect(v,82,o,64,6),i.fill(),i.strokeStyle="rgba(255,255,255,0.07)",i.lineWidth=1,i.beginPath(),i.roundRect(v,82,o,64,6),i.stroke(),i.fillStyle="rgba(255,255,255,0.35)",i.font="8.5px sans-serif",i.fillText(f.label,v+12,100),i.fillStyle=n,i.font="bold 19px sans-serif",i.fillText(f.value,v+12,127),i.fillStyle="#22c55e",i.font="8.5px sans-serif",i.fillText("↑ "+f.delta,v+12,141)});const a=14,l=155,c=t-28,h=106;i.fillStyle="rgba(255,255,255,0.025)",i.beginPath(),i.roundRect(a,l,c,h,6),i.fill(),[.25,.5,.75].forEach(f=>{const d=l+h-f*h;i.strokeStyle="rgba(255,255,255,0.05)",i.lineWidth=1,i.setLineDash([4,4]),i.beginPath(),i.moveTo(a,d),i.lineTo(a+c,d),i.stroke()}),i.setLineDash([]);const u=["Gen","Feb","Mar","Apr","Mag","Giu"],p=[.3,.46,.58,.72,.82,.93],m=c/(u.length-1);i.beginPath(),i.moveTo(a,l+h),p.forEach((f,d)=>i.lineTo(a+d*m,l+h-f*h*.9)),i.lineTo(a+(u.length-1)*m,l+h),i.closePath();const g=i.createLinearGradient(0,l,0,l+h);g.addColorStop(0,n+"66"),g.addColorStop(1,n+"06"),i.fillStyle=g,i.fill(),i.beginPath(),p.forEach((f,d)=>{const v=a+d*m,M=l+h-f*h*.9;d===0?i.moveTo(v,M):i.lineTo(v,M)}),i.strokeStyle=n,i.lineWidth=2.5,i.stroke(),p.forEach((f,d)=>{const v=a+d*m,M=l+h-f*h*.9;i.fillStyle=n,i.beginPath(),i.arc(v,M,4,0,Math.PI*2),i.fill(),i.fillStyle="#08091a",i.beginPath(),i.arc(v,M,2,0,Math.PI*2),i.fill(),i.fillStyle="rgba(255,255,255,0.32)",i.font="8px sans-serif",i.fillText(u[d],v-9,l+h+14)}),[{name:"Product Launch",pct:.78},{name:"Revenue Target",pct:.91},{name:"Team Growth",pct:.6}].forEach((f,d)=>{const v=278+d*34;i.fillStyle="rgba(255,255,255,0.55)",i.font="9px sans-serif",i.fillText(f.name,14,v),i.fillStyle="rgba(255,255,255,0.07)",i.beginPath(),i.roundRect(14,v+4,c,10,5),i.fill(),i.fillStyle=n+"cc",i.beginPath(),i.roundRect(14,v+4,c*f.pct,10,5),i.fill(),i.fillStyle="rgba(255,255,255,0.42)",i.font="8.5px sans-serif",i.fillText(Math.round(f.pct*100)+"%",14+c*f.pct+6,v+13)})}function Yx(i,t,e,n){i.fillStyle="#050d0a",i.fillRect(0,30,t,e-30),i.fillStyle="#0c1a12",i.fillRect(0,30,t,28),i.fillStyle=n,i.font="bold 11px monospace",i.fillText("JEST  v29.7",14,49),i.fillStyle="rgba(255,255,255,0.38)",i.font="9px monospace",i.fillText("friends-hq  ·  5 suites  ·  running...",120,49),i.fillStyle=n,i.beginPath(),i.arc(t-16,45,4,0,Math.PI*2),i.fill(),[{file:"auth.test.ts",passed:8,failed:0,time:"12ms",cov:94},{file:"api.test.ts",passed:14,failed:0,time:"31ms",cov:88},{file:"checkout.test.ts",passed:6,failed:1,time:"88ms",cov:71},{file:"ui.test.ts",passed:11,failed:0,time:"9ms",cov:96},{file:"db.test.ts",passed:9,failed:0,time:"22ms",cov:91}].forEach((a,l)=>{const c=64+l*46,h=a.failed===0;i.fillStyle=h?"#071209":"#1a0707",i.beginPath(),i.roundRect(8,c,t-16,38,4),i.fill(),i.fillStyle=h?n:"#ef4444",i.beginPath(),i.roundRect(8,c,3,38,[4,0,0,4]),i.fill(),i.fillStyle=h?n:"#ef4444",i.font="bold 12px monospace",i.fillText(h?"✓":"✗",18,c+16),i.fillStyle=h?"rgba(255,255,255,0.85)":"#ef4444",i.font="10px monospace",i.fillText(a.file,34,c+16),i.fillStyle=h?"rgba(255,255,255,0.3)":"#ef4444aa",i.font="8.5px sans-serif",i.fillText(`${a.passed} passed${a.failed?"  ·  1 FAILED":""}  ·  ${a.time}`,34,c+29);const u=a.cov>=90?"#22c55e":a.cov>=75?"#f59e0b":"#ef4444";i.fillStyle=u+"25",i.beginPath(),i.roundRect(t-58,c+8,46,20,5),i.fill(),i.fillStyle=u,i.font="8.5px monospace",i.fillText(a.cov+"% cov",t-54,c+21),h||(i.fillStyle="#1f0808",i.beginPath(),i.roundRect(34,c+33,t-58,0,2),i.fill())});const s=300;i.fillStyle="#1a0707",i.beginPath(),i.roundRect(8,s,t-16,42,5),i.fill(),i.strokeStyle="#ef444440",i.lineWidth=1,i.beginPath(),i.roundRect(8,s,t-16,42,5),i.stroke(),i.fillStyle="#ef4444",i.font="bold 8.5px monospace",i.fillText("● checkout.test.ts  >  should process payment",14,s+13),i.fillStyle="rgba(255,255,255,0.35)",i.font="8px monospace",i.fillText("Expected: 200   Received: 422",14,s+25),i.fillStyle="#ef4444aa",i.font="8px monospace",i.fillText("at checkout.spec.ts:42:18",14,s+37),i.fillStyle="#0a1a0d",i.fillRect(0,e-38,t,38),i.fillStyle="#22c55e",i.font="bold 9.5px monospace",i.fillText("✓ 48 passed",14,e-22),i.fillStyle="#ef4444",i.font="bold 9.5px monospace",i.fillText("✗ 1 failed",120,e-22),i.fillStyle="rgba(255,255,255,0.3)",i.font="8.5px monospace",i.fillText("5 suites  ·  2.6s",214,e-22);const o=t-28;i.fillStyle="#1a2f1a",i.beginPath(),i.roundRect(14,e-10,o,5,3),i.fill(),i.fillStyle=n,i.beginPath(),i.roundRect(14,e-10,o*.979,5,3),i.fill(),i.fillStyle="#ef4444",i.beginPath(),i.roundRect(14+o*.979,e-10,o*.021,5,[0,3,3,0]),i.fill()}function qx(i,t,e,n){i.fillStyle="#02080f",i.fillRect(0,30,t,e-30);function r(_,f,d){let v=f;_.forEach(([M,x])=>{i.fillStyle=x,i.fillText(M,v,d),v+=i.measureText(M).width})}i.font="10px monospace",r([[" dalla",n],["@friendshq","rgba(255,255,255,0.4)"],[":~$ ","rgba(255,255,255,0.25)"]],10,52),r([["psql -U admin friends_db","rgba(255,255,255,0.85)"]],96,52),r([["psql (16.1)  —  SSL connection  ✓",n]],10,67);const s=n,o="rgba(255,255,255,0.82)",a="#a78bfa",l="#34d399",c="rgba(255,255,255,0.28)";[[[" SELECT ",s],["u.name",o],[", ",c],["COUNT",s],["(o.id)",o],[" AS ",a],["total",l]],[["   FROM ",s],["users ",o],["u",l]],[["   LEFT JOIN ",s],["orders ",o],["o",l],[" ON ",a],["u.id = o.uid",o]],[["   GROUP BY ",s],["u.name",o]],[["   ORDER BY ",s],["total ",o],["DESC ",a],["LIMIT ",s],["10","#fbbf24"],[";",c]]].forEach((_,f)=>r(_,10,86+f*16));const u=172,p=[{name:"Napo",total:"312",clr:n},{name:"Dalla",total:"298",clr:"rgba(255,255,255,0.8)"},{name:"Leo",total:"247",clr:"rgba(255,255,255,0.8)"},{name:"Teo",total:"189",clr:"rgba(255,255,255,0.8)"},{name:"Andre",total:"154",clr:"rgba(255,255,255,0.8)"}],m=[14,180];i.fillStyle="#101c2a",i.beginPath(),i.roundRect(10,u-2,290,20,[4,4,0,0]),i.fill(),i.fillStyle="rgba(255,255,255,0.4)",i.font="bold 9px monospace",i.fillText("name",m[0]+4,u+13),i.fillText("total",m[1]+4,u+13),i.fillStyle="#1e3050",i.fillRect(10,u+18,290,1),p.forEach((_,f)=>{const d=u+24+f*22;f%2===0&&(i.fillStyle="#0a1520",i.fillRect(10,d-6,290,22)),i.fillStyle=_.clr,i.font="10px monospace",i.fillText(_.name,m[0]+4,d+8),i.fillText(_.total,m[1]+4,d+8)}),i.fillStyle="#1e3050",i.fillRect(10,u+24+p.length*22-4,290,1),i.fillStyle="rgba(255,255,255,0.25)",i.font="9px monospace",i.fillText("(5 rows)  —  9 ms",14,u+24+p.length*22+10);const g=u+24+p.length*22+28;r([[" dalla",n],["@friendshq","rgba(255,255,255,0.4)"],[":~$ ","rgba(255,255,255,0.25)"]],10,g),i.fillStyle=n+"cc",i.fillRect(96,g-10,7,13)}function jx(){const i=new Ut,t=j(2.4,1.4,.07,9741240);i.add(t);const e=j(2.2,1.2,.04,16317180);e.position.z=.055,i.add(e);const n=j(2.2,.07,.12,6583435);n.position.set(0,-.66,.09),i.add(n);const r=[3900150,16347926,1096065,9133302];[[.9,.008,.01,-.2,.15],[.6,.008,.01,.3,-.05],[.5,.008,.01,-.5,-.05]].forEach(([a,l,c,h,u],p)=>{const m=j(a,l,c,r[p]);m.position.set(h,u,.078),i.add(m)}),[[-.7,-.05],[.1,.3],[.6,-.2]].forEach(([a,l],c)=>{const h=new $(new Xr(.04,8,8),new ct({color:r[c]}));h.position.set(a,l,.079),i.add(h)});const o=j(.04,.18,.04,1976635);return o.position.set(-.8,-.6,.12),o.rotation.z=.3,i.add(o),i}function Zx(){const i=new Ut,t=9584654,e=j(1.6,2,.05,t);i.add(e);const n=j(.05,2,.32,t);n.position.x=-.775,i.add(n);const r=j(.05,2,.32,t);r.position.x=.775,i.add(r);const s=j(1.6,.05,.32,t);s.position.y=-.975,i.add(s);const o=j(1.6,.05,.32,t);o.position.y=.975,i.add(o);const a=[-.5,.1,.7];a.forEach(c=>{const h=j(1.5,.04,.3,10576391);h.position.y=c,i.add(h)});const l=[8141549,14427686,2450411,14251782,366185,14362487,561586,6660877];return a.forEach(c=>{let h=-.68,u=Math.floor(Math.random()*l.length);for(;h<.65;){const p=.055+Math.random()*.04,m=.22+Math.random()*.14,g=j(p,m,.24,l[u%l.length]);g.position.set(h+p/2,c+m/2+.02,.03),i.add(g),h+=p+.007,u++}}),i}function $x(){const i=new Ut,t=j(.32,.85,.32,14870768);t.position.y=.425,i.add(t);const e=j(.34,.06,.34,13358561);e.position.y=.86,i.add(e);const n=new $(new Bt(.1,.1,.52,14),new ct({color:9684477,transparent:!0,opacity:.75}));n.position.y=1.12,i.add(n);const r=Di(.102,.102,.04,14,1920728);r.position.y=.88,i.add(r);const s=j(.07,.045,.06,3900150);s.position.set(-.09,.38,.19),i.add(s);const o=j(.07,.045,.06,15680580);return o.position.set(.09,.38,.19),i.add(o),i}function Bo(i=1){const t=new Ut,e=Di(.1*i,.085*i,.18*i,10,11817737);t.add(e);const n=Di(.09*i,.09*i,.02*i,10,4929057);n.position.y=.1*i,t.add(n);const r=new $(new Xr(.15*i,9,9),new ct({color:1483594}));r.position.y=.26*i,t.add(r);const s=new $(new Xr(.09*i,8,8),new ct({color:1409085}));return s.position.set(.1*i,.32*i,.05*i),t.add(s),t}function wc(i=16777215){const t=new Ut,e=Di(.07,.065,.14,14,i);e.position.y=.07,t.add(e);const n=new $(new Wo(.05,.014,8,10,Math.PI),new ct({color:i}));n.position.set(.09,.07,0),n.rotation.z=-Math.PI/2,n.rotation.y=Math.PI/2,t.add(n);const r=Di(.061,.061,.01,14,4004352);return r.position.y=.135,t.add(r),t}function Kx(i,t,e,n){const r=new Ut;r.add(j(i,t,e,n));const s=j(i-.02,t-.02,e-.02,16775408);return s.position.x=.008,r.add(s),r}function Hl(i=7268279){const t=new Ut;t.add(Di(.04,.04,.22,12,1120295));const e=Di(.042,.042,.15,12,i);return t.add(e),t}function zs(i=1976635){const t=new Ut,e=j(.058,.024,.105,i);e.position.y=.012,t.add(e);const n=j(.04,.016,.025,i);n.position.set(0,.012,-.062),t.add(n);const r=new $(new Bt(.009,.009,.022,8),new ct({color:5592405}));r.rotation.x=Math.PI/2,r.position.set(0,.024,.01),t.add(r);const s=j(.002,.002,.065,0);return s.position.set(0,.025,.018),t.add(s),t}function ks(i=3900150){const t=new Ut,e=j(.19,.44,.44,1120295);e.position.y=.22,t.add(e);const n=j(.18,.4,.018,1712693);n.position.set(0,.22,.22),t.add(n);const r=new $(new gt(.012,.22,.008),new We({color:i,transparent:!0,opacity:.85}));r.position.set(-.07,.25,.23),t.add(r);const s=new $(new Bt(.02,.02,.012,10),new ct({color:i}));s.rotation.x=Math.PI/2,s.position.set(.05,.38,.232),t.add(s),[.3,.27].forEach(a=>{const l=j(.032,.012,.014,3359061);l.position.set(.05,a,.232),t.add(l)});const o=j(.11,.018,.012,988970);o.position.set(-.02,.34,.232),t.add(o);for(let a=0;a<6;a++){const l=j(.15,.008,.006,659226);l.position.set(0,.1+a*.038,-.222),t.add(l)}return t}function Jx(i=1){const t=new Ut,e=new $(new Bt(.09*i,.075*i,.16*i,10),new ct({color:11817737}));t.add(e);const n=new $(new Bt(.04*i,.045*i,.32*i,8),new ct({color:5078031}));n.position.y=.24*i,t.add(n);const r=new Ut,s=new $(new Bt(.028*i,.03*i,.12*i,8),new ct({color:5078031}));s.rotation.z=Math.PI/2,s.position.y=0,r.add(s);const o=new $(new Bt(.028*i,.03*i,.12*i,8),new ct({color:5078031}));o.position.y=.08*i,r.add(o),r.position.set(-.1*i,.28*i,0),t.add(r);const a=new Ut,l=new $(new Bt(.025*i,.028*i,.1*i,8),new ct({color:5078031}));l.rotation.z=-Math.PI/2,l.position.y=0,a.add(l);const c=new $(new Bt(.025*i,.028*i,.1*i,8),new ct({color:5078031}));return c.position.y=.07*i,a.add(c),a.position.set(.1*i,.32*i,0),t.add(a),t}function Qx(i=16775392){const t=new Ut,e=new $(new Bt(.18,.22,.06,14),new ct({color:3621201}));e.position.y=.03,t.add(e);const n=new $(new Bt(.018,.022,1.55,8),new ct({color:4937059}));n.position.y=.835,t.add(n);const r=new $(new Bt(.014,.016,.42,8),new ct({color:4937059}));r.position.set(.18,1.56,0),r.rotation.z=-Math.PI/4,t.add(r);const s=new $(new Bt(.14,.08,.18,14),new ct({color:i}));s.position.set(.31,1.69,0),t.add(s);const o=new $(new Bt(.1,.06,.01,14),new We({color:16777200,transparent:!0,opacity:.7}));return o.position.set(.31,1.6,0),t.add(o),t}function ty(i=16638023){const t=new Ut,e=j(.16,.001,.16,i);t.add(e);for(let n=0;n<3;n++){const r=j(.1,.001,.007,0);r.material.opacity=.12,r.material.transparent=!0,r.position.set(0,.001,-.04+n*.04),t.add(r)}return t}function Vl(i=16777215){const t=new Ut;for(let e=0;e<3;e++){const n=j(.32,.006,.24,i);n.position.set(e*.012,e*.006,e*.01),n.rotation.y=(e-1)*.06,t.add(n)}return t}function ey(){const i=new Ut,t=new ct({color:2765120}),e=new ct({color:11393254,transparent:!0,opacity:.42,side:Cn}),n=new ct({color:10265519}),r=6,s=.2,o=2.8,a=4.4,l=r/2-s/2,c=o/2,h=3.2,u=3.14,p=1.57,m=new $(new gt(r,.2,.22),t);m.position.set(0,h,0),i.add(m),[-l,l].forEach(d=>{const v=new $(new gt(s,h,.22),t);v.position.set(d,h/2,0),i.add(v)}),[-1,1].forEach(d=>{const v=new Ut;v.userData.openX=d*a,v.userData.closedX=d*c;const M=new $(new gt(o,u,.06),e);M.position.y=p,v.add(M),[u-.01,.05].forEach(R=>{const y=new $(new gt(o,.14,.16),t);y.position.set(0,R,.05),v.add(y)});const x=new $(new gt(.12,u,.16),t);x.position.set(d*(o/2-.06),p,.05),v.add(x);const A=-d*(o/2-.25),T=new $(new Bt(.028,.028,.52,10),n);T.rotation.x=Math.PI/2,T.position.set(A,1.52,.1),v.add(T),[-.22,.22].forEach(R=>{const y=new $(new gt(.05,.05,.12),n);y.position.set(A,1.52+R,.1),v.add(y)});const w=new $(new gt(o,.07,.1),t);w.position.set(0,p,.05),v.add(w),v.position.x=v.userData.closedX,Tc.push(v),i.add(v)});const g=new $(new gt(5.8,.06,.18),new We({color:1976635}));g.position.set(0,3.3,-.04),i.add(g);const _=new $(new gt(5.6,.01,.14),new We({color:2278750,transparent:!0,opacity:.7}));_.position.set(0,3.27,-.04),i.add(_);const f=new $(new gt(r,3.5,.8),new We({transparent:!0,opacity:0}));return f.position.set(0,1.75,0),f.userData.action="open-door",Is=f,i.add(f),i}function Yd(i){const t=new Ut,e=j(.58,.07,.56,1118481);e.position.y=.48,t.add(e);const n=j(.58,.58,.07,i);n.position.set(0,.82,.25),t.add(n);const r=j(.38,.2,.07,i);r.position.set(0,1.14,.25),t.add(r),[-.27,.27].forEach(o=>{const a=j(.05,.04,.42,1710618);a.position.set(o,.62,.04),t.add(a)});const s=Di(.03,.03,.38,8,2763306);s.position.y=.16,t.add(s);for(let o=0;o<5;o++){const a=j(.38,.04,.05,1710618);a.position.y=.02,a.rotation.y=o/5*Math.PI*2,t.add(a)}return t}function Qr(i,t,e=1.4,n=.85){const r=new Ut,s=new $(new Bt(.28,.32,.022,24),new ct({color:1579032}));s.position.y=.011,r.add(s);const o=new $(new Bt(.022,.038,.38,10),new ct({color:1973790}));o.position.y=.26,r.add(o);const a=new Ut;a.position.y=.47+n/2,a.rotation.x=-.1,a.add(new $(new gt(e+.018,n+.018,.034),new ct({color:855309})));const l=new $(new es(e,n),new We({map:t}));l.position.z=.018,l.material.polygonOffset=!0,l.material.polygonOffsetFactor=-1,l.material.polygonOffsetUnits=-1,a.add(l);const c=new $(new gt(e-.02,.01,.004),new We({color:2254591,transparent:!0,opacity:.9}));return c.position.set(0,-(n/2+.012),.018),a.add(c),r.add(a),r}function ny(i){const t=new Ut,e=j(2.6,.07,1.28,i);e.position.y=.88,t.add(e);const n=j(2.6,.025,.014,9684477);return n.position.set(0,.857,-.637),t.add(n),[-.88,.88].forEach(r=>{const s=new Ut;[-1,1].forEach(a=>{const l=j(.05,.9,.06,13751771);l.position.set(a*.28,.45,0),l.rotation.z=-a*.18,s.add(l)});const o=j(.62,.04,.06,13751771);o.position.set(0,.26,0),s.add(o),s.position.set(r,0,0),t.add(s)}),t}function iy(i){const t=new Ut,e=j(2.5,.07,1.32,i);e.position.y=.88,t.add(e),[.56,-.56].forEach(s=>{const o=j(.06,.84,.06,7041664);o.position.set(1.15,.42,s),t.add(o)});const n=j(.06,.04,1.18,7041664);n.position.set(1.15,.2,0),t.add(n);const r=j(.42,.84,1.1,9741240);return r.position.set(-1.04,.42,0),t.add(r),[.22,.44,.66].forEach(s=>{const o=j(.38,.018,1,8359587);o.position.set(-1.04,s,.006),t.add(o);const a=j(.12,.018,.025,13751771);a.position.set(-1.04,s,.56),t.add(a)}),t}function ry(i){const t=new Ut,e=4008735,n=j(3.4,.09,1.6,e);n.position.y=.88,t.add(n);const r=j(3.4,.02,.012,13938487);r.position.set(0,.875,-.794),t.add(r),[-1.65,1.65].forEach(l=>{const c=j(.09,.88,1.56,e);c.position.set(l,.44,0),t.add(c);const h=j(.01,.6,1.3,2760212);h.position.set(l+(l>0?-.05:.05),.44,0),t.add(h)});const s=j(3.2,.7,.06,e);s.position.set(0,.44,-.75),t.add(s);const o=j(1.4,.09,1,e);o.position.set(2.4,.88,.8),t.add(o);const a=j(.09,.88,.96,e);return a.position.set(3.14,.44,.8),t.add(a),t}function sy(i){const t=new Ut,e=j(2.4,.065,1.22,i);e.position.y=.94,t.add(e),[-.95,.95].forEach(o=>{[-.45,.45].forEach(l=>{const c=new $(new Bt(.05,.055,.68,10),new ct({color:1976635}));c.position.set(o,.34,l),t.add(c);const h=new $(new Bt(.035,.04,.28,10),new ct({color:3621201}));h.position.set(o,.8,l),t.add(h)});const a=j(.04,.04,.94,1976635);a.position.set(o,.12,0),t.add(a)});const n=j(1.94,.04,.04,1976635);n.position.set(0,.12,0),t.add(n);const r=j(.22,.03,.09,1120295);r.position.set(-.82,.97,.55),t.add(r);const s=j(.16,.01,.02,2278750);return s.position.set(-.82,.988,.555),t.add(s),t}function oy(i){const t=new Ut,e=3621201,n=j(2.6,.07,1.34,i);n.position.y=.88,t.add(n),[[-1.2,-.56],[-1.2,.56],[1.2,-.56],[1.2,.56]].forEach(([c,h])=>{const u=j(.08,.88,.08,e);u.position.set(c,.44,h),t.add(u)}),[-.56,.56].forEach(c=>{const h=j(2.46,.04,.04,e);h.position.set(0,.28,c),t.add(h)});const r=j(.04,.04,1.18,e);r.position.set(0,.28,0),t.add(r);const s=j(2.4,.04,1.1,4937059);s.position.set(0,.46,0),t.add(s);const o=j(.38,.22,.84,1976635);o.position.set(-.88,.6,.04),t.add(o),[0,1,2,3].forEach(c=>{const h=j(.34,.03,.78,1120295);h.position.set(-.88,.5+c*.05,.04),t.add(h)});const a=j(.4,.18,.72,1710638);a.position.set(.78,.58,.04),t.add(a);const l=j(.28,.01,.04,2278750);return l.position.set(.78,.675,-.36),t.add(l),t}function ay(i){const t=new Ut,e=j(.62,.06,.58,1973790);e.position.y=.48,t.add(e);const n=j(.58,.04,.54,2763306);n.position.y=.43,t.add(n);for(let s=0;s<6;s++){const o=j(.56,.055,.045,i);o.position.set(0,.58+s*.115,.24),t.add(o)}[-.29,.29].forEach(s=>{const o=j(.03,.7,.05,1973790);o.position.set(s,.95,.24),t.add(o)}),[-.3,.3].forEach(s=>{const o=j(.04,.035,.36,i);o.position.set(s,.62,.06),t.add(o);const a=j(.07,.025,.14,1973790);a.position.set(s,.638,.14),t.add(a)});const r=new $(new Bt(.028,.028,.4,8),new ct({color:8947848}));r.position.y=.16,t.add(r);for(let s=0;s<5;s++){const o=j(.42,.03,.04,3355443);o.position.y=.02,o.rotation.y=s/5*Math.PI*2,t.add(o);const a=new $(new Bt(.025,.025,.04,8),new ct({color:2236962})),l=s/5*Math.PI*2;a.rotation.z=Math.PI/2,a.position.set(Math.cos(l)*.2,.025,Math.sin(l)*.2),t.add(a)}return t}function ly(i){const t=new Ut,e=855309,n=j(.68,.1,.64,e);n.position.y=.5,t.add(n);const r=j(.62,.06,.58,1710618);r.position.y=.56,t.add(r);const s=j(.66,.82,.1,e);s.position.set(0,1.06,.27),t.add(s);const o=j(.52,.6,.02,i);o.position.set(0,1.06,.32),t.add(o);const a=j(.5,.28,.1,e);a.position.set(0,1.6,.27),t.add(a);const l=j(.38,.2,.04,1710618);l.position.set(0,1.6,.32),t.add(l),[-.36,.36].forEach(h=>{const u=j(.06,.14,.06,e);u.position.set(h,.66,.12),t.add(u);const p=j(.1,.04,.42,e);p.position.set(h,.74,-.04),t.add(p);const m=j(.09,.025,.36,1710618);m.position.set(h,.762,-.04),t.add(m)});const c=new $(new Bt(.032,.032,.42,10),new ct({color:11184810}));c.position.y=.16,t.add(c);for(let h=0;h<5;h++){const u=j(.44,.035,.045,8947848);u.position.y=.02,u.rotation.y=h/5*Math.PI*2,t.add(u);const p=new $(new Bt(.028,.028,.04,8),new ct({color:3355443}));p.rotation.z=Math.PI/2;const m=h/5*Math.PI*2;p.position.set(Math.cos(m)*.21,.025,Math.sin(m)*.21),t.add(p)}return t}function cy(i){const t=new Ut,e=j(.66,.09,.62,1118481);e.position.y=.5,t.add(e),[-.36,.36].forEach(l=>{const c=j(.07,.12,.58,i);c.position.set(l,.555,0),t.add(c)});const n=new Ut;n.position.set(0,.5,.24),n.rotation.x=.14;const r=j(.64,.78,.1,1118481);r.position.y=.38,n.add(r),[-.34,.34].forEach(l=>{const c=j(.04,.78,.02,i);c.position.set(l,.38,.06),n.add(c)});const s=j(.52,.26,.12,1118481);s.position.set(0,.88,0),n.add(s);const o=j(.32,.18,.04,i);o.position.set(0,.88,.07),n.add(o),t.add(n),[-.32,.32].forEach(l=>{const c=j(.08,.06,.38,2236962);c.position.set(l,.68,.04),t.add(c)});const a=new $(new Bt(.03,.03,.4,8),new ct({color:5592405}));a.position.y=.16,t.add(a);for(let l=0;l<5;l++){const c=j(.4,.04,.05,3355443);c.position.y=.02,c.rotation.y=l/5*Math.PI*2,t.add(c);const h=new $(new Bt(.026,.026,.04,8),new ct({color:2236962}));h.rotation.z=Math.PI/2;const u=l/5*Math.PI*2;h.position.set(Math.cos(u)*.19,.025,Math.sin(u)*.19),t.add(h)}return t}function hy(i){const t=new Ut,e=.915;t.add(ny(i.deskColor));const n=Jr("designer",i.hex),r=Qr(1118481,n);r.position.set(-.85,e,-.38),r.rotation.y=.18,t.add(r);const s=Jr("designer",i.hex),o=Qr(1118481,s);o.position.set(.85,e,-.38),o.rotation.y=-.18,t.add(o);const a=new Pn(i.threeColor,.4,3);a.position.set(0,1.8,.1),t.add(a),a.userData.baseIntensity=.4,a.userData.phase=.7,or.push({light:a,type:"screen"}),[16739179,5164484,16770669,7101671,10656766].forEach((x,A)=>{const T=j(.1,.012,.09,x);T.position.set(-.48+A*.23,e+.006,.28),t.add(T)});const c=j(.68,.025,.26,1976635);c.position.set(0,e+.0125,.05),t.add(c);const h=zs();h.position.set(.44,e,.08),t.add(h);const u=Bo(.9);u.position.set(1.1,e,.22),t.add(u);const p=wc(16777215);p.position.set(.88,e,-.15),t.add(p);const m=j(.58,.012,.38,1118481);m.position.set(-.08,e+.006,.3),t.add(m);const g=j(.44,.01,.28,1976635);g.position.set(-.08,e+.011,.3),t.add(g);const _=j(.008,.008,.2,15857145);_.position.set(.24,e+.004,.3),_.rotation.z=.3,t.add(_);const f=new $(new Bt(.01,.025,.22,8),new ct({color:3621201}));f.position.set(-1,e+.11,-.1),t.add(f);const d=new $(new Wo(.12,.018,6,14,Math.PI),new ct({color:988970}));d.position.set(-1,e+.22+.04,-.1),d.rotation.z=Math.PI,t.add(d),[-.12,.12].forEach(x=>{const A=new $(new Bt(.045,.045,.04,12),new ct({color:i.threeColor}));A.position.set(-1+x,e+.04,-.1),A.rotation.z=Math.PI/2,t.add(A)});const v=ks(i.threeColor);v.position.set(1.22,0,.3),v.rotation.y=-Math.PI/2,t.add(v);const M=ay(i.threeColor);return M.position.set(0,0,.95),M.userData.restY=M.position.y,sr[i.id]=M,t.add(M),t}function uy(i){const t=new Ut,e=.915;t.add(iy(i.deskColor));const n=Jr("pm",i.hex),r=Qr(1118481,n);r.position.set(0,e,-.38),t.add(r);const s=new Pn(i.threeColor,.4,3);s.position.set(0,1.8,.1),t.add(s),s.userData.baseIntensity=.4,s.userData.phase=1.4,or.push({light:s,type:"screen"});const o=[16638023,16486972,11006928,12573694,16361684,14285213];o.forEach((d,v)=>{const M=ty(d),x=v/o.length*Math.PI*1.6-.4;M.position.set(Math.cos(x)*.35,e+5e-4,Math.sin(x)*.18+.08),M.rotation.y=Math.random()*.5-.25,t.add(M)});const a=Vl();a.position.set(-.82,e,.22),t.add(a);const l=j(.68,.025,.26,1976635);l.position.set(0,e+.0125,.08),t.add(l);const c=zs();c.position.set(.45,e,.12),t.add(c);const h=wc(i.threeColor);h.position.set(.9,e,.2),t.add(h);const u=j(.62,.38,.018,15857145);u.position.set(.72,1.18,-.36),u.rotation.x=.18,t.add(u);const p=j(.66,.42,.012,9741240);p.position.set(.72,1.18,-.368),p.rotation.x=.18,t.add(p),[[16638023,-.2,1.08],[16486972,0,1.22],[11006928,.2,1.08]].forEach(([d,v,M])=>{const x=j(.12,.1,.008,d);x.position.set(.72+v,M,-.355),x.rotation.x=.18,t.add(x)});const m=j(.07,.012,.14,1976635);m.position.set(-.5,e+.006,-.2),t.add(m);const g=j(.05,.01,.1,i.threeColor);g.material.transparent=!0,g.material.opacity=.7,g.position.set(-.5,e+.012,-.2),t.add(g);const _=ks(i.threeColor);_.position.set(-1.62,0,0),_.rotation.y=Math.PI/2,t.add(_);const f=Yd(i.threeColor);return f.position.set(0,0,.95),f.userData.restY=f.position.y,sr[i.id]=f,t.add(f),t}function dy(i){const t=new Ut,e=.925;t.add(ry(i.deskColor));const n=Jr("director",i.hex),r=Qr(1118481,n,1.9,.82);r.position.set(0,e,-.52),t.add(r);const s=new Pn(i.threeColor,.5,3.5);s.position.set(0,1.8,.1),t.add(s),s.userData.baseIntensity=.5,s.userData.phase=2.1,or.push({light:s,type:"screen"}),[8141549,1920728,12131356].forEach((M,x)=>{const A=Kx(.26,.38,.06,M);A.position.set(-1.28,e+x*.07,.1),A.rotation.y=(x-1)*.1,t.add(A)});const o=Bo(1.3);o.position.set(1.5,e,.3),t.add(o);const a=j(.54,.045,.12,13938487);a.position.set(0,e+.0225,.5),t.add(a);const l=j(.75,.025,.28,1976635);l.position.set(0,e+.0125,.08),t.add(l);const c=zs();c.position.set(.5,e,.12),t.add(c);const h=wc(i.threeColor);h.position.set(1.3,e,-.12),t.add(h);const u=j(.18,.04,.12,13938487);u.position.set(-1.3,e+.02,-.25),t.add(u);const p=new $(new Bt(.02,.025,.22,8),new ct({color:13938487}));p.position.set(-1.3,e+.15,-.25),t.add(p);const m=new $(new Bt(.055,.028,.1,10),new ct({color:13938487}));m.position.set(-1.3,e+.31,-.25),t.add(m);const g=j(.28,.22,.015,1973790);g.position.set(2.5,e+.05,.6),g.rotation.x=-.15,t.add(g);const _=j(.22,.16,.012,3359061);_.position.set(2.5,e+.05,.605),_.rotation.x=-.15,t.add(_);const f=new $(new Bt(.04,.035,.1,8),new ct({color:13938487}));f.position.set(.5,e+.05,.44),t.add(f),[-.015,0,.015].forEach(M=>{const x=new $(new Bt(.006,.006,.16,6),new ct({color:988970}));x.position.set(.5+M,e+.13,.44),t.add(x)});const d=ks(i.threeColor);d.position.set(3,0,.9),d.rotation.y=-Math.PI/2,t.add(d);const v=ly(i.threeColor);return v.position.set(0,0,1.05),v.userData.restY=v.position.y,sr[i.id]=v,t.add(v),t}function fy(i){const t=new Ut,e=.9725;t.add(sy(i.deskColor));const n=Jr("tester",i.hex),r=Qr(1118481,n);r.position.set(-.38,e,-.38),t.add(r);const s=new Pn(i.threeColor,.4,3);s.position.set(-.38,1.8,.1),t.add(s),s.userData.baseIntensity=.4,s.userData.phase=2.8,or.push({light:s,type:"screen"});const o=j(.55,.03,.38,3621201);o.position.set(.72,e+.015,-.08),t.add(o);const a=j(.53,.36,.025,2042167);a.position.set(.72,e+.03+.18,-.27),a.rotation.x=-.36,t.add(a);const l=new $(new gt(.49,.32,.01),new We({color:i.threeColor,transparent:!0,opacity:.65}));l.material.polygonOffset=!0,l.material.polygonOffsetFactor=-2,l.material.polygonOffsetUnits=-2,l.position.set(.72,e+.03+.18,-.25),l.rotation.x=-.36,t.add(l),[{w:.13,d:.24,x:-1.02,z:.08},{w:.22,d:.3,x:-.72,z:.26}].forEach(({w:M,d:x,x:A,z:T})=>{const w=j(M,.007,x,1120295);w.position.set(A,e+.0035,T),w.rotation.y=Math.random()*.3-.15,t.add(w);const R=j(M-.02,.007,x-.04,i.threeColor);R.material.transparent=!0,R.material.opacity=.5,R.position.set(A,e+.007,T),R.rotation.y=w.rotation.y,t.add(R)});const c=Vl(16710888);c.position.set(.3,e,.32),t.add(c);const h=j(.6,.025,.24,1976635);h.position.set(-.28,e+.0125,.08),t.add(h);const u=zs();u.position.set(.18,e,.12),t.add(u);const p=Hl(i.threeColor);p.position.set(1.02,e,-.24),t.add(p);const m=new $(new Bt(.035,.04,.2,10),new ct({color:14427686}));m.position.set(-.8,e+.1,-.2),t.add(m);const g=new $(new Bt(.022,.035,.06,10),new ct({color:8330525}));g.position.set(-.8,e+.1+.13,-.2),t.add(g);const _=j(.15,.13,.005,16638023);_.position.set(-.38+.5,1.48,-.37),t.add(_);const f=Vl(16710083);f.position.set(-.92,e,-.16),f.rotation.y=.4,t.add(f);const d=ks(i.threeColor);d.position.set(.96,0,.3),d.rotation.y=-Math.PI/2,t.add(d);const v=cy(i.threeColor);return v.position.set(0,0,.95),v.userData.restY=v.position.y,sr[i.id]=v,t.add(v),t}function py(i){const t=new Ut,e=.915;t.add(oy(i.deskColor)),[[-.85,.18],[.85,-.18]].forEach(([_,f])=>{const d=Jr("db",i.hex),v=Qr(1118481,d);v.position.set(_,e,-.38),v.rotation.y=f,t.add(v)});const r=new Pn(i.threeColor,.45,3);r.position.set(0,1.8,.1),t.add(r),r.userData.baseIntensity=.45,r.userData.phase=3.5,or.push({light:r,type:"screen"});const s=j(.015,.015,.5,659226);s.position.set(1.55,e,-.3),s.rotation.y=.25,t.add(s);const o=j(.7,.025,.26,659226);o.position.set(0,e+.0125,.06),t.add(o);const a=zs();a.position.set(.45,e,.1),t.add(a);const l=Hl(i.threeColor);l.position.set(1.06,e,.12),t.add(l);const c=Hl(2278750);c.position.set(.86,e,.28),c.scale.setScalar(.82),t.add(c);const h=j(.07,.001,.07,16729088);h.position.set(-.28,e+5e-4,-.02),t.add(h),[0,1,2].forEach(_=>{const f=j(.11,.025,.19,_===0?1976635:_===1?988970:1710638);f.position.set(-.52,e+.0125+_*.028,.28),t.add(f);const d=j(.014,.01,.014,_===1?i.threeColor:2278750);d.position.set(-.465,e+.0175+_*.028,.195),t.add(d)});const u=new $(new Bt(.048,.042,.18,12),new ct({color:1976635}));u.position.set(-1.04,e+.09,.24),t.add(u);const p=new $(new Bt(.05,.05,.03,12),new ct({color:i.threeColor}));p.position.set(-1.04,e+.09+.105,.24),t.add(p);const m=ks(i.threeColor);m.position.set(1.6,0,.3),m.rotation.y=-Math.PI/2,t.add(m);const g=Yd(i.threeColor);return g.position.set(0,0,.95),g.userData.restY=g.position.y,sr[i.id]=g,t.add(g),t}function my(i){const t=document.createElement("canvas");t.width=320,t.height=88;const e=t.getContext("2d");e.fillStyle="rgba(15, 23, 42, 0.88)",e.roundRect(0,0,320,88,22),e.fill(),e.strokeStyle=i.hex,e.lineWidth=4,e.roundRect(2,2,316,84,20),e.stroke(),e.fillStyle="rgba(255,255,255,0.28)",e.font="bold 16px sans-serif",e.fillText(i.role.split("·")[0].trim(),160,24),e.fillStyle="rgba(0,0,0,0.45)",e.font="bold 36px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(i.name,160,51),e.fillStyle="white",e.font="bold 36px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(i.name,160,48);const n=new ec(t),r=new Vu({map:n,transparent:!0,depthTest:!0,depthWrite:!1}),s=new tv(r);return s.scale.set(2.2,.62,1),s.position.set(i.position[0],i.position[1]+2.6,i.position[2]),s.visible=!1,Ec.push(s),s}function _y(){const e=new $(new gt(22,.18,20),new ct({color:12882266}));e.position.set(0,-.09,0),e.receiveShadow=!0,_t.add(e);for(let S=-9;S<=9;S+=2){const P=new $(new gt(22,.01,.05),new ct({color:8015662,transparent:!0,opacity:.25}));P.position.set(0,.01,S),_t.add(P)}const n=new $(new gt(22,.18,20),new ct({color:16447474}));n.position.set(0,4.09,0),_t.add(n);const r=new ct({color:15920613}),s=.18;[[22,1.03,s,0,3.765,-10],[22,1.35,s,0,.675,-10],[2.65,1.9,s,-9.675,2.3,-10],[4.3,1.9,s,-3.5,2.3,-10],[4.3,1.9,s,3.5,2.3,-10],[2.65,1.9,s,9.675,2.3,-10]].forEach(([S,P,F,I,V,W])=>{const z=new $(new gt(S,P,F),r);z.position.set(I,V,W),z.receiveShadow=!0,_t.add(z)});const o=new $(new gt(.18,4.28,20),r);o.position.set(-11,2,0),_t.add(o);const a=new $(new gt(.18,4.28,20),r);a.position.set(11,2,0),_t.add(a);const l=new ct({color:2963272});[-11,-3,3,11].forEach(S=>{const P=new $(new gt(.2,4.28,.2),l);P.position.set(S,2,10),_t.add(P)});const c=new $(new gt(22,.32,.2),l);c.position.set(0,4.05,10),_t.add(c);const h=new $(new gt(22,.2,.2),l);h.position.set(0,.05,10),_t.add(h);const u=new ct({color:10406623,transparent:!0,opacity:.18,side:Cn}),p=new $(new gt(8,3.82,.06),u);p.position.set(-7,1.96,10),_t.add(p);const m=new $(new gt(8,3.82,.06),u);m.position.set(7,1.96,10),_t.add(m),[1.2,2.4,3.6].forEach(S=>{const P=new $(new gt(8,.05,.08),l);[-7,7].forEach(F=>{const I=P.clone();I.position.set(F,S,10),_t.add(I)})});const g=ey();g.position.set(0,0,10),_t.add(g);const _=new ct({color:8900331,transparent:!0,opacity:.45,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),f=new ct({color:16777215});[-7,0,7].forEach(S=>{const P=new $(new gt(3,2.2,.12),f);P.position.set(S,2.3,-9.94),_t.add(P);const F=new $(new gt(2.7,1.9,.06),_);F.position.set(S,2.3,-9.88),_t.add(F);const I=new $(new gt(2.7,.07,.14),f);I.position.set(S,2.3,-9.8),_t.add(I);const V=new $(new gt(.07,1.9,.14),f);V.position.set(S,2.3,-9.8),_t.add(V)});const d=new ct({color:16777200});[[-6,3.96,-4],[0,3.96,-2],[6,3.96,-4],[-4,3.96,3],[4,3.96,3]].forEach(S=>{const P=new $(new gt(1.3,.07,.32),d);P.position.set(...S),_t.add(P);const F=new $(new gt(1.1,.01,.27),new We({color:16777208,transparent:!0,opacity:.85}));F.position.set(S[0],S[1]-.05,S[2]),_t.add(F)});const v=jx();v.position.set(-10.94,2.2,-7),v.rotation.y=Math.PI/2,_t.add(v);const M=Zx();M.position.set(10.94,1,-7),M.rotation.y=-Math.PI/2,_t.add(M);const x=$x();x.position.set(8,0,0),_t.add(x);const A=Bo(2);A.position.set(-9,0,-9),_t.add(A);const T=Bo(2.4);T.position.set(9,0,-9),_t.add(T);const w=Qx(16775392);w.position.set(-9,0,-4),_t.add(w);const R=Jx(2.2);R.position.set(9,0,-4),_t.add(R);const y=new $(new gt(16,.02,10),new ct({color:4988309,transparent:!0,opacity:.55}));y.position.set(0,.01,-1),_t.add(y)}function gy(){const i=new $(new gt(200,.12,200),new ct({color:2894896}));i.position.set(0,-.15,0),_t.add(i),[[-14,-16,0],[14,-16,0],[-14,18,0],[14,18,0]].forEach(([f,d])=>{const v=new $(new gt(.28,.01,10),new ct({color:16448250,transparent:!0,opacity:.6}));v.position.set(f,-.08,d),_t.add(v)});function t(f,d,v,M){const x=new Ut,A=new $(new gt(f,d,v),new ct({color:M}));A.position.y=d/2,x.add(A);const T=new $(new gt(f*.4,.6,v*.4),new ct({color:M}));T.position.set(f*.15,d+.3,0),x.add(T);function w(I,V){const W=document.createElement("canvas");W.width=I*8,W.height=V*8;const z=W.getContext("2d"),q="#"+M.toString(16).padStart(6,"0");z.fillStyle=q,z.fillRect(0,0,W.width,W.height);for(let k=0;k<V;k++)for(let it=0;it<I;it++){const rt=Math.random()>.32;z.fillStyle=rt?Math.random()>.45?"#fff3c0":"#c5e8ff":"#0b1118",z.fillRect(it*8+1,(V-1-k)*8+1,6,6)}return new ec(W)}const R=Math.max(2,Math.round(f*2.2)),y=Math.max(2,Math.round(v*2.2)),S=Math.max(4,Math.round(d*1.8)),P=w(R,S),F=w(y,S);return[[0,d/2,v/2+.06,0,P,f*.9,d*.95],[0,d/2,-v/2-.06,Math.PI,P,f*.9,d*.95],[f/2+.06,d/2,0,Math.PI/2,F,v*.9,d*.95],[-f/2-.06,d/2,0,-Math.PI/2,F,v*.9,d*.95]].forEach(([I,V,W,z,q,k,it])=>{const rt=new $(new es(k,it),new We({map:q}));rt.position.set(I,V,W),rt.rotation.y=z,x.add(rt)}),x}const e=[4018019,4873844,3621973,2964044,4544617,5464176,3821672,5136242,3031119,4280932];[[-8,-22,6,28,5],[4,-26,5,36,5],[14,-30,7,22,6],[-14,22,6,24,5],[0,28,7,34,6],[14,22,5,20,5],[-18,-8,5,26,5],[-18,6,5,18,4],[18,-8,5,30,5],[18,6,4,16,4]].forEach(([f,d,v,M,x])=>{const A=e[Math.floor(Math.random()*e.length)],T=t(v,M,x,A);T.position.set(f,0,d),_t.add(T)});const r=new ct({color:2236966}),s=new ct({color:15790320,transparent:!0,opacity:.75}),o=new ct({color:15790320,transparent:!0,opacity:.6}),a=new $(new gt(60,.04,7),r);a.position.set(0,-.11,16.5),_t.add(a);const l=new $(new gt(60,.04,7),r);l.position.set(0,-.11,-15.5),_t.add(l);const c=new $(new gt(7,.04,60),r);c.position.set(-14,-.11,0),_t.add(c);const h=new $(new gt(7,.04,60),r);h.position.set(14,-.11,0),_t.add(h);for(let f=-25;f<26;f+=4)[16.5,-15.5].forEach(d=>{const v=new $(new gt(2.2,.01,.18),o);v.position.set(f,-.08,d),_t.add(v)});for(let f=-25;f<26;f+=4)[-14,14].forEach(d=>{const v=new $(new gt(.18,.01,2.2),o);v.position.set(d,-.08,f),_t.add(v)});[[60,.04,.12,0,-.08,13.1],[60,.04,.12,0,-.08,19.9],[60,.04,.12,0,-.08,-12.1],[60,.04,.12,0,-.08,-18.9]].forEach(([f,d,v,M,x,A])=>{const T=new $(new gt(f,d,v),s);T.position.set(M,x,A),_t.add(T)});const u=new ct({color:7039858});[[60,.06,2,0,-.09,11.5],[60,.06,2,0,-.09,21],[60,.06,2,0,-.09,-12.7],[60,.06,2,0,-.09,-20.5]].forEach(([f,d,v,M,x,A])=>{const T=new $(new gt(f,d,v),u);T.position.set(M,x,A),_t.add(T)});const p=new ct({color:4881471});[[60,.06,4,0,-.09,23.5],[60,.06,4,0,-.09,-22.5],[4,.06,30,-16.5,-.09,0],[4,.06,30,16.5,-.09,0]].forEach(([f,d,v,M,x,A])=>{const T=new $(new gt(f,d,v),p);T.position.set(M,x,A),_t.add(T)});function m(f=2.2,d=1){const v=new Ut,M=new $(new Bt(.12,.18,f,7),new ct({color:6044958}));return M.position.y=f/2,v.add(M),[[0,f+d*.6,0,d],[.2,f+d*.9,.15,d*.75]].forEach(([x,A,T,w])=>{const R=new $(new Xr(w,8,7),new ct({color:2976301}));R.position.set(x,A,T),v.add(R)}),v}[-20,-12,-4,4,12,20].forEach(f=>{const d=m(2.4,1.1);d.position.set(f,0,11.5),_t.add(d);const v=m(2.2,1);v.position.set(f,0,21),_t.add(v)}),[-18,-8,2,10].forEach(f=>{const d=m(2.3,1);d.position.set(f,0,-12.7),_t.add(d)}),[[-16,-10],[-16,5],[16,-8],[16,7],[-16,-22],[16,-22],[-8,23.5],[6,23.5],[-20,23.5]].forEach(([f,d])=>{const v=m(2+Math.random()*.6,.9+Math.random()*.3);v.position.set(f,0,d),_t.add(v)});function g(f,d){const v=new ct({color:4868693}),M=new $(new Bt(.055,.07,4.5,6),v);M.position.set(f,2.25,d),_t.add(M);const x=new $(new gt(.8,.07,.07),v);x.position.set(f+.35,4.6,d),_t.add(x);const A=new $(new gt(.5,.18,.22),new ct({color:3355456}));A.position.set(f+.72,4.52,d),_t.add(A);const T=new $(new gt(.38,.05,.18),new We({color:16776160}));T.position.set(f+.72,4.42,d),_t.add(T);const w=new Pn(16776160,.5,14);w.position.set(f+.72,4.3,d),_t.add(w)}[-18,-10,-2,6,14,22].forEach(f=>g(f,12.8)),[-16,-6,4,12].forEach(f=>g(f,-13.5)),[-20,-10,0,10].forEach(f=>g(-13.2,f));function _(f){const d=new Ut,v=new $(new gt(1.8,.6,.9),new ct({color:f}));v.position.y=.55,d.add(v);const M=new $(new gt(1,.45,.82),new ct({color:f}));M.position.set(-.1,.98,0),d.add(M);const x=new $(new gt(.05,.38,.74),new ct({color:1714746,transparent:!0,opacity:.7}));x.position.set(.43,.96,0),d.add(x),[[.55,.22,.5],[.55,.22,-.5],[-.55,.22,.5],[-.55,.22,-.5]].forEach(([T,w,R])=>{const y=new $(new Bt(.22,.22,.14,10),new ct({color:1118481}));y.rotation.x=Math.PI/2,y.position.set(T,w,R),d.add(y)});const A=new We({color:16775376});return[[.92,.55,.3],[.92,.55,-.3]].forEach(([T,w,R])=>{const y=new $(new gt(.06,.12,.18),A);y.position.set(T,w,R),d.add(y)}),d}[[2771566,-8,13.5,0],[11546672,5,13.5,0],[15261904,18,16.5,0],[3815994,-16,-14.5,Math.PI],[4880954,2,-14.5,Math.PI]].forEach(([f,d,v,M])=>{const x=_(f);x.position.set(d,0,v),x.rotation.y=M,_t.add(x)})}function vy(i){const t=new gt(3.4,2.2,3),e=new We({visible:!1}),n=new $(t,e);n.position.set(i.position[0],i.position[1]+1.1,i.position[2]),n.userData.person=i,_t.add(n),bc.push(n)}let Es,ps;function xy(){ps=new Float32Array(250*3);for(let e=0;e<250;e++)ps[e*3]=(Math.random()-.5)*20,ps[e*3+1]=Math.random()*4,ps[e*3+2]=(Math.random()-.5)*22;Es=new dn,Es.setAttribute("position",new Sn(ps,3));const t=new ev(Es,new Wu({color:16777215,size:.025,transparent:!0,opacity:.3}));_t.add(t)}function yy(){Vx(),_y(),gy(),xy(),fe.forEach(i=>{let t;i.deskType==="designer"&&(t=hy(i)),i.deskType==="pm"&&(t=uy(i)),i.deskType==="director"&&(t=dy(i)),i.deskType==="tester"&&(t=fy(i)),i.deskType==="db"&&(t=py(i)),t.position.set(...i.position),_t.add(t),_t.add(my(i)),vy(i)})}const yi=new av,Dr=new Tt;window.addEventListener("mousemove",i=>{if(Dr.x=i.clientX/window.innerWidth*2-1,Dr.y=-(i.clientY/window.innerHeight)*2+1,!Sc&&!Bs&&!Ls&&Is){yi.setFromCamera(Dr,un);const e=yi.intersectObject(Is);Us.style.cursor=e.length>0?"pointer":"default";return}if(xi)return;yi.setFromCamera(Dr,un);const t=yi.intersectObjects(bc);Us.style.cursor=t.length>0?"pointer":"grab"});window.addEventListener("click",i=>{if(!Sc&&!Bs&&!Ls&&Is){yi.setFromCamera(Dr,un),yi.intersectObject(Is).length>0&&My();return}if(xi)return;yi.setFromCamera(Dr,un);const t=yi.intersectObjects(bc);t.length>0&&pi(t[0].object.userData.person)});function pi(i){xi=!0,gn=i,Be.enabled=!1,document.getElementById("hints").classList.add("hidden"),document.getElementById("back-btn").classList.remove("hidden"),document.querySelectorAll(".nav-person").forEach(e=>{e.style.opacity=e.querySelector(".nav-person-name").textContent===i.name?"1":"0.35"}),En.to(un.position,{x:i.camPos[0],y:i.camPos[1],z:i.camPos[2],duration:1.5,ease:"power3.inOut"}),En.to(Be.target,{x:i.camTarget[0],y:i.camTarget[1],z:i.camTarget[2],duration:1.5,ease:"power3.inOut",onComplete:()=>{Be.enabled=!0,Ey(i)}});const t=sr[i.id];if(t){const e=t.userData.restY??0;En.to(t.position,{y:e-Hx,duration:.32,ease:"power2.out",delay:1,yoyo:!0,repeat:1})}}function Oa(){if(xi=!1,gn=null,by(),document.getElementById("back-btn").classList.add("hidden"),document.querySelectorAll(".nav-person").forEach(i=>{i.style.opacity=""}),gn){const i=sr[gn.id];i&&En.to(i.position,{y:i.userData.restY??0,duration:.3,ease:"power2.out"})}En.to(un.position,{x:0,y:2,z:14,duration:1.5,ease:"power3.inOut"}),En.to(Be.target,{x:0,y:1.2,z:0,duration:1.5,ease:"power3.inOut",onComplete:()=>{Be.enabled=!1,document.getElementById("hints").classList.remove("hidden"),document.getElementById("person-nav").classList.remove("hidden")}})}function My(){Ls||(Ls=!0,Bs=!0,Tc.forEach(i=>{En.to(i.position,{x:i.userData.openX,duration:.9,ease:"power2.out"})}),Ec.forEach(i=>{i.visible=!0}),document.getElementById("hints").classList.remove("hidden"),document.getElementById("person-nav").classList.remove("hidden"),Us.style.cursor="grab")}function Sy(){Ls=!1,Bs=!1,Tc.forEach(i=>{En.killTweensOf(i.position),i.position.x=i.userData.closedX}),Ec.forEach(i=>{i.visible=!1}),Us.style.cursor="default"}function Ey(i){var l,c,h;const t=document.getElementById("info-card");t.classList.remove("hidden"),document.getElementById("card-avatar").textContent=i.emoji,document.getElementById("card-avatar").style.cssText=`background:${i.hex}22;border:2px solid ${i.hex};width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:1.4rem;`,document.getElementById("card-name").textContent=i.name,document.getElementById("card-name").style.color=i.hex,document.getElementById("card-fullname").textContent=i.fullName,document.getElementById("card-role").textContent=i.role,document.getElementById("card-role").style.cssText=`display:inline-block;font-size:0.78rem;font-weight:600;letter-spacing:0.05em;padding:0.35rem 0.9rem;border-radius:50px;margin-bottom:1.6rem;background:${i.hex}22;color:${i.hex};`,document.getElementById("card-bio").textContent=i.bio,document.getElementById("card-skills").innerHTML=i.skills.map(u=>`<div class="skill-row">
      <div class="skill-row-header">
        <span class="skill-row-name">${u.name}</span>
        <span class="skill-row-pct">${u.level}%</span>
      </div>
      <div class="skill-track"><div class="skill-fill" style="width:0%;background:${i.hex}"></div></div>
    </div>`).join(""),requestAnimationFrame(()=>{document.querySelectorAll("#card-skills .skill-fill").forEach((u,p)=>{u.style.width=i.skills[p].level+"%"})}),document.getElementById("card-funfact").textContent=i.funFact,document.getElementById("card-funfact").style.borderLeft=`3px solid ${i.hex}`;const e=[];(l=i.social)!=null&&l.github&&e.push(`<a class="social-link" href="${i.social.github}" target="_blank">⌥ GitHub</a>`),(c=i.social)!=null&&c.linkedin&&e.push(`<a class="social-link" href="${i.social.linkedin}" target="_blank">in LinkedIn</a>`),(h=i.social)!=null&&h.email&&e.push(`<a class="social-link" href="mailto:${i.social.email}">✉ Email</a>`),document.getElementById("card-social").innerHTML=e.join(""),document.getElementById("card-social").style.display=e.length?"flex":"none";const n=fe.findIndex(u=>u.id===i.id),r=fe[(n-1+fe.length)%fe.length],s=fe[(n+1)%fe.length],o=document.getElementById("card-prev"),a=document.getElementById("card-next");o.textContent=`← ${r.name}`,o.style.borderColor=r.hex+"55",o.onmouseenter=()=>{o.style.background=r.hex+"22",o.style.color=r.hex},o.onmouseleave=()=>{o.style.background="",o.style.color=""},a.textContent=`${s.name} →`,a.style.borderColor=s.hex+"55",a.onmouseenter=()=>{a.style.background=s.hex+"22",a.style.color=s.hex},a.onmouseleave=()=>{a.style.background="",a.style.color=""},requestAnimationFrame(()=>t.classList.add("show"))}function by(){const i=document.getElementById("info-card");i.classList.remove("show"),setTimeout(()=>i.classList.add("hidden"),560)}function Ty(){const i=document.getElementById("code-rain-container");if(!i)return()=>{};const t=[{color:"#3b82f6",code:`function render(props) {
  return (
    <Hero
      title={props.title}
      team={props.members}
    />
  )
}`},{color:"#06b6d4",code:`SELECT u.name,
  COUNT(*) AS orders
FROM users u
JOIN orders o
  ON u.id = o.user_id
GROUP BY u.name
ORDER BY 2 DESC;`},{color:"#f472b6",code:`.hero {
  display: grid;
  place-items: center;
  background: #000;
  animation: glow
    3s ease infinite;
}`},{color:"#10b981",code:`describe('auth', () => {
  it('should login', () => {
    const res = post('/login')
    expect(res.status)
      .toBe(200)
  })
})`},{color:"#8b5cf6",code:`const roadmap = [
  { sprint: 1,
    goal: 'MVP launch' },
  { sprint: 2,
    goal: 'User testing' },
  { sprint: 3,
    goal: 'v1.0 release' },
]`},{color:"#f97316",code:`$ npm run build

✓ 3 modules bundled
✓ dist/index.html
✓ dist/assets/

Done in 1.2s`},{color:"#a78bfa",code:`CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMP
    DEFAULT NOW()
);`},{color:"#34d399",code:`interface Member {
  id: string
  name: string
  role: Role
  skills: string[]
  active: boolean
}`},{color:"#60a5fa",code:`const [data, setData] =
  useState(null)

useEffect(() => {
  api.getTeam()
    .then(setData)
}, [])`},{color:"#fb923c",code:`def sprint_review():
  team = load_team()
  bugs = tracker.open()
  for b in bugs:
    team.assign(b)
  team.ship()`}];let e=!0;const n=new Set;function r(){if(!e)return;const l=t[Math.floor(Math.random()*t.length)],c=document.createElement("pre"),h=Math.random()*88+2,u=Math.random()*82+2,p=.35+Math.random()*.25,m=.015+Math.random()*.045;c.dataset.depth=String(m),c.style.cssText=`
      position:absolute;
      left:${h}%;
      top:${u}%;
      color:${l.color};
      font-size:clamp(0.52rem,0.85vw,0.7rem);
      line-height:1.55;
      opacity:0;
      white-space:pre;
      pointer-events:none;
      transition:opacity 0.6s ease, filter 0.9s ease;
      text-shadow:0 0 12px ${l.color}99;
      font-family:ui-monospace,'Cascadia Code','Fira Code','Courier New',monospace;
      filter:blur(0px);
      will-change:transform;
    `,i.appendChild(c),n.add(c),requestAnimationFrame(()=>requestAnimationFrame(()=>{c.style.opacity=String(p)}));const g=l.code.split("");let _=0;const f=20+Math.random()*18,d=setInterval(()=>{if(!e){clearInterval(d);return}if(c.textContent+=g[_],_++,_>=g.length){clearInterval(d);const v=1400+Math.random()*1800;setTimeout(()=>{c.style.opacity="0",c.style.filter="blur(8px)",setTimeout(()=>{c.remove(),n.delete(c)},950)},v)}},f)}r();const s=setInterval(()=>{e&&n.size<10&&r()},950);let o=!1;function a(l){!e||o||(o=!0,requestAnimationFrame(()=>{o=!1;const c=l.clientX/window.innerWidth-.5,h=l.clientY/window.innerHeight-.5;n.forEach(u=>{const p=parseFloat(u.dataset.depth||"0.03");u.style.transform=`translate(${c*p*500}px, ${h*p*380}px)`})}))}return window.addEventListener("mousemove",a),function(){e=!1,clearInterval(s),window.removeEventListener("mousemove",a),n.forEach(c=>c.remove()),n.clear()}}function wy(){const i=Ty();document.getElementById("enter-btn").addEventListener("click",()=>{i();const t=document.getElementById("intro");Sy(),document.getElementById("hints").classList.add("hidden"),document.getElementById("person-nav").classList.add("hidden"),En.to(t,{opacity:0,duration:.9,ease:"power2.inOut",onComplete:()=>{t.style.display="none",Sc=!1;const e=document.getElementById("person-nav");fe.forEach(n=>{const r=document.createElement("div");r.className="nav-person",r.style.cssText=`border-color:${n.hex}30;`,r.innerHTML=`
            <div class="nav-person-avatar" style="background:${n.hex}1a;border-color:${n.hex}55;">${n.emoji}</div>
            <span class="nav-person-name">${n.name}</span>
            <span class="nav-person-role">${n.role.split("·")[0].trim()}</span>
          `,r.addEventListener("mouseenter",()=>{r.style.background=`${n.hex}18`,r.style.borderColor=`${n.hex}66`,r.style.boxShadow=`0 0 18px ${n.hex}33`}),r.addEventListener("mouseleave",()=>{r.style.background="",r.style.borderColor=`${n.hex}30`,r.style.boxShadow=""}),r.addEventListener("click",()=>pi(n)),e.appendChild(r)})}}),En.to(un.position,{x:0,y:2,z:14,duration:2.4,ease:"power2.out",delay:.25}),En.to(Be.target,{x:0,y:1.2,z:0,duration:2.4,ease:"power2.out",delay:.25})}),document.getElementById("back-btn").addEventListener("click",Oa),document.getElementById("card-close").addEventListener("click",Oa),document.getElementById("card-prev").addEventListener("click",()=>{if(!gn)return;const t=fe.findIndex(e=>e.id===gn.id);pi(fe[(t-1+fe.length)%fe.length])}),document.getElementById("card-next").addEventListener("click",()=>{if(!gn)return;const t=fe.findIndex(e=>e.id===gn.id);pi(fe[(t+1)%fe.length])}),window.addEventListener("keydown",t=>{if(Bs){if(t.key==="Escape"&&xi){Oa();return}if((t.key==="ArrowLeft"||t.key==="ArrowUp")&&xi&&gn){const e=fe.findIndex(n=>n.id===gn.id);pi(fe[(e-1+fe.length)%fe.length]);return}if((t.key==="ArrowRight"||t.key==="ArrowDown")&&xi&&gn){const e=fe.findIndex(n=>n.id===gn.id);pi(fe[(e+1)%fe.length]);return}!xi&&t.key>="1"&&t.key<="5"&&pi(fe[parseInt(t.key)-1])}})}const Ay=new ov;function qd(){requestAnimationFrame(qd);const i=Ay.getElapsedTime();if(or.forEach(({light:t,type:e})=>{const n=t.userData.baseIntensity??.4,r=t.userData.phase??0;if(e==="screen")t.intensity=n*(.88+.12*Math.sin(i*.9+r));else{const s=.96+.04*Math.sin(i*3.7+r)*Math.sin(i*11.3+r*1.7);t.intensity=n*s}}),Ss&&(Ss.intensity=1.1+.5*Math.sin(i*1.8)+.15*Math.sin(i*4.3)),Xd.forEach((t,e)=>{t.intensity=.22+.08*Math.sin(i*.4+t.userData.phase)}),Es){const t=Es.attributes.position;for(let e=0;e<250;e++)t.array[e*3+1]+=Math.sin(i*.4+e*.8)*.0012,t.array[e*3]+=Math.cos(i*.3+e)*6e-4,t.array[e*3+1]>4&&(t.array[e*3+1]=0),t.array[e*3+1]<0&&(t.array[e*3+1]=4);t.needsUpdate=!0}Be.update(),ri.render(_t,un)}window.addEventListener("resize",()=>{un.aspect=window.innerWidth/window.innerHeight,un.updateProjectionMatrix(),ri.setSize(window.innerWidth,window.innerHeight)});yy();wy();qd();const cu=new URLSearchParams(window.location.search).get("person");if(cu){const i=fe.find(t=>t.id===cu);i&&(setTimeout(()=>document.getElementById("enter-btn").click(),400),setTimeout(()=>pi(i),3400))}
