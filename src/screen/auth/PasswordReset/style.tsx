import { StyleSheet } from "react-native";
import { color } from "../../../constant";
import { hp } from "../../../utils/Constant";

export const styles = StyleSheet.create({
 background: {
    flex: 1,
  },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 30,
        borderWidth: 1.8,
        borderRadius: 20,
        borderColor: color.primary,
        paddingVertical: 15
    },
    bottomButton: {
        flex: 1,
        paddingVertical: 0,
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        lineHeight: 24,
        marginLeft: 10
    },

    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
 container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor:"#fff"
  },

  scrollContainer: {
    flexGrow: 1,
  },

  backButton: {
    marginTop: 8,
    width: '15%',
  },

  backIcon: {
    height: 32,
    width: 32,
  },

  headerContainer: {
    marginTop: 15,
  },

  titleContainer: {
    height: hp(9),
  },

  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 36,
    marginTop: 15,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(157, 178, 191, 1)',
    lineHeight: 24,
    marginTop: 5,
    width: '85%',
  },

  buttonImage: {
    height: 76,
    width: 76,
    resizeMode: 'contain',
  },

  textInput: {
    marginLeft: 5,
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    paddingVertical: 4,
  },

})