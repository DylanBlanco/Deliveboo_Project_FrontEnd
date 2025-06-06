<template>
  <div class="container payment-container py-5">
    <div class="row">
      <div class="col-6 d-none d-lg-flex justify-content-center align-items-center">
          <img class="img-pay" src="/images/pay-img.svg" alt="pay-img">
      </div>
      <div class="col-6 flex-grow-1">
        <!-- Riepilogo Ordini -->
      <div class="col-12 order-summary mb-2">
        <h3 class="ibm-plex-mono-semibold text-center mb-3">Riepilogo Ordini</h3>
        <ul class="list-unstyled">
          <li class="ibm-plex-mono-regular" v-for="(item, index) in cart" :key="index">
            {{ item.name }} - €{{ parseFloat(item.price).toFixed(2) }} x
            {{ item.quantity }}
          </li>
        </ul>
        <p class="ibm-plex-mono-regular">
          <strong>Totale: €{{ total }}</strong>
        </p>
      </div>

      <!-- Sezione Dati Utente -->
      <div class="col-12 user-info mb-2">
        <h3 class="ibm-plex-mono-semibold text-center mb-3">Dati Utente</h3>
        <div class="form-group mb-3">
          <label class="ibm-plex-mono-regular" for="name">Nome:</label>
          <input
            type="text"
            v-model="name"
            id="name"
            class="form-control"
            required
            placeholder="Inserisci il tuo nome"
          />
        </div>
        <div class="form-group mb-3">
          <label class="ibm-plex-mono-regular" for="email">Email:</label>
          <input 
            type="email"
            v-model="email"
            id="email"
            class="form-control"
            required
            placeholder="Inserisci la tua email"
          />
        </div>
        <div class="form-group mb-3">
          <label class="ibm-plex-mono-regular" for="telephone">Telefono:</label>
          <input
            type="tel"
            v-model="telephone"
            id="telephone"
            class="form-control"
            required
            placeholder="Inserisci il tuo numero di telefono"
          />
        </div>
      </div>

      <!-- Sezione per il pagamento -->
      <div class="col-12 col-lg-12 col-sm-8 payment-method">
        <h3 class="ibm-plex-mono-semibold text-center mb-3">Pagamento</h3>
        <div id="dropin-container" class="mb-3"></div>
        <button @click="submitPayment" class="button-menu  ibm-plex-mono-regular w-100">
          Paga
        </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dropin from "braintree-web-drop-in";

export default {
  data() {
    return {
      clientToken: null,
      instance: null,
      name: "",
      email: "",
      telephone: "",
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    };
  },
  computed: {
    total() {
      return this.cart
        .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
        .toFixed(2);
    },
  },
  mounted() {
    this.fetchClientToken();
  },
  methods: {
    async fetchClientToken() {
      try {
        const response = await axios.get("/api/get-client-token");
        this.clientToken = response.data.clientToken;
        this.initializeBraintree();
      } catch (error) {
        console.error("Errore nel recuperare il client token:", error);
      }
    },

    initializeBraintree() {
      if (!this.clientToken) {
        console.error("Client token non disponibile!");
        return;
      }

      dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
        },
        (err, instance) => {
          if (err) {
            console.error("Errore nel caricare Drop-in:", err);
            return;
          }
          this.instance = instance;
        }
      );
    },

    async submitPayment() {
      try {
        const { nonce } = await this.instance.requestPaymentMethod();
        const response = await axios.post("/api/process-payment", {
          nonce: nonce,
          amount: this.total,
          name: this.name,
          email: this.email,
          telephone: this.telephone,
          cart: this.cart,
        });

        if (response.data.success) {
          this.$router.push({
            name: "orderConfirmation",
            query: { transactionId: response.data.transactionId },
          });
        } else {
          alert("C'è stato un errore nel completamento del pagamento.");
        }
      } catch (error) {
        alert("C'è stato un errore nel completamento del pagamento.");
      }
    },
  },
};
</script>

<style scoped>
.payment-container {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
}

.order-summary,
.user-info,
.payment-method {
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  font-size: 16px;
  padding: 10px 20px;
}

.img-pay{
  width:620px;
  height: 500px;
}

@media (max-width: 768px) {
  .payment-container {
    padding: 15px;
  }

  .order-summary,
  .user-info,
  .payment-method {
    padding: 15px;
  }

  button {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>
