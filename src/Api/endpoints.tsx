 
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
  adddocuments:"/bikedoctor/dealer/add-dealer-documents"
};
 