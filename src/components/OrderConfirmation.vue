<template>
  <div class="confirmation-container">
    <h2>Pagamento Avvenuto con Successo!</h2>
    <p>Il tuo pagamento è stato completato correttamente.</p>

    <p>Transaction ID: {{ transactionId }}</p>

    <router-link to="/restaurants" class="back-to-list-link">
      Torna alla lista dei ristoranti
    </router-link>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      transactionId: this.$route.query.transactionId, // Ottieni il transactionId dalla query string
    };
  },
};
</script>
  
  <style scoped>
.confirmation-container {
  text-align: center;
  padding: 20px;
}

h2 {
  color: green;
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.back-to-list-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
}

.back-to-list-link:hover {
  background-color: #0056b3;
}
</style>
  
