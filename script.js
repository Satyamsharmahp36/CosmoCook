// Getting elements from Html
const randomimg= document.getElementById("randomimg")
const randomname= document.getElementById("randomname")
const ingrdiv= document.getElementById("ingredients_box")
const dishname= document.getElementById("dishname")
const naving= document.getElementById("distype")
const ingredients= document.getElementById("ingredients")
const makingprocess= document.getElementById("makingprocess")
const distype= document.getElementById("para")
const youtube= document.getElementById("youtube")
const buttonsearch = document.getElementById("buttonsearch")
const dishheading = document.getElementById("dishheading")
const searchbar= document.getElementById("search")
const headingname = document.getElementById("dishheading")
const triai = document.getElementById("trial")
const toreach = document.getElementsByClassName("innersearchdiv")
const trial = document.getElementById("trial")

// Fetching data from our random api key
function getRnadomMeal(){
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
//invocking function with data as arguments
            updateimg(data)
            popup(data)
        })
    }

//Updating the random image and random name
function updateimg(data){
    randomimg.src=data.meals[0].strMealThumb;
    randomname.innerText=data.meals[0].strMeal;
}

getRnadomMeal();

//this fuction will invock when we click on change taste
function reloadPage(){
    location.reload();
}
//it also relods on changing dimension
window.onresize = function() {
    location.reload();
};

//making arry for random messages to be displayed
const ranmessage = [
    "Exquisite culinary delight",
    "Irresistibly flavorful",
    "Mouthwateringly delectable",
   " Culinary masterpiece",
    "A symphony of flavors",
    "Gastronomic bliss",
    "Sensationally savory",
    "Epicurean ecstasy",
    "Tantalizingly tasty",
    "Delightfully decadent",
    "Flavorful perfection",
    "Gourmet excellence",
    "Heavenly taste sensation",
    "Unforgettable gastronomy",
    "Epicurean indulgence",
    "Delectable fusion of flavors",
    "Savor the sublime",
    "Luxuriously delicious",
    "Taste bud euphoria",
    "Culinary enchantment"
];

//making a randomInt fuction return numbers between the arguments
function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//This is our popup or Modal inputs where we are appending dishname , type , youtube etc.
function popup(data){
    const short = data.meals[0];
    dishname.innerHTML=`<h2>${short.strMeal}</h2>`
    distype.innerHTML=`<h3>This Is An Amazing ${short.strArea} ${short.strCategory} Dish Which Is ${ranmessage[randomIntFromRange(0,ranmessage.length-1)]}</h3>`
    youtube.innerHTML=`<img src="${short.strMealThumb}"> </img> <br> <iframe src="https://www.youtube.com/embed/${short.strYoutube.slice(-11)}?autoplay=1" frameborder="0" allowfullscreen = true</iframe>`
    makingprocess.innerHTML=`<h2>INSTRUCTION FOR MAKING</h2><br><p>${short.strInstructions}</p>`
    for (let i = 1; i <= 20; i++) {
        const ingredient = short[`strIngredient${i}`];
        const amount = short[`strMeasure${i}`];
        if (ingredient) {
          let ingrediv = document.createElement("div");
          let ingpic = document.createElement("img");
          ingpic.src = `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;
          let ingtext = document.createElement("span");
          ingtext.innerHTML = `${ingredient} :- ${amount}`;
          ingrediv.appendChild(ingpic);
          ingrediv.appendChild(ingtext);
          ingredients.appendChild(ingrediv);
        }
      }
}

// adding functionality to the backbuttons and search ones
function backbutton(){
    ingrdiv.style.display="none";
}
function showup(){
    ingrdiv.style.display="flex";
}

buttonsearch.addEventListener("click",()=>{
    dishheading.innerHTML=searchbar.value;
    trial.style.display="flex"
searchDish(searchbar.value);
buttonsearch.style.transform = "scale(0.8)" ;

})

randomimg.addEventListener("click",()=>{
    ingrdiv.style.display="flex";
})

buttonsearch.addEventListener("click", () => {
    setTimeout(() => {
        scroll();
    }, 100);
    
});

// using smooth scroll functionality
function scroll() {
    const targetElement = document.documentElement || document.body;
    triai.scrollIntoView({ behavior: "smooth" });
}

// fectching ingredients for our search output dishes
function searchDish(dishnamexyz){
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${dishnamexyz}`)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            searchoutput(data)
            console.log(data)
        })
        .catch((err)=>{
            trial.innerHTML="<h3>Sorry No Result found</h3>"
        })
}

