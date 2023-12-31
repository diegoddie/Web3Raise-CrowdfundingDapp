import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import PaidIcon from '@mui/icons-material/Paid';
import { useContract, useContractWrite } from "@thirdweb-dev/react";

const CreateCampaign = () => {
  const { contract } = useContract("0x72eA8133781E4F57eF5CF60c840BA75B08255206");
  const { mutateAsync: createProject } = useContractWrite(contract, "createProject")

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  })

  const handleFormFieldChange = (fieldName, e) => {
    setForm({...form, [fieldName]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(form)

    checkIfImage(form.image, async(exists) => {
      if(exists){
        setIsLoading(true)
        try{
          const data = await createProject({args: [
            form.title,
            form.description,
            ethers.utils.parseUnits(form.target, 18),
            new Date(form.deadline).getTime(),
            form.image
          ]});
          console.info("contract call successs", data);
        } catch (err) {
          console.error("contract call failure", err);
        }
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader />}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a campaign🚀</h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
        />
        <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[100px] rounded-[10px]'>
          <PaidIcon style={{ color: 'white' }} className="w-[40px] h-[40px] object-contain"/>
          <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>You will get 100% of the raised amount</h4>
        </div>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
        <FormField 
          labelName="Campaign Image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />
        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign