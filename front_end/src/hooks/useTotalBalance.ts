import { useContractCall, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import { utils, BigNumber, constants } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"

/**
 * Get the staking balance of a certain token by the user in our TokenFarm contract
 * @param address - The contract address of the token
 */
export const useTotalBalance = (): BigNumber | undefined => {
    const { account, chainId } = useEthers()
    console.log(account)
    const { abi } = TokenFarm
    const tokenFarmContractAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero

    const tokenFarmInterface = new utils.Interface(abi)

    const [totalBalance] =
        useContractCall({
            abi: tokenFarmInterface,
            address: tokenFarmContractAddress,
            method: "getUserTotalValue",
            args: [account],
        }) ?? []

    return totalBalance
}