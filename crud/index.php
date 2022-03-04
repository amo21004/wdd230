<?php
require_once('application.php');
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

    <title>CRUD Application</title>
  </head>
  <body class="p-5">
    <div class="container">
      <header class="mb-5">
        <h1><a href="./" class="text-dark text-decoration-none">CRUD Application</a></h1>
      </header>

      <main>
        <h2>Products</h2>

        <div class="mb-4">
          <?php
            do_request();
          ?>
        </div>

        <h2>Add New Product</h2>

        <form method="post" action="./index.php">
          <div class="mb-3">
            <label for="product-name" class="form-label">Name <span class="fw-bold text-danger">*</span></label>
            <input type="text" class="form-control" id="product-name" name="name" required>
          </div>

          <div class="mb-3">
            <label for="product-description" class="form-label">Description <span class="fw-bold text-danger">*</span></label>
            <textarea class="form-control" id="product-description" name="description" required></textarea>
          </div>

          <div class="mb-3">
            <label for="product-price" class="form-label">Price <span class="fw-bold text-danger">*</span></label>
            <input type="number" class="form-control" id="product-price" name="price" step="0.01" required>
          </div>

          <button type="submit" class="btn btn-primary" name="action" value="create">Add Product</button>
        </form>
      </main>
    </div>
  </body>
</html>
