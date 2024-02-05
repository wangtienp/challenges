const itemDetailContainer = document.querySelector('.product-details')
const productEndpoint = 'https://dummyjson.com/products?total=100&limit=100'
let productData=[]
document.addEventListener('DOMContentLoaded',async function(){
    await fetchEndpoint()
    searchParam()
})
async function fetchEndpoint() {
    let data
    try {
        const res = await fetch(productEndpoint)
        if (!res.ok) throw new Error('something wrong at the fetching')
        data = await res.json()
        productData = await data.products
    } catch (error) {
        console.log(`fetching error: ${error}`)
    }
}
function displayItemDetail(container,id){
    container.innerHTML = ''
    const product = productData[id]
    container.innerHTML=`
    <div class="product-image">
    <img src="${product.thumbnail}" alt="">
</div>
<div class="product-information">
    <div class="title-info">
        <p>Name </p>
        <p>${product.title}</p>
    </div>
    <span>|</span>
    <div class="brand-info">
        <p>Category</p>
        <p>${product.category}</p>
    </div>
    <span>|</span>
    <div class="price-info">
        <p>Price</p>
        <p>$${product.price}</p>
    </div>
    <span>|</span>
    <div class="Rating-info">
        <p> Rating </p>
        <p>${product.rating}/5</p>
    </div>
</div>
<div class="product-detail-description">
    <p>Description</p>
    <p>${product.description}</p>
</div>`


}
function searchParam() {
    const urlParams = new URLSearchParams(window.location.search)
    const itemId= urlParams.get('id')

    if(itemId!==null){
        displayItemDetail(itemDetailContainer, parseInt(itemId))
    }else{
        console.error('Invalid item ID')
    }
}