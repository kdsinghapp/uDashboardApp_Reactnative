import { StyleSheet } from "react-native";
import { hp, wp } from "../../../utils/Constant";
import { color, fonts } from "../../../constant";


export const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    backgroundColor: '#352C48',
    height: 55,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderColor: '#7756FC',
   },
  line: {
    textDecorationLine: 'line-through',
  },

  textEr: { color: 'red', fontSize: 12 },

  txtsubHeading: {
    fontFamily:fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(153, 153, 153, 1)',
    textAlign: 'center',
    marginTop: 6
  },
  tabBtn: {
    height: 60,
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 60,
    marginTop: 25,

    width: '100%',

    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 1,
    backgroundColor: '#352C48',
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
   bgContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:40
  },
 
  mainContainer: {
    flex: 1,
    padding: 20,
    justifyContent:"center",
    alignItems:"center"
    // backgroundColor: '#FFF',
  },
  logo: {
    height: hp(10),
    width: hp(20),
   },
  txtHeading: {
    fontSize: 24,
    lineHeight: 45,
    color: color.black,
    marginTop: 7,
    fontFamily:fonts.bold,
    textAlign:"center"

    
  },
  txtDes:{
    color:'#9DB2BF',
    fontSize:14,
    fontFamily:fonts.regular,
    marginTop:10 ,
    lineHeight:18,
    textAlign:"center"

   },
  inputContainer: {
    width: '100%',
    
    paddingVertical: hp(0),
    marginTop:hp(3.5)
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginTop:8
  },
  forgotContainer: {
    alignSelf: 'center',
    marginTop: 22,

  },
  forgotText: {
    color: color.primary,
    fontSize: 14,
    fontFamily:fonts.medium,
    lineHeight: 18,
    marginBottom:15,
   },
  loginButton: {
    marginHorizontal: 20,
    width: '100%',
    marginTop: 30,
  },
  signupContainer: {
    height: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    width: wp(100),
    justifyContent: 'center',
  },
  signUpPrompt: {
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(144, 144, 144, 1)',
  },
  signupText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#909090',
    bottom: 2,
    fontFamily:fonts.medium
  },
  orText: {
    lineHeight: 16,
    marginVertical:40,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    fontWeight: '500',
  },
  googleIcon: {
    height: 30,
    width: '100%',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 27.5,
    borderColor: '#ddd',
    borderWidth: 0,
    alignSelf: 'center',
    height:55,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  text: {
    fontSize: 14,
    fontFamily:fonts.medium,
    color: '#555',
  },
})