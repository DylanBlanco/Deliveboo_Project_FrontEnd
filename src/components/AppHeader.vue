<script>
import Cart from "./Cart.vue";

export default {
    props: ["cart", "total", "cartVisible"],
    components: {
        Cart,
    },
    data() {
        return {};
    },
    computed: {
        // total() {
        //   return this.cart.reduce(
        //     (acc, item) => acc + item.price * item.quantity,
        //     0
        //   );
        // },

        cartCount() {
            return this.cart.reduce((acc, item) => acc + item.quantity, 0);
        }
    },
    methods: {
        toggleCart() {
        this.$emit("toggleCart");
        },
        // updateCart(newCart) {
        //   this.cart = newCart;
        //   localStorage.setItem("cart", JSON.stringify(this.cart)); // Persisti il carrello
        // },
        // addToCart(dish) {
        //   const existingItem = this.cart.find((item) => item.id === dish.id);
        //   if (existingItem) {
        //     existingItem.quantity++; // Incrementa il contatore se il piatto è già nel carrello
        //   } else {
        //     this.cart.push({ ...dish, quantity: 1 }); // Aggiungi il piatto al carrello
        //   }
        //   this.updateCart([...this.cart]); // Sincronizza il carrello
        // },
    },
};
</script>

<template>
    <nav class="navbar navbar-expand-lg shadow sticky-top ">
          <div class="container d-md-flex justify-content-between">
            <a href="/" class="col-6">
                <img
                class="logo-deliveboo"
                src="/images/Logo-deliveBoo.svg"
                alt="deliveBoo-logo"
                />
            </a>
            
            <div class="d-flex d-sm-flex justify-content-end">
              <a href="http://127.0.0.1:8000/" class="d-none d-lg-block d-md-none d-sm-none ibm-plex-mono-regular button-menu text-white">
                  Accedi/Registrati
              </a>
              <a href="http://127.0.0.1:8000/" class="d-lg-none d-md-block ibm-plex-mono-regular button-menu text-white px-3">
                  <i class="fa-solid fa-user"></i>
              </a>

              <button @click="toggleCart" class="button-menu text-dark ml-3 ms-3 position-relative">
                <i class="p-1 fa-solid fa-cart-shopping text-white"></i>
                <span
                v-if="cartCount > 0"
                class="badge badge-danger position-absolute top-0 start-100 translate-middle border border-light rounded-circle"
                >
                    {{ cartCount }}
                </span>
              </button>
            </div>
          </div>
        <Cart
        :cart="cart"
        :cartVisible="cartVisible"
        :total="total"
        @toggleCart="$emit('toggleCart')"
        />
    </nav>
</template>

<style>
.badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 0.8rem;
}

.button-menu {
  background-color: #2f2f2f;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;
  text-decoration: none;
}
.button-menu:hover {
  background-color: #fac200;
  border: #2f2f2f solid 1px;
}
/* Logo */
.logo-deliveboo {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

.navbar {
  background-color: white;
}

/* Overlay del carrello */
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.cart-content {
  background-color: white;
  width: 80%;
  padding: 20px;
  overflow-y: auto;
}

.cart-content h3 {
  margin-top: 0;
}

.cart-content ul {
  list-style: none;
  padding: 0;
}

.cart-content button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}

/* Flexbox per l'header */
.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar .d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar .d-flex .col-6 {
  flex: 1;
}

.navbar .btn {
  margin-left: 15px;
}

</style>
