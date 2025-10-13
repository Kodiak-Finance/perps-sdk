import { FC, useMemo } from "react";
import { Flex, Text } from "@kodiak-finance/orderly-ui";
import { useAppConfig } from "@kodiak-finance/orderly-react-app";
import { useConfig } from "@kodiak-finance/orderly-hooks";
import { useTranslation } from "@kodiak-finance/orderly-i18n";

export const BrokerWallet: FC = () => {
  const { t } = useTranslation();
  const { appIcons } = useAppConfig();
  const brokerName = useConfig("brokerName");

  const icon = useMemo(() => {
    const { secondary } = appIcons || {};

    if (!secondary?.img && secondary?.component) return null;

    if (secondary?.img) {
      return <img src={secondary?.img} className="oui-w-5 oui-h-5" />;
    }

    if (secondary?.component) {
      return <>{secondary.component}</>;
    }
  }, [appIcons]);

  return (
    <Flex justify="between">
      <Text size="sm" intensity={98}>
        {t("transfer.brokerAccount", { brokerName })}
      </Text>
      {icon}
    </Flex>
  );
};
