


  
  //  API_KEY 
const  API_KEY = "";
const ex_url =`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&base_date=20210628&base_time=0600&nx=55&ny=127`;
  console.log(ex_url);

//  초단기 예보조회 :    http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst
//  단기예보 하루치를 다 알려주는듯합니다 :  http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst

// http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst
// ?serviceKey=인증키&numOfRows=10&pageNo=1
// &base_date=20210628&base_time=0500&nx=55&ny=127
// let year = today.getFullYear(); // 년도
// let day = today.getDay();  // 요일




// const nx = '60';
// const ny = '127';
const nx = '68';
const ny = '120';




// 요게 오늘 날짜
// let today = new Date();  
// let year = today.getFullYear(); // 년도
// let month = ("0"+( today.getMonth() + 1) ).slice(-2);  // 월
// let date = today.getDate();  // 날짜
// const baseDate=1;
// console.log(year+month+date);



// let d = new Date();
// let sel_day = -1; //일자를 조절하시면 됩니다. -1이면 하루전/ +1이면 내일
// d.setDate(d.getDate() + sel_day );


// let year    = d.getFullYear();
// let month   = ('0' + (d.getMonth() +  1 )).slice(-2);
// let day     = ('0' + d.getDate()).slice(-2);
// dt = year+"-"+month+"-"+day;


let today = new Date();  
let sel_day = -1;
today.setDate(today.getDate() + sel_day);

let year = today.getFullYear(); // 년도
let month = ("0"+( today.getMonth() + 1) ).slice(-2);  // 월
let date = ( "0" + today.getDate()).slice(-2);  // 날짜

const baseDate=year+month+date;
console.log(year+month+date);

let hours = ("0" + today.getHours()).slice(-2); // 현재시간
const nowFcstTime = hours+"00";

console.log(hours+"00");



let nextHours = today.getHours()+1;
let nextHours_2 = nextHours+2;
let nextHours_3 = nextHours_2+2;
let nextHours_4 = nextHours_3+2;
let nextHours_5 = nextHours_4+2;

if ( nextHours_5 >= 24 ){
    nextHours_5  = nextHours_5 % 24;
}
if( nextHours_4 >= 24){
    nextHours_4 = nextHours_4 % 24;
}
if( nextHours_3 >= 24){
    nextHours_3 = nextHours_3 % 24;
}
if( nextHours_2 >= 24){
    nextHours_2 = nextHours_2 % 24;
}
if( nextHours >= 24){
    nextHours = nextHours % 24;
}
nextHours = ( "0"+ nextHours).slice(-2)+"00";
nextHours_2 = ("0" + nextHours_2).slice(-2)+"00";
nextHours_3 = ("0" + nextHours_3).slice(-2)+"00";
nextHours_4 = ("0" + nextHours_4).slice(-2)+"00";
nextHours_5 = ("0" + nextHours_5).slice(-2)+"00";


console.log(nextHours, nextHours_2, nextHours_3,nextHours_4, nextHours_5);


const getWeatherApi = (getWeatherList) => {
        
    const xhr = new XMLHttpRequest();
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
    let queryParams = '?' + encodeURIComponent('serviceKey') + '='+ API_KEY; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('json'); /**/
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(baseDate); /**/
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('2300'); /**/
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(nx); /**/
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(ny); /**/
    xhr.open('GET', url + queryParams);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                console.log('Response:', this.responseText);
                const parsedResponse = JSON.parse(this.responseText);
                
                let weatherList = parsedResponse.response.body.items.item;
                
                console.log(weatherList);
                getWeatherList(weatherList);
            
            } else {
                console.error('Error:', this.status, this.statusText);
            }
        }
    };
    xhr.send(''); 
}





