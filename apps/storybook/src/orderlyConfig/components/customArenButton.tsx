import { useTranslation } from "@orderly.network/i18n";
import { Text, cn } from "@orderly.network/ui";
import { useScaffoldContext } from "@orderly.network/ui-scaffold";

type MainNavCustomRenderOptions = {
  name: string;
  href: string;
  isActive?: boolean;
};

const isOnGoing = true; // fake ongoing status for demo

export function customArenRender() {
  if (isOnGoing) {
    return (options: MainNavCustomRenderOptions) => {
      return (
        <CustomArenButton
          className={"oui-bg-base-9 after:oui-bg-base-9"}
          routeOptions={options}
        />
      );
    };
  }
}

const CustomArenButton: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  routeOptions: MainNavCustomRenderOptions;
}> = (props) => {
  const { className, style, routeOptions } = props;
  const { name, href, isActive } = routeOptions;
  const { t } = useTranslation();
  const { routerAdapter } = useScaffoldContext();

  const navigateAren = () => {
    routerAdapter?.onRouteChange?.({
      name,
      href,
      scope: "leftNav",
    });
  };

  return (
    <div
      className={cn(
        className,
        "oui-relative oui-z-0 oui-flex oui-cursor-pointer oui-select-none oui-items-center oui-justify-center oui-gap-1 oui-rounded-full oui-border oui-border-solid oui-border-transparent oui-px-3 oui-py-1",
        "before:oui-absolute before:oui-inset-0 before:oui-z-[-1] before:oui-rounded-full before:oui-content-['']",
        "after:oui-absolute after:oui-inset-px after:oui-z-[-1] after:oui-box-border after:oui-rounded-full after:oui-content-['']",
        "oui-gradient-button",
      )}
      style={style}
      onClick={navigateAren}
    >
      <Battle />
      <Text.gradient
        color={"brand"}
        angle={45}
        className="oui-whitespace-nowrap oui-break-normal oui-text-sm"
      >
        {t("tradingLeaderboard.arena")}
      </Text.gradient>
    </div>
  );
};

const Battle: React.FC<{ isActive?: boolean }> = (props) => {
  const { isActive = true } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      focusable={false}
    >
      <path
        d="M1.33268 1.3334L1.99935 4.00006L6.30404 8.05215L4.69727 9.75788L4.13737 9.19538L3.19466 10.1381L3.78581 10.7292L2.11393 12.5027L1.80404 12.1954L0.861328 13.1381L2.86133 15.1381L3.80404 14.1954L3.49414 13.8855L5.27018 12.2162L5.86133 12.8048L6.80404 11.862L6.24414 11.3021L7.99935 9.6459L9.74935 11.2943L9.18164 11.862L10.1243 12.8048L10.7207 12.2084L12.4967 13.8777L12.179 14.1954L13.1243 15.1381L15.1243 13.1381L14.1816 12.1954L13.8796 12.4975L12.2077 10.7214L12.791 10.1381L11.8483 9.19538L11.2936 9.75006L9.69466 8.05215L9.69726 8.04954L7.99935 6.25006L3.99935 2.00006L1.33268 1.3334ZM14.666 1.3334L11.9993 2.00006L8.76758 5.43236L10.5645 7.23183L13.9993 4.00006L14.666 1.3334Z"
        fill="url(#paint0_linear_27354_16428)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_27354_16428"
          x1="15.1243"
          y1="8.23574"
          x2="0.861328"
          y2="8.23574"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor={
              isActive ? "rgb(var(--oui-gradient-brand-end))" : "currentColor"
            }
          />
          <stop
            stopColor={
              isActive ? "rgb(var(--oui-gradient-brand-start))" : "currentColor"
            }
            offset={1}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
