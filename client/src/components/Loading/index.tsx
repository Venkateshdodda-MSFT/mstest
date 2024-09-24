
interface Loading {
    height: string,
    width: string,
}

const Loading = ({ height, width }: Loading) => <div className={`${height} ${width} rounded-full border-8 border-gray border-t-blue animate-spin`}></div>

export default Loading;
