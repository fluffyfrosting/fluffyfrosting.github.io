/* ==========================================
   Fluffy Frosting — v7 Premium UI JavaScript
   Visual Gallery-First + Dynamic Menu System
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // =============================================
    // NAVIGATION
    // =============================================
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navCta = document.getElementById('navCta');
    let menuOpen = false;

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            menuOpen = !menuOpen;
            navLinks.classList.toggle('active', menuOpen);
            navToggle.classList.toggle('active', menuOpen);
        });
    }

    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            if (navCta) navCta.style.display = 'inline-flex';
            if (nav) nav.style.boxShadow = '0 4px 20px rgba(91,42,123,0.08)';
        } else {
            if (navCta) navCta.style.display = 'none';
            if (nav) nav.style.boxShadow = 'none';
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id === '#') return;
            const el = document.querySelector(id);
            if (el) {
                const offset = nav ? nav.offsetHeight : 0;
                const top = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Reveal Animation
    const revealObs = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // =============================================
    // DRAG-TO-SCROLL helper
    // =============================================
    function initDragScroll(el) {
        if (!el) return;
        let isDown = false, startX, scrollLeft;
        el.addEventListener('mousedown', (e) => {
            isDown = true; el.classList.add('grabbing');
            startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft;
        });
        el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('grabbing'); });
        el.addEventListener('mouseup', () => { isDown = false; el.classList.remove('grabbing'); });
        el.addEventListener('mousemove', (e) => {
            if (!isDown) return; e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            el.scrollLeft = scrollLeft - (x - startX) * 1.5;
        });
    }

    // =============================================
    // INTERACTIVE MENU SYSTEM
    // =============================================
    const menuData = {
        "Cake Flavours": [
            { name: "Vanilla", prices: [{ size: "Half KG", val: "300" }, { size: "1 KG", val: "600" }] },
            { name: "Black Forest", prices: [{ size: "Half KG", val: "330" }, { size: "1 KG", val: "650" }] },
            { name: "Strawberry", prices: [{ size: "Half KG", val: "340" }, { size: "1 KG", val: "680" }], image: "images/menu-strawberry.jpg" },
            { name: "Pineapple", prices: [{ size: "Half KG", val: "340" }, { size: "1 KG", val: "680" }], image: "images/menu-pineapple.jpg" },
            { name: "Black Currant", prices: [{ size: "Half KG", val: "340" }, { size: "1 KG", val: "680" }] },
            { name: "Mango", prices: [{ size: "Half KG", val: "340" }, { size: "1 KG", val: "680" }], image: "images/menu-mango.jpg" },
            { name: "Litchi", prices: [{ size: "Half KG", val: "380" }, { size: "1 KG", val: "710" }], image: "images/menu-litchi.jpg" },
            { name: "Green Apple", prices: [{ size: "Half KG", val: "380" }, { size: "1 KG", val: "710" }] },
            { name: "Kiwi", prices: [{ size: "Half KG", val: "380" }, { size: "1 KG", val: "710" }] },
            { name: "Fruit Feast", prices: [{ size: "Half KG", val: "499" }, { size: "1 KG", val: "990" }], image: "images/menu-fruit-feast.jpg" },
            { name: "Butter Scotch", prices: [{ size: "Half KG", val: "360" }, { size: "1 KG", val: "690" }] },
            { name: "German Black Forest", prices: [{ size: "Half KG", val: "360" }, { size: "1 KG", val: "750" }] },
            { name: "White Forest", prices: [{ size: "Half KG", val: "435" }, { size: "1 KG", val: "800" }], image: "images/menu-white-forest.jpg" },
            { name: "Irish Coffee", prices: [{ size: "Half KG", val: "385" }, { size: "1 KG", val: "750" }] },
            { name: "Vintage Truffle", prices: [{ size: "Half KG", val: "385" }, { size: "1 KG", val: "750" }], image: "images/menu-vintage-truffle.jpg" },
            { name: "Choco Scotch", prices: [{ size: "Half KG", val: "435" }, { size: "1 KG", val: "850" }] },
            { name: "Choco Almond", prices: [{ size: "Half KG", val: "495" }, { size: "1 KG", val: "950" }] },
            { name: "Choco Truffle", prices: [{ size: "Half KG", val: "430" }, { size: "1 KG", val: "850" }], image: "images/menu-choco-truffle.jpg" },
            { name: "Zeebra", prices: [{ size: "Half KG", val: "435" }, { size: "1 KG", val: "850" }] },
            { name: "Mud Forest", prices: [{ size: "Half KG", val: "435" }, { size: "1 KG", val: "850" }] },
            { name: "Choco Fantacy", prices: [{ size: "Half KG", val: "499" }, { size: "1 KG", val: "990" }], image: "images/menu-choco-fantasy.jpg" },
            { name: "Brownie Choco Delight", prices: [{ size: "Half KG", val: "499" }, { size: "1 KG", val: "990" }] },
            { name: "Pistachio", prices: [{ size: "Half KG", val: "499" }, { size: "1 KG", val: "990" }], image: "images/menu-pistachio.jpg" },
            { name: "Red Velvet", prices: [{ size: "Half KG", val: "520" }, { size: "1 KG", val: "990" }] },
            { name: "Rainbow (Min 750g)", prices: [{ size: "750g", val: "699" }, { size: "1.5 KG", val: "1200" }] },
            { name: "Rasmalai Cake", prices: [{ size: "Half KG", val: "550" }, { size: "1 KG", val: "990" }] },
            { name: "Jamun Layered Cake", prices: [{ size: "Half KG", val: "550" }, { size: "1 KG", val: "990" }], image: "images/menu-jamun-layered.jpg" },
            { name: "Rosemilk Fantacy", prices: [{ size: "Half KG", val: "550" }, { size: "1 KG", val: "990" }] },
            { name: "Darkchoco Nuts", prices: [{ size: "Half KG", val: "550" }, { size: "1 KG", val: "990" }], image: "images/menu-darkchoco-nuts.jpg" },
            { name: "Blueberry with Choco/Nuts", prices: [{ size: "Half KG", val: "480" }, { size: "1 KG", val: "900" }] },
            { name: "Rasberry with Choco/Nuts", prices: [{ size: "Half KG", val: "485" }, { size: "1 KG", val: "900" }] },
            { name: "Mango with Choco/Nuts", prices: [{ size: "Half KG", val: "485" }, { size: "1 KG", val: "900" }], image: "images/menu-mango-choco.jpg" }
        ],
        "FF Signature": [
            { name: "Choco Strawberry", prices: [{ size: "Half KG", val: "480" }, { size: "1 KG", val: "850" }] },
            { name: "Oreo Forest", prices: [{ size: "Half KG", val: "450" }, { size: "1 KG", val: "900" }], image: "images/menu-oreo-forest.jpg" },
            { name: "Dark Chocochip", prices: [{ size: "Half KG", val: "500" }, { size: "1 KG", val: "980" }] },
            { name: "Cruncy Chocolate", prices: [{ size: "Half KG", val: "520" }, { size: "1 KG", val: "990" }] },
            { name: "Have a Break - Kitkat", prices: [{ size: "Half KG", val: "700" }, { size: "1 KG", val: "1400" }], image: "images/menu-kitkat.jpg" },
            { name: "Belgium Chocolate", prices: [{ size: "Half KG", val: "750" }, { size: "1 KG", val: "1400" }], image: "images/menu-belgium-chocolate.jpg" },
            { name: "Milkchoco Truffle", prices: [{ size: "Half KG", val: "550" }, { size: "1 KG", val: "900" }] },
            { name: "Biscoff Cookie Cream", prices: [{ size: "Half KG", val: "750" }, { size: "1 KG", val: "1500" }], image: "images/menu-biscoff.jpg" },
            { name: "Ferrero Rocher Choco", prices: [{ size: "Half KG", val: "750" }, { size: "1 KG", val: "1500" }], image: "images/menu-ferrero-rocher.jpg" },
            { name: "Choco Overloaded", prices: [{ size: "Half KG", val: "800" }, { size: "1 KG", val: "1600" }], image: "images/menu-choco-overloaded.jpg" },
            { name: "Classical Tiramisu", prices: [{ size: "Half KG", val: "850" }, { size: "1 KG", val: "1600" }] }
        ],
        "Rich Plum Cakes": [
            { name: "Plum Cakes 250gms", prices: [{ size: "250g", val: "220" }] },
            { name: "Plum Cakes 500gms", prices: [{ size: "500g", val: "440" }] },
            { name: "Plum Cakes 1kg", prices: [{ size: "1 KG", val: "850" }] },
            { name: "Plum Cakes Pcs", prices: [{ size: "Piece", val: "70" }] }
        ],
        "Tea Cakes": [
            { name: "Vanilla Tea Cake", prices: [{ size: "250g", val: "120" }, { size: "500g", val: "240" }] },
            { name: "Fruit & Nut Cake", prices: [{ size: "250g", val: "150" }, { size: "500g", val: "280" }] },
            { name: "Walnut Cake", prices: [{ size: "250g", val: "160" }, { size: "500g", val: "300" }] },
            { name: "Marble Cake (150g)", prices: [{ size: "150g", val: "65" }, { size: "300g", val: "130" }] },
            { name: "Plain Cake (150g)", prices: [{ size: "150g", val: "60" }, { size: "300g", val: "120" }] }
        ],
        "Add-ons": [
            { name: "Eggless (per kg)", prices: [{ size: "Unit", val: "100" }] },
            { name: "Photo Prints (A4)", prices: [{ size: "Unit", val: "200" }] },
            { name: "Theme Charges (per kg)", prices: [{ size: "Unit", val: "300" }] },
            { name: "Shaping Charges (per kg)", prices: [{ size: "Unit", val: "200" }] },
            { name: "Extra Toys", prices: [{ size: "Unit", val: "250" }] }
        ]
    };

    const dynamicGrid = document.getElementById('menuDynamicGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.menu-gallery-grid .gallery-card');
    const searchInput = document.getElementById('menuSearchInput');
    const emptyState = document.getElementById('menuEmptyState');
    const menuContentWrapper = document.getElementById('menuContentWrapper');

    let currentCategory = null;
    let currentSearch = "";

    function renderMenu() {
        if (!dynamicGrid || !currentCategory) return;
        
        dynamicGrid.classList.add('fading');
        
        setTimeout(() => {
            // Robust category lookup
            const targetCat = Object.keys(menuData).find(k => k.trim().toLowerCase() === currentCategory.trim().toLowerCase());
            const filteredData = (menuData[targetCat] || []).filter(item => 
                item.name.toLowerCase().includes(currentSearch.toLowerCase())
            );

            if (filteredData.length === 0) {
                dynamicGrid.style.display = 'none';
                emptyState.style.display = 'block';
            } else {
                dynamicGrid.style.display = 'grid';
                emptyState.style.display = 'none';
                
                dynamicGrid.innerHTML = filteredData.map(item => {
                    const cartItem = cart.find(c => c.name === item.name);
                    const isInCart = !!cartItem;
                    const qty = isInCart ? cartItem.qty : 0;
                    const isAddon = currentCategory === 'Add-ons';
                    
                    return `
                    <div class="prod-card reveal ${isInCart ? 'in-cart' : ''}" data-item-name="${item.name.replace(/"/g, '&quot;')}">
                        <div class="prod-img-wrap">
                            ${item.image ? `<img src="${item.image}" alt="${item.name} - Fluffy Frosting" class="prod-img" loading="lazy">` : '<div class="prod-img-placeholder"></div>'}
                            
                            ${!isAddon ? `
                            <button class="btn-card-add" onclick="addItemToOrder('${item.name.replace(/'/g, "\\'")}', event)" title="Add to Order">
                                <span>+</span>
                            </button>
                            ` : ''}

                            ${isInCart && !isAddon ? `
                            <div class="card-qty-selector">
                                <button class="btn-card-qty" onclick="changeMenuQty('${item.name.replace(/'/g, "\\'")}', -1, event)">−</button>
                                <span class="card-qty-val">${qty}</span>
                                <button class="btn-card-qty" onclick="changeMenuQty('${item.name.replace(/'/g, "\\'")}', 1, event)">+</button>
                            </div>
                            ` : ''}
                        </div>
                        <h4 class="prod-name">${item.name}</h4>
                        <div class="prod-price-grid">
                            ${item.prices.map(p => `
                                <div class="price-item">
                                    <span class="price-size">${p.size}</span>
                                    <span class="price-val">₹${p.val}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `}).join('');

                // Observe new elements
                dynamicGrid.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
            }
            
            dynamicGrid.classList.remove('fading');
            
            // Reset scrollable container to top
            if (menuContentWrapper) menuContentWrapper.scrollTop = 0;
            if (dynamicGrid) dynamicGrid.scrollTop = 0;

            // Also reset page scroll to filter bar if currently scrolled past it
            if (menuContentWrapper) {
                const navOffset = nav ? nav.offsetHeight : 72;
                const targetTop = menuContentWrapper.getBoundingClientRect().top + window.scrollY - navOffset - 20;
                if (window.scrollY > targetTop) {
                    window.scrollTo({ top: targetTop, behavior: 'smooth' });
                }
            }
        }, 300);
    }

    function populateOrderDropdown(selectEl) {
        if (!selectEl) return;
        let html = '<option value="" disabled selected>Select an item...</option>';
        for (const cat in menuData) {
            if (cat === 'Add-ons') continue;
            html += `<optgroup label="${cat}">`;
            menuData[cat].forEach(item => {
                const catType = (cat.includes('Cake') || cat.includes('Signature')) ? 'cake' : 'other';
                html += `<option value="${item.name}" data-cat="${catType}">${item.name}</option>`;
            });
            html += `</optgroup>`;
        }
        selectEl.innerHTML = html;
    }

    function switchCategory(cat) {
        if (!cat) return;
        currentCategory = cat.trim();
        
        // Ensure menu content is visible
        if (menuContentWrapper) {
            menuContentWrapper.classList.remove('menu-content-hidden');
            menuContentWrapper.classList.add('menu-content-visible');
            menuContentWrapper.style.display = 'block'; // Force display override
        }

        filterBtns.forEach(btn => {
            const btnCat = btn.dataset.category ? btn.dataset.category.trim().toLowerCase() : '';
            const matchCat = currentCategory.toLowerCase();
            btn.classList.toggle('active', btnCat === matchCat);
        });
        
        renderMenu();
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => switchCategory(btn.dataset.category));
    });

    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.dataset.targetCategory;
            if (cat) {
                switchCategory(cat);
                
                // Scroll to filter bar smoothly
                const filterBar = document.getElementById('menuFilterBar');
                if (filterBar) {
                    const navOffset = nav ? nav.offsetHeight : 0;
                    const top = filterBar.getBoundingClientRect().top + window.scrollY - navOffset - 20;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (!currentCategory) return;
            currentSearch = e.target.value;
            renderMenu();
        });
    }



    // =============================================
    // REVIEWS — INFINITE MARQUEE
    // =============================================
    function initReviewMarquee(trackEl, normalSpeed) {
        if (!trackEl) return;
        let position = 0, currentSpeed = normalSpeed, targetSpeed = normalSpeed;
        function getHalfWidth() { return trackEl.scrollWidth / 2; }
        function step() {
            currentSpeed += (targetSpeed - currentSpeed) * 0.05;
            position -= currentSpeed;
            const half = getHalfWidth();
            if (Math.abs(position) >= half) position += half;
            trackEl.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(step);
        }
        const wrapper = trackEl.parentElement;
        wrapper.addEventListener('mouseenter', () => { targetSpeed = normalSpeed * 0.15; });
        wrapper.addEventListener('mouseleave', () => { targetSpeed = normalSpeed; });
        wrapper.addEventListener('touchstart', () => { targetSpeed = normalSpeed * 0.15; }, { passive: true });
        wrapper.addEventListener('touchend', () => { targetSpeed = normalSpeed; });
        requestAnimationFrame(step);
    }
    const reviewTrack = document.getElementById('reviewTrack');
    if (reviewTrack) initReviewMarquee(reviewTrack, 0.5);

    // =============================================
    // ORDER FORM — Dynamic size field
    // =============================================
    const addItemBtn = document.getElementById('addItemBtn');
    const orderItemsContainer = document.getElementById('orderItemsContainer');

    function handleItemChange(selectEl) {
        const row = selectEl.closest('.order-item-row');
        const sizeGroup = row.querySelector('.size-group');
        const selected = selectEl.options[selectEl.selectedIndex];
        const cat = selected ? selected.dataset.cat : '';
        if (cat === 'cake') {
            sizeGroup.classList.remove('hidden-size');
        } else {
            sizeGroup.classList.add('hidden-size');
        }
    }

    if (orderItemsContainer) {
        const firstItemSelect = orderItemsContainer.querySelector('.item-select');
        if (firstItemSelect) {
            populateOrderDropdown(firstItemSelect);
            firstItemSelect.addEventListener('change', function () { handleItemChange(this); });
        }
    }

    if (addItemBtn && orderItemsContainer) {
        addItemBtn.addEventListener('click', () => {
            const firstRow = orderItemsContainer.querySelector('.order-item-row');
            if (!firstRow) return;
            const newRow = firstRow.cloneNode(true);
            const newSelect = newRow.querySelector('.item-select');
            
            newSelect.value = '';
            newRow.querySelector('.size-select').value = '500g (Half kg)';
            newRow.querySelector('.qty-input').value = 1;
            newRow.querySelector('.size-group').classList.add('hidden-size');
            
            const removeBtn = newRow.querySelector('.btn-remove-item');
            removeBtn.style.visibility = 'visible';
            removeBtn.addEventListener('click', () => newRow.remove());
            
            newSelect.addEventListener('change', function () { handleItemChange(this); });
            orderItemsContainer.appendChild(newRow);
        });
    }

    // =============================================
    // CART & MODAL LOGIC
    // =============================================
    let cart = [];
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartBadge = document.getElementById('cartBadge');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartEmptyMsg = document.getElementById('cartEmptyMsg');
    const cartProceedBtn = document.getElementById('cartProceedBtn');
    
    // Toggle Cart
    function openCart() {
        cartOverlay.classList.add('active');
        cartSidebar.classList.add('active');
        renderCart();
    }
    
    function closeCart() {
        cartOverlay.classList.remove('active');
        cartSidebar.classList.remove('active');
    }
    
    if (floatingCartBtn) floatingCartBtn.addEventListener('click', openCart);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    
    // Render Cart
    function renderCart() {
        if (!cartItemsList) return;
        
        // Clear old items except empty msg
        const items = cartItemsList.querySelectorAll('.cart-item-row');
        items.forEach(i => i.remove());
        
        if (cart.length === 0) {
            cartEmptyMsg.style.display = 'flex';
            cartProceedBtn.disabled = true;
        } else {
            cartEmptyMsg.style.display = 'none';
            cartProceedBtn.disabled = false;
            
            cart.forEach((item, index) => {
                const sizeDropdown = item.isCake ? `
                    <select class="cart-size-select" onchange="updateCartSize(${index}, this.value)">
                        <option value="500g (Half kg)" ${item.size === '500g (Half kg)' ? 'selected' : ''}>½ KG</option>
                        <option value="1 kg" ${item.size === '1 kg' ? 'selected' : ''}>1 KG</option>
                    </select>
                ` : '';

                const row = document.createElement('div');
                row.className = 'cart-item-row';
                row.innerHTML = `
                    <div class="cart-item-header">
                        <div class="cart-item-info">
                            <strong>${item.name}</strong>
                            ${sizeDropdown}
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-qty-controls">
                            <button class="btn-qty" onclick="changeCartQty(${index}, -1)" title="Decrease">−</button>
                            <span>${item.qty}</span>
                            <button class="btn-qty" onclick="changeCartQty(${index}, 1)" title="Increase">+</button>
                        </div>
                        <button class="cart-item-delete" onclick="removeFromCart(${index})">
                            🗑️ Remove
                        </button>
                    </div>
                `;
                cartItemsList.appendChild(row);
            });
        }
        
        // Update badge
        if (cartBadge) {
            const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
            cartBadge.textContent = totalItems;
            // Pop animation
            floatingCartBtn.classList.remove('pop');
            void floatingCartBtn.offsetWidth; // trigger reflow
            floatingCartBtn.classList.add('pop');
        }
    }
    
    window.updateCartSize = function(index, size) {
        if (!cart[index]) return;
        cart[index].size = size;
    };

    window.changeCartQty = function(index, delta) {
        if (!cart[index]) return;
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            const removedName = cart[index].name;
            cart.splice(index, 1);
            syncCardState(removedName, false);
        } else {
            syncCardState(cart[index].name, true, cart[index].qty);
        }
        renderCart();
    };

    window.removeFromCart = function(index) {
        const removedName = cart[index].name;
        cart.splice(index, 1);
        syncCardState(removedName, false);
        renderCart();
    };

    function syncCardState(itemName, inCart, qty = 0) {
        document.querySelectorAll('.prod-card').forEach(card => {
            if (card.dataset.itemName === itemName) {
                if (inCart) {
                    card.classList.add('in-cart');
                    // If the quantity selector isn't there, we need to inject it
                    let selector = card.querySelector('.card-qty-selector');
                    if (!selector) {
                        const imgWrap = card.querySelector('.prod-img-wrap');
                        const selectorHtml = `
                            <div class="card-qty-selector">
                                <button class="btn-card-qty" onclick="changeMenuQty('${itemName.replace(/'/g, "\\'")}', -1, event)">−</button>
                                <span class="card-qty-val">${qty}</span>
                                <button class="btn-card-qty" onclick="changeMenuQty('${itemName.replace(/'/g, "\\'")}', 1, event)">+</button>
                            </div>
                        `;
                        imgWrap.insertAdjacentHTML('beforeend', selectorHtml);
                    } else {
                        selector.querySelector('.card-qty-val').textContent = qty;
                    }
                } else {
                    card.classList.remove('in-cart');
                    const selector = card.querySelector('.card-qty-selector');
                    if (selector) selector.remove();
                }
            }
        });
    }

    // New helper for menu card quantity
    window.changeMenuQty = function(itemName, delta, event) {
        if (event) event.stopPropagation();
        const index = cart.findIndex(c => c.name === itemName);
        if (index !== -1) {
            cart[index].qty += delta;
            if (cart[index].qty <= 0) {
                cart.splice(index, 1);
                syncCardState(itemName, false);
            } else {
                syncCardState(itemName, true, cart[index].qty);
            }
            renderCart();
        }
    };

    // Global function to add item from menu
    window.addItemToOrder = function(itemName, event) {
        if (event) event.stopPropagation();
        
        let isCake = false;
        for (const cat in menuData) {
            if (menuData[cat].some(i => i.name === itemName)) {
                isCake = (cat.includes('Cake') || cat.includes('Signature'));
                break;
            }
        }
        
        // Add to cart state immediately
        let existing = cart.find(c => c.name === itemName);
        if (!existing) {
            existing = { name: itemName, qty: 1, isCake: isCake, size: '500g (Half kg)' };
            cart.push(existing);
        } else {
            existing.qty += 1;
        }
        
        syncCardState(itemName, true, existing.qty);
        renderCart();
    };

    // Proceed to details
    if (cartProceedBtn) {
        cartProceedBtn.addEventListener('click', () => {
            closeCart();
            
            // Clear existing form rows (except the first one)
            const allRows = orderItemsContainer.querySelectorAll('.order-item-row');
            allRows.forEach((row, idx) => {
                if (idx > 0) row.remove();
            });
            
            // Reset first row
            const firstRow = orderItemsContainer.querySelector('.order-item-row');
            if (firstRow) {
                const firstSelect = firstRow.querySelector('.item-select');
                firstSelect.value = '';
                handleItemChange(firstSelect);
                
                const removeBtn = firstRow.querySelector('.btn-remove-item');
                if(removeBtn) removeBtn.style.visibility = 'hidden';
            }
            
            // Add cart items to form
            cart.forEach((item, index) => {
                let targetRow;
                if (index === 0) {
                    targetRow = orderItemsContainer.querySelector('.order-item-row');
                } else {
                    addItemBtn.click();
                    const currentRows = orderItemsContainer.querySelectorAll('.order-item-row');
                    targetRow = currentRows[currentRows.length - 1];
                }
                
                if (targetRow) {
                    const select = targetRow.querySelector('.item-select');
                    select.value = item.name;
                    handleItemChange(select);
                    
                    const qtyInput = targetRow.querySelector('.qty-input');
                    if (qtyInput) qtyInput.value = item.qty;
                    
                    if (item.isCake) {
                        const sizeSelect = targetRow.querySelector('.size-select');
                        if (sizeSelect) sizeSelect.value = item.size;
                    }
                }
            });
            
            // Scroll to order section
            const orderSection = document.getElementById('order');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Custom Cake Toggle Cake Toggle
    const customCakeToggle = document.getElementById('customCakeToggle');
    const customCakeFields = document.getElementById('customCakeFields');
    if (customCakeToggle) {
        customCakeToggle.addEventListener('change', () => {
            customCakeFields.style.display = customCakeToggle.checked ? 'block' : 'none';
        });
    }

    // Delivery defaults
    const deliveryDateInput = document.getElementById('deliveryDate');
    const deliveryTimeInput = document.getElementById('deliveryTime');
    if (deliveryDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        deliveryDateInput.min = `${yyyy}-${mm}-${dd}`;
        deliveryDateInput.value = `${yyyy}-${mm}-${dd}`;
        deliveryTimeInput.value = '12:00';
    }

    // Place Order → WhatsApp
    const orderForm = document.getElementById('orderForm');
    const WHATSAPP_NUMBER = '919962202704';

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();
            const address = document.getElementById('deliveryAddress').value.trim();

            const itemRows = orderItemsContainer.querySelectorAll('.order-item-row');
            let orderItems = [];
            itemRows.forEach(row => {
                const itemSelect = row.querySelector('.item-select');
                const item = itemSelect.value;
                const cat = itemSelect.options[itemSelect.selectedIndex]?.dataset.cat || '';
                const qty = row.querySelector('.qty-input').value;
                if (item) {
                    if (cat === 'cake') {
                        const size = row.querySelector('.size-select').value;
                        orderItems.push(`${item} – ${size} – Qty: ${qty}`);
                    } else {
                        orderItems.push(`${item} – Qty: ${qty}`);
                    }
                }
            });

            const hasCustomCake = customCakeToggle && customCakeToggle.checked;
            if (orderItems.length === 0 && !hasCustomCake) {
                alert('Please select at least one item or fill out the Custom Cake details.');
                return;
            }

            const deliveryDate = deliveryDateInput.value;
            const deliveryTime = deliveryTimeInput.value;
            const dateObj = new Date(deliveryDate + 'T' + deliveryTime);
            const formattedDate = dateObj.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            const formattedTime = dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

            let message = `🎂 *New Order — Fluffy Frosting*\n\n`;
            message += `*Name:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}\n\n`;

            if (orderItems.length > 0) {
                message += `*Order Items:*\n`;
                orderItems.forEach((item, i) => { message += `  ${i + 1}. ${item}\n`; });
            }

            if (customCakeToggle && customCakeToggle.checked) {
                const flavor = document.getElementById('cakeFlavor').value.trim();
                const weight = document.getElementById('cakeWeight').value.trim();
                const theme = document.getElementById('cakeTheme').value.trim();
                const cakeMsg = document.getElementById('cakeMessage').value.trim();
                const notes = document.getElementById('cakeNotes').value.trim();
                message += `\n*Custom Cake Details:*\n`;
                if (flavor) message += `  Flavor: ${flavor}\n`;
                if (weight) message += `  Weight: ${weight}\n`;
                if (theme) message += `  Theme/Design: ${theme}\n`;
                if (cakeMsg) message += `  Message on Cake: ${cakeMsg}\n`;
                if (notes) message += `  Notes: ${notes}\n`;
            }

            message += `\n*Delivery Date:* ${formattedDate}\n*Delivery Time:* ${formattedTime}`;
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
            
            // Show Success Modal
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.classList.add('active');
            }
            
            // Clear form and cart
            orderForm.reset();
            
            // Clear existing form rows back to 1
            const allFormRows = orderItemsContainer.querySelectorAll('.order-item-row');
            allFormRows.forEach((row, idx) => {
                if (idx > 0) row.remove();
            });
            const firstSelect = orderItemsContainer.querySelector('.item-select');
            if(firstSelect) handleItemChange(firstSelect);
            const firstRemoveBtn = orderItemsContainer.querySelector('.btn-remove-item');
            if(firstRemoveBtn) firstRemoveBtn.style.visibility = 'hidden';

            document.querySelectorAll('.prod-card.in-cart').forEach(card => card.classList.remove('in-cart'));

            cart = [];
            renderCart();
        });
        
        // Close Success Modal
        const successCloseBtn = document.getElementById('successCloseBtn');
        if (successCloseBtn) {
            successCloseBtn.addEventListener('click', () => {
                const successModal = document.getElementById('successModal');
                if (successModal) successModal.classList.remove('active');
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // =============================================
        // THEME CAKE DYNAMIC GALLERY
        // =============================================
        const themeData = {
            'Single Layer Theme': [
                { name: 'Minions Fantasy', image: 'images/theme-single-minions.jpg' },
                { name: 'Traditional Biryani Pot', image: 'images/theme-single-biryani.jpg' },
                { name: 'The Good Dinosaur', image: 'images/theme-single-dinosaur.jpg' },
                { name: 'BLACKPINK Theme', image: 'images/theme-single-blackpink.jpg' },
                { name: 'Chocolate Microphone', image: 'images/theme-single-microphone.jpg' },
                { name: 'Pink Glaze Delight', image: 'images/theme-single-pink-glaze.jpg' },
                { name: 'Lord Krishna Theme (Rani)', image: 'images/theme-single-krishna-rani.jpg' },
                { name: 'Merceline Mirza Bear', image: 'images/theme-single-merceline.jpg' },
                { name: 'Hot Wheels Racing', image: 'images/theme-single-hotwheels.jpg' },
                { name: 'TIA Red Dress', image: 'images/theme-single-tia.jpg' },
                { name: 'Rapunzel Butterflies', image: 'images/theme-single-rapunzel.jpg' },
                { name: 'Aishu Purple Drip', image: 'images/theme-single-aishu.jpg' }
            ],
            'Double Layer Theme': [
                { name: 'Barbie Doll Princess', image: 'images/theme-double-barbie.jpg' },
                { name: 'Retirement Bus Theme', image: 'images/theme-double-retirement.jpg' },
                { name: 'Vamshika Butterfly Theme', image: 'images/theme-double-butterfly.jpg' },
                { name: 'Wedding Anniversary Theme', image: 'images/theme-double-anniversary.jpg' },
                { name: 'Adhav Krishna Milestone', image: 'images/theme-double-black-gold.jpg' },
                { name: 'Teddy Bear Stars', image: 'images/theme-double-teddy.jpg' },
                { name: 'Majestic Peacock', image: 'images/theme-double-peacock.jpg' },
                { name: 'Farewell Gold Drip', image: 'images/theme-double-saravanan.jpg' },
                { name: 'Lord Krishna Theme', image: 'images/theme-double-krishna.jpg' },
                { name: 'Paris Eiffel Tower', image: 'images/theme-double-paris.jpg' },
                { name: 'Boss Baby Kiara', image: 'images/theme-double-bossbaby.jpg' },
                { name: 'Cartoon Girl Varshika', image: 'images/theme-double-varshika.jpg' },
                { name: 'Safari Animal Kingdom', image: 'images/theme-double-safari.jpg' },
                { name: 'Little Mermaid Samyutha', image: 'images/theme-double-mermaid.jpg' },
                { name: 'Finding Nemo Adventure', image: 'images/theme-double-nemo.jpg' },
                { name: 'Chocolate Berry Drip', image: 'images/theme-double-chocolate.jpg' }
            ],
            'Triple Layer Theme': [
                { name: 'Yellow Floral Wedding', image: 'images/theme-triple-yellow.jpg' },
                { name: 'VIVIN IS ONE', image: 'images/theme-triple-vivin.jpg' },
                { name: 'Rohan & Niyu Floral', image: 'images/theme-triple-rohan.jpg' }
            ]
        };

        function initThemeGallery() {
            const themeCards = document.querySelectorAll('.theme-card');
            const container = document.getElementById('themeGalleryContainer');
            const grid = document.getElementById('themeGalleryGrid');
            const title = document.getElementById('themeGalleryTitle');

            if (!themeCards.length || !container || !grid || !title) return;

            themeCards.forEach(card => {
                card.addEventListener('click', () => {
                    const tier = card.querySelector('h3').textContent;
                    
                    // Remove active from others
                    themeCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');

                    // Set Title
                    title.textContent = `Trending ${tier}s`;

                    // Prepare Grid (Image + Name)
                    grid.innerHTML = themeData[tier].map(item => `
                        <div class="theme-prod-card reveal">
                            <div class="theme-prod-img-wrap">
                                ${item.image ? 
                                    `<img src="${item.image}" alt="${item.name}" class="theme-prod-img" loading="lazy">` : 
                                    `<div class="theme-prod-img-placeholder">
                                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                    </div>`
                                }
                            </div>
                            <div class="theme-prod-info">
                                <h4 class="theme-prod-name">${item.name}</h4>
                            </div>
                        </div>
                    `).join('');

                    // Show Container
                    container.classList.remove('menu-content-hidden');
                    container.classList.add('menu-content-visible');

                    // Scroll to it slightly
                    setTimeout(() => {
                        const navHeight = document.getElementById('mainNav') ? document.getElementById('mainNav').offsetHeight : 72;
                        const targetTop = container.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                        window.scrollTo({ top: targetTop, behavior: 'smooth' });
                        
                        // Reveal items
                        grid.querySelectorAll('.reveal').forEach(el => {
                            const itemObs = new IntersectionObserver((entries) => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) {
                                        entry.target.classList.add('revealed');
                                        itemObs.unobserve(entry.target);
                                    }
                                });
                            }, { threshold: 0.1 });
                            itemObs.observe(el);
                        });
                    }, 100);
                });
            });
        }

        initThemeGallery();
    }
});

// =============================================
// PRELOADER
// =============================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('splash-active');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 2500); 
        }, 800);
    }
});

// =============================================
// ELITE ANIMATIONS
// =============================================

// --- Hero Parallax on Scroll ---
(function() {
    const hero = document.querySelector('.hero');
    const heroGlass = document.querySelector('.hero-glass-card');
    if (!hero || !heroGlass) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroH = hero.offsetHeight;
        if (scrollY < heroH) {
            const ratio = scrollY / heroH;
            hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
            heroGlass.style.transform = `translateY(${scrollY * 0.08}px)`;
            heroGlass.style.opacity = 1 - ratio * 0.3;
        }
    }, { passive: true });
})();

// --- Card 3D Tilt Effect ---
(function() {
    function initTilt(card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s ease';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });
    }
    document.querySelectorAll('.gallery-card, .theme-card').forEach(initTilt);
})();

// --- Active Nav Link Highlight on Scroll ---
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navLinksAll.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksAll.forEach(link => {
                    link.style.color = '';
                    link.style.fontWeight = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = '#3D1152';
                        link.style.fontWeight = '700';
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-72px 0px -40% 0px' });

    sections.forEach(sec => observer.observe(sec));
})();

// --- Smooth Reveal Counter on Scroll for Prices ---
(function() {
    const priceVals = document.querySelectorAll('.price-val');
    if (!priceVals.length) return;

    const observed = new Set();
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !observed.has(entry.target)) {
                observed.add(entry.target);
                const el = entry.target;
                const text = el.textContent;
                const match = text.match(/₹(\d+)/);
                if (match) {
                    const target = parseInt(match[1]);
                    let current = 0;
                    const step = Math.ceil(target / 25);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = `₹${current}`;
                    }, 20);
                }
            }
        });
    }, { threshold: 0.5 });

    priceVals.forEach(el => obs.observe(el));
})();
