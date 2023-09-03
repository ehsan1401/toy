import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from '../Cards/firstCard';
import SecondCard from '../Cards/SecondCard';
import Toys from '../../DB/Toys.json';


const Home = () => {
    const calculateTimeLeft = () => {
        let year = new Date().getFullYear();
        let difference = +new Date(`09/10/${year}`) - +new Date();
      
        let timeLeft = {};
      
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          };
        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
      });
    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
      
        timerComponents.push(
          <span className="px-2">
            {timeLeft[interval]} {interval}{" "}
          </span>
        );
      });

    return (
        <div className="home-page bg-gray-50 ">
            <header className="w-full h-auto lg:pr-10 py-5 flex bg-gradient-to-r from-orange-500 to-yellow-400">
                <div className=" relative lg:w-1/2 flex">
                    <div className="lg:w-1/3 w-0"></div>
                    <img src="./img/main-page.webp" className="lg:w-2/3 w-0"/>
                </div>
                <div className="info lg:w-1/2 w-full justify-center items-center flex flex-col">
                    <h1 className="text-8xl font-extrabold bg-gradient-to-tr from-blue-700 to-blue-300 text-transparent bg-clip-text py-5 drop-shadow-[0_5px_2px_rgba(51,51,153,0.8)]">Toy Store</h1>
                    <p className="text-center font-light text-lg my-2 text-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.8)]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <div className="my-5">
                        <Link className="px-5 py-3 bg-blue-600 text-white font-bold outline-dashed outline-amber-800 mx-2 rounded-xl hover:bg-blue-900 ">Toys</Link>
                        <Link className="px-5 py-3 bg-blue-400 text-white font-bold outline-dashed outline-amber-800 mx-2 rounded-xl hover:bg-blue-900 ">Games</Link>
                    </div>
                </div>
            </header>
            <div className="pop-products md:h-2/3 h-full flex pb-12">
                    <div className="grid w-full">
                        <h1 className="font-bold text-4xl pl-14 pt-4 text-gray-600"><span className="drop-shadow-[-3px_3px_2px_rgba(0,0,0,0.3)]">Best Sellers</span> <span className=" text-orange-700 font-bold text-lg float-right mt-5 pr-10 hover:underline"><Link to={"*"}>See More...</Link></span></h1>
                        <div className="">
                            <div className="hidden sm:grid md:max-w-4/5 w-full grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 p-10 gap-4">
                                {Toys.slice(0 , 4).map(toy=>{
                                    return(
                                        <Link to={"/toy/" + toy.Code}>
                                            <div className="" key={toy.Code}>
                                                <Card ops={toy.title} text={toy.ShortDescription} imageURL={toy.toyImages} />
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                            <div className="md:hidden p-5 gap-4 flex flex-row">
                                {Toys.slice(0 , 2).map(toy=>{
                                    return(
                                        <div className="" key={toy.Code}>
                                            <Card ops={toy.title} text={toy.ShortDescription} imageURL={toy.toyImages} />
                                        </div>
                                    )
                                })}
                            </div>
                        
                        </div>
                    </div>
                    <div className="pop-image w-0 lg:w-1/5 lg:pb-32 p-0 relative right-0 ">
                        <img src="./img/pop-image.webp" className="h-96 lg:float-right lg:pr-10"/>
                    </div>
            </div>
            <div className="special-offers bg-yellow-400 h-auto flex">
                    <div className="w-1/3 h-auto relative">
                        <div className="h-1/3 flex justify-center items-center font-thin text-2xl text-gray-600"> {timerComponents.length ? timerComponents : <span className="text-red-700 font-semibold text-3xl">Special offer has ended! </span>}</div>
                        <img src="./img/timer.png" className="w-full h-auto absolute bottom-0"/>
                    </div>
                    <div className="offers w-2/3 h-full py-5 px-3">
                        <Link to={"*"} className=" pt-3 pb-5 px-5 float-right hover:underline font-semibold text-lg text-blue-600">See more offers...</Link>
                        <div className="flex flex-row w-full h-full gap-3">
                            {Toys.slice(0 , 4).map(toy=>{
                                return(
                                    <Link to={"/toy/" + toy.Code}>
                                        <div className="cards flex-1" key={toy.Code}>
                                            <SecondCard ops={toy.title} text={toy.ShortDescription} imageURL={toy.toyImages} beforePrice ={toy.PriceBeforeOff} price={toy.Price} symbol={toy.Symbol} />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
            </div>
        </div>
    );
}
 
export default Home;