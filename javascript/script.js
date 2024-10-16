


const responsive = document.querySelector('.res');
const nav = document.querySelector('nav');
const remove = document.querySelector('.nav-remove');


responsive.onclick = () => {
    nav.classList.add('active')
}

remove.onclick = () => {
    nav.classList.remove('active')
}

window.onscroll = () => {
    nav.classList.remove('active')
}

// Trending 
const trendingElements = document.querySelectorAll('.span-trending');

// Function to update the icon based on the saved state
function updateIconState(trendingElement, state) {
    if (state === 'solid') {
        trendingElement.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    } else {
        trendingElement.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    }
}

// Load saved states from localStorage on page load
trendingElements.forEach((trendingElement, index) => {
    const savedState = localStorage.getItem(`trendingIconState-${index}`) || 'regular';
    updateIconState(trendingElement, savedState);

    // Add a click event to toggle the icon state
    trendingElement.addEventListener('click', () => {
        const currentState = trendingElement.querySelector('i').classList.contains('fa-solid') ? 'solid' : 'regular';
        const newState = currentState === 'solid' ? 'regular' : 'solid';

        // Update the icon based on the new state
        updateIconState(trendingElement, newState);

        // Save the new state to localStorage
        localStorage.setItem(`trendingIconState-${index}`, newState);
    });
});



// Select all slider containers
// const sliders = document.querySelectorAll('.slider');

// // Loop through each slider to set up individual functionality
// sliders.forEach((sliderContainer) => {
//     const trendingItems = sliderContainer.querySelector('.item-box'); 
//     const btns = sliderContainer.nextElementSibling.querySelectorAll('.trending-btn span'); 
    
//     let firstImgWidth = trendingItems.clientWidth + 15; // Adjust spacing as needed

    
//     const totalScrollWidth = sliderContainer.scrollWidth;
//     const visibleWidth = sliderContainer.clientWidth;

   
//     btns.forEach((icon) => {
//         icon.addEventListener('click', () => { 
            
//             if (icon.id === 'right') {
//                 if (sliderContainer.scrollLeft + visibleWidth >= totalScrollWidth) {
                    
//                     sliderContainer.scrollLeft = 0;
//                 } else {
                    
//                     sliderContainer.scrollLeft += firstImgWidth;
//                 }

//             } else if (icon.id === 'left') {
//                 if (sliderContainer.scrollLeft === 0) {
                   
//                     sliderContainer.scrollLeft = totalScrollWidth - visibleWidth;
//                 } else {
    
//                     sliderContainer.scrollLeft -= firstImgWidth;
//                 }
//             }
//         });
//     });
// });

// Select all slider containers
const sliders = document.querySelectorAll('.slider');

// Loop through each slider to set up individual functionality
sliders.forEach((sliderContainer) => {
    const trendingItems = sliderContainer.querySelector('.item-box'); // Get the first 
    const btns = sliderContainer.nextElementSibling.querySelectorAll('.trending-btn span'); 
   
    let firstImgWidth = trendingItems.clientWidth + 15; 
    
    btns.forEach((icon) => {
        icon.addEventListener('click', () => { 
            // Scroll left or right depending on which button was clicked
            sliderContainer.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
        });
    });
});


//Trending start btn
const allitemBtn = document.querySelector('.all-items-btn');
allitemBtn.addEventListener('wheel', (e) => {
    e.preventDefault()
    allitemBtn.scrollLeft += e.deltaY;
});


let currentItem = 0; // Declare currentItem with let instead of const
const allaboutContainer = document.querySelector('.allabout-container');
const allabout = allaboutContainer.querySelectorAll('.allabout');
const allaboutLn = allabout.length;
const allaboutWidth = allabout[0].clientWidth;

const productButtons = document.querySelectorAll('.product-btn');

function sliderContainer(index) {
    
    if (index >= allaboutLn) {
        currentItem = 0; 
    } else if (index < 0) {
        currentItem = allaboutLn - 1; 
    } else {
        currentItem = index;
    }

    allaboutContainer.style.transform = `translateX(-${currentItem * 105}%)`;
    updateProductButtons(); 
}

function updateProductButtons() {
    productButtons.forEach(button => button.classList.remove('active'));
    productButtons[currentItem].classList.add('active');
}

sliderContainer(currentItem);

productButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const numberIndex = parseInt(e.target.getAttribute('data-slide'));
        sliderContainer(numberIndex); 
    });
});




//seen all text
function latestRespons() {
    const updateDis = document.querySelectorAll('.update-discription');
    updateDis.forEach(update => {
        const originalText = update.textContent;

        if(originalText.length > 100) {
            const truncatedText = originalText.substring(0, 100);
            update.innerHTML = `${truncatedText}<span class="ellipsis">...seen</span>`;

            // Creae a Element
            const moreElement = document.createElement('span');
            moreElement.textContent = 'more';
            moreElement.style.color = '#F15025';
            moreElement.style.cursor = 'pointer';
            moreElement.style.display = 'none';
            update.appendChild(moreElement);

            update.addEventListener('click', () => {
                const ellipsis = update.querySelector('.ellipsis');

                if (ellipsis) {
                    if (ellipsis.style !== 'none') {
                        update.innerHTML = originalText;
                        update.appendChild(moreElement);
                        moreElement.style.display = 'inline';
                    }
                }
            });
            moreElement.addEventListener('click', (event) => {
                event.stopPropagation();
                update.innerHTML = `${truncatedText}<span class="ellipsis">...seen</span>`;

                update.appendChild(moreElement);
                moreElement.style.display = 'none';
            });
        }
    })
}
latestRespons()

function updateEle() {
    const catagory = document.querySelector('.catagory');
    const showimg = document.querySelector('#show-img');
    const latestheading = document.querySelector('.latest-heading');
    const datadiscription = document.querySelector('.discription');

    
    const latestimg = document.querySelectorAll('.latest-img');
    const trends = document.querySelectorAll('.trends');
    const latestupdateheading = document.querySelectorAll('.latest-update-heading');
    const updatediscription = document.querySelectorAll('.update-discription');

    latestimg.forEach((img, index)=> {
        img.addEventListener('click', (e) => {
           
            showimg.src = e.target.src;
            if (trends[index]) {
                catagory.innerHTML = trends[index].innerHTML;
            }
            if (latestupdateheading[index]) {
                latestheading.innerHTML = latestupdateheading[index].innerHTML;
            }
            if (updatediscription[index]) {
                datadiscription.innerHTML = updatediscription[index].textContent;
            }

            
        })
    })
    
}

updateEle()

//reels 
const reelscintant = document.querySelector('.reel-box');

reelscintant.addEventListener('wheel', (y) => {
    y.preventDefault()
    reelscintant.scrollLeft += y.deltaY;
});



