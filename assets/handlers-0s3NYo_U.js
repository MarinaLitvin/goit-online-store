import{a as h,i as d}from"./vendor-4yCzdkXl.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const g="https://dummyjson.com/products",l=12,p={wishlist:"wishlist",cart:"cart",theme:"dark"};async function nt(){return(await h.get(`${g}/category-list`)).data}async function v(t){const e=(t-1)*l;return(await h.get(g,{params:{limit:l,skip:e}})).data}async function M(t,e){const o=(e-1)*l;return(await h.get(`${g}/category/${t}`,{params:{limit:l,skip:o}})).data}async function J(t){return(await h.get(`${g}/${t}`)).data}async function k(t,e){const o=(e-1)*l;return(await h.get(`${g}/search`,{params:{q:t,limit:l,skip:o}})).data}function B(){return JSON.parse(localStorage.getItem(p.cart))||[]}function A(t){localStorage.setItem(p.cart,JSON.stringify(t))}function D(t){const e=B();return e.includes(t)||(e.push(t),A(e)),e}function U(t){const o=B().filter(r=>r!==t);return A(o),o}function W(t){return B().includes(t)}function I(){return JSON.parse(localStorage.getItem(p.wishlist))||[]}function N(t){localStorage.setItem(p.wishlist,JSON.stringify(t))}function z(t){const e=I();return e.includes(t)||(e.push(t),N(e)),e}function K(t){const o=I().filter(r=>r!==t);return N(o),o}function O(t){return I().includes(t)}function G(){return localStorage.getItem(p.theme)}function Q(t){localStorage.setItem(p.theme,t)}function at(t,e){return Promise.all(t.map(o=>e(o)))}function E(t){return t.map(({id:e,thumbnail:o,title:r,brand:n,category:a,price:u})=>`
        <li class="products__item" data-id="${e}">
          <img
            class="products__image"
            src="${o}"
            alt="${r}"
          />

          <p class="products__title">${r}</p>

          <p class="products__brand">
            <span class="products__brand--bold">Brand:</span>
            ${n??"Unknown"}
          </p>

          <p class="products__category">
            Category: ${a}
          </p>

          <p class="products__price">
            Price: $${u}
          </p>
        </li>
      `).join("")}function ct(t){return t.reduce((e,o)=>e+o.price,0)}function Y(t,e){return t*l<e}function V(){return document.body.dataset.theme==="dark"}function x(t){document.body.dataset.theme=t}const s={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),loadMoreButton:document.querySelector(".load-more-btn"),notFound:document.querySelector(".not-found"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),loader:document.querySelector(".loader"),scrollTopButton:document.querySelector(".scroll-top-btn"),searchForm:document.querySelector(".search-form"),searchInput:document.querySelector(".search-form__input"),searchClearButton:document.querySelector(".search-form__btn-clear"),modalAddToCartButton:document.querySelector(".modal-product__btn--cart"),wishlistButton:document.querySelector(".modal-product__btn--wishlist"),cartCount:document.querySelector("[data-cart-count]"),wishlistCount:document.querySelector("[data-wishlist-count]"),itemsCount:document.querySelector("[data-count]"),totalPrice:document.querySelector("[data-price]"),buyProductsButton:document.querySelector(".cart-summary__btn"),themeToggleButton:document.querySelector(".theme-toggle-btn")};function it(t){const e=t.map(o=>`
        <li class="categories__item">
          <button 
            class="categories__btn"
            type="button"
          >
            ${o}
          </button>
        </li>
      `).join("");s.categoriesList.innerHTML=e}function f(t){s.productsList.innerHTML=E(t)}function b(t,e){Y(t,e)?Z():S()}function X(t){s.productsList.insertAdjacentHTML("beforeend",E(t))}function F(){s.notFound.classList.add("not-found--visible")}function q(){s.notFound.classList.remove("not-found--visible")}function y(){s.loader.classList.add("is-visible")}function _(){s.loader.classList.remove("is-visible")}function Z(){s.loadMoreButton.classList.remove("is-hidden")}function S(){s.loadMoreButton.classList.add("is-hidden")}function tt(t){const{thumbnail:e,title:o,tags:r,description:n,shippingInformation:a,returnPolicy:u,price:j}=t;s.modalProduct.innerHTML=`
    <img
      class="modal-product__img"
      src="${e}"
      alt="${o}"
    />

    <div class="modal-product__content">
      <p class="modal-product__title">${o}</p>

      <ul class="modal-product__tags">
        ${r.map(H=>`<li>${H}</li>`).join("")}
      </ul>

      <p class="modal-product__description">
        ${n}
      </p>

      <p class="modal-product__shipping-information">
        Shipping: ${a}
      </p>

      <p class="modal-product__return-policy">
        Return Policy: ${u}
      </p>

      <p class="modal-product__price">
        Price: $${j}
      </p>

      <button
        class="modal-product__buy-btn"
        type="button"
      >
        Buy
      </button>
    </div>
  `}function C(t){s.modalAddToCartButton.textContent=t?"Remove from Cart":"Add to Cart"}function L(t){s.wishlistButton.textContent=t?"Remove from Wishlist":"Add to Wishlist"}function $(t){s.cartCount.textContent=t}function T(t){s.wishlistCount.textContent=t}function R(t){t.key==="Escape"&&P()}function et(){s.modal.classList.add("modal--is-open"),document.addEventListener("keydown",R)}function P(){s.modal.classList.remove("modal--is-open"),document.removeEventListener("keydown",R)}let w="All",c=1,m="",i=null;async function ut(t){const e=t.target.closest(".categories__btn");if(!e)return;const o=e.textContent.trim();w=o,c=1,m="",s.searchInput.value="",s.searchClearButton.classList.remove("is-visible"),document.querySelectorAll(".categories__btn").forEach(r=>{r.classList.remove("categories__btn--active")}),e.classList.add("categories__btn--active"),q(),y();try{let r;if(o==="All"?r=await v(c):r=await M(o,c),r.products.length===0){f([]),S(),F();return}f(r.products),b(c,r.total)}catch(r){console.error(r),d.error({message:"Something went wrong. Please try again!"})}finally{_()}}async function lt(t){const e=t.target.closest(".products__item");if(!e)return;const o=Number(e.dataset.id);i=o,y();try{const r=await J(o);tt(r),C(W(o)),L(O(o)),et()}catch(r){console.error(r),d.error({message:"Something went wrong. Please try again!"})}finally{_()}}async function dt(){const e=s.productsList.querySelector(".products__item").getBoundingClientRect().height,o=c+1;y();try{let r;if(m?r=await k(m,o):w==="All"?r=await v(o):r=await M(w,o),r.products.length===0){S(),d.info({message:"No more products available."});return}X(r.products),c=o,b(c,r.total),window.scrollBy({top:e*2,behavior:"smooth"})}catch(r){console.error(r),c-=1,d.error({message:"Something went wrong. Please try again!"})}finally{_()}}function mt(t){if(t.target.closest(".modal__close-btn")){P();return}if(t.target.closest(".modal-product__btn--cart")){ot();return}if(t.target.closest(".modal-product__btn--wishlist")){rt();return}t.target===s.modal&&P()}async function pt(t){t.preventDefault();const e=s.searchInput.value.trim();if(e){c=1,m=e,w="All",s.searchClearButton.classList.add("is-visible"),q(),y();try{const o=await k(m,c);if(o.products.length===0){f([]),S(),F();return}f(o.products),b(c,o.total)}catch(o){console.error(o),d.error({message:"Something went wrong. Please try again!"})}finally{_()}}}async function ft(){s.searchInput.value="",s.searchClearButton.classList.remove("is-visible"),c=1,m="",q(),y();try{const t=await v(c);f(t.products),b(c,t.total)}catch(t){console.error(t),d.error({message:"Something went wrong. Please try again!"})}finally{_()}}function ot(){if(i===null)return;if(W(i)){const e=U(i);C(!1),$(e.length)}else{const e=D(i);C(!0),$(e.length)}}function rt(){if(i===null)return;if(O(i)){const e=K(i);L(!1),T(e.length)}else{const e=z(i);L(!0),T(e.length)}}function ht(){const t=V()?"light":"dark";x(t),Q(t)}function gt(){const t=G();t&&x(t)}export{ct as A,l as P,lt as a,mt as b,B as c,$ as d,f as e,F as f,I as g,ht as h,gt as i,at as j,J as k,q as l,_ as m,ut as n,dt as o,pt as p,ft as q,s as r,y as s,nt as t,T as u,it as v,v as w,Y as x,Z as y,S as z};
//# sourceMappingURL=handlers-0s3NYo_U.js.map
