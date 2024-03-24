
const generate = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
const feeling = document.querySelector('.feelings');
const temp = document.querySelector('#temp');
const dateNow = document.querySelector('#dateNow');
const error = document.querySelector('#error')
const d = new Date();
const date = d.toDateString();
const example = 'https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}';
const baseURI = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=b420cdbfad337049e08627d682283ff6&units=imperial';

generate.addEventListener('click', (event) => {
    event.preventDefault();
    const madeURL = `${baseURI}${zip.value}${key}`;
    getData(madeURL)
    .then((data) => {
        cureData(data)
        .then((info) =>{
            //POST
            postData('/add', info)
            .then((data) => {
                //GET
                retreiveData('/all')
                .then((data) => {
                    updateUI(data);
                });
            });
        }); 
    });
});

const getData = async (url) => {
    try{
        const result = await fetch(url);
        const data = await result.json();
        if(data.cod == 200) {
            return data;
        }
        else {
            console.log(data.message);
        }
    }catch(e){
        console.log(e);
    }
};


const cureData = async (data) =>{
    try{
        if(data.message){
            return message;
        } else {
            const info = {
                date,
                feelings: feelings.value,
                temp: Math.round(data.main.temp),
            };
            return info;
        }
    }catch(e) {
        console.error(e);
    }
};


const postData = async(url='', data={}) => {
    try{
        const result = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return result;
    }catch(err){
        console.log(err);
    }
};

const retreiveData = async (url) => {
    const data = await fetch(url);
    try{
        const response = await data.json();
        return response;
    }catch(err){
        console.error(err);
    }
};

const updateUI = async (data) => {
    const response = await data;
    if(response.date){
        dateNow.innerHTML = `Date: ${response.date}`;
        temp.innerHTML = `Tempreture: ${response.temp}°C`;
        feeling.innerHTML = response.feelings? response.feelings: "What do you feel??";
        //style
        document.querySelector('.outputs').style.display = "block";
        document.querySelector('#error').style.display = "none";
    }else{
        //style
        document.querySelector('.outputs').style.display = "none";
        document.querySelector('#error').style.display = "block";
        error.innerHTML = `Error: ${response.message}`;
    }
};
