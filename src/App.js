import { AlertDialogProvider } from "./context/AlertDialogContext";
import Router from "./routes";

import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

export default function App() {
  return (
    <AlertDialogProvider>
      <ThemeConfig>
        <GlobalStyles />
        <Router />
      </ThemeConfig>
    </AlertDialogProvider>
  );
}