const getWeatherList = (weatherList) =>{
    
    const todayWeatherFirstSpan = document.querySelector('.today--weather--temper span:nth-child(1)');
    const todayWeatherSecondSpan = document.querySelector('.today--weather--temper span:nth-child(2)');
    const todayWeatherImage = document.querySelector('.today--weather--logo img');

    //  
    const nextDayWeatherTemp = document.querySelector('.next--weather span:first-child');
    const nextDayWeatherImage = document.querySelector('.next--weather span > img');
    const nextDayWeatherHours = document.querySelector('.next--weather span:last-child');

    const nextDayWeatherTemp2 = document.querySelector('.next--weather--2 span:first-child');
    const nextDayWeatherImage2 = document.querySelector('.next--weather--2 span > img');
    const nextDayWeatherHours2 = document.querySelector('.next--weather--2 span:last-child');

    const nextDayWeatherTemp3 = document.querySelector('.next--weather--3 span:first-child');
    const nextDayWeatherImage3 = document.querySelector('.next--weather--3 span > img');
    const nextDayWeatherHours3 = document.querySelector('.next--weather--3 span:last-child');

    const nextDayWeatherTemp4 = document.querySelector('.next--weather--4 span:first-child');
    const nextDayWeatherImage4 = document.querySelector('.next--weather--4 span > img');
    const nextDayWeatherHours4 = document.querySelector('.next--weather--4 span:last-child');

    const nextDayWeatherTemp5 = document.querySelector('.next--weather--5 span:first-child');
    const nextDayWeatherImage5 = document.querySelector('.next--weather--5 span > img');
    const nextDayWeatherHours5 = document.querySelector('.next--weather--5 span:last-child');







    function getValuesForFcstTime(fcstTime) {
        let tmpValue = null;
        let skyValue = null;
        let ptyValue = null;

        weatherList.forEach(item => {
            if (item.fcstTime === fcstTime) {
                if (item.category === "TMP") {
                    tmpValue = item.fcstValue;
                }
                if (item.category === "SKY") {
                    skyValue = item.fcstValue;
                }
                if (item.category === "PTY"){
                    ptyValue = item.fcstValue;
                }
            }
        });
        return { tmpValue, skyValue ,ptyValue };
    }

    const values = getValuesForFcstTime(nowFcstTime);

    console.log(`TMP value at ${nowFcstTime}: ${values.tmpValue}`);
    console.log(`SKY value at ${nowFcstTime}: ${values.skyValue}`);
    console.log(`PTY value at ${nowFcstTime}: ${values.ptyValue}`);

    if(Number(values.skyValue) === 1){
        console.log('맑음');
        todayWeatherSecondSpan.textContent = '맑음';
    }else if(Number(values.skyValue) === 3){
        console.log('구름 많음');
        todayWeatherSecondSpan.textContent = '구름 많음';
    }else if( Number(values.skyValue) === 4){
        console.log("흐림");
        todayWeatherSecondSpan.textContent = '흐림';
    }
    todayWeatherFirstSpan.textContent =  `${values.tmpValue}°`;
// nextHours, nextHours_2, nextHours_3,nextHours_4, nextHours_5

    const nextWeather = getValuesForFcstTime(nextHours);
    const nextWeather2 = getValuesForFcstTime(nextHours_2);
    const nextWeather3 = getValuesForFcstTime(nextHours_3);
    const nextWeather4 = getValuesForFcstTime(nextHours_4);
    const nextWeather5 = getValuesForFcstTime(nextHours_5);

    console.log(nextWeather,nextWeather2,nextWeather3,nextWeather4,nextWeather5);
      


    nextDayWeatherTemp.textContent = `${nextWeather.tmpValue}°`;
    nextDayWeatherImage.textContent = ``;
    nextDayWeatherHours.textContent = nextHours;

    nextDayWeatherTemp2.textContent = `${nextWeather2.tmpValue}°`;
    nextDayWeatherImage2.textContent = ``;
    nextDayWeatherHours2.textContent = nextHours_2;

    nextDayWeatherTemp3.textContent = `${nextWeather3.tmpValue}°`;
    nextDayWeatherImage3.textContent = ``;
    nextDayWeatherHours3.textContent = nextHours_3;

    nextDayWeatherTemp4.textContent = `${nextWeather4.tmpValue}°`;
    nextDayWeatherImage4.textContent = ``;
    nextDayWeatherHours4.textContent = nextHours_4;

    nextDayWeatherTemp5.textContent = `${nextWeather5.tmpValue}°`;
    nextDayWeatherImage5.textContent = ``;
    nextDayWeatherHours5.textContent = nextHours_5;
}


getWeatherApi(getWeatherList);


// 강수형태 (PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) <단기예보> 
// 하늘상태 (SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)


