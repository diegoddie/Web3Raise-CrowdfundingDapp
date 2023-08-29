import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from '../components';
import CallMadeIcon from '@mui/icons-material/CallMade';
import postImage from '../public/post.png';

const Home = () => {
  return (
    <section className="bg-dark px-5 text-white py-32">
      <div className="container mx-auto grid md:grid-cols-2 items-center justify-center md:justify-between">
        <div className="hero-info pb-5 md:pb-0 md:items-start md:mt-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-5 md:items-start">
            <span style={{ color: '#8C35FF' }}>Web3</span>Raise
          </h1>
          <h2 className="text-2xl lg:text-4xl mt-4">
            Rise with us, transforming crowdfunding for{' '}
            <span style={{ color: '#1dc071' }}>social impact.</span>
          </h2>
          <p className="py-5 text-lg tracking-wide font-light">
            Our mission: capturing the power of Web3 tech and decentralized networks to drive positive change worldwide. Join us to unlock collective action's full potential and create a better future together.
          </p>
        </div>
        <div className="flex items-start md:items-center mt-[-150px] mb-5">
          <img src={postImage} width={500} height={500} />
        </div>
      </div>
      <div className="flex justify-center md:justify-start mb-8 md:mb-0 mt-8">
        <Link to="/dashboard">
          <div className="bg-purple-500 px-4 py-2 flex items-center space-x-1 rounded-xl">
            <CustomButton
              btnType="button"
              title="Get started"
              styles="text-lg"
              handleClick={() => {}}
            />
            <CallMadeIcon className="text-white" />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Home