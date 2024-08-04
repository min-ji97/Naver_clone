
// require('dotenv').config();
import config from './config.js';
  
  //  API_KEY 
const  API_KEY = config.WEATHER_API_KEY;
const ex_url =`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&base_date=20210628&base_time=0600&nx=55&ny=127`;
  console.log(ex_url);

//  초단기 예보조회 :    http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst
//  단기예보 하루치를 다 알려주는듯합니다 :  http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst


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

let delZeroHours = nextHours;
let delZeroHours_2 = nextHours_2;
let delZeroHours_3 = nextHours_3;
let delZeroHours_4 = nextHours_4;
let delZeroHours_5 = nextHours_5;

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


const todayWeatherFirstSpan = document.querySelector('.today--weather--temper span:nth-child(1)');
const todayWeatherSecondSpan = document.querySelector('.today--weather--temper span:nth-child(2)');
const todayWeatherLogo = document.querySelector('.today--weather--logo');

//  
const nextDayWeatherTemp = document.querySelector('.next--weather span:first-child');
const nextDayWeatherImage = document.querySelector('.next--weather span:nth-child(3)');
const nextDayWeatherHours = document.querySelector('.next--weather span:last-child');

const nextDayWeatherTemp2 = document.querySelector('.next--weather--2 span:first-child');
const nextDayWeatherImage2 = document.querySelector('.next--weather--2 span:nth-child(3)');
const nextDayWeatherHours2 = document.querySelector('.next--weather--2 span:last-child');

const nextDayWeatherTemp3 = document.querySelector('.next--weather--3 span:first-child');
const nextDayWeatherImage3 = document.querySelector('.next--weather--3 span:nth-child(3)');
const nextDayWeatherHours3 = document.querySelector('.next--weather--3 span:last-child');

const nextDayWeatherTemp4 = document.querySelector('.next--weather--4 span:first-child');
const nextDayWeatherImage4 = document.querySelector('.next--weather--4 span:nth-child(3)');
const nextDayWeatherHours4 = document.querySelector('.next--weather--4 span:last-child');

const nextDayWeatherTemp5 = document.querySelector('.next--weather--5 span:first-child');
const nextDayWeatherImage5 = document.querySelector('.next--weather--5 span:nth-child(3)');
const nextDayWeatherHours5 = document.querySelector('.next--weather--5 span:last-child');


