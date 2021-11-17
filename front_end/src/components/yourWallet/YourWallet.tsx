import { Token } from "../Main"
import React, { useState } from "react"
import { Box, makeStyles, Grid } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { Tab } from "@material-ui/core"
import { WalletBalance } from "./WalletBalance"
import { UnstakeForm } from "./UnstakeForm"
import { StakeForm } from "./StakeForm"
import { classicNameResolver } from "typescript"
import { useTotalBalance } from "../../hooks/useTotalBalance"
import { formatUnits } from "@ethersproject/units"
import { StakedBalance } from "./StakedBalance"

interface YourWalletProps {
    supportedTokens: Array<Token>
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundColor: "white",
        borderRadius: "25px"
    },
    header: {
        color: "white"
    },
    amount: {
        fontWeight: 700
    }
}))

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

    const stakedBalance = useTotalBalance()
    const formattedStakedBalance: number = stakedBalance ? parseFloat(formatUnits(stakedBalance, 18)) : 0

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }
    const classes = useStyles()
    return (
        <Box>
            <h1 className={classes.header}> Your Wallet! </h1>
            <h2 className={classes.header}> Your Total Stake:  ${formattedStakedBalance?.toString()} </h2>
            <Box className={classes.box}>
                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList onChange={handleChange} aria-label="stake form tabs" centered>
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab label={token.name}
                                    value={index.toString()}
                                    key={index} />
                            )
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <>
                                <TabPanel value={index.toString()} key={index} className={classes.container}>
                                    <div className={classes.tabContent}>
                                        <WalletBalance
                                            token={supportedTokens[selectedTokenIndex]}
                                        />
                                        {/* this is the same as */}
                                        {/* The chainlink_defi props passing */}
                                        <StakeForm token={supportedTokens[selectedTokenIndex]} />
                                    </div>
                                    <div className={classes.tabContent}>
                                        <StakedBalance
                                            token={supportedTokens[selectedTokenIndex]}
                                        />
                                        {/* this is the same as */}
                                        {/* The chainlink_defi props passing */}
                                        <UnstakeForm token={supportedTokens[selectedTokenIndex]} />
                                    </div>
                                </TabPanel>

                            </>
                        )
                    })}
                </TabContext>
            </Box>

        </Box>
    )
}