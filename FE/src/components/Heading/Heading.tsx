

interface HeadingInt {
    title: string
}
const Heading = (props: HeadingInt) => {
    const { title } = props
    return (
        <div className='flex justify-center items-center py-10'>
            <h1 className='text-5xl font-semibold uppercase'>{title}</h1>
        </div>
    )
}

export default Heading