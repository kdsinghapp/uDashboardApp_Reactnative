// DrawerNavigation.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screen/BottomTab/Dashboard/DashboardScreen';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import CustomDrawerContent from '../compoent/CustomDrawerContent';
import EditProfile from '../screen/Profile/EditProfile';
import ScreenNameEnum from '../routes/screenName.enum';
import CallbackDetailScreen from '../screen/Callback/CallbackDetailScreen';
import ActiveScreen from '../screen/Active/ActiveScreen';
import EmployeeScreen from '../screen/Employee/EmployeeScreen';
import Note from '../screen/Note/Note';
import CallBack from '../screen/Callback/CallBack';
import Backburner from '../screen/Backburner/BackburnerScreen';
import TeamScreen from '../screen/Teams/TeamScreen';
import AssingnedScreen from '../screen/AssignedTask/AssingnedScreen';
import CalendarScreen from '../screen/Calendar/CalendarScreen';
import AddclientsScreen from '../screen/Client/ClientsScreen';
import RepliesScreen from '../screen/Replies/Replies';
import BudgetScreen from '../screen/Financial/Budget/Budget';
import PLSummaryScreen from '../screen/Financial/PLSummary/PLSummary';
import ExpensesScreen from '../screen/Financial/Expenses/Expenses';
import CategoriesScreen from '../screen/Categories/CategoriesScreen';
import TagScreen from '../screen/Tag/TagScreen';
import BudgetCategoriesScreen from '../screen/Financial/BudgetCategories/BudgetCategoriesScreen';
import PosisionScreen from '../screen/Employee/Posision/PosisionScreen';
import PriorityTasksScreen from '../screen/PriorityTask/PriorityTasksScreen';
import PricingPage from '../screen/MemberShip';
import ChangePasswordScreen from '../screen/Profile/ChangePassword';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name={ScreenNameEnum.EditProfile} component={EditProfile} />
      <Drawer.Screen name={ScreenNameEnum.changePassword} component={ChangePasswordScreen} />
      <Drawer.Screen name={ScreenNameEnum.ActiveScreen} component={ActiveScreen} />
      <Drawer.Screen name={ScreenNameEnum.CallBack} component={CallBack} />
      <Drawer.Screen name={ScreenNameEnum.Note} component={Note} />
      <Drawer.Screen name={ScreenNameEnum.EmployeeScreen} component={EmployeeScreen} />
      <Drawer.Screen name={ScreenNameEnum.AddclientsScreen} component={AddclientsScreen} />
      <Drawer.Screen name={ScreenNameEnum.Backburner} component={Backburner} />
      <Drawer.Screen name={ScreenNameEnum.TeamScreen} component={TeamScreen} />
      <Drawer.Screen name={ScreenNameEnum.AssingnedScreen} component={AssingnedScreen} />
      <Drawer.Screen name={ScreenNameEnum.CalendarScreen} component={CalendarScreen} />
      <Drawer.Screen name={ScreenNameEnum.RepliesScreen} component={RepliesScreen} />
      <Drawer.Screen name={ScreenNameEnum.Budget} component={BudgetScreen} />
      <Drawer.Screen name={ScreenNameEnum.Expenses} component={ExpensesScreen} />
      <Drawer.Screen name={ScreenNameEnum.PLSummary} component={PLSummaryScreen} />
      <Drawer.Screen name={ScreenNameEnum.Categories} component={CategoriesScreen} />
      <Drawer.Screen name={ScreenNameEnum.BudgetCategories} component={BudgetCategoriesScreen} />
      <Drawer.Screen name={ScreenNameEnum.Tag} component={TagScreen} />
      <Drawer.Screen name={ScreenNameEnum.PosisionScreen} component={PosisionScreen} />
      <Drawer.Screen name={ScreenNameEnum.PriorityTasksScreen} component={PriorityTasksScreen} />
      <Drawer.Screen name={ScreenNameEnum.MembershipPlan} component={PricingPage} />
    </Drawer.Navigator>
  );
}
