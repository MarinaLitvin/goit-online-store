import{a as h,i as d}from"./vendor-4yCzdkXl.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const g="https://dummyjson.com/products",v={categories:"/category-list",products:"?limit=10&skip=10",searchProduct:"/search",searchByCategory:"/category"},l=12,p={wishlist:"wishlist",cart:"cart",theme:"dark"};async function at(){return(await h.get(`${g}${v.categories}`)).data}async function B(t){const e=(t-1)*l;return(await h.get(g,{params:{limit:l,skip:e}})).data}async function k(t,e){const o=(e-1)*l;return(await h.get(`${g}${v.searchByCategory}/${t}`,{params:{limit:l,skip:o}})).data}async function J(t){return(await h.get(`${g}/${t}`)).data}async function A(t,e){const o=(e-1)*l;return(await h.get(`${g}${v.searchProduct}`,{params:{q:t,limit:l,skip:o}})).data}function $(){return JSON.parse(localStorage.getItem(p.cart))||[]}function N(t){localStorage.setItem(p.cart,JSON.stringify(t))}function U(t){const e=$();return e.includes(t)||(e.push(t),N(e)),e}function z(t){const o=$().filter(r=>r!==t);return N(o),o}function W(t){return $().includes(t)}function I(){return JSON.parse(localStorage.getItem(p.wishlist))||[]}function O(t){localStorage.setItem(p.wishlist,JSON.stringify(t))}function K(t){const e=I();return e.includes(t)||(e.push(t),O(e)),e}function G(t){const o=I().filter(r=>r!==t);return O(o),o}function E(t){return I().includes(t)}function Q(){return localStorage.getItem(p.theme)}function Y(t){localStorage.setItem(p.theme,t)}function ct(t,e){return Promise.all(t.map(o=>e(o)))}function x(t){return t.map(({id:e,thumbnail:o,title:r,brand:n,category:a,price:u})=>`
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
      `).join("")}function it(t){return t.reduce((e,o)=>e+o.price,0)}function V(t,e){return t*l<e}function X(){return document.body.dataset.theme==="dark"}function F(t){document.body.dataset.theme=t}const s={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),loadMoreButton:document.querySelector(".load-more-btn"),notFound:document.querySelector(".not-found"),modal:document.querySelector(".modal"),modalProduct:document.querySelector(".modal-product"),loader:document.querySelector(".loader"),scrollTopButton:document.querySelector(".scroll-top-btn"),searchForm:document.querySelector(".search-form"),searchInput:document.querySelector(".search-form__input"),searchClearButton:document.querySelector(".search-form__btn-clear"),modalAddToCartButton:document.querySelector(".modal-product__btn--cart"),wishlistButton:document.querySelector(".modal-product__btn--wishlist"),cartCount:document.querySelector("[data-cart-count]"),wishlistCount:document.querySelector("[data-wishlist-count]"),itemsCount:document.querySelector("[data-count]"),totalPrice:document.querySelector("[data-price]"),buyProductsButton:document.querySelector(".cart-summary__btn"),themeToggleButton:document.querySelector(".theme-toggle-btn")};function ut(t){const e=t.map(o=>`
        <li class="categories__item">
          <button 
            class="categories__btn"
            type="button"
          >
            ${o}
          </button>
        </li>
      `).join("");s.categoriesList.innerHTML=e}function f(t){s.productsList.innerHTML=x(t)}function C(t,e){V(t,e)?tt():S()}function Z(t){s.productsList.insertAdjacentHTML("beforeend",x(t))}function R(){s.notFound.classList.add("not-found--visible")}function q(){s.notFound.classList.remove("not-found--visible")}function y(){s.loader.classList.add("is-visible")}function _(){s.loader.classList.remove("is-visible")}function tt(){s.loadMoreButton.classList.remove("is-hidden")}function S(){s.loadMoreButton.classList.add("is-hidden")}function et(t){const{thumbnail:e,title:o,tags:r,description:n,shippingInformation:a,returnPolicy:u,price:H}=t;s.modalProduct.innerHTML=`
    <img
      class="modal-product__img"
      src="${e}"
      alt="${o}"
    />

    <div class="modal-product__content">
      <p class="modal-product__title">${o}</p>

      <ul class="modal-product__tags">
        ${r.map(D=>`<li>${D}</li>`).join("")}
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
        Price: $${H}
      </p>

      <button
        class="modal-product__buy-btn"
        type="button"
      >
        Buy
      </button>
    </div>
  `}function b(t){s.modalAddToCartButton.textContent=t?"Remove from Cart":"Add to Cart"}function P(t){s.wishlistButton.textContent=t?"Remove from Wishlist":"Add to Wishlist"}function T(t){s.cartCount.textContent=t}function M(t){s.wishlistCount.textContent=t}function j(t){t.key==="Escape"&&L()}function ot(){s.modal.classList.add("modal--is-open"),document.addEventListener("keydown",j)}function L(){s.modal.classList.remove("modal--is-open"),document.removeEventListener("keydown",j)}let w="All",c=1,m="",i=null;async function lt(t){const e=t.target.closest(".categories__btn");if(!e)return;const o=e.textContent.trim();w=o,c=1,m="",s.searchInput.value="",s.searchClearButton.classList.remove("is-visible"),document.querySelectorAll(".categories__btn").forEach(r=>{r.classList.remove("categories__btn--active")}),e.classList.add("categories__btn--active"),q(),y();try{let r;if(o==="All"?r=await B(c):r=await k(o,c),r.products.length===0){f([]),S(),R();return}f(r.products),C(c,r.total)}catch(r){console.error(r),d.error({message:"Something went wrong. Please try again!"})}finally{_()}}async function dt(t){const e=t.target.closest(".products__item");if(!e)return;const o=Number(e.dataset.id);i=o,y();try{const r=await J(o);et(r),b(W(o)),P(E(o)),ot()}catch(r){console.error(r),d.error({message:"Something went wrong. Please try again!"})}finally{_()}}async function mt(){const e=s.productsList.querySelector(".products__item").getBoundingClientRect().height,o=c+1;y();try{let r;if(m?r=await A(m,o):w==="All"?r=await B(o):r=await k(w,o),r.products.length===0){S(),d.info({message:"No more products available."});return}Z(r.products),c=o,C(c,r.total),window.scrollBy({top:e*2,behavior:"smooth"})}catch(r){console.error(r),c-=1,d.error({message:"Something went wrong. Please try again!"})}finally{_()}}function pt(t){if(t.target.closest(".modal__close-btn")){L();return}if(t.target.closest(".modal-product__btn--cart")){rt();return}if(t.target.closest(".modal-product__btn--wishlist")){st();return}t.target===s.modal&&L()}async function ft(t){t.preventDefault();const e=s.searchInput.value.trim();if(e){c=1,m=e,w="All",s.searchClearButton.classList.add("is-visible"),q(),y();try{const o=await A(m,c);if(o.products.length===0){f([]),S(),R();return}f(o.products),C(c,o.total)}catch(o){console.error(o),d.error({message:"Something went wrong. Please try again!"})}finally{_()}}}async function ht(){s.searchInput.value="",s.searchClearButton.classList.remove("is-visible"),c=1,m="",q(),y();try{const t=await B(c);f(t.products),C(c,t.total)}catch(t){console.error(t),d.error({message:"Something went wrong. Please try again!"})}finally{_()}}function rt(){if(i===null)return;if(W(i)){const e=z(i);b(!1),T(e.length)}else{const e=U(i);b(!0),T(e.length)}}function st(){if(i===null)return;if(E(i)){const e=G(i);P(!1),M(e.length)}else{const e=K(i);P(!0),M(e.length)}}function gt(){const t=X()?"light":"dark";F(t),Y(t)}function yt(){const t=Q();(t==="dark"||t==="light")&&F(t)}export{it as A,l as P,dt as a,pt as b,$ as c,T as d,f as e,R as f,I as g,gt as h,yt as i,ct as j,J as k,q as l,_ as m,lt as n,mt as o,ft as p,ht as q,s as r,y as s,at as t,M as u,ut as v,B as w,V as x,tt as y,S as z};
//# sourceMappingURL=handlers-adHGhVGw.js.map
