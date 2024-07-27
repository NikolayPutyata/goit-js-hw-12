import{a as f,S as h,i as l}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();async function m(r){try{return(await f.get("https://pixabay.com/api/",r)).data}catch(t){throw t}}function y(r){const t=document.querySelector(".gallery"),o=r.map(e=>`<li class="item-ul">
  <a href="${e.largeImageURL}"><img src="${e.webformatURL}" alt="${e.tags}" /></a>
  <div class="about-img-div">
    <p class="description-img">Likes</p>
    <p class="description-img">Views</p>
    <p class="description-img">Comments</p>
    <p class="description-img">Downloads</p>
    <span class="description-value">${e.likes}</span>
    <span class="description-value">${e.views}</span>
    <span class="description-value">${e.comments}</span>
    <span class="description-value">${e.downloads}</span>
  </div>
</li>`).join("");t.insertAdjacentHTML("beforeend",o),new h(".gallery li a",{captions:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}const u=document.querySelector(".form"),a=document.querySelector(".loader"),b=document.querySelector(".gallery"),c=document.querySelector(".load-more-button"),g="45056360-0d73312e4ecad0bc63c18ca30";let p=1,i="";u.addEventListener("submit",v);c.addEventListener("click",w);async function v(r){if(r.preventDefault(),i=u.elements[0].value.trim(),p=1,b.innerHTML="",i===""||i.length<2){l.error({title:"",message:"The input field is empty or has less than two characters!"});return}a.style.display="block";const t={params:{key:g,q:i,image_type:"photo",orientation:"horizontal",page:p,per_page:15}};try{const o=await m(t);a.style.display="none",o.hits.length===0?(l.error({title:"",message:"No pictures found! Try again!"}),c.style.display="none"):(y(o.hits),c.style.display="block")}catch(o){a.style.display="none",l.error({title:"",message:`Error fetching images: ${o.message||o}`})}finally{u.reset()}}async function w(){a.style.display="block",p+=1;const r={params:{key:g,q:i,image_type:"photo",orientation:"horizontal",page:p,per_page:15}};try{const t=await m(r);if(a.style.display="none",t.hits.length===0)c.style.display="none",l.info({title:"",message:"No more pictures found!"});else{y(t.hits);const n=document.querySelector(".gallery li").getBoundingClientRect();window.scrollBy({top:n.height*2,behavior:"smooth"})}}catch(t){a.style.display="none",l.error({title:"",message:`Error fetching images: ${t.message||t}`})}}
//# sourceMappingURL=commonHelpers.js.map
