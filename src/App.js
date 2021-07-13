import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar';
import AddCustomer from './components/pages/Customer/AddProduct';
import Customer from './components/pages/Customer/Customer';
import Customers from './components/pages/Customer/Customers';
import EditCustomer from './components/pages/Customer/EditCustomer';
import Home from './components/pages/Home';
import Addorder from './components/pages/Order/Addorder';
import Addorderitem from './components/pages/Order/Addorderitem';
import Orderitem from './components/pages/Order/Orderitem';
import Orders from './components/pages/Order/Orders';
import AddProduct from './components/pages/Product/AddProduct';
import EditProduct from './components/pages/Product/EditProduct';
import Product from './components/pages/Product/Product';
import Products from './components/pages/Product/Products';

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>

        <Route exact path="/customer/:id" component={Customer}/>
        <Route exact path="/customers" component={Customers}/>
        <Route exact path="/addcustomer" component={AddCustomer}/>
        <Route exact path="/customer/:id/edit" component={EditCustomer}/>

        <Route exact path="/product/:id" component={Product}/>
        <Route exact path="/products" component={Products}/>
        <Route exact path="/addproduct" component={AddProduct}/>
        <Route exact path="/product/:id/edit" component={EditProduct}/>
        
        <Route exact path="/addorderitem" component={Addorderitem}/>
        <Route exact path="/orders" component={Orders}/>
        <Route exact path="/addorder" component={Addorder}/>
        <Route exact path="/oreder/:order_no/orderitem" component={Orderitem}/>


      </Switch>
    </Router>
  );
}

export default App;
