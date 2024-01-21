document.addEventListener('DOMContentLoaded', function() {
    // Activate the SVG animation
    var svgElement = document.querySelector('.loading-overlay svg');
    svgElement.classList.add('active');

    // Start the fade-out
    setTimeout(function() {
        document.querySelector('.loading-overlay').style.opacity = '0';

        // Wait for fade-out to finish and then hide the overlay
        setTimeout(function() {
            document.querySelector('.loading-overlay').classList.add('active');

            // Deactivate the SVG animation
            svgElement.classList.remove('active');

            // Now reveal the main content
            document.querySelector('.main-content').classList.add('active');

            // Initialize Intersection Observer for About Title and Buttons
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slide-in-animation');
                    }
                });
            }, {
                threshold: 0.5 // Adjust as needed
            });

            const aboutTitle = document.querySelector('.about-title');
            observer.observe(aboutTitle);

            // Initialize Intersection Observer for buttons
            const buttons = document.querySelectorAll('.directions-btn, .call-us-btn');
            buttons.forEach(button => {
                observer.observe(button);
            });

        }, 500); // Match the transition time in CSS
    }, 1200); // Loading overlay display duration
});

const menuItems = [
    {
        name: "Pancake Cucumber",
        description: "Light, creamy and sweet.",
        price: 10.99,
        image: "./images/crepe1.jpg",
        ingredients: ["strawberries", "blueberries", "whip cream", "chocolate chips"]
    },
    {
        name: "Strawberry Chocolate",
        description: "Light, creamy and sweet.",
        price: 10.99,
        image: "./images/crepe2.jpg",
        ingredients: ["strawberries", "blueberries", "whip cream", "chocolate chips"]
    },
    {
        name: "Waffle Raspberry ",
        description: "Heavy, sour and sweet.",
        price: 15.99,
        image: "./images/crepe3.jpg",
        ingredients: ["syrup", "raspberries", "whip cream", "chocolate chips"]
    },
    {
        name: "Blueberry Blast ",
        description: "Sour, Sweet and Fruity.",
        price: 13.99,
        image: "./images/crepe5.jpg",
        ingredients: ["raspberries", "blueberries", "whip cream", "batter mix"]
    },
    {
        name: "Chocolate Supreme",
        description: "Sour, Sweet and Fruity.",
        price: 17.99,
        image: "./images/crepe6.jpg",
        ingredients: ["raspberries", "blueberries", "whip cream", "batter mix"]
    },
    {
        name: "Peaches Supreme ",
        description: "Sour, Sweet and Fruity.",
        price: 14.99,
        image: "./images/crepe8.jpg",
        ingredients: ["raspberries", "blueberries", "whip cream", "batter mix"]
    },
    {
        name: "Pancake Cucumber",
        description: "Sour, Sweet and Fruity.",
        price: 9.99,
        image: "./images/crepe2.jpg",
        ingredients: ["raspberries", "blueberries", "whip cream", "batter mix"]
    },

    {
        name: " Birthday Bazzle",
        description: "Sour, Sweet and Fruity.",
        price: 15.99,
        image: "./images/krepe9.jpg",
        ingredients: ["raspberries", "grapes", "whip cream", "batter mix"]
    },
    {
        name: "Banana Blast",
        description: "Soft, Sweet and Light.",
        price: 12.99,
        image: "./images/krepe10.jpg",
        ingredients: ["bananas", "blueberries", "whip cream", "batter mix"]
    },
    // Add more items in a similar structure
];

function generateMenuItems() {
    let menuContainer = $("#menu-container"); // The ID of the container where the menu items will be added

    menuItems.forEach(item => {
        let ingredientsList = item.ingredients.map(ingredient => `<li class="ingredients">${ingredient}</li>`).join('');
        
        let itemHtml = `
            <div class="col-md-4 menu-item slide-from-left">
                <div class="card">
                    <img class="card-img-top" src="${item.image}" alt="Menu Item">
                    <div class="card-body">
                    <span class='price-tag'>$ ${item.price}</span>
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">${item.description}</p>
                    <ul>${ingredientsList}</ul>
                    </div>
                 
                </div>
            </div>
        `;

        menuContainer.append(itemHtml);
    });
}

// Call this function when the page loads
$(document).ready(function() {
    generateMenuItems();
});

$(document).ready(function() {
    $('.menu-item').each(function(index) {
        $(this).css('animation-delay', index * 300 + 'ms');
    });
});
function toggleIngredients(elem) {
    var ingredients = $(elem).closest('.card').find('.card-ingredients');
    var caret = $(elem).find('.fa-caret-down'); // Select the icon directly

    if (ingredients.hasClass('open')) {
        ingredients.removeClass('open');
        ingredients.css('max-height', 0); // Collapse the section
        caret.removeClass('open'); // Rotate caret to original position
    } else {
        ingredients.addClass('open');
        var scrollHeight = ingredients.prop('scrollHeight');
        ingredients.css('max-height', scrollHeight + 'px'); // Expand the section
        caret.addClass('open'); // Rotate caret upwards
    }
}

// Cart Functionality 
let cart = {};

function addToCart(itemName, price) {
    if (cart[itemName]) {
        cart[itemName].qty++;
    } else {
        cart[itemName] = { price: price, qty: 1 };
    }
    updateCartUI();
}


const TAX_RATE = 0.0925; // 9.25% as an example, adjust according to the current rate

function calculateTax(total) {
    return total * TAX_RATE;
}

function increaseItemQty(itemName) {
    cart[itemName].qty++;
    updateCartUI();
}

function decreaseItemQty(itemName) {
    if (cart[itemName].qty > 1) {
        cart[itemName].qty--;
    } else {
        removeFromCart(itemName);
    }
    updateCartUI();
}

function removeFromCart(itemName) {
    delete cart[itemName];
    updateCartUI();
}
function toggleCartMenu() {
    if ($('#cart').hasClass('open')) {
        $('#cart').removeClass('open');
    } else {
        $('#cart').addClass('open');
    }
}


function updateItemCount() {
    let totalCount = 0;
    Object.values(cart).forEach(item => totalCount += item.qty);
    $('#item-count').text(totalCount).addClass('bounce');
    setTimeout(() => $('#item-count').removeClass('bounce'), 300);
}


function updateCartUI() {
    let cartItems = $('#cart-items');
    cartItems.empty();
    let total = 0;
    Object.keys(cart).forEach(itemName => {
        let item = cart[itemName];
        total += item.qty * item.price;
        cartItems.append(`
            <li>
                ${itemName} - $${item.price} 
                <span class="qty-selector">
                    <i class="fas fa-caret-left" onclick="decreaseItemQty('${itemName}')"></i>
                    ${item.qty}
                    <i class="fas fa-caret-right" onclick="increaseItemQty('${itemName}')"></i>
                </span>
                <i class="fas fa-trash" onclick="removeFromCart('${itemName}')"></i>
            </li>
        `);
    });
    let tax = calculateTax(total);
    let grandTotal = total + tax;
    $('#cart-total').text(total.toFixed(2));
    $('#cart-tax').text(tax.toFixed(2));
    $('#cart-grand-total').text(grandTotal.toFixed(2)); 
    updateItemCount();
}


$(document).on('click', '.add-to-cart', function() {
    let itemName = $(this).data('name');
    let price = $(this).data('price');
    addToCart(itemName, price);
});