// results for our search data
function searchoutput(data){
    const short= data.meals.length;
    console.log(data)
    trial.innerHTML="";
    for (let i = 0; i < short; i++) {
        const innerdivs = document.createElement("div");
        innerdivs.setAttribute("onclick",`showuppopup(${data.meals[i].idMeal})`)
        innerdivs.setAttribute("class", "innersearchdiv")
        let dishtittle = document.createElement("h3");
        dishtittle.setAttribute("class","searchtittle")
        dishtittle.innerText = data.meals[i].strMeal;
        let searchimg = document.createElement("img");
        searchimg.setAttribute("src", data.meals[i].strMealThumb);
        innerdivs.append(dishtittle);
        innerdivs.append(searchimg);
        trial.append(innerdivs);
    }
}

//getting data of specific item
function searchIngre(info) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${info}`)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        popup(data)
    })
}

function showuppopup(id){
    searchIngre(id)
    ingrdiv.style.display="flex";
}

// canvas of our background balls
var canvas = document.getElementById('canvasone');
console.log(canvas);

canvas.width=innerWidth
canvas.height=innerHeight;

//changing canvas width depending on the screen dimensions
window.addEventListener('resize',()=>{
canvas.width=innerWidth
canvas.height= innerHeight;
}
)

//geting 2d context of canvas
var c= canvas.getContext('2d');

// getting the coordinates of our mouse
var mouse={
    x:undefined,
    y:undefined
}

//updating the coordinates on movement of mouse
window.addEventListener("mousemove",(event)=>{
    mouse.x=event.x;
    mouse.y=event.y;
})

//making arry of random colour
var colorArry = [
    "white","cream","pink","yellow"
];

//inlisizing our maximum radius
var maxRadius = 10;

// making a constructor function which will make circles randomly
function Circle(x,y,dx,dy,radius){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=radius;
    this.color= colorArry[Math.floor(Math.random()*colorArry.length)]
    this.draw= ()=>{
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.strokeStyle = "black"
        c.stroke();
        c.fillStyle=this.color;
        c.fill()
    }

// updating the size of balls which are near to cursor
    this.update=()=>{
        if(this.x+this.radius>innerWidth||this.x-this.radius<0){
            this.dx=-this.dx;
        }
        if(this.y+this.radius>innerHeight||this.y-this.radius<0){
            this.dy=-this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x-this.x<50&&mouse.x-this.x>-50
            && mouse.y-this.y<50&&mouse.y-this.y>-50){
                if(this.radius<maxRadius){
                    this.radius +=1;
                }
            }
            else if(this.radius>this.minRadius){
                this.radius -=1;
            }
        this.draw();
    }
}

var circleArray = [];

// generating random values for are circle arguments
// changing number of ball depending on our screen
var numberOfCircles = (innerWidth < 600) ? 130 : 450;

for(var i=0;i<numberOfCircles;i++){
    var radius= Math.random()*1.5+1;
    var x = Math.random()*(innerWidth-radius*2)+radius;
    var y = Math.random()*(innerWidth-radius*2)+radius;
    var dx = Math.random()*1.5;
    var dy = Math.random()*1.5;
    circleArray.push(new Circle(x,y,dx,dy,radius))
}

//making and resursion function which will animate balls infinitly
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
}
animate()












