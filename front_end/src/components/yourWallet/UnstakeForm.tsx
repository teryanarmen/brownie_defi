import React, { useEffect, useState } from "react"
import { Token } from "../Main"
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { useStakedBalance } from "../../hooks/useStakedBalance"
import { useUnstakeToken } from "../../hooks/useUnstakeToken"
import { utils } from "ethers"

export interface UnstakeFormProps {
    token: Token
}

export const UnstakeForm = ({ token }: UnstakeFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const { notifications } = useNotifications()

    const { unstakeToken, unstakeTokenState } = useUnstakeToken(tokenAddress)
    const handleUnstakeSubmit = () => {
        return unstakeToken()
    }

    const isMining = unstakeTokenState.status === "Mining"
    const [showUnstakeTokenSuccess, setShowUnstakeTokenSuccess] = useState(false)
    const handleCloseSnack = () => {
        setShowUnstakeTokenSuccess(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Unstake Tokens").length > 0) {
            setShowUnstakeTokenSuccess(true)
        }
    }, [notifications, showUnstakeTokenSuccess])

    return (
        <>
            <div>
                <Button
                    onClick={handleUnstakeSubmit}
                    color="primary"
                    size="large"
                    disabled={isMining}>
                    {isMining ? <CircularProgress size={26} /> : "Unstake!"}

                </Button>
            </div>
            <Snackbar
                open={showUnstakeTokenSuccess}
                autoHideDuration={3500}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Tokens Unstaked!
                </Alert>
            </Snackbar>
        </>
    )
}