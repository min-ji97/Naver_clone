

const weekdays = ["SUN","MO", "TU", "WE", "TH", "FR", "SAT"];
//   0   1     2     3     4     5     6

const today = new Date();

let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDate();


getCalendar();


function getCalendar(){
    
    let firstDay = new Date(year, month, 1); // 이번달 첫째 요일!
    let lastDay = new Date(year, month+1, 0 );  // 이번달 마지말 일!

    // 첫날은 요일을 알아야함 시작점 필수
    // console.log(lastDay.getDate() , lastDay); // 마지막날 아주 잘 나옴  막날은 30일인지 31일인지가 중요하니까 날짜를 알아야함!

    let getFirstDay = firstDay.getDay();
    let getLastDay = lastDay.getDate();

    let tableHeaderYear = document.querySelector("#calendar-header span:nth-of-type(1)");
    let tableHeaderMonth = document.querySelector("#calendar-header span:nth-of-type(2)");
 
  

    let engTextMonth = ["January","February","March","April","May","June","July","August","September","Octobar","November","December"];

    engTextMonth.forEach(( v , i)=>{
        if(month === i){
            changeText = v;
        }
    });

      // 달력 년도와 월 알려주기
      tableHeaderYear.innerHTML = year;
      tableHeaderMonth.innerHTML = changeText;




    // table 만들기!!!!

    let tableTag = document.querySelector("#calendar-table");
    let tableEl = document.createElement("table");

    let tr = document.createElement("tr");
    let td = document.createElement("td");

    tableTag.appendChild(tableEl);
    tableEl.appendChild(tr);

    weekdays.forEach((i)=>{
        td = document.createElement("td");
        td.innerHTML = i;
        tr.appendChild(td);
    });

    // console.log(Math.ceil(firstDay.getDay()));
    const week = Math.ceil((getFirstDay+getLastDay)/7);

    let dayCount = 0;
  
    for(let i = 0;i<week;i++){ // 주 돌리기
        
        if(i===0){ // 첫 주일때
            tr = document.createElement("tr");
            for(let j = 0 ; j < getFirstDay ; j++){ // 첫번째 주  빈칸
                td = document.createElement("td");
                td.innerHTML ='';
                tr.appendChild(td);
            }
            for(let j =0 ; j < 7-getFirstDay; j++){
                td = document.createElement("td");
                dayCount += 1;
                td.innerHTML = dayCount;
                tr.appendChild(td);
            }
            tableEl.appendChild(tr);
        }else{
            tr = document.createElement("tr");
            for(let j = 0;j < 7 ; j++){
                if(dayCount === getLastDay){
                    break;
                }
                td = document.createElement("td");
                dayCount += 1;
                td.innerHTML = dayCount;
                tr.appendChild(td);
            }
            tableEl.appendChild(tr);
        }
        
    }

    /**
     * 
     * 
     */
    const rowList = tableEl.rows;
    
    for(let i = 0; i< rowList.length ; i++){
        for(let j=0; j < 7 ;j++){

            //여기서부터는 토요일 일요일마다 색 입혀줄거임! 토요일은 [6] 일요일이 [0]
            if(i !== 0){ // 토요일일요일 CSS 입히기
                if(j === 0){
                    const date =  rowList[i].cells[j] ? rowList[i].cells[j]:0;
                    date.className = 'sunday-color';
                }else if(j === 6){
                    const date =  rowList[i].cells[j] ? rowList[i].cells[j]:0;
                    date.className = 'saturday-color';
                }
            }


            if(month === today.getMonth() && year === today.getFullYear()){  // 오늘 날짜에 CSS입히기
                //const todayText = rowList[i].cells[j].innerText; // 아~~~~~~ 존재하지않는것까지 구하려니까 오류가 떴나바..!!! 
                //const todayText = rowList[i].cells[j]?.innerText ? rowList[i].cells[j].innerText : -1; 이건 안됨 왜..????? 아래는 왜 되지..!?
                const todayText = rowList[i].cells[j]?.innerText;
                if(today.getDate() === Number(todayText)){ // 오늘 날짜에 해당하는 td구하기
                    const date =  rowList[i].cells[j];
                    date.className = 'active';
                    date.setAttribute('data-day',todayText);
                    
                }
            }      
        }
    }
    
}

//math.ceil(첫 요일 위치+마지막날)/7

const preBtn = document.querySelector(".preBtn");
const nextBtn = document.querySelector(".nextBtn");
const initDayBtn = document.querySelector("#initDayBtn");

preBtn.addEventListener('click',moveMonth);
nextBtn.addEventListener('click',moveMonth);
initDayBtn.addEventListener('click',getToday);


function deleteTable(){
    let table = document.querySelector("#calendar-table table");
    table.remove();
    getCalendar();
}
   

function getToday(){ // 오늘 날짜 바로보기
    year = today.getFullYear();
    month = today.getMonth();
    day = today.getDate();

    deleteTable();
}

function moveMonth(e){
    
    if( e.target.className === 'preBtn'){
        if(month === 0){ //1월일때 다음 month는 11로 바꿔주면 +1 해서 12월 됨
            month = 11; 
            year -=1;
        }else{
            month -=1;
        }
    }else{
        if(month === 11){ // 12월일때, (month값은 11) 다음 month는 1월로 바꿔주기위해 month가 0이 됨.
            month = 0;
            year += 1;
        }else{
            month += 1;
        }
    }

    deleteTable();
}

