<script>
import axios from "axios";

export default {
  props: ["cart"], // Dichiarazione del prop 'cart'
  emits: ["updateCart"],
  data() {
    return {
      categories: [], // Lista delle categorie
      selectedCategories: [], // Categorie selezionate
      restaurants: [], // Lista ristoranti filtrati
      allRestaurants: [], // Lista di tutti i ristoranti non filtrati
    };
  },
  methods: {
    updateCart(item) {
      this.$emit("updateCart", item); // Emissione dell'evento
    },
    async fetchAllRestaurants() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/restaurants"
        );
        this.allRestaurants = response.data; // Salva tutti i ristoranti
        this.restaurants = [...this.allRestaurants]; // Inizialmente, mostra tutti i ristoranti
      } catch (error) {
        console.error("Errore nel recupero dei ristoranti:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Errore nel caricamento delle categorie:", error);
      }
    },
    filterRestaurants() {
      if (this.selectedCategories.length === 0) {
        this.restaurants = [...this.allRestaurants];
        return;
      }
      this.restaurants = this.allRestaurants.filter((restaurant) => {
        const restaurantCategories = restaurant.categories.map((cat) => cat.id);
        return this.selectedCategories.every((selectedCategory) =>
          restaurantCategories.includes(selectedCategory)
        );
      });
    },
    goToDetails(restaurantId) {
      this.$router.push({
        name: "restaurantDetails",
        params: { id: restaurantId },
      });
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchAllRestaurants();
  },
};
</script>

<template>
  <div class="container my-5">
    <h1 class="ibm-plex-mono-bold text-center fs-1 mb-4">Ristoranti</h1>
    <div class="d-flex flex-wrap justify-content-center gap-2 mb-4">
      <div v-for="category in categories" :key="category.id" class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          :value="category.id"
          v-model="selectedCategories"
          @change="filterRestaurants"
        />
        <label class="ibm-plex-mono-regular form-check-label">{{
          category.name
        }}</label>
      </div>
    </div>

    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 mb-4"
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <div class="card p-4 background-pattern">
          <img
            :src="restaurant.image"
            class="card-img-top img-fluid"
            alt="Ristorante"
          />
          <div class="card-body text-center">
            <h5 class="ibm-plex-mono-semibold card-title">
              {{ restaurant.name }}
            </h5>
            <p class="ibm-plex-mono-regular card-text">
              {{ restaurant.address }}
            </p>
            <button
              @click="goToDetails(restaurant.id)"
              class="button-menu ibm-plex-mono-regular w-100"
            >
              Visualizza Piatti
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  border-radius: 30px;
}
.card {
  border-radius: 20px;
  border: solid 1px #2f2f2f;
}
.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
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
.ibm-plex-mono-regular {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 400;
  font-size: 15px;
}
.ibm-plex-mono-semibold {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 600;
  font-size: 18px;
}
.ibm-plex-mono-bold {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 700;
  font-size: 30px;
  color: #2f2f2f;
}
.background-pattern {
  background-image: url(/images/background-pattern.png);
  background-size: contain;
}
</style>
