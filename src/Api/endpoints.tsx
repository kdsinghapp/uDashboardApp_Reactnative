import { G } from "react-native-svg";

 
export const endpointCustomer = {
  
  SignUp:"Register" ,
  LoginApi:"Login",
  verifyotp:"/bikedoctor/dealerAuth/verifyotp" ,
  resendOtp2:"/bikedoctor/dealerAuth/resendOtp",
  addDealer:"/bikedoctor/dealer/editDealer",
  // addDealer:"/bikedoctor/dealer/addDealer",
  getApi:"/bikedoctor/dealer/dealer",
  getuserbookings:"/bikedoctor/bookings/getuserbookings",
  updateBookingStatus:"/bikedoctor/bookings/updateBookingStatus",
  policy:"/bikedoctor/policies",
  servicelist:"/bikedoctor/service/servicelist",
  StateData: '/location/getAllStateData',
  CityByState: '/location/getCityByState/:stateId',
  bookingdetails: '/bikedoctor/bookings/getBookingDetails/:id',
  sendBookingOTP: '/bikedoctor/bookings/sendBookingOTP',
  pickupStatus:"/bikedoctor/bookings/update-pickup-status",
  verifyBookingOTP:"/bikedoctor/bookings/verifyBookingOTP",
  updateBooking:"/bikedoctor/bookings/updateBooking",
  offerlist:"/bikedoctor/offer/offerlist?service_id",
  paymentCash:"/bikedoctor/payment/cash",
  addshopdetails:"/bikedoctor/dealer/add-shop-details",
  adddocuments:"/bikedoctor/dealer/add-dealer-documents",

  GetEmployeeList:"employees?page=1&limit=100",
  GetDeletedEmployeeList:"employees?page=1&limit=1000&employee=deleted",
  DeleteEmployee:'employees/',

  // Employees Posision
  GetPosisionList :"employees/positions/all-positions?page=1&limit=100",
  GetDeletedPosisionList:"employees/positions/all-positions?page=1&limit=1000&position=deleted",
  DeletePosision:'employees/positions/delete/',
  RestorePosision:'employees/positions/restore/',

  // Teams
  GetTeamsList :"teams?page=1&limit=100",
  GetTeams :"teams",
  GetDeletedTeamsList:"teams?page=1&limit=1000&team=deleted",
  DeleteTeams:'teams/delete/',
  RestoreTeams:'teams/restore/', 

  //Callbacks
  GetCallbacksList :"callbacks?page=1&limit=100",
  GetDeletedCallbacksList:"callbacks?page=1&limit=1000&callback=deleted",
  DeleteCallbacks:'callbacks/',
  RestoreCallbacks:'/restore/',
//Backburner
GetBackburnerList :"backburner-tasks?page=1&limit=100",
GetAssignedList :"assigned-tasks?page=1&limit=100",
  //Clients
  GetClientsList :"clients?page=1&limit=100",
  GetClient :"clients",
  GetDeletedClientsList:"clients?page=1&limit=1000&client=deleted",
  DeleteClients:'clients/delete/',
  RestoreClients:'clients/restore/',



  // common
  Get_Status :"common/callback-statuses",
  Get_Priority :"common/callback-priorities",
};
 