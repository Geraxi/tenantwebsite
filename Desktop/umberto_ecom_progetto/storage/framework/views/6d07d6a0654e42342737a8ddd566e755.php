<!-- Navigazione -->
<nav class="bg-gradient-to-r from-indigo-900 to-blue-800 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">
                <div class="flex-shrink-0 flex items-center">
                    <a href="/" class="text-2xl text-white hover:text-gray-200 transition-colors">
                        <i class="fas fa-home"></i>
                    </a>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <a href="<?php echo e(route('shop.index')); ?>" class="text-gray-200 hover:text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-all">Negozio</a>
                <a href="<?php echo e(route('shop.categories')); ?>" class="text-gray-200 hover:text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-all">Categorie</a>
                <a href="<?php echo e(route('cart.view')); ?>" class="text-gray-200 hover:text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-all cart-count">
                    <span class="flex items-center">
                        <i class="fas fa-shopping-cart mr-2"></i>
                        Carrello (<?php echo e(count(session()->get('cart', []))); ?>)
                    </span>
                </a>
                
                <!-- Pannello Utente -->
                <div class="relative" x-data="{ open: false }" @click.away="open = false">
                    <button @click="open = !open" 
                            class="text-gray-200 hover:text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-all flex items-center">
                        <i class="fas fa-user-circle text-xl mr-2"></i>
                        <span><?php echo e(Auth::check() ? Auth::user()->name : 'Account'); ?></span>
                        <i class="fas fa-chevron-down ml-2 text-sm"></i>
                    </button>
                    
                    <!-- Menu a tendina -->
                    <div x-show="open" 
                         x-transition:enter="transition ease-out duration-200"
                         x-transition:enter-start="opacity-0 transform scale-95"
                         x-transition:enter-end="opacity-100 transform scale-100"
                         x-transition:leave="transition ease-in duration-75"
                         x-transition:leave-start="opacity-100 transform scale-100"
                         x-transition:leave-end="opacity-0 transform scale-95"
                         class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50">
                        <div class="py-2">
                            <?php if(auth()->guard()->guest()): ?>
                                <a href="<?php echo e(route('login')); ?>" class="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-900 transition-colors">
                                    <i class="fas fa-sign-in-alt mr-2"></i> Accedi
                                </a>
                                <a href="<?php echo e(route('register')); ?>" class="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-900 transition-colors">
                                    <i class="fas fa-user-plus mr-2"></i> Registrati
                                </a>
                            <?php else: ?>
                                <a href="<?php echo e(route('admin.dashboard')); ?>" class="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-900 transition-colors">
                                    <i class="fas fa-cog mr-2"></i> Pannello Admin
                                </a>
                                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-900 transition-colors">
                                    <i class="fas fa-user-cog mr-2"></i> Il Mio Profilo
                                </a>
                                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-900 transition-colors">
                                    <i class="fas fa-box mr-2"></i> I Miei Ordini
                                </a>
                                <div class="border-t border-gray-200 my-2"></div>
                                <form method="POST" action="<?php echo e(route('logout')); ?>">
                                    <?php echo csrf_field(); ?>
                                    <button type="submit" class="w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-900 transition-colors">
                                        <i class="fas fa-sign-out-alt mr-2"></i> Esci
                                    </button>
                                </form>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav> <?php /**PATH /Users/umbertogeraci/Desktop/umberto_ecom_progetto/resources/views/components/navbar.blade.php ENDPATH**/ ?>