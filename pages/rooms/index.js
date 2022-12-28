import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Rooms.module.css'
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getRooms } from '../api/rooms';
import { useSession, signIn, signOut } from "next-auth/react"
let socket;


export default function Rooms({ rooms }) {
    const { data: session } = useSession()
    if (rooms.length === 0) {
        return (
            <div>
                <h1>Rooms</h1>
                <p>Il n'y a pas de rooms disponibles</p>
            </div>
        )
    } else {
        return (

            <div className="p-10">
                <h1 className="text-2xl">Rooms</h1>
                {!session && <>
                    <p>Not signed in</p>
                    <button onClick={() => signIn()}>Sign in</button>
                </>}
                {session && <>
                    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {rooms.map((room) => (
                            <li key={room.id} >
                                <div className="col-span-1 flex shadow-sm rounded-md">
                                    <div className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm font-medium rounded-l-md">
                                        0/{room.maxUsers}
                                    </div>
                                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white  truncate">
                                        <div className="flex-1 px-4 py-2 text-sm truncate">
                                            <a href={'/rooms' + room.slug} className="text-gray-900 font-medium hover:text-gray-600">{room.slug}</a>
                                            <p className="text-gray-500">{room.description}</p>
                                        </div>
                                        <div className="flex-shrink-0 pr-2">
                                            <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <a href={'/rooms/' + room.slug}>Rejoindre</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>}


            </div>
        )
    }

}


export async function getServerSideProps(context) {
    const rooms = await getRooms().then(res => JSON.parse(res));
    return {
        props: {
            rooms
        }
    }
}