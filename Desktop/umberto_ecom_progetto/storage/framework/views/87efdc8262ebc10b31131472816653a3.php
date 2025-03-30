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
     <?php $__env->slot('title', null, []); ?> Benvenuti nel Nostro Negozio <?php $__env->endSlot(); ?>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Sezione Hero -->
        <div class="text-center py-16 bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 rounded-2xl shadow-xl mb-12">
            <h1 class="text-4xl font-bold text-white mb-4">Benvenuti nel Nostro Negozio Online</h1>
            <p class="text-xl text-gray-200 mb-8">Scopri i nostri fantastici prodotti a prezzi incredibili</p>
            <a href="#" class="bg-white text-indigo-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors text-lg font-semibold shadow-md">
                Inizia lo Shopping
            </a>
        </div>

        <!-- Prodotti in Evidenza -->
        <div class="py-12">
            <h2 class="text-3xl font-bold text-indigo-900 mb-8">Prodotti in Evidenza</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Prodotto 1 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div class="h-48 bg-gray-200"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-indigo-900">Prodotto 1</h3>
                        <p class="text-gray-600 mt-2 text-lg">€99.99</p>
                        <button onclick="addToCart(1, 'Prodotto 1', 99.99)" 
                                class="mt-4 w-full bg-indigo-900 text-white px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors flex items-center justify-center">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Aggiungi al Carrello
                        </button>
                    </div>
                </div>

                <!-- Prodotto 2 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div class="h-48 bg-gray-200"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-indigo-900">Prodotto 2</h3>
                        <p class="text-gray-600 mt-2 text-lg">€149.99</p>
                        <button onclick="addToCart(2, 'Prodotto 2', 149.99)"
                                class="mt-4 w-full bg-indigo-900 text-white px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors flex items-center justify-center">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Aggiungi al Carrello
                        </button>
                    </div>
                </div>

                <!-- Prodotto 3 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div class="h-48 bg-gray-200"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-indigo-900">Prodotto 3</h3>
                        <p class="text-gray-600 mt-2 text-lg">€199.99</p>
                        <button onclick="addToCart(3, 'Prodotto 3', 199.99)"
                                class="mt-4 w-full bg-indigo-900 text-white px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors flex items-center justify-center">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Aggiungi al Carrello
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sezione Categorie -->
        <div class="py-12">
            <h2 class="text-3xl font-bold text-indigo-900 mb-8">Categorie</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <a href="#" class="bg-gradient-to-br from-blue-800 to-indigo-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow group">
                    <div class="text-xl font-semibold text-white group-hover:transform group-hover:scale-105 transition-transform">
                        <i class="fas fa-laptop mb-2 block text-3xl"></i>
                        Elettronica
                    </div>
                </a>
                <a href="#" class="bg-gradient-to-br from-blue-800 to-indigo-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow group">
                    <div class="text-xl font-semibold text-white group-hover:transform group-hover:scale-105 transition-transform">
                        <i class="fas fa-tshirt mb-2 block text-3xl"></i>
                        Abbigliamento
                    </div>
                </a>
                <a href="#" class="bg-gradient-to-br from-blue-800 to-indigo-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow group">
                    <div class="text-xl font-semibold text-white group-hover:transform group-hover:scale-105 transition-transform">
                        <i class="fas fa-gem mb-2 block text-3xl"></i>
                        Accessori
                    </div>
                </a>
                <a href="#" class="bg-gradient-to-br from-blue-800 to-indigo-900 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow group">
                    <div class="text-xl font-semibold text-white group-hover:transform group-hover:scale-105 transition-transform">
                        <i class="fas fa-home mb-2 block text-3xl"></i>
                        Casa e Living
                    </div>
                </a>
            </div>
        </div>
    </div>

     <?php $__env->slot('scripts', null, []); ?> 
    <script>
    async function addToCart(id, name, price) {
        try {
            const data = await fetchWithCsrf('/cart/add', {
                method: 'POST',
                body: JSON.stringify({ id, name, price })
            });
            showAlert(data.message);
            updateCartCount();
        } catch (error) {
            showAlert('Errore durante l\'aggiunta al carrello. Riprova.', 'error');
        }
    }

    async function updateCartCount() {
        try {
            const data = await fetchWithCsrf('/cart/count');
            document.querySelector('.cart-count').textContent = `Carrello (${data.count})`;
        } catch (error) {
            console.error('Errore aggiornamento carrello:', error);
        }
    }
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
<?php endif; ?><?php /**PATH /Users/umbertogeraci/Desktop/umberto_ecom_progetto/resources/views/welcome.blade.php ENDPATH**/ ?>