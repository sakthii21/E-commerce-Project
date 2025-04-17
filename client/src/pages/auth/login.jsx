import CommonForm from "../../components/common/form";
import { loginFormControls } from "../../config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginuser } from "../../store/auth-slice";
import { Link } from "react-router-dom";
import { toast } from 'sonner';

// import { loginUser } from "../../store/auth-slice";
// import { useToast } from "../../components/ui/use-toast";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    function onSubmit(event) {
      event.preventDefault();
    
      dispatch(loginuser(formData)).then((data) => {
        console.log(data);
    
        if (data?.payload?.success) {
          toast.success(data?.payload?.message || 'Login successful');
          const role = data.payload.user?.role;  // assuming your payload contains `user` object
          console.log("User role:", role); // check this

          localStorage.setItem('user', JSON.stringify(data?.payload?.user));
          localStorage.setItem('token', data?.payload?.token);


          // if (role === "admin") {
          //   console.log("Navigating to admin/dashboard");
          //   navigate("/admin/dashboard");
          // } else {
          //   console.log("Navigating to shop/home");
          //   navigate("/shop/home");
          // }
        } else {
          toast.error(data?.payload?.message || 'Login failed');
        }
      });
    }
  

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;