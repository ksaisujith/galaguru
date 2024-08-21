import { useEffect } from 'react'
import { hourglass } from 'ldrs'

export default function Loader() {
    useEffect(() => {
        async function getLoader() {
            const { spiral } = await import('ldrs')
            hourglass.register()
        }
        getLoader()
    }, [])
    return <l-hourglass
        size="50"
        bg-opacity="0.1"
        speed="1.5"
        color="black"
    ></l-hourglass>
}

