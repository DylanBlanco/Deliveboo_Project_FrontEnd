<script>
import axios from "axios";

export default {
  props: ["cart"],
  data() {
    return {
      restaurant: null,
      addError: false, // Variabile per gestire l'errore
    };
  },
  methods: {
    async fetchRestaurantDetails() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/restaurants/${this.$route.params.id}`
        );
        this.restaurant = response.data;
      } catch (error) {
        console.error("Errore:", error);
      }
    },
    addToCart(dish) {
      // Controlla se il piatto appartiene allo stesso ristorante
      const existingRestaurantId = this.cart.length
        ? this.cart[0].restaurant_id
        : null;
      if (existingRestaurantId && existingRestaurantId !== dish.restaurant_id) {
        this.addError = true; // Imposta l'errore
        return;
      }

      const existingItem = this.cart.find((item) => item.id === dish.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({
          ...dish,
          quantity: 1,
          restaurant_id: dish.restaurant_id,
        });
      }
      this.addError = false; // Pulisce l'errore se il piatto è aggiunto correttamente
      this.$emit("updateCart", [...this.cart]); // Sincronizza con il genitore
    },
  },
  mounted() {
    this.fetchRestaurantDetails();
  },
};
</script>

<template>
  <div class="container my-5 text-center">
    <div v-if="restaurant">
      <div class="card mb-3 d-flex justify-content-center">
        <div class="row g-0">
          <div class="col-md-4 me-3">
            <img
              :src="restaurant.image"
              class="img-fluid"
              :alt="restaurant.name"
              @error="restaurant.image = '/images/default-restaurant.png'"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body text-start">
              <h5 class="my-title-card">{{ restaurant.name }}</h5>
              <p class="ibm-plex-mono-regular">{{ restaurant.address }}</p>
              <p class="ibm-plex-mono-regular">
                Fame? Ordina i piatti che ti ispirano di più!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="background-pattern container my-5 shadow p-5 mb-5 bg-body-tertiary text-center"
      >
        <div class="row">
          <div
            class="col-12 col-sm-6 col-md-4"
            v-for="dish in restaurant.dishes"
            :key="dish.id"
          >
            <div class="card shadow mb-4">
              <img
                class="card-img-top"
                :src="dish.image"
                :alt="dish.name"
                @error="dish.image = '/images/default-dish.png'"
              />
              <div class="card-body d-flex flex-column">
                <h3 class="ibm-plex-mono-bold mb-2">{{ dish.name }}</h3>
                <p class="ibm-plex-mono-regular">{{ dish.description }}</p>
                <p class="ibm-plex-mono-semibold">Prezzo: €{{ dish.price }}</p>
                <button
                  class="button-menu ibm-plex-mono-regular mt-3"
                  @click="addToCart(dish)"
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Caricamento in corso...</p>
    </div>

    <!-- Messaggio di errore -->
    <div v-if="addError" class="alert alert-danger mt-4">
      Non puoi aggiungere piatti di un altro ristorante al carrello.
    </div>
  </div>
</template>

<style scoped>
.container {
  border-radius: 30px;
}
.card {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
}
.ibm-plex-mono-regular {
  font-size: 15px;
}
.ibm-plex-mono-bold {
  font-size: 20px;
}
.button-menu {
  background-color: #2f2f2f;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;
}
.button-menu:hover {
  background-color: #fac200;
  border: #2f2f2f solid 1px;
}

.my-title-card {
  font-family: "neplus", serif;
  font-weight: 900;
  font-style: normal;
  font-size: 50px;
}

.background-pattern {
  background-image: url(/images/background-pattern.png);
  background-size: contain;
}
</style>
