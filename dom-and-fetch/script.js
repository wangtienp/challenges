let productData = []
const productPerPage = 10
let currentPage = 1
const homepageContainer = document.querySelector('.product-list')
const pageContainer = document.querySelector('.page-list')
const maxVisiblePages = 5;

const productEndpoint = 'https://dummyjson.com/products?total=100&limit=100'
async function fetchEndpoint() {
    let data
    try {
        const res = await fetch(productEndpoint)
        if (!res.ok) throw new Error('something wrong at the fetching')
        data = await res.json()
        productData = await data.products
        console.log(productData)
    } catch (error) {
        console.log(`fetching error: ${error}`)
    }
}
document.addEventListener('DOMContentLoaded', async function(){
    await fetchEndpoint()
    
    setPageNumber()
    
    const hashPage = getHashPage();
    currentPage = hashPage || 1;

    displayHomepage(homepageContainer,currentPage)
})

function setPageNumber(){
    pageContainer.innerHTML=''
    const {startPage,endPage} = getRange()

    for(i =startPage; i<=endPage;i++){
        pageContainer.innerHTML+=
        `<li>${i}</li>`
    }
    const pages = document.querySelectorAll('.page-list li')
    initActive(pages)

    pages.forEach((page,index)=>{
        page.addEventListener('click',()=>{
            removeActive(pages)
            let start = getRange().startPage
            changePage(page,index+start)
        })
    })
}
function getRange(){
    let totalPage = Math.ceil(productData.length/productPerPage)
    currentPage = getHashPage()||1
    console.log(`range current page : ${currentPage}`)
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPage, startPage + maxVisiblePages - 1);

    startPage = Math.max(1, endPage - maxVisiblePages + 1)
    console.log(`range start page : ${startPage}`)
    return {
        startPage,endPage
    }

}
function initActive(pages){
    let pageArray = Array.from(pages)
    const pageInit = pageArray.find(pA=>pA.innerHTML == currentPage)
    pageInit.classList.add('active')
}

function changePage(page,i){
    page.classList.add('active')
    currentPage=i
    window.location.hash = `#/page/${currentPage}`
    displayHomepage(homepageContainer,currentPage)
}
function removeActive(pages){
    pages.forEach(page=>page.classList.remove('active'))
}

function displayHomepage(container,page) {
    container.innerHTML=''
    
    let startIndex = (page-1)*productPerPage
    let endIndex = page*productPerPage
    const productToShow = productData.slice(startIndex,endIndex)
    productToShow.forEach((item,index) => {
        const productElement = document.createElement('div')
        productElement.className='product-item'
        productElement.innerHTML=`
        <div class="product-poster">
        <div class="product-card">
        <a href="./about.html?id=${index+(currentPage-1)*productPerPage}"><p class="name">${item.title}</p></a>
        <div class="description">${item.description}</div>
        </div>
        <img class="avatar" src="${item.thumbnail}" alt="">
        <a href="./about.html?id=${index+(currentPage-1)*productPerPage}"></a>
        </div>
        <div class="product-name">
        <a href="./about.html?id=${index+(currentPage-1)*productPerPage}" ><p class="name">${item.title}</p></a>
        </div>`
        container.appendChild(productElement)
    })
    let start = getRange().startPage
    updateRange(start)
}
function updateRange(start){
    
    const pages = document.querySelectorAll('.page-list li')
    pages.forEach((page,index)=>{
        page.innerHTML = `${start+index}`
    })
    removeActive(pages)
    initActive(pages)
}

function getHashPage() {
    const hash = window.location.hash;
    const match = hash.match(/#\/page\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
}

