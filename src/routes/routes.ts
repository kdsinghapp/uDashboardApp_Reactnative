 import CreatePassword from "../screen/auth/CreateNewPassword/CreateNewPassword";
 import Login from "../screen/auth/Login/Login";
 import OtpScreen from "../screen/auth/OTPScreen/OtpScreen";
import PasswordReset from "../screen/auth/PasswordReset/PasswordReset";
import SignUp from "../screen/auth/Signup/SignUp";
import Splash from "../screen/auth/Splash";
 import ScreenNameEnum from "./screenName.enum";
 
 
// import DrawerNavigation from "../compoent/DrawerParamList";
import EditProfile from "../screen/Profile/EditProfile";
import DashboardScreen from "../screen/BottomTab/Dashboard/DashboardScreen";
import Notification from "../screen/Profile/Notification";
import DrawerNavigation from "../navigators/DrawerNavigation";

const _routes: any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },

    {
      name: ScreenNameEnum.SignUpScreen,
      Component: SignUp,
    },

    {
      name: ScreenNameEnum.LoginScreen,
      Component: Login,
    },  
    // {
    //   name: ScreenNameEnum.DashboardScreen,
    //   Component: DashboardScreen,
    // },  
    {
      name: ScreenNameEnum.Notification,
      Component: Notification,
    },  
 
    {
      name: "MainDrawer",
      Component: DrawerNavigation,
    },
    {
      name: ScreenNameEnum.PasswordReset,
      Component: PasswordReset,
    },
    {
      name: ScreenNameEnum.CreatePassword,
      Component: CreatePassword,
    },
    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },
 

  
     {
      name: ScreenNameEnum.EditProfile,
      Component: EditProfile,
    },
   ],
};

export default _routes;
