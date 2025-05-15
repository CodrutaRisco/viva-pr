import { Provider as PaperProvider } from "react-native-paper";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {
  return (
    <PaperProvider>
      <WelcomeScreen />
    </PaperProvider>
  );
}
