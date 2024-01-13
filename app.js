
  
  const img = document.getElementById("person-img")
  const author = document.getElementById("author")
  const job = document.getElementById("job")
  const info = document.getElementById("info")

  const prevBtn = document.querySelector('.prev-btn')
  const nextBtn = document.querySelector('.next-btn')
  const randomBtn = document.querySelector('.random-btn')
    
  let currentItem = 0;

  let onLoad = () =>{
   showItem(currentItem)
  }



  let dogInfo;
  async function fetchDogInfo() {
    let dogData = await fetch("https://dogapi.dog/api/v2/breeds");
    dogInfo = await dogData.json();
  }


let showItem = async  (dog)=> {
  if (!dogInfo) {
    await fetchDogInfo();
}
    let imgData = await fetch("https://dog.ceo/api/breeds/image/random");
    let dogImg  = await imgData.json();    
    img.src= dogImg.message;
    author.textContent = dogInfo.data[dog].attributes.name;
    info.textContent = dogInfo.data[dog].attributes.description;
    // job.textContent = dogInfo.job;
    


}
  window.addEventListener("DOMContentLoaded", onLoad)


  nextBtn.addEventListener("click" , async function(){
            currentItem++
            if (!dogInfo) {
              await fetchDogInfo();
            }
            if(currentItem > dogInfo.length - 1){
                currentItem=0;
            }
            showItem(currentItem)
  })

  
  prevBtn.addEventListener("click" , async function(){
    currentItem--;
    if (!dogInfo) {
      await fetchDogInfo();
    }
    
    if(currentItem <0){
      currentItem = 0;
      prevBtn.disabled = true;
    }
    showItem(currentItem)
    console.log(currentItem)
})

async function getRandomItem() {
  if (!dogInfo) {
    await fetchDogInfo();
  }

  currentItem = Math.floor(Math.random() * dogInfo.data.length);
  console.log(currentItem);
  showItem(currentItem);
}

randomBtn.addEventListener('click', getRandomItem);

