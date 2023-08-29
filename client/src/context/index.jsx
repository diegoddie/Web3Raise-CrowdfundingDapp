import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x72eA8133781E4F57eF5CF60c840BA75B08255206")
    
    const { mutateAsync: createProject, isLoading } = useContractWrite(contract, "createProject")

    const address = useAddress();

    const publishCampaign = async(form) => {
        try{
            const data = await createProject([
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image,
            ])
            console.log("contract call success", data)
        }catch(error){
            console.log("contract call failure", error)
        }
    }

    const getCampaigns = async () =>{
        const campaigns = await contract.call('getProjects')
        console.log(campaigns)
        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign[0],
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.currentAmount?.toString() ?? "0"),
            image: campaign.image,
            pId: i
        }))
        return parsedCampaigns
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
    
        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    
        return filteredCampaigns;
    }

    const donate = async(pId, amount) =>{
        const data = await contract.call('donate', pId, { value: ethers.utils.parseEther(amount)});
        return data
    }

    const getDonations = async(pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations;
    }

    return (
        <StateContext.Provider value={{address, donate, getDonations, getCampaigns, getUserCampaigns, contract, createProject: publishCampaign}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)