const getId=id=>document.getElementById(id)

function Api(){

const url='https://openapi.programming-hero.com/api/videos/categories'
fetch(url)
.then(res=>res.json())
.then(Data=>{
Data=Data.data
const btnContainer=getId('btnContainer')

Data.forEach(c => {
// console.log(c)
    const categoriesCard=document.createElement('button')
    categoriesCard.classList='btn bg-white text-black btn-color'
    categoriesCard.innerText=c.category

    categoriesCard.addEventListener('click',()=>{

categoriesBtn(c.category_id)
const btnColor=document.querySelectorAll('.btn-color');
btnColor.forEach((btn)=>{
btn.classList.remove('bg-red-600')
})
categoriesCard.classList.add('bg-red-600')


})


btnContainer.appendChild(categoriesCard)
});
})
}

Api()

let startVideo=1000
let sortStatus=false
function categoriesBtn(categoryId,sortStatus){

    startVideo=categoryId;
const URL=` https://openapi.programming-hero.com/api/videos/category/${categoryId}`    
const API2=async ()=>{
    const res=await fetch(URL);
let Data=await res.json()
Data=Data.data

    if(Data.length===0){
        getId('error').classList.remove('hidden')
    }else{
        getId('error').classList.add('hidden')
    }

const videoContainer=getId('videoContainer');
videoContainer.innerHTML=''



Data.forEach((Video)=>{
    // create video card
    let verified=''
    if(Video.authors[0].verified){
verified="<img src='v.png' class='size-5'/>"
    }
  const videoCard=document.createElement('div')
  videoCard.className='card card-compact w-96 bg-black shadow-xl'
  videoCard.innerHTML=`
  <figure><img src="${Video.thumbnail}" alt="Shoes" /></figure>
  <div class=" flex justify-start items-start gap-3 pt-4 pb-2 px-5 ">
  <div class="size-[15%]  "><img src='${Video.authors[0].profile_picture}' class="rounded-full"></div>

 <div><h2 class="card-title">${Video.title}</h2>
 <div class='flex gap-1'>
 <p>${Video.authors[0].profile_name}</p>

 </div>
 <p>${Video.others.views} Views</p></div>
${verified}
  </div>
  `
  videoContainer.appendChild(videoCard)

})}

API2()
}
categoriesBtn(startVideo,sortStatus)
