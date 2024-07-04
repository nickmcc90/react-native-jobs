import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
  everythingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20
  },
  button: {
    backgroundColor: 'orange',
    height: 40,
    width: 40
  },
  buttonImage: (dimension) => ({
    height: dimension,
    width: dimension
  })
})

export default styles