import React, { useEffect, useState } from "react"
import { Token, useContractFunction, useEthers } from "@usedapp/core"
import { constants, utils } from "ethers"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockDAI.json"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/deployments/map.json"

export const useUnstakeToken = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const { send: unstakeTokenSend, state: unstakeTokenState } =
        useContractFunction(tokenFarmContract, "unstakeToken", {
            transactionName: "Unstake Tokens",
        })

    const unstakeToken = () => unstakeTokenSend(tokenAddress)

    return { unstakeToken, unstakeTokenState }
}