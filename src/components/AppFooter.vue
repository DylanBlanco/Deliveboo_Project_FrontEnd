<script>
export default {
  name: "AppFooter",
};
</script>

<template>
  <footer class="bg-dark text-light py-5">
    <div class="container">
      <!-- Prima riga: Link e Logo -->
      <div class="row">
        <!-- Sezione Link -->
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12 col-sm-4 mb-3">
              <h5 class="ibm-plex-mono-semibold">DeliveBoo</h5>
              <ul class="list-unstyled">
                <li><a href="#" class="ibm-plex-mono-regular text-light">Chi siamo</a></li>
                <li><a href="#" class="ibm-plex-mono-regular text-light">Ristoranti</a></li>
                <li><a href="#" class="ibm-plex-mono-regular text-light">Diventa parte del team!</a></li>
                <li><a href="#" class="ibm-plex-mono-regular text-light">Diventa nostro partner!</a></li>
              </ul>
            </div>
            <div class="col-12 col-sm-4 mb-3">
              <h5 class="ibm-plex-mono-semibold">Informazioni Legali</h5>
              <ul class="list-unstyled">
                <li><a href="#" class="ibm-plex-mono-regular text-light">Termini e condizioni</a></li>
                <li><a href="#" class="ibm-plex-mono-regular text-light">Informativa sulla privacy</a></li>
                <li><a href="#" class="ibm-plex-mono-regular text-light">Cookies</a></li>
              </ul>
            </div>
            <div class="col-12 col-sm-4 mb-3">
              <h5 class="ibm-plex-mono-semibold">Assistenza</h5>
              <ul class="list-unstyled">
                <li><a href="#" class="ibm-plex-mono-regular text-light">Contattaci</a></li>
                <li><a href="#" class="ibm-plex-mono-regular text-light">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Logo -->
        <div class="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <img src="/images/Logo-deliveBoo-white.png" alt="Logo DeliveBoo" class="img-fluid" style="max-width: 200px;">
        </div>
      </div>

      <!-- Seconda riga: Social e Copyright -->
      <div class="row mt-4">
        <!-- Social -->
        <div class="col-12 col-md-4 d-flex justify-content-center justify-content-md-start mb-3">
          <ul class="list-inline">
            <li class="list-inline-item me-3"><i class="fa-brands fa-facebook fa-lg"></i></li>
            <li class="list-inline-item me-3"><i class="fa-brands fa-instagram fa-lg"></i></li>
            <li class="list-inline-item"><i class="fa-brands fa-tiktok fa-lg"></i></li>
          </ul>
        </div>

        <!-- Copyright -->
        <div class="col-12 col-md-4 text-center mb-3">
          <p>© Copyright DeliveBoo 2024</p>
        </div>

        <!-- Team -->
        <div class="col-12 col-md-4 text-center text-md-end">
          <p>Team 5</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer h5 {
  color: white;
}

footer ul {
  padding: 0;
  list-style: none;
}

footer ul li a {
  text-decoration: none;
  color: lightgray;
}

footer ul li a:hover {
  color: white;
}

footer .fa-lg {
  color: white;
}

footer .fa-lg:hover {
  color: #fac200;
}
</style>
