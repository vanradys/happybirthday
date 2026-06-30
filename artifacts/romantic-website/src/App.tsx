import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
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
import VideoIntroPage from "@/pages/VideoIntroPage";
import Ending from "@/pages/Ending";
import MusicPlayer from "@/components/MusicPlayer";
import CursorEffect from "@/components/CursorEffect";
import BirthdayIntroOverlay from "@/components/BirthdayIntroOverlay";
import { config } from "@/config";

const queryClient = new QueryClient();

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = sessionStorage.getItem("romantic-auth") === "true";
  if (!isAuthenticated) {
    return <Redirect to="/password" />;
  }
  return <>{children}</>;
}

function VideoIntroRoute() {
  const [, setLocation] = useLocation();

  const handleVideoFinished = () => {
    sessionStorage.setItem("show-final-ending", "true");
    setLocation("/ending");
  };

  return (
    <AuthGuard>
      <VideoIntroPage onNext={handleVideoFinished} />
    </AuthGuard>
  );
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
      <Route path="/video-intro" component={VideoIntroRoute} />
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

function MusicPlayerRouteGuard() {
  const [location] = useLocation();

  const isVideoPage = location === "/video-intro";

  const isFinalEnding =
    location === "/ending" &&
    sessionStorage.getItem("show-final-ending") === "true";

  if (isVideoPage || isFinalEnding) {
    return null;
  }

  return <MusicPlayer />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BirthdayIntroOverlay />

        <WouterRouter>
          <CursorEffect />
          <Router />
          <MusicPlayerRouteGuard />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
