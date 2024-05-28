function Loading(){
    return <div className="h-screen bg-[url('/loading.avif')] bg-no-repeat bg-cover flex justify-end">
        <div className="flex flex-col justify-center">
            <div className="font-normal animate-pulse text-5xl pr-10 sm:pr-20 md:pr-32">
                Loading ....
            </div>
        </div>
    </div>
}
export default Loading;