<script>
// import components
import RestaurantList from "./RestaurantList.vue";

export default {
  name: "AppMain",
  components: {
    RestaurantList,
  },
};
</script>

<template>
  <div>
    <!-- Jumbotron -->
    <section class="jumbotron d-flex align-items-center">
      <div class="container text-center">
        <h1 class="display-4 my-title ">Benvenuti su DeliveBoo!</h1>
      </div>
    </section>

    <!-- Lista Ristoranti -->
    <RestaurantList />
  </div>
</template>

<style scoped>
/* Jumbotron Styles */
.jumbotron {
  background-image: url('/images/jumbotron-deliveboo.png');
  background-size: cover;
  background-position: center;
  height: 80vh;
  color: #2f2f2f;
}

.jumbotron h1 {
  font-family: "neplus", serif;
  font-size: 4rem;
}


/* Responsive adjustments */
@media (max-width: 768px) {
  .jumbotron {
    height: auto;
    padding: 2rem 1rem;
    background-image: url('/images/jumbotron-deliveboo.png'); /* Immagine per mobile */
  }

  .jumbotron h1 {
    font-size: 2rem;
  }

  .jumbotron p {
    font-size: 1rem;
  }
}
</style>
