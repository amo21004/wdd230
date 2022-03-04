<?php
function get_connection()
{
  static $connection;

  if ($connection) {
    return $connection;
  }

  $server = 'localhost';

  $username = 'naif';

  $password = 'toystory';

  $database = 'crud';

  try {
    $connection = new PDO("mysql:host={$server};dbname={$database}", $username, $password);
  } catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
  }

  return $connection;
}

function get_product($connection, $product_id)
{
  $statement = $connection->prepare("SELECT * FROM `products` WHERE `id` = {$product_id};");

  $statement->execute();

  return $statement->fetch();
}

function get_products_all($connection)
{
  $statement = $connection->prepare('SELECT * FROM `products`;');

  $statement->execute();

  return $statement->fetchAll();
}

function display_all_products($connection)
{
  $products = get_products_all($connection);

  if (empty($products)) {
?>
    <div class="alert alert-secondary" role="alert">
      No products found
    </div>
  <?php
  } else {
  ?>
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price (USD)</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions
          </tr>
          <thead>
          <tbody>
            <?php
            foreach ($products as $product) {
            ?>
              <tr>
                <td><?= $product['id']; ?></td>
                <td><?= $product['name']; ?></td>
                <td><?= $product['description']; ?></td>
                <td><?= $product['price']; ?></td>
                <td><?= $product['created']; ?></td>
                <td><?= $product['updated']; ?></td>
                <td>
                  <a href="./?action=delete&id=<?= $product['id']; ?>" title="Delete Product" class="text-decoration-none">❌</a>
                </td>
              </tr>
            <?php
            }
            ?>
          </tbody>
      </table>
    </div>
  <?php
  }
}

function delete_product($connection, $id)
{
  $statement = $connection->prepare("DELETE FROM `products` WHERE `id` = {$id};");

  $statement->execute();
  ?>
  <div class="alert alert-danger" role="alert">
    Product deleted successfully.
  </div>
<?php
}

function create_product($connection, $data)
{
  $statement = $connection->prepare("INSERT INTO `products` (`name`, `description`, `price`) VALUES (?, ?, ?);");

  $statement->execute([$data['name'], $data['description'], $data['price']]);
?>
  <div class="alert alert-success" role="alert">
    Product created successfully. 
  </div>
<?php
}

function do_request()
{
  $connection = get_connection();

  $action = null;

  if (!empty($_REQUEST['action'])) {
    switch ($_REQUEST['action']) {
      case 'create':
        $action = 'create';

        $data = $_REQUEST;
        break;

      case 'delete':
        if (!empty($_REQUEST['id'])) {
          $action = 'delete';

          $id = $_REQUEST['id'];
        }
        break;
    }
  }

  if ($action == 'delete') {
    delete_product($connection, $id);
  } elseif ($action == 'create') {
    create_product($connection, $data);
  }

  display_all_products($connection);
}
