"use client";

import { useEffect, useState } from "react";
import Box from "./Box";
import { Button } from "./buttons";
import FlexBox from "./FlexBox";
import Typography from "./Typography";

const PwaInstalBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [iget, setIGet] = useState(true);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  return (
    iget && (
      <Box
        backgroundColor="primary.400"
        className="install-banner"
        style={{
          // backgroundColor: "rgba(255,255,255, 95%)",
          position: "absolute",
          zIndex: 112,
          top: "65px",
          width: "100%",
          padding: "12px",
        }}
      >
        <FlexBox justifyContent="center">
          <Typography mt="0.5rem" color="primary.text">
            Adicione o app a sua tela inicial!
          </Typography>
          <Button
            variant="outlined"
            ml="0.25rem"
            color="primary.text"
            onClick={handleInstallClick}
          >
            Instalar
          </Button>
          <Button
            variant="outlined"
            ml="0.25rem"
            color="error"
            onClick={() => setIGet(false)}
          >
            X
          </Button>
        </FlexBox>
      </Box>
    )
  );
};

export default PwaInstalBanner;
