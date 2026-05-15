import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import PasswordPage from "@/pages/PasswordPage";
import MainMenu from "@/pages/MainMenu";
import LetterPage from "@/pages/LetterPage";
import OpenWhen from "@/pages/OpenWhen";
import Timeline from "@/pages/Timeline";
import Gallery from "@/pages/Gallery";
import Messages from "@/pages/Messages";
import Achievements from "@/pages/Achievements";
import Ending from "@/pages/Ending";
import MusicPlayer from "@/components/MusicPlayer";
import CursorEffect from "@/components/CursorEffect";
import { config } from "@/config";

const queryClient = new QueryClient();

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = sessionStorage.getItem("romantic-auth") === "true";
  if (!isAuthenticated) {
    return <Redirect to="/password" />;
  }
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/password" component={PasswordPage} />
      <Route
        path="/menu"
        component={() => (
          <AuthGuard>
            <MainMenu />
          </AuthGuard>
        )}
      />
      <Route
        path="/birthday"
        component={() => (
          <AuthGuard>
            <LetterPage letter={config.letters.birthday} />
          </AuthGuard>
        )}
      />
      <Route
        path="/apology"
        component={() => (
          <AuthGuard>
            <LetterPage letter={config.letters.apology} />
          </AuthGuard>
        )}
      />
      <Route
        path="/love"
        component={() => (
          <AuthGuard>
            <LetterPage letter={config.letters.love} />
          </AuthGuard>
        )}
      />
      <Route
        path="/future"
        component={() => (
          <AuthGuard>
            <LetterPage letter={config.letters.future} />
          </AuthGuard>
        )}
      />
      <Route
        path="/open-when"
        component={() => (
          <AuthGuard>
            <OpenWhen />
          </AuthGuard>
        )}
      />
      <Route
        path="/timeline"
        component={() => (
          <AuthGuard>
            <Timeline />
          </AuthGuard>
        )}
      />
      <Route
        path="/gallery"
        component={() => (
          <AuthGuard>
            <Gallery />
          </AuthGuard>
        )}
      />
      <Route
        path="/messages"
        component={() => (
          <AuthGuard>
            <Messages />
          </AuthGuard>
        )}
      />
      <Route
        path="/achievements"
        component={() => (
          <AuthGuard>
            <Achievements />
          </AuthGuard>
        )}
      />
      <Route
        path="/ending"
        component={() => (
          <AuthGuard>
            <Ending />
          </AuthGuard>
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <CursorEffect />
          <Router />
          <MusicPlayer />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
