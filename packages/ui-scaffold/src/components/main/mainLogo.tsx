import { FC } from "react";
import { useAppConfig } from "@kodiak-finance/orderly-react-app";
import { OrderlyLogo } from "../icons";
import { Logo } from "@kodiak-finance/orderly-ui";

type MainLogoProps = {
  src?: string;
  alt?: string;
};

export const MainLogo: FC<MainLogoProps> = (props) => {
  const { appIcons } = useAppConfig();

  if (props.src) {
    return <Logo src={props.src} alt={props.alt} />;
  }

  const { main } = appIcons || {};

  if (main?.img) {
    return <img src={main?.img} />;
  }

  if (main?.component) {
    return main.component;
  }

  return <OrderlyLogo />;
};
