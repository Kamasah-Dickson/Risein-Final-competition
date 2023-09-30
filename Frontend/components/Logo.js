import Image from 'next/image'

const Logo = () => {
    return (
        <div>
            <Image src="/logo.png" width={60} height={60} layout="fixed" />
        </div>
    )
}

export default Logo
