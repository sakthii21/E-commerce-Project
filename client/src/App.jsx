import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Adminlayout from "./components/admin-view/layout";
import Admindashboard from "./pages/admin-view/dashboard";
import Adminproducts from "./pages/admin-view/products";
import Adminorders from "./pages/admin-view/orders";
import Adminfeatures from "./pages/admin-view/features";
import Shoppinglayout from "./components/shopping-view/layout";
import Notfound from "./pages/not-found";
import Shoppinghome from "./pages/shopping-view/home";
import Shoplisting from "./pages/shopping-view/listing";
import Shopaccount from "./pages/shopping-view/account";
import Shopcheckout from "./pages/shopping-view/checkout";
import Checkauth from "./components/common/checkauth";
import Unauth from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import{useEffect} from "react";
import { setUser } from "./store/action";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"

function App() {
 
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userFromStorage && token){
      // Restore user and token in Redux store
      dispatch(checkAuth());
    }
  }, [dispatch]);

  if(isLoading) return <Skeleton className="w-[800] bg-red h-[60px]" />

console.log(isLoading,user);



  return (
    <div className="flex flex-col overflow-hidden bg-white">
     <h1 className="text-4xl text-red-500">Header</h1>

      <Routes>

        <Route path="/auth" element={
          <Checkauth isAuthenticated={isAuthenticated} user={user}>
             <AuthLayout />
          </Checkauth>
          }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>



        <Route path="/admin" element={
          <Checkauth isAuthenticated={isAuthenticated} user ={user}>
          <Adminlayout/>

          </Checkauth>
          }>
        <Route path="dashboard" element={<Admindashboard/>}/>
        <Route path="products" element={<Adminproducts/>}/>
        <Route path="orders" element={<Adminorders/>}/>
        <Route path="features" element={<Adminfeatures/>}/>
        </Route>


        <Route path="/shop" element={
          
          <Checkauth isAuthenticated={isAuthenticated} user ={user}>
           <Shoppinglayout/>
          </Checkauth>
          }>
        <Route path="home" element={<Shoppinghome/>}/>
        <Route path="listing" element={<Shoplisting/>}/>
        <Route path="account" element={<Shopaccount/>} />
        <Route path="checkout" element={<Shopcheckout/>}/>
         </Route>


        {/* // not found page */}  
       <Route path="/unauth-page" element={<Unauth/>}/>
       <Route path="*" element={<Notfound/>}/>
      </Routes>
    </div>
  );
}

export default App;
