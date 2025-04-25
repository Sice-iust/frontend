const LoadingBox = () => {
    return (
        
            <div className="flex space-x-2">
                <div className="h-5 w-5 rounded-full bg-orange-300 animate-ping"></div>
                <div className="h-5 w-5 rounded-full bg-orange-400 animate-ping [animation-delay:200ms]"></div>
                <div className="h-5 w-5 rounded-full bg-orange-500 animate-ping [animation-delay:400ms]"></div>
            </div>
        
    );
};

export default LoadingBox;