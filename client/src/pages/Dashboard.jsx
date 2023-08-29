import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../components';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getCampaigns()
    console.log(data)
    // Ordina le campagne in base alla data di scadenza
    const sortedCampaigns = data.sort((a, b) => a.deadline - b.deadline);
    setCampaigns(sortedCampaigns)
    setIsLoading(false)
  }

  useEffect(() =>{
    if(contract) fetchCampaigns();
  }, [address, contract])

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Dashboard
