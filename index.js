

// console.log("되냐 오랜만에 해서 기억이 안난다구...")
//  자바스크립트로 할까,,, 제이쿼리로 할까.......

// .search_kbd_btn 이거 hover시, .kbd_text이거 display block 해주기

// const  searchKbdBtn = document.querySelector(".search_kbd_btn");
// const kbdText = document.querySelector(".kbd_text");


$(document).ready(function(){
    $('.search_kbd_btn').hover(function(){
        $(".kbd_text").css('display','block');
    },function(){
        $(".kbd_text").css('display','none');
    });
});