const getWeatherList = (weatherList) =>{
    
   


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

    const nextWeather = getValuesForFcstTime(nextHours);
    const nextWeather2 = getValuesForFcstTime(nextHours_2);
    const nextWeather3 = getValuesForFcstTime(nextHours_3);
    const nextWeather4 = getValuesForFcstTime(nextHours_4);
    const nextWeather5 = getValuesForFcstTime(nextHours_5);
   
    // addClassListWeatherIcon(시간, 값, 클래스네임이미지, 클래스네임tmep );
    addClassListWeatherIcon(nowFcstTime, values, todayWeatherLogo);

    addClassListWeatherIcon(nextHours, nextWeather, nextDayWeatherImage);
    addClassListWeatherIcon(nextHours_2, nextWeather2, nextDayWeatherImage2);
    addClassListWeatherIcon(nextHours_3, nextWeather3, nextDayWeatherImage3);
    addClassListWeatherIcon(nextHours_4, nextWeather4, nextDayWeatherImage4);
    addClassListWeatherIcon(nextHours_5, nextWeather5, nextDayWeatherImage5);





    // if(Number(values.skyValue) === 1){
    //     todayWeatherSecondSpan.textContent = '맑음';

    //     if(  19 < nowFcstTime.slice(0,-2) ) { // 20시 부터 저녁 icon을 보여주기 위함
    //         if( Number(values.ptyValue) === 0 ){
    //             todayWeatherLogo.classList.add('weather-icon--밤--맑음');
    //         }else if( Number(values.ptyValue) === 1){ // 비
    //             todayWeatherLogo.classList.add('weather-icon--밤--비--맑음');
    //         }else if( Number(values.ptyValue) === 2){ //눈/비
    //             todayWeatherLogo.classList.add('weather-icon--밤--눈비--맑음');
    //         }else if( Number(values.ptyValue) === 3){ // 눈
    //             todayWeatherLogo.classList.add('weather-icon--밤--눈--맑음');
    //         }else if( Number(values.ptyValue) === 4){ //소나기
    //             todayWeatherLogo.classList.add('weather-icon--밤--소나기--맑음');
    //         }
    //     }else{ // 낮
    //         if( Number(values.ptyValue) === 0 ){
    //             todayWeatherLogo.classList.add('weather-icon--낮--맑음');
    //         }else if( Number(values.ptyValue) === 1){ // 비
    //             todayWeatherLogo.classList.add('weather-icon--낮--비--맑음');
    //         }else if( Number(values.ptyValue) === 2){ //눈/비
    //             todayWeatherLogo.classList.add('weather-icon--낮--눈비--맑음');
    //         }else if( Number(values.ptyValue) === 3){ // 눈
    //             todayWeatherLogo.classList.add('weather-icon--낮--눈--맑음');
    //         }else if( Number(values.ptyValue) === 4){ //소나기
    //             todayWeatherLogo.classList.add('weather-icon--낮--소나기--맑음');
    //         }
    //     }

    // }else if(Number(values.skyValue) === 3){
    //     todayWeatherSecondSpan.textContent = '구름 많음';
    //     if(  19 < nowFcstTime.slice(0,-2) ) { // 20시 부터 저녁 icon을 보여주기 위함
    //         if( Number(values.ptyValue) === 0 ){
    //             todayWeatherLogo.classList.add('weather-icon--밤--구름많음');
    //         }else if( Number(values.ptyValue) === 1){ // 비
    //             todayWeatherLogo.classList.add('weather-icon--밤--비--구름많음');
    //         }else if( Number(values.ptyValue) === 2){ //눈/비
    //             todayWeatherLogo.classList.add('weather-icon--밤--눈비--구름많음');
    //         }else if( Number(values.ptyValue) === 3){ // 눈
    //             todayWeatherLogo.classList.add('weather-icon--밤--눈--구름많음');
    //         }else if( Number(values.ptyValue) === 4){ //소나기
    //             todayWeatherLogo.classList.add('weather-icon--밤--소나기--구름많음');
    //         }
    //     }else{ // 낮
    //         if( Number(values.ptyValue) === 0 ){
    //             todayWeatherLogo.classList.add('weather-icon--낮--구름많음');
    //         }else if( Number(values.ptyValue) === 1){ // 비
    //             todayWeatherLogo.classList.add('weather-icon--낮--비--구름많음');
    //         }else if( Number(values.ptyValue) === 2){ //눈/비
    //             todayWeatherLogo.classList.add('weather-icon--낮--눈비--구름많음');
    //         }else if( Number(values.ptyValue) === 3){ // 눈
    //             todayWeatherLogo.classList.add('weather-icon--낮--눈--구름많음');
    //         }else if( Number(values.ptyValue) === 4){ //소나기
    //             todayWeatherLogo.classList.add('weather-icon--낮--소나기--구름많음');
    //         }
    //     }
    // }else if( Number(values.skyValue) === 4){
    //     todayWeatherSecondSpan.textContent = '흐림';
    //     if(  19 < nowFcstTime.slice(0,-2) ) { // 20시 부터 저녁 icon을 보여주기 위함
    //         if( Number(values.ptyValue) === 0 ){
    //             todayWeatherLogo.classList.add('weather-icon--밤--흐림');
    //         }else if( Number(values.ptyValue) === 1){ // 비
    //             todayWeatherLogo.classList.add('weather-icon--밤--비--흐림');
    //         }else if( Number(values.ptyValue) === 2){ //눈/비
    //             todayWeatherLogo.classList.add('weather-icon--밤--눈비--흐림');
    //         }else if( Number(values.ptyValue) === 3){ // 눈
    //             todayWeatherLogo.classList.add('weather-icon--밤--눈--흐림');
    //         }else if( Number(values.ptyValue) === 4){ //소나기
    //             todayWeatherLogo.classList.add('weather-icon--밤--소나기--흐림');
    //         }
    //     }else{ // 낮
    //         if( Number(values.ptyValue) === 0 ){
    //             todayWeatherLogo.classList.add('weather-icon--낮--흐림');
    //         }else if( Number(values.ptyValue) === 1){ // 비
    //             todayWeatherLogo.classList.add('weather-icon--낮--비--흐림');
    //         }else if( Number(values.ptyValue) === 2){ //눈/비
    //             todayWeatherLogo.classList.add('weather-icon--낮--눈비--흐림');
    //         }else if( Number(values.ptyValue) === 3){ // 눈
    //             todayWeatherLogo.classList.add('weather-icon--낮--눈--흐림');
    //         }else if( Number(values.ptyValue) === 4){ //소나기
    //             todayWeatherLogo.classList.add('weather-icon--낮--소나기--흐림');
    //         }
    //     }
    // }
    todayWeatherFirstSpan.textContent =  `${values.tmpValue}°`;


    console.log(nextWeather,nextWeather2,nextWeather3,nextWeather4,nextWeather5);
      

    getGraphBar(nextWeather.tmpValue,nextWeather2.tmpValue,nextWeather3.tmpValue,nextWeather4.tmpValue,nextWeather5.tmpValue);

    nextDayWeatherTemp.textContent = `${nextWeather.tmpValue}°`;
    nextDayWeatherImage.textContent = ``;
    nextDayWeatherHours.textContent = `${delZeroHours}시`;

    nextDayWeatherTemp2.textContent = `${nextWeather2.tmpValue}°`;
    nextDayWeatherImage2.textContent = ``;
    nextDayWeatherHours2.textContent = delZeroHours_2;

    nextDayWeatherTemp3.textContent = `${nextWeather3.tmpValue}°`;
    nextDayWeatherImage3.textContent = ``;
    nextDayWeatherHours3.textContent = delZeroHours_3;

    nextDayWeatherTemp4.textContent = `${nextWeather4.tmpValue}°`;
    nextDayWeatherImage4.textContent = ``;
    nextDayWeatherHours4.textContent = delZeroHours_4;

    nextDayWeatherTemp5.textContent = `${nextWeather5.tmpValue}°`;
    nextDayWeatherImage5.textContent = ``;
    nextDayWeatherHours5.textContent = delZeroHours_5;
}


