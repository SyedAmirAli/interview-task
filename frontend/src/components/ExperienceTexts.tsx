export default function ExperienceTexts() {
    return (
        <div className="h-[86vh] relative">
            <div className="absolute top-0 left-0 w-full h-full z-1 grid grid-cols-2 justify-between p-20">
                <div className="bg-no-repeat bg-cover relative before:absolute before:content-[''] before:w-1/2 before:h-full before:top-0 before:left-0 before:bg-gradient-to-r before:from-white before:to-transparent logo-svg-bg"></div>
                <div className="bg-no-repeat bg-cover relative before:absolute before:content-[''] before:w-1/2 before:h-full before:top-0 before:right-0 before:bg-gradient-to-r before:from-transparent before:to-white logo-svg-bg"></div>
            </div>

            <div className="absolute w-full h-full flex items-center justify-center">
                <div className="text-[5.5vw] font-poppins font-medium leading-[1.2]">
                    <p>Crafting digital</p>
                    <p className="bg-[linear-gradient(45deg,#545cff,#1f2246_80%)] bg-clip-text text-transparent text-right">
                        experiences
                    </p>
                    <p>since 2004</p>
                </div>
            </div>
        </div>
    );
}
