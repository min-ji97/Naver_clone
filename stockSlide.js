
// document.addEventListener("DOMContentLoaded",()=>{


//     const stockBox = document.querySelectorAll('.stock--box');    


//     let count = 0;
//     stockBox[count].classList.add('display--block');
    
//     const getStockBlock = () =>{
//             stockBox[count].classList.add('stock--slideOut');

//             setTimeout(()=>{

//                 stockBox[count].classList.remove('display--block','stock--slideOut');
//                 if( stockBox.length -1 === count){  // 카운트가 2일 경우, 다음 block은 다시 0번 인덱스 부터
//                     count = 0;
//                 }else{
//                     count++;
//                 }
//                 stockBox[count].classList.add('display--block','stock--slideIn');
                
//                 setTimeout(()=>{
//                     stockBox[count].classList.remove('stock--slideIn');
//                 })
                
//             },500);
   
//     }
    
//     setInterval(getStockBlock,3000);
    
// });


