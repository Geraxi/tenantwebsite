<?php if (isset($component)) { $__componentOriginal23a33f287873b564aaf305a1526eada4 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal23a33f287873b564aaf305a1526eada4 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.layout','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
     <?php $__env->slot('title', null, []); ?> Il Tuo Carrello <?php $__env->endSlot(); ?>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-900 to-blue-800 px-6 py-4">
                <h1 class="text-2xl font-bold text-white flex items-center">
                    <i class="fas fa-shopping-cart mr-3"></i>
                    Il Tuo Carrello
                </h1>
            </div>

            <div class="p-6">
                <div id="cart-items" class="divide-y divide-gray-200">
                    <!-- Cart items will be dynamically inserted here -->
                </div>

                <div class="mt-8 border-t border-gray-200 pt-6">
                    <div class="flex justify-between items-center text-xl font-semibold text-indigo-900">
                        <span>Totale:</span>
                        <span id="cart-total">€0.00</span>
                    </div>

                    <div class="mt-6 space-y-4">
                        <button onclick="clearCart()" 
                                class="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
                            <i class="fas fa-trash-alt mr-2"></i>
                            Svuota Carrello
                        </button>
                        <a href="/" 
                           class="block w-full bg-indigo-900 text-white px-6 py-3 rounded-lg hover:bg-indigo-800 transition-colors text-center">
                            <i class="fas fa-shopping-bag mr-2"></i>
                            Continua lo Shopping
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

     <?php $__env->slot('scripts', null, []); ?> 
    <script>
    // Template for cart items
    function getCartItemTemplate(item) {
        return `
            <div class="py-6 flex items-center justify-between">
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-indigo-900">${item.name}</h3>
                    <p class="text-gray-600 text-lg">€${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" 
                                class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                            <i class="fas fa-minus text-gray-600"></i>
                        </button>
                        <span class="text-lg font-medium w-8 text-center">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})"
                                class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                            <i class="fas fa-plus text-gray-600"></i>
                        </button>
                    </div>
                    <button onclick="removeFromCart(${item.id})"
                            class="text-red-600 hover:text-red-700 transition-colors">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }

    async function loadCart() {
        try {
            const data = await fetchWithCsrf('/cart');
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';
            
            if (data.items.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="py-12 text-center">
                        <i class="fas fa-shopping-cart text-gray-400 text-5xl mb-4"></i>
                        <p class="text-gray-600 text-xl">Il tuo carrello è vuoto</p>
                    </div>
                `;
                document.getElementById('cart-total').textContent = '€0.00';
                return;
            }

            let total = 0;
            data.items.forEach(item => {
                cartItemsContainer.innerHTML += getCartItemTemplate(item);
                total += item.price * item.quantity;
            });

            document.getElementById('cart-total').textContent = `€${total.toFixed(2)}`;
        } catch (error) {
            showAlert('Errore durante il caricamento del carrello', 'error');
        }
    }

    async function updateQuantity(id, newQuantity) {
        if (newQuantity < 1) return;
        try {
            await fetchWithCsrf('/cart/update', {
                method: 'POST',
                body: JSON.stringify({ id, quantity: newQuantity })
            });
            await loadCart();
            updateCartCount();
        } catch (error) {
            showAlert('Errore durante l\'aggiornamento della quantità', 'error');
        }
    }

    async function removeFromCart(id) {
        try {
            await fetchWithCsrf('/cart/remove', {
                method: 'POST',
                body: JSON.stringify({ id })
            });
            await loadCart();
            updateCartCount();
            showAlert('Prodotto rimosso dal carrello');
        } catch (error) {
            showAlert('Errore durante la rimozione dal carrello', 'error');
        }
    }

    async function clearCart() {
        if (!confirm('Sei sicuro di voler svuotare il carrello?')) return;
        try {
            await fetchWithCsrf('/cart/clear', { method: 'POST' });
            await loadCart();
            updateCartCount();
            showAlert('Carrello svuotato con successo');
        } catch (error) {
            showAlert('Errore durante lo svuotamento del carrello', 'error');
        }
    }

    // Load cart on page load
    document.addEventListener('DOMContentLoaded', loadCart);
    </script>
     <?php $__env->endSlot(); ?>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal23a33f287873b564aaf305a1526eada4)): ?>
<?php $attributes = $__attributesOriginal23a33f287873b564aaf305a1526eada4; ?>
<?php unset($__attributesOriginal23a33f287873b564aaf305a1526eada4); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal23a33f287873b564aaf305a1526eada4)): ?>
<?php $component = $__componentOriginal23a33f287873b564aaf305a1526eada4; ?>
<?php unset($__componentOriginal23a33f287873b564aaf305a1526eada4); ?>
<?php endif; ?> <?php /**PATH /Users/umbertogeraci/Desktop/umberto_ecom_progetto/resources/views/cart.blade.php ENDPATH**/ ?>