getWeatherApi(getWeatherList);


// 강수형태 (PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) <단기예보> 
// 하늘상태 (SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)



const addClassListWeatherIcon = (fcstTime, values, className) =>{
    // console.log( time, values, className);

    if(Number(values.skyValue) === 1){
        if( className === todayWeatherLogo){
            todayWeatherSecondSpan.textContent = '맑음';
        }

        if(  19 < fcstTime.slice(0,-2) ) { // 20시 부터 저녁 icon을 보여주기 위함
            if( Number(values.ptyValue) === 0 ){
                className.classList.add('weather-icon--밤--맑음');
            }else if( Number(values.ptyValue) === 1){ // 비
                className.classList.add('weather-icon--밤--비--맑음');
            }else if( Number(values.ptyValue) === 2){ //눈/비
                className.classList.add('weather-icon--밤--눈비--맑음');
            }else if( Number(values.ptyValue) === 3){ // 눈
                className.classList.add('weather-icon--밤--눈--맑음');
            }else if( Number(values.ptyValue) === 4){ //소나기
                className.classList.add('weather-icon--밤--소나기--맑음');
            }
        }else{ // 낮
            if( Number(values.ptyValue) === 0 ){
                className.classList.add('weather-icon--낮--맑음');
            }else if( Number(values.ptyValue) === 1){ // 비
                className.classList.add('weather-icon--낮--비--맑음');
            }else if( Number(values.ptyValue) === 2){ //눈/비
                className.classList.add('weather-icon--낮--눈비--맑음');
            }else if( Number(values.ptyValue) === 3){ // 눈
                className.classList.add('weather-icon--낮--눈--맑음');
            }else if( Number(values.ptyValue) === 4){ //소나기
                className.classList.add('weather-icon--낮--소나기--맑음');
            }
        }

    }else if(Number(values.skyValue) === 3){
        if( className === todayWeatherLogo){
            todayWeatherSecondSpan.textContent = '구름 많음';
        }

        if(  19 < fcstTime.slice(0,-2) ) { // 20시 부터 저녁 icon을 보여주기 위함
            if( Number(values.ptyValue) === 0 ){
                className.classList.add('weather-icon--밤--구름많음');
            }else if( Number(values.ptyValue) === 1){ // 비
                className.classList.add('weather-icon--밤--비--구름많음');
            }else if( Number(values.ptyValue) === 2){ //눈/비
                className.classList.add('weather-icon--밤--눈비--구름많음');
            }else if( Number(values.ptyValue) === 3){ // 눈
                className.classList.add('weather-icon--밤--눈--구름많음');
            }else if( Number(values.ptyValue) === 4){ //소나기
                className.classList.add('weather-icon--밤--소나기--구름많음');
            }
        }else{ // 낮
            if( Number(values.ptyValue) === 0 ){
                className.classList.add('weather-icon--낮--구름많음');
            }else if( Number(values.ptyValue) === 1){ // 비
                className.classList.add('weather-icon--낮--비--구름많음');
            }else if( Number(values.ptyValue) === 2){ //눈/비
                className.classList.add('weather-icon--낮--눈비--구름많음');
            }else if( Number(values.ptyValue) === 3){ // 눈
                className.classList.add('weather-icon--낮--눈--구름많음');
            }else if( Number(values.ptyValue) === 4){ //소나기
                className.classList.add('weather-icon--낮--소나기--구름많음');
            }
        }
    }else if( Number(values.skyValue) === 4){
        if( className === todayWeatherLogo){
            todayWeatherSecondSpan.textContent = '흐림';
        }
       
        if(  19 < fcstTime.slice(0,-2) ) { // 20시 부터 저녁 icon을 보여주기 위함
            if( Number(values.ptyValue) === 0 ){
                className.classList.add('weather-icon--밤--흐림');
            }else if( Number(values.ptyValue) === 1){ // 비
                className.classList.add('weather-icon--밤--비--흐림');
            }else if( Number(values.ptyValue) === 2){ //눈/비
                className.classList.add('weather-icon--밤--눈비--흐림');
            }else if( Number(values.ptyValue) === 3){ // 눈
                className.classList.add('weather-icon--밤--눈--흐림');
            }else if( Number(values.ptyValue) === 4){ //소나기
                className.classList.add('weather-icon--밤--소나기--흐림');
            }
        }else{ // 낮
            if( Number(values.ptyValue) === 0 ){
                className.classList.add('weather-icon--낮--흐림');
            }else if( Number(values.ptyValue) === 1){ // 비
                className.classList.add('weather-icon--낮--비--흐림');
            }else if( Number(values.ptyValue) === 2){ //눈/비
                className.classList.add('weather-icon--낮--눈비--흐림');
            }else if( Number(values.ptyValue) === 3){ // 눈
                className.classList.add('weather-icon--낮--눈--흐림');
            }else if( Number(values.ptyValue) === 4){ //소나기
                className.classList.add('weather-icon--낮--소나기--흐림');
            }
        }
    }
}






