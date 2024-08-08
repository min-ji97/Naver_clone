
// 증시 시간
const clickStockToday = document.querySelector('#main-right--stock > div:first-child > span');
const stockToday = document.querySelector('#main-right--stock > div:first-child > span');


// 달력
const todaySpan = document.querySelector('.calendar--today span:first-child');
const todayDaySpan = document.querySelector('.calendar--today span:last-child');


const weekdays = ["일","월", "화", "수", "목", "금", "토"];
//   0   1     2     3     4     5     6

const today = new Date();

let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDate();

let dayWeek = today.getDay(); // 요일
todaySpan.textContent = `${month+1}.${day}`;


// 증시 부분

const getStockToday = () =>{

    const time = new Date(); 
    
    let stockMonth = ("0" + (time.getMonth() + 1)).slice(-2); 
    let stockDay = ("0" + time.getDate()).slice(-2);
    let stockHours = ("0" + time.getHours()).slice(-2);
    let stockSeconds = ("0" + time.getSeconds()).slice(-2);
    
    stockToday.textContent = `${stockMonth}.${stockDay}. ${stockHours}:${stockSeconds}`;
}

clickStockToday.addEventListener('click', () =>{
    getStockToday();
});
// 



// 전달 구하기 
let beforeDay = new Date(today.setMonth(today.getMonth() - 1)); // 전 달 
let beforeYear = beforeDay.getFullYear();
let beforeMonth = beforeDay.getMonth();
let beforeDate = beforeDay.getDate();

let getBeforeLastDay = new Date(beforeDay.getFullYear(), beforeDay.getMonth()+1 , 0);
let agoLastDay = getBeforeLastDay.getDate();


weekdays.forEach( (v , i) =>{
    if(dayWeek === i){
        todayDaySpan.textContent = `${v}`;
    }
})


getCalendar();
getStockToday();

function getCalendar(){
    
    let firstDay = new Date(year, month, 1); // 이번달 첫째 요일!
    let lastDay = new Date(year, month+1, 0 );  // 이번달 마지말 일!


    let getFirstDay = firstDay.getDay();
    let getLastDay = lastDay.getDate();


    // table 만들기

    const calendarTable = document.querySelector('.widget--calendar--right');
    let tableEl = document.createElement("table");

    let tr = document.createElement("tr");
    let td = document.createElement("td");

    calendarTable.appendChild(tableEl);
    tableEl.appendChild(tr);

    weekdays.forEach((i)=>{
        td = document.createElement("td");
        td.innerHTML = i;
    
        tr.appendChild(td);
    });

    const week = Math.ceil((getFirstDay+getLastDay)/7);

    let dayCount = 0;
  
    for(let i = 0;i<week;i++){ // 주 돌리기
        
        if(i===0){ // 첫 주일때
            tr = document.createElement("tr");
            let agoDay = agoLastDay-getFirstDay;
            for(let j = 0 ; j < getFirstDay ; j++){ // 첫번째 주 - 전 날 표시해주기
                agoDay++;
                td = document.createElement("td");
                td.innerHTML = agoDay;
                td.style.color='#606060';
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
     */
    const rowList = tableEl.rows;
    let nextDayCount = 0;

    const getNextMonth = (tdItem) =>{
        nextDayCount++;
        tdItem.textContent = nextDayCount;
        tdItem.style.color = '#606060';
    }   

    for(let i = 0; i< rowList.length ; i++){
       
        for(let j=0; j < 7 ;j++){
            if(i !== 0){ 
                if(j === 0){
                    const date =  rowList[i].cells[j] ? rowList[i].cells[j]:0;
                    date.className = 'sunday--color';
                }else if(j === 6){
                    const date =  rowList[i].cells[j] ? rowList[i].cells[j]:0;
                    date.className = 'saturday--color';
                }
            }

            const todayText = rowList[i].cells[j]?.innerText;
            if(today.getDate() === Number(todayText)){ // 오늘 날짜에 해당하는 td구하기
                const date =  rowList[i].cells[j];
                date.className = 'today--active';
                date.setAttribute('data-day',todayText);
            }

            if(i === rowList.length-1){
                
                if( !rowList[i].cells[j]){
                    getNextMonth(rowList[i].cells[j]);
                }
            }
                 
        }
    }
    
}
