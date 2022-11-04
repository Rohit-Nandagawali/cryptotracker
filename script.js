const form = document.getElementById('searchForm')
const resultSection = document.getElementById('resultSection')
var upd;

form.addEventListener('submit',(e)=>{
    e.preventDefault(); //prevent refreshing the page
    const coinType = form.elements.coinType.value //get the value of selected option
    if (upd) {
        clearTimeout(upd)
    }
    
    fetchPrize(coinType) //user defined function
})

const fetchPrize = async( coinType) =>{
    
    const result = await axios.get(`https://api.coinstats.app/public/v1/coins/${coinType}?currency=INR`)

    const name = result.data.coin.name
    const icon = result.data.coin.icon
    const symbol = result.data.coin.symbol
    const price = result.data.coin.price
    const priceChange1h = result.data.coin.priceChange1h

    resultSection.innerHTML =`   <div class="col-md-6 mt-3 p-2 bg-dark text-white card">     
    <div class="d-flex flex-row justify-content-between">
        <div class="text-start text-uppercase text-white-50 fs-6">${name}</div>
        <div class="text-start text-white-50 fs-6">${symbol}</div></div>
       
       <div class="img d-flex flex-row d-flex align-self-center m-auto justify-content-center " ><img class="d-flex align-self-center" src=${icon} alt=${name}></div>
       <div class="fs-2 text-center"> <span class="text-white-50">₹</span>${price}</div>
       <div class="text-wrap mb-3 align-self-center badge ${priceChange1h>0?" bg-success":"bg-danger"}  style="width:17% ;"> ${priceChange1h>0?"↑":"↓"} ${priceChange1h}%</div>
</div>
        `
        upd=setTimeout(() => {
            fetchPrize(coinType)
        }, 10000);
        
}