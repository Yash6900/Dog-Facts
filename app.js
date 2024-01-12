// local reviews data
const reviews = [
    {
      id: 1,
      name: 'susan smith',
      job: 'web developer',
      img: 'https://www.course-api.com/images/people/person-1.jpeg',
      text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: 'anna johnson',
      job: 'web designer',
      img: 'https://www.course-api.com/images/people/person-2.jpeg',
      text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
    },
    {
      id: 3,
      name: 'peter jones',
      job: 'intern',
      img: 'https://www.course-api.com/images/people/person-4.jpeg',
      text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
    },
    {
      id: 4,
      name: 'bill anderson',
      job: 'the boss',
      img: 'https://www.course-api.com/images/people/person-3.jpeg',
      text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
  ];
  
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

