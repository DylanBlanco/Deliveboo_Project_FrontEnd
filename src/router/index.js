import { createRouter, createWebHistory } from "vue-router";
import AppMain from "../components/AppMain.vue";
import RestaurantDetails from "../components/RestaurantDetails.vue";
import PaymentPage from "../components/PaymentPage.vue";
import OrderConfirmation from "../components/OrderConfirmation.vue";
import RestaurantList from "../components/RestaurantList.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: AppMain,
  },
  {
    path: "/restaurants",
    name: "restaurants",
    component: RestaurantList,
  },
  {
    path: "/restaurants/:id",
    name: "restaurantDetails",
    component: RestaurantDetails,
    props: true,
  },
  {
    path: "/payment",
    name: "paymentPage", // Assicurati che questo sia "paymentPage"
    component: PaymentPage,
    props: (route) => ({ total: route.query.total }), // Passa "total" come prop
  },
  {
    path: "/order-confirmation",
    name: "orderConfirmation",
    component: OrderConfirmation,
    props: (route) => ({ transactionId: route.query.transactionId }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
