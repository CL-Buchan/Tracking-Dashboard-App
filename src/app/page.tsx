import Image from "next/image";
import Link from "next/link";
import RightArrow from "../../public/arrow-right.png";
import Nav from "../app/components/Nav/page";
import ElevenAgent from "./components/ElevenAgent/page";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      
      <main className="flex-1 flex flex-col items-start justify-center px-20 md:px-36 lg:px-50">
        <div className="flex flex-col">
          <div className="flex flex-col w-full pb-20 rounded-t-3xl">
            <h1>Welcome.</h1>
            <p className="text-gray-400">Created by: Callam Buchan</p>
          </div>

          <span className="flex flex-col gap-5 bg-[#1B3409] text-white p-10 rounded-3xl">
            <h2>Who Are We?</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non iure similique numquam deserunt eaque dolorum doloremque sapiente commodi possimus! Fugit corrupti quam voluptate quisquam sunt! Animi distinctio assumenda delectus provident!</p>
          </span>
        </div>

        <ElevenAgent />

        <span className="flex flex-row justify-center items-center mx-auto mt-20">
          <span className="flex flex-row gap-5 justify-center items-center hover:bg-[#9BD770]/90 p-3 rounded-xl duration-300 ease-in-out group transition-all cursor-pointer">
            <span className="w-5 h-5 relative flex justify-center items-center">
              <Image 
              src={RightArrow}
              alt="Arrow Right"
              height={20}
              width={20}
              className="absolute transition-all duration-500 ease-out opacity-0 translate-x-[-6px] group-hover:translate-x-0 group-hover:opacity-100"
              />
            </span>
            <Link
            href="./dashboardPage"
            className="font-medium transition-colors duration-300 ease-in-out group-hover:text-[#1B3409]"
            >
              Go to Dashboard
            </Link>
          </span>
        </span>
      </main>

      <footer>

      </footer>
    </div>
  );
}
