import { useEthers, useTokenBalance } from "@usedapp/core"
import { Box, makeStyles } from "@material-ui/core"
import { Token } from "../Main"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../../components/BalanceMsg"
import { useTotalBalance } from "../../hooks/useTotalBalance"
import { mergeClasses } from "@material-ui/styles"

export interface WalletBalanceProps {
    token: Token
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (
        <>
            <BalanceMsg
                label={`${name}`}
                tokenImgSrc={image}
                amount={formattedTokenBalance} />
        </>)
}