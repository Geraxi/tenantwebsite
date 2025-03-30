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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Categorie</h1>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Example categories -->
            <div class="card-elegant rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
                <a href="#" class="block relative">
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="https://via.placeholder.com/800x450" alt="Elettronica" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6">
                        <h3 class="text-2xl font-bold text-white">Elettronica</h3>
                        <p class="text-gray-200 mt-2">Scopri i nostri prodotti elettronici</p>
                    </div>
                </a>
            </div>

            <div class="card-elegant rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
                <a href="#" class="block relative">
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="https://via.placeholder.com/800x450" alt="Abbigliamento" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6">
                        <h3 class="text-2xl font-bold text-white">Abbigliamento</h3>
                        <p class="text-gray-200 mt-2">Esplora le ultime tendenze</p>
                    </div>
                </a>
            </div>

            <div class="card-elegant rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
                <a href="#" class="block relative">
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="https://via.placeholder.com/800x450" alt="Casa" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6">
                        <h3 class="text-2xl font-bold text-white">Casa</h3>
                        <p class="text-gray-200 mt-2">Arreda la tua casa con stile</p>
                    </div>
                </a>
            </div>

            <div class="card-elegant rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
                <a href="#" class="block relative">
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="https://via.placeholder.com/800x450" alt="Sport" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6">
                        <h3 class="text-2xl font-bold text-white">Sport</h3>
                        <p class="text-gray-200 mt-2">Attrezzatura e abbigliamento sportivo</p>
                    </div>
                </a>
            </div>

            <div class="card-elegant rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
                <a href="#" class="block relative">
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="https://via.placeholder.com/800x450" alt="Libri" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6">
                        <h3 class="text-2xl font-bold text-white">Libri</h3>
                        <p class="text-gray-200 mt-2">Esplora il nostro catalogo di libri</p>
                    </div>
                </a>
            </div>

            <div class="card-elegant rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow">
                <a href="#" class="block relative">
                    <div class="aspect-w-16 aspect-h-9">
                        <img src="https://via.placeholder.com/800x450" alt="Giardino" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-6">
                        <h3 class="text-2xl font-bold text-white">Giardino</h3>
                        <p class="text-gray-200 mt-2">Tutto per il tuo spazio verde</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal23a33f287873b564aaf305a1526eada4)): ?>
<?php $attributes = $__attributesOriginal23a33f287873b564aaf305a1526eada4; ?>
<?php unset($__attributesOriginal23a33f287873b564aaf305a1526eada4); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal23a33f287873b564aaf305a1526eada4)): ?>
<?php $component = $__componentOriginal23a33f287873b564aaf305a1526eada4; ?>
<?php unset($__componentOriginal23a33f287873b564aaf305a1526eada4); ?>
<?php endif; ?> <?php /**PATH /Users/umbertogeraci/Desktop/umberto_ecom_progetto/resources/views/shop/categories.blade.php ENDPATH**/ ?>