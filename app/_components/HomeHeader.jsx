import React from 'react'
import Image from 'next/image'
import { Import } from 'lucide-react'
import Link from 'next/link';
import { Button } from "@/components/ui/button";



const HomeHeader = () => {
    const menu = [
        {
            id: 1,
            name: 'Home',
            path: '/'
        },
        {
            id: 2,
            name: 'Explore',
            path: '/explore'
        },
        {
            id: 3,
            name: 'Contact-Us',
            path: '/contactus'
        }
    ]
    return (
        <div className='bg-gray-300 flex items-center justify-between p-4 shadow-sm'>
            <div className=' flex items-center gap-10 '>
                <Image height={60} width={60} src='/logo.svg' alg='logo' />
                <ul className='md:flex gap-8 hidden'>
                    {menu.map((item, index) => (
                        <Link href={item.path}>
                            <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <Button>Get Started</Button>
        </div>
    )
}

export default HomeHeader