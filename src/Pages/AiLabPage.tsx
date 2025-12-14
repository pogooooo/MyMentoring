import {Bot} from "lucide-react";

const AiLabPage = () => (
    <div className="h-full flex flex-col items-center justify-center p-10 border-2 border-black bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
        <div className="bg-white p-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center max-w-2xl">
            <Bot size={64} className="mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-4 uppercase">AI Playground</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                지금까지 만든 <strong>명함 프롬프트</strong>와 <strong>진로 계획서</strong>를 <br/>
                AI가 분석하여 이미지를 그려주고 조언해주는 기능을 개발 중입니다.
            </p>
            <div className="inline-block border-2 border-black bg-yellow-400 px-6 py-2 font-black text-xl transform -rotate-2">
                OPENING SOON
            </div>
        </div>
    </div>
);

export default AiLabPage
