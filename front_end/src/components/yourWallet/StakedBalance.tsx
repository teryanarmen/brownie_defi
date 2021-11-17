import { useEthers, useTokenBalance } from "@usedapp/core"
import { Box, makeStyles } from "@material-ui/core"
import { Token } from "../Main"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../../components/BalanceMsg"
import { useStakedBalance } from "../../hooks/useStakedBalance"
import { mergeClasses } from "@material-ui/styles"

export interface StakedBalanceProps {
    token: Token
}

export const StakedBalance = ({ token }: StakedBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const stakedBalance = useStakedBalance(address)
    const formattedTokenBalance: number = stakedBalance ? parseFloat(formatUnits(stakedBalance, 18)) : 0
    return (
        <>
            <BalanceMsg
                label={`${name}`}
                tokenImgSrc={image}
                amount={formattedTokenBalance} />
        </>)
}