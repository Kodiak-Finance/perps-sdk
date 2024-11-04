import { KeyboardEventHandler } from "react";
import {
  Box,
  cn,
  Flex,
  Text,
  Tooltip,
  Input,
  modal,
} from "@orderly.network/ui";
import { FavoriteTab } from "@orderly.network/hooks";
import {
  UseFavoritesTabScriptOptions,
  UseFavoritesTabScriptReturn,
} from "./favoritesTabs.script";
import { AddIcon, AddIcon2, EditIcon, TrashIcon } from "../../icons";

export type FavoritesTabProps = UseFavoritesTabScriptReturn &
  Pick<UseFavoritesTabScriptOptions, "size">;

export const FavoritesTab: React.FC<FavoritesTabProps> = (props) => {
  const {
    open,
    setOpen,
    container,
    inputRef,
    inputWidth,
    spanRef,
    editing,
    value,
    onValueChange,
    updateCurTab,
    onEdit,
    addTab,
    delTab,
    size = "default",
    scrollable,
  } = props;

  const { selectedFavoriteTab, favoriteTabs, updateSelectedFavoriteTab } =
    props.favorite;

  const addIconWidth = size === "sm" ? 28 : 36;
  const tabHeight = size === "sm" ? 18 : 24;
  const overLen = value?.length > 15;

  const onDel = (item: any) => {
    modal.confirm({
      title: "Delete list",
      content: (
        <Text size="sm">{`Are you sure you want to delete ${item.name}?`}</Text>
      ),
      onOk() {
        delTab(item);
        return Promise.resolve();
      },
    });
  };

  const onKeyUp: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") {
      updateCurTab(overLen);
    }
  };

  const renderActions = (item: any) => {
    return (
      <Flex gapX={2} itemAlign="center" px={2} py={1}>
        <EditIcon
          className="oui-text-base-contrast-36 hover:oui-text-base-contrast oui-cursor-pointer"
          onClick={() => {
            onEdit(item);
          }}
        />
        <TrashIcon
          className="oui-text-base-contrast-36 hover:oui-text-base-contrast oui-cursor-pointer"
          onClick={() => {
            onDel(item);
          }}
        />
      </Flex>
    );
  };

  const renderAdd = () => {
    const overTabs = favoriteTabs.length >= 10;

    return (
      <Tooltip
        open={overTabs ? undefined : false}
        // @ts-ignore
        content={
          <Text size="2xs" intensity={80}>
            Maximum 10 groups in the favorite list
          </Text>
        }
        className="oui-bg-base-6"
        delayDuration={0}
        arrow={{ className: "oui-fill-base-6" }}
      >
        <Flex
          className={cn(
            "oui-inline-flex",
            overTabs ? "oui-cursor-not-allowed" : "oui-cursor-pointer",
            overTabs
              ? "oui-bg-base-3"
              : "oui-bg-[linear-gradient(270deg,rgba(89,176,254,0.12)_0%,rgba(38,254,254,0.12)_100%)]"
          )}
          width={addIconWidth}
          height={tabHeight}
          r="base"
          justify="center"
          itemAlign="center"
          onClick={overTabs ? undefined : addTab}
        >
          {overTabs ? (
            <AddIcon className="oui-text-base-contrast-36 oui-w-3 oui-h-3" />
          ) : (
            <AddIcon2 className="oui-w-3 oui-h-3" />
          )}
        </Flex>
      </Tooltip>
    );
  };

  const renderInput = (isActive: boolean) => {
    return (
      <Tooltip
        open={overLen}
        // @ts-ignore
        content={
          <Text size="2xs" intensity={80}>
            List name cannot exceed 15 characters
          </Text>
        }
        className="oui-bg-base-6"
        delayDuration={0}
        sideOffset={0}
      >
        <Input
          ref={inputRef}
          style={
            overLen
              ? { width: inputWidth }
              : {
                  // @ts-ignore
                  "--oui-gradient-angle": "270deg",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  width: inputWidth,
                }
          }
          classNames={{
            root: cn(
              "oui-p-0 oui-rounded oui-px-2 oui-my-[1px]",
              "focus-visible:oui-outline-none focus-within:oui-outline-transparent",
              size === "sm" ? "oui-h-[18px]" : "oui-h-[24px]",
              isActive &&
                cn(
                  overLen
                    ? "oui-bg-danger/15"
                    : "oui-bg-[linear-gradient(270deg,rgba(89,176,254,0.12)_0%,rgba(38,254,254,0.12)_100%)]"
                )
            ),
            input: cn(
              "oui-font-semibold oui-caret-[rgba(217,217,217,1)]",
              overLen
                ? "oui-text-danger"
                : "oui-text-transparent oui-gradient-brand ",
              size === "sm" ? "oui-text-2xs" : "oui-text-sm"
            ),
          }}
          value={value}
          onValueChange={onValueChange}
          onBlur={() => {
            updateCurTab(overLen);
          }}
          onKeyUp={onKeyUp}
          autoComplete="off"
        />
      </Tooltip>
    );
  };

  const renderContent = (item: FavoriteTab, isActive: boolean) => {
    if (editing && isActive) {
      return renderInput(isActive);
    }

    const textProps = {
      weight: "semibold",
      size: size === "sm" ? "2xs" : "sm",
      className: size === "sm" ? "oui-leading-[18px]" : "oui-leading-[24px]",
      as: "div",
    } as any;

    const content = isActive ? (
      <Text.gradient color="brand" angle={270} {...textProps}>
        {item.name}
      </Text.gradient>
    ) : (
      <Text {...textProps}>{item.name}</Text>
    );

    return (
      <Box
        r="base"
        px={2}
        height={tabHeight}
        className={cn(
          "oui-cursor-pointer oui-select-none",
          isActive
            ? "oui-markets-favorites-active-tab-item"
            : "oui-markets-favorites-tab-item",
          isActive
            ? "oui-bg-[linear-gradient(270deg,rgba(89,176,254,0.12)_0%,rgba(38,254,254,0.12)_100%)]"
            : "oui-bg-line-6 oui-text-base-contrast-36 hover:oui-text-base-contrast"
        )}
        onClick={() => {
          updateSelectedFavoriteTab(item);
          isActive && setOpen(true);
        }}
      >
        {content}
      </Box>
    );
  };

  return (
    <Flex width="100%" gapX={3}>
      <Flex
        ref={container}
        id="oui-markets-favorites-tabs-container"
        className={cn(
          "oui-relative oui-cursor-pointer oui-hide-scrollbar",
          "oui-overflow-hidden oui-overflow-x-auto"
        )}
        my={3}
        gapX={size === "sm" ? 2 : 3}
        width="100%"
      >
        {favoriteTabs?.slice(0, 10)?.map((item: any) => {
          const isActive = selectedFavoriteTab.id === item.id;
          return (
            <Tooltip
              key={item.id}
              open={isActive && !editing ? open : false}
              onOpenChange={(open) => {
                isActive && setOpen(open);
              }}
              // @ts-ignore
              content={renderActions(item)}
              delayDuration={0}
              className={cn("oui-bg-base-5")}
              arrow={{
                className: "oui-fill-base-5",
              }}
            >
              {renderContent(item, isActive)}
            </Tooltip>
          );
        })}

        {!scrollable && renderAdd()}

        <Text size="xs" ref={spanRef} className="oui-invisible">
          {value}
        </Text>
      </Flex>
      {scrollable && renderAdd()}
    </Flex>
  );
};
