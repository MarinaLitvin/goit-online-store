import"./assets/styles-JE8YjOlG.js";import{a,i as d}from"./assets/vendor-4yCzdkXl.js";const c="https://dummyjson.com/products";async function l(){return(await a.get(`${c}/category-list`)).data}async function m(t){const o=(t-1)*12;return(await a.get(c,{params:{limit:12,skip:o}})).data}const n={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),loadMoreButton:document.querySelector(".load-more-btn")};function g(t){const s=t.map(o=>`
        <li class="categories__item">
          <button 
            class="categories__btn"
            type="button"
          >
            ${o}
          </button>
        </li>
      `).join("");n.categoriesList.innerHTML=s}function _(t){const s=t.map(({id:o,thumbnail:e,title:r,brand:i,category:p,price:u})=>`
        <li class="products__item" data-id="${o}">
          <img
            class="products__image"
            src="${e}"
            alt="${r}"
          />

          <p class="products__title">${r}</p>

          <p class="products__brand">
            <span class="products__brand--bold">Brand:</span>
            ${i??"Unknown"}
          </p>

          <p class="products__category">
            Category: ${p}
          </p>

          <p class="products__price">
            Price: $${u}
          </p>
        </li>
      `).join("");n.productsList.innerHTML=s}let y=1;async function $(){try{const t=await l();t.unshift("All"),g(t);const s=await m(y);_(s.products)}catch(t){console.error(t),d.error({message:"Something went wrong. Please try again!"})}}$();
//# sourceMappingURL=index.js.map
