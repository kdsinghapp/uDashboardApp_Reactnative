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
import AddclientsDetail from "../screen/Client/AddclientsDetail";
import Addclients from "../screen/Client/Addclients";
import RepliesDetail from "../screen/Replies/RepliesDetail";
import BudgetDetailScreen from "../screen/Financial/Budget/BudgetDetailScreen";
import AddBudget from "../screen/Financial/Budget/AddBudget";
import ExpensesDetailScreen from "../screen/Financial/Expenses/ExpensesDetailScreen";
import PLSummaryDetailScreen from "../screen/Financial/PLSummary/PLSummaryDetailScreen";
import AddExpenses from "../screen/Financial/Expenses/AddExpenses";
import AddPLSummary from "../screen/Financial/PLSummary/AddPLSummary";
import CategoriesForm from "../screen/Categories/AddCategories";
import CategoriesDetail from "../screen/Categories/CategoriesDetail";
import CategoriesScreen from "../screen/Categories/CategoriesScreen";
import TagDetail from "../screen/Tag/TagDetail";
import TagForm from "../screen/Tag/AddTag";
import BudgetCategoriesDetail from "../screen/Financial/BudgetCategories/BudgetCategoriesDetail";
import BudgetCategoriesForm from "../screen/Financial/BudgetCategories/AddBudgetCategories";
import PosisionDetail from "../screen/Employee/Posision/PosisionDetail";
import AddPosision from "../screen/Employee/Posision/AddPosision";
import PriorityTasksDetail from "../screen/PriorityTask/PriorityTasksDetail";
import ProfileScreen from "../screen/Profile/ProfileTab";
import ChangePasswordScreen from "../screen/Profile/ChangePassword";
   
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
      name: ScreenNameEnum.AddNoteScreen,
      Component: AddNoteScreen,
    },  
    {
      name: ScreenNameEnum.AddCategories,
      Component: CategoriesForm,
    },  
    {
      name: ScreenNameEnum.CallbackDetailScreen,
      Component: CallbackDetailScreen,
    },  
    {
      name: ScreenNameEnum.Categories,
      Component: CategoriesScreen,
    },  
    {
      name: ScreenNameEnum.CategoriesDetail,
      Component: CategoriesDetail,
    },  
      {
      name: ScreenNameEnum.TagDetail,
      Component: TagDetail,
    },  
    {
      name: ScreenNameEnum.AddTag,
      Component: TagForm,
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
      name: ScreenNameEnum.PosisionDetail,
      Component: PosisionDetail,
    },
      {
      name: ScreenNameEnum.AddPosisionScreen,
      Component: AddPosision,
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
      name: ScreenNameEnum.BudgetCategoriesDetail,
      Component: BudgetCategoriesDetail,
    },  
    {
      name: ScreenNameEnum.AddBudgetCategories,
      Component: BudgetCategoriesForm,
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
      name: ScreenNameEnum.PriorityTasksDetails,
      Component: PriorityTasksDetail,
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
     {
      name: ScreenNameEnum.ProfileScreen,
      Component: ProfileScreen,
    },
     {
      name: ScreenNameEnum.changePassword,
      Component: ChangePasswordScreen,
    },
   ],
};

export default _routes;
