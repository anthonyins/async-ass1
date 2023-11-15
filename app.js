const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");

const getCatImages = () => {
  cardDiv.innerHTML = `<img src="./img/loading.gif" />`;

  fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((res) => {
      if(res.ok){
        return res.json()
      }else{
        throw new Error("Hata")
      }
    })
    .then((response) => {
      createElem(response);
    })
    .catch((err) => {
      errorMsg();
    });
};

const createElem = (data) => {
  cardDiv.innerHTML = "";
  data.forEach((cat) => {
    console.log(cat);
    const elem = `<div class="col-12 col-sm-6 col-lg-4">

      <div style="height:200px;">
        <img src=${cat.url} class="w-100 h-100" alt="...">
      </div>
    </div>
`;
    cardDiv.innerHTML += elem;
  });
};

const errorMsg = () => {
  cardDiv.innerHTML = `<img src="./error.gif" />`;
};

const getTarih = () => {
  setInterval(() => {
    tarih.innerText = new Date().toLocaleString();
  }, 1000);
};
window.addEventListener("load", () => {
  containerDiv.style.display = "none";

  setTimeout(() => {
    containerDiv.style.display = "flex";
    loadingDiv.style.display = "none";
    getTarih();
    getCatImages();
  }, 3000);
});
btn.addEventListener("click", getCatImages);