const bar = document.querySelector(".bar");

const getGraphBar = (tmp1,tmp2,tmp3, tmp4, tmp5)=>{
//tmpValue값만 쓸꺼임
    const arr = new Array(tmp1, tmp2, tmp3, tmp4, tmp5);
    // console.log(tmp1,tmp2,tmp3,tmp4, tmp5 )
    console.log(arr);

    /*
    
   
    
    
    */


}


// const ctx = document.querySelector(".weather--daily--right ul");
// const ctx = document.getElementById("myChart");

// const mixedChart = new Chart(ctx, {
//     data: {
//         datasets: [{
//             type: 'bar',
//             // label: 'Bar Dataset',
//             data: [26, 26, 27, 29]
//         }, {
//             type: 'line',
//             // label: 'Line Dataset',
//             data: [26, 26, 27, 29],
//         }],
//         labels: ['January', 'February', 'March', 'April'],
//         datasets: [ // 데이터의 속성
//             {
//               label: 'Dataset', // 축의 제목
//               fill: false, // line 형태일 때, 선 안쪽을 채우는지 여부
//               data: [10,20,30,40], // dataset 값
//               backgroundColor: '#00C7E2', // dataset 배경색
//               borderColor: 'white', // dataset 테두리 색상
//               borderWidth: 2, // dataset 테두리 두께
//               maxBarThickness: 30 // 최대 bar의 두께 설정
//             }
//           ]
//     },
//     options: options
// });
 

// var context = document
//                 .getElementById('myChart')
//                 .getContext('2d');
//             var myChart = new Chart(context, {
//                 type: 'bar', // 차트의 형태
//                 data: { // 차트에 들어갈 데이터
//                     labels: [
//                         //x 축
//                         '1','2','3','4','5','6','7'
//                     ],
//                     datasets: [
//                         { //데이터
//                             // label: 'test1', //차트 제목
//                             fill: true, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
//                             data: [
//                                 21,19,25,20,23,26,25 //x축 label에 대응되는 데이터 값
//                             ],
//                             backgroundColor: [
//                                 //색상
//                                 'rgba(255, 99, 132, 0.2)',
//                                 'rgba(54, 162, 235, 0.2)',
//                                 'rgba(255, 206, 86, 0.2)',
//                                 'rgba(75, 192, 192, 0.2)',
//                                 'rgba(153, 102, 255, 0.2)',
//                                 'rgba(255, 159, 64, 0.2)'
//                             ],
//                             borderColor: [
//                                 //경계선 색상
//                                 'rgba(255, 99, 132, 1)',
//                                 'rgba(54, 162, 235, 1)',
//                                 'rgba(255, 206, 86, 1)',
//                                 'rgba(75, 192, 192, 1)',
//                                 'rgba(153, 102, 255, 1)',
//                                 'rgba(255, 159, 64, 1)'
//                             ],
//                             borderWidth: 1 //경계선 굵기
//                         }/* ,
//                         {
//                             label: 'test2',
//                             fill: false,
//                             data: [
//                                 8, 34, 12, 24
//                             ],
//                             backgroundColor: 'rgb(157, 109, 12)',
//                             borderColor: 'rgb(157, 109, 12)'
//                         } */
//                     ]
//                 },
//                 options: {
//                     scales: {
//                         yAxes: [
//                             {
//                                 ticks: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             });