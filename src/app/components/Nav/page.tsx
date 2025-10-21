import Link from "next/link";

export default function Nav() {
  return (
    <header>
        <nav className="">
          <ul className="pt-10 flex flex-row gap-8 duration-300 ease-in-out justify-center">
            <li className="hover:bg-[#9BD770] p-3 rounded-xl duration-300 ease-in-out"><Link href={'/'}>Home</Link></li>
            <li className="hover:bg-[#9BD770] p-3 rounded-xl duration-300 ease-in-out"><Link href={'./dashboardPage'}>Dashboard</Link></li>
          </ul>
        </nav>
    </header>
  );
}
