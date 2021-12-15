

// Header Sticky JS

// window.onscroll = function () { myFunction() };
// var header = document.querySelector(".upper-nav");
// var sticky = header.offsetTop;
// function myFunction() {
//     if (window.pageYOffset > sticky) {
//         header.classList.add("is-sticky");
//     } else {
//         header.classList.remove("is-sticky");
//     }
// }


// $('#popularCarousel,#ratedCarousel,#NewCarousel,#topCarousel').carousel({
//     interval: 10000
// })


// navbar

var mainListDiv = document.getElementById("mainListDiv"),
    mediaButton = document.getElementById("mediaButton");

mediaButton.onclick = function () {


    mainListDiv.classList.toggle("show_list");
    mediaButton.classList.toggle("active");

};


document.addEventListener("DOMContentLoaded", function () {


    /////// Prevent closing from click inside dropdown
    document.querySelectorAll('.dropdown-menu').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    })



    // make it as accordion for smaller screens
    if (window.innerWidth < 992) {

        // close all inner dropdowns when parent is closed
        document.querySelectorAll('.navbar .dropdown').forEach(function (everydropdown) {
            everydropdown.addEventListener('hidden.bs.dropdown', function () {
                // after dropdown is hidden, then find all submenus
                this.querySelectorAll('.submenu').forEach(function (everysubmenu) {
                    // hide every submenu as well
                    everysubmenu.style.display = 'none';
                });
            })
        });

        document.querySelectorAll('.dropdown-menu a').forEach(function (element) {
            element.addEventListener('click', function (e) {

                let nextEl = this.nextElementSibling;
                if (nextEl && nextEl.classList.contains('submenu')) {
                    // prevent opening link if link needs to open dropdown
                    e.preventDefault();
                    console.log(nextEl);
                    if (nextEl.style.display == 'block') {
                        nextEl.style.display = 'none';
                    } else {
                        nextEl.style.display = 'block';
                    }

                }
            });
        })
    }
    // end if innerWidth

});



function changeImage(id) {

    var main_prodcut_image = document.getElementById('main_product_image');
    main_prodcut_image.src = id.src;

}

// cart

function Onfocus() {
    let x = document.getElementById("search-item-area");
    x.style.display = "block";

}


// 

