 import CreatePassword from "../screen/auth/CreateNewPassword/CreateNewPassword";
 import Login from "../screen/auth/Login/Login";
 import OtpScreen from "../screen/auth/OTPScreen/OtpScreen";
import PasswordReset from "../screen/auth/PasswordReset/PasswordReset";
import SignUp from "../screen/auth/Signup/SignUp";
import Splash from "../screen/auth/Splash";
 import ScreenNameEnum from "./screenName.enum";
 
import EditProfile from "../screen/Profile/EditProfile";
 import Notification from "../screen/Profile/Notification";
import DrawerNavigation from "../navigators/DrawerNavigation";
import LossDetailScren from "../screen/Active/LossDetail/LossDetailScren";
import AddEmployeeScreen from "../screen/Employee/AddEmployee";
import EmployeeDetail from "../screen/Employee/EmployeeDetail";
import NoteDetail from "../screen/Note/NoteDetail";
import AddNoteScreen from "../screen/Note/AddNote";
import CallbackDetailScreen from "../screen/Callback/CallbackDetailScreen";
import AddCallback from "../screen/Callback/AddCallback";
import BackburnerDetail from "../screen/Backburner/BackburnerDetail";
import AddBackburner from "../screen/Backburner/AddBackburner";
import AddTeams from "../screen/Teams/AddTeams";
import TeamsDetail from "../screen/Teams/TeamsDetail";
import AssignedDetail from "../screen/AssignedTask/AssignedDetail";
import AddAssignedTask from "../screen/AssignedTask/AddAssignedTask";
import AddclientsDetail from "../screen/Addclients/AddclientsDetail";
import Addclients from "../screen/Addclients/Addclients";
import RepliesDetail from "../screen/Replies/RepliesDetail";
import BudgetDetailScreen from "../screen/Financial/Budget/BudgetDetailScreen";
import AddBudget from "../screen/Financial/Budget/AddBudget";
import ExpensesDetailScreen from "../screen/Financial/Expenses/ExpensesDetailScreen";
import PLSummaryDetailScreen from "../screen/Financial/PLSummary/PLSummaryDetailScreen";
import AddExpenses from "../screen/Financial/Expenses/AddExpenses";
import AddPLSummary from "../screen/Financial/PLSummary/AddPLSummary";
   
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
    {
      name: ScreenNameEnum.NoteDetail,
      Component: NoteDetail,
    },  
    {
      name: ScreenNameEnum.CallbackDetailScreen,
      Component: CallbackDetailScreen,
    },  
    {
      name: ScreenNameEnum.AddNoteScreen,
      Component: AddNoteScreen,
    },  
    {
      name: ScreenNameEnum.LossDetailScren,
      Component: LossDetailScren,
    },  
    {
      name: ScreenNameEnum.AddBackburner,
      Component: AddBackburner,
    },  
    {
      name: ScreenNameEnum.AddclientsDetail,
      Component: AddclientsDetail,
    },  
    {
      name: ScreenNameEnum.Addclients,
      Component: Addclients,
    },  
    {
      name: ScreenNameEnum.AddAssignedTask,
      Component: AddAssignedTask,
    },  
    {
      name: ScreenNameEnum.AssignedDetail,
      Component: AssignedDetail,
    },  
    {
      name: ScreenNameEnum.TeamsDetail,
      Component: TeamsDetail,
    },  
    {
      name: ScreenNameEnum.AddTeams,
      Component: AddTeams,
    },  
    {
      name: ScreenNameEnum.AddCallback,
      Component: AddCallback,
    },  
    {
      name: ScreenNameEnum.BackburnerDetail,
      Component: BackburnerDetail,
    },  
    {
      name: ScreenNameEnum.EmployeeDetail,
      Component: EmployeeDetail,
    },  
    {
      name: ScreenNameEnum.AddEmployeeScreen,
      Component: AddEmployeeScreen,
    },  
    {
      name: ScreenNameEnum.BudgetDetail,
      Component: BudgetDetailScreen,
    },  
    {
      name: ScreenNameEnum.AddBudget,
      Component: AddBudget,
    },  
     {
      name: ScreenNameEnum.RepliesDetail,
      Component: RepliesDetail,
    },  
     {
      name: ScreenNameEnum.ExpensesDetail,
      Component: ExpensesDetailScreen,
    },  
     {
      name: ScreenNameEnum.PLSummaryDetail,
      Component: PLSummaryDetailScreen,
    },  
     {
      name: ScreenNameEnum.AddExpenses,
      Component: AddExpenses,
    },  
     {
      name: ScreenNameEnum.AddPLSummary,
      Component: AddPLSummary,
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
