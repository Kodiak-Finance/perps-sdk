import {Box, Button, ExclamationFillIcon, Flex, modal, Text, Tooltip} from "@orderly.network/ui"
import {RefreshIcon} from "../../icons";

interface IProps {
    hasPositions: boolean;
    unsettledPnl: number;
    onSettlle: () => Promise<any>;
}

export const UnsettlePnlInfo = ({hasPositions, unsettledPnl, onSettlle}: IProps) => {
    if (unsettledPnl === 0 && !hasPositions) {
        return <></>
    }
    const settlePnlDialog = () => {
        modal.confirm({
            title: 'Settle PnL',
            content: <Box>Are you sure you want to settle your PnL?<br/> Settlement will take up to 1 minute before you
                can withdraw your available balance.</Box>,
            onOk: () => {
                return onSettlle();
            }

        })
    }
    return (
        <Flex justify='between' className='oui-text-2xs oui-text-base-contrast-36 oui-mt-1 oui-mx-2'>
            <Flex itemAlign='center' justify='start' gap={1}>

                <Tooltip
                    className='oui-max-w-[274px]'
                    content={'Unsettled balance can not be withdrawn. In order to withdraw, please settle your balance first.'}
                >

                <Flex itemAlign='center' justify='start' gap={1}>
                    <ExclamationFillIcon size={14} className='oui-text-warning'/>
                    <Text
                        className="oui-border-dashed oui-border-b oui-border-line-12 oui-cursor-pointer"
                    >
                        Unsettled:
                    </Text>
                </Flex>
                </Tooltip>
                <Text.numeral showIdentifier coloring weight="semibold" dp={6}>
                    {unsettledPnl}
                </Text.numeral>
                <Text>USDC</Text>
            </Flex>
            <Flex itemAlign='center' gap={1} className='oui-cursor-pointer'>
                <RefreshIcon/>
                <Text
                    data-testid="oui-testid-withdraw-dialog-settle-text"
                    size="2xs"
                    color="primaryLight"
                    className=" oui-select-none"
                    onClick={settlePnlDialog}
                >
                    Settle
                </Text>

            </Flex>
        </Flex>
    )
}