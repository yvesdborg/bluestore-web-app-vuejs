import Store from './Store.vue';
import ShoppingCart from './ShoppingCart.vue';
//import ProductDetails from './components/ProductDetails.vue';
import Login from './Login.vue';
//import Register from './components/auth/Register.vue';

export const routes = [
	{path: '/', component: Store, name: 'mainpage'},
//	{path: '/product/:id', component: ProductDetails, name: 'product'},
	{path: '/cart', component: ShoppingCart, name: 'shoppingcart'},
	{path: '/loginwithtoken', component: Login, name: 'loginwithtoken'},
//	{path: '/register', component: Register, name: 'register', onlyGuest: true},
	{path: '*', redirect: '/' }
];