import { AppRegistry } from "react-native";
import App from "./App";

// https://github.com/jhen0409/react-native-debugger/issues/242
if (__DEV__) {
  // eslint-disable-next-line no-undef, no-global-assign
  XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;
}

AppRegistry.registerComponent("RogerThat", () => App);
