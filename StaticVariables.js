import { Alert } from 'react-native';
const primaryColor = '#ffaa42'
const theme = {
    colors: { primary: primaryColor }
}
const showErrorAlert = () =>
    Alert.alert(
        "",
        "Something went wrong...",
        [
            { text: "OK" },
        ], {
        cancelable: true,
    }
    );
export { theme, primaryColor, showErrorAlert };