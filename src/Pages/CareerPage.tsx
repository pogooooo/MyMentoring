import {useState} from "react";
import WorksheetCard from "../components/UI/WorksheetCard";

const CareerPage = () => {
    const [swot, setSwot] = useState({ S: '', W: '', O: '', T: '' });
    const [values, setValues] = useState({
        first: { val: '', reason: '' },
        second: { val: '', reason: '' },
        third: { val: '', reason: '' }
    });
    const [roadmap, setRoadmap] = useState({ high: '', univ: '', job: '', dream: '' });

    const valueOptions = [
        '선택하세요...', '경제적 보상 (돈)', '사회적 인정 (명예)', '타인에 대한 봉사',
        '워라밸 (일과 삶의 균형)', '성취감/도전', '직업 안정성', '창의성/자율성', '사회적 영향력'
    ];

    const handleSwot = (e) => setSwot({ ...swot, [e.target.name]: e.target.value });
    const handleValueSelect = (rank, val) => setValues({ ...values, [rank]: { ...values[rank], val } });
    const handleValueReason = (rank, reason) => setValues({ ...values, [rank]: { ...values[rank], reason } });
    const handleRoadmap = (e) => setRoadmap({ ...roadmap, [e.target.name]: e.target.value });

    const generateReportPrompt = () => {
        return `전문 진로 상담가(Career Counselor)이자 웹 개발자로서 행동해줘. 
        아래 학생의 진로 데이터를 바탕으로 "A4 용지 규격(210mm x 297mm)에 최적화된 진로 분석 리포트 웹페이지"를 단일 HTML 파일로 제작해줘.
        
        [1. 학생 데이터]
        1) SWOT 분석
           - 강점(S): ${swot.S || '입력 안됨'}
           - 약점(W): ${swot.W || '입력 안됨'}
           - 기회(O): ${swot.O || '입력 안됨'}
           - 위협(T): ${swot.T || '입력 안됨'}
        
        2) 핵심 직업 가치관 (Top 3)
           - 1순위: ${values.first.val} (이유: ${values.first.reason})
           - 2순위: ${values.second.val} (이유: ${values.second.reason})
           - 3순위: ${values.third.val} (이유: ${values.third.reason})
        
        3) 진로 로드맵
           - 고교: ${roadmap.high} -> 대학: ${roadmap.univ} -> 첫 직업: ${roadmap.job} -> 최종 꿈: ${roadmap.dream}
        
        [2. 디자인 및 기능 요구사항]
        - 문서 규격: CSS로 width: 210mm; min-height: 297mm; padding: 20mm; margin: auto; box-shadow 등을 설정하여 실제 A4 용지처럼 보이게 해줘.
        - 디자인 스타일: 깔끔하고 신뢰감 있는 '보고서' 스타일.
        - 콘텐츠 구성: SWOT 매트릭스, 가치관 분석 코멘트, 로드맵 타임라인 시각화.
        
        위 내용을 포함한 완성된 HTML/CSS 코드를 작성해줘.`;
    };

    const copyPrompt = () => {
        navigator.clipboard.writeText(generateReportPrompt());
        alert('진로 분석 리포트 생성 프롬프트가 복사되었습니다!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-24">

            {/* 1. Page Header */}
            <div className="border-b-4 border-black pb-6 text-center lg:text-left">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">My Career Path</h2>
                <p className="text-lg text-gray-600 font-medium">나를 분석하고, 미래를 구체적으로 설계하는 심화 과정</p>
            </div>

            {/* 2. SWOT Analysis (기존 유지 - 전체 너비) */}
            <section>
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-black text-white px-4 py-1 font-bold text-xl">STEP 01</div>
                    <h3 className="text-2xl font-bold">SWOT 자기 분석</h3>
                </div>
                <WorksheetCard title="나의 강점과 약점, 환경 분석">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-black bg-blue-50">
                            <span className="block font-black text-2xl mb-2 text-blue-900">Strength (강점)</span>
                            <textarea name="S" onChange={handleSwot} className="w-full h-24 bg-transparent outline-none resize-none text-base placeholder-blue-300 font-medium" placeholder="내가 남들보다 잘하는 것, 나만의 무기는?" />
                        </div>
                        <div className="p-6 border-b-2 md:border-b-0 border-black bg-red-50">
                            <span className="block font-black text-2xl mb-2 text-red-900">Weakness (약점)</span>
                            <textarea name="W" onChange={handleSwot} className="w-full h-24 bg-transparent outline-none resize-none text-base placeholder-red-300 font-medium" placeholder="자신 없는 부분이나 고치고 싶은 습관은?" />
                        </div>
                        <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-black bg-green-50">
                            <span className="block font-black text-2xl mb-2 text-green-900">Opportunity (기회)</span>
                            <textarea name="O" onChange={handleSwot} className="w-full h-24 bg-transparent outline-none resize-none text-base placeholder-green-600 font-medium" placeholder="나를 도와줄 수 있는 사람, 환경, 자원은?" />
                        </div>
                        <div className="p-6 bg-gray-50">
                            <span className="block font-black text-2xl mb-2 text-gray-700">Threat (위협)</span>
                            <textarea name="T" onChange={handleSwot} className="w-full h-24 bg-transparent outline-none resize-none text-base placeholder-gray-400 font-medium" placeholder="내 꿈을 방해하는 장애물이나 경쟁 요소는?" />
                        </div>
                    </div>
                </WorksheetCard>
            </section>

            {/* 3. Job Values (1단 수직 배치 - 강조형) */}
            <section>
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-black text-white px-4 py-1 font-bold text-xl">STEP 02</div>
                    <h3 className="text-2xl font-bold">직업 가치관 월드컵 (TOP 3)</h3>
                </div>
                <div className="space-y-6">
                    <p className="text-gray-600 mb-2">수많은 가치 중, 내가 직업을 선택할 때 절대 포기할 수 없는 3가지를 순서대로 골라주세요.</p>

                    {/* 1위 (Gold) */}
                    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_#fbbf24] relative overflow-hidden transition-transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-black font-black px-6 py-2 text-lg border-l-2 border-b-2 border-black">1st PRIORITY</div>
                        <div className="flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="w-24 h-24 bg-yellow-300 rounded-full border-2 border-black flex items-center justify-center shrink-0">
                                <span className="text-4xl">👑</span>
                            </div>
                            <div className="flex-1 space-y-3">
                                <label className="block text-lg font-bold">가장 중요하게 생각하는 가치</label>
                                <select className="w-full p-3 border-2 border-black text-lg font-bold bg-yellow-50 outline-none cursor-pointer"
                                        onChange={(e) => handleValueSelect('first', e.target.value)}>
                                    {valueOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <textarea className="w-full p-3 border-2 border-black bg-gray-50 outline-none resize-none h-20"
                                          placeholder="왜 이것이 당신의 인생에서 가장 중요한가요? 구체적인 이유를 적어주세요."
                                          onChange={(e) => handleValueReason('first', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* 2위 (Silver) */}
                    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_#9ca3af] relative overflow-hidden transition-transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 bg-gray-300 text-black font-black px-6 py-2 text-lg border-l-2 border-b-2 border-black">2nd PRIORITY</div>
                        <div className="flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full border-2 border-black flex items-center justify-center shrink-0">
                                <span className="text-4xl">🥈</span>
                            </div>
                            <div className="flex-1 space-y-3">
                                <label className="block text-lg font-bold">두 번째로 중요한 가치</label>
                                <select className="w-full p-3 border-2 border-black text-lg font-bold bg-gray-50 outline-none cursor-pointer"
                                        onChange={(e) => handleValueSelect('second', e.target.value)}>
                                    {valueOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <textarea className="w-full p-3 border-2 border-black bg-gray-50 outline-none resize-none h-20"
                                          placeholder="이 가치가 중요한 이유를 설명해주세요."
                                          onChange={(e) => handleValueReason('second', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* 3위 (Bronze) */}
                    <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_#fdba74] relative overflow-hidden transition-transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 bg-orange-300 text-black font-black px-6 py-2 text-lg border-l-2 border-b-2 border-black">3rd PRIORITY</div>
                        <div className="flex flex-col md:flex-row gap-6 md:items-center">
                            <div className="w-24 h-24 bg-orange-200 rounded-full border-2 border-black flex items-center justify-center shrink-0">
                                <span className="text-4xl">🥉</span>
                            </div>
                            <div className="flex-1 space-y-3">
                                <label className="block text-lg font-bold">세 번째로 중요한 가치</label>
                                <select className="w-full p-3 border-2 border-black text-lg font-bold bg-orange-50 outline-none cursor-pointer"
                                        onChange={(e) => handleValueSelect('third', e.target.value)}>
                                    {valueOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <textarea className="w-full p-3 border-2 border-black bg-gray-50 outline-none resize-none h-20"
                                          placeholder="이 가치가 중요한 이유를 설명해주세요."
                                          onChange={(e) => handleValueReason('third', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Future Roadmap (타임라인 형태 - 상세화) */}
            <section>
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-black text-white px-4 py-1 font-bold text-xl">STEP 03</div>
                    <h3 className="text-2xl font-bold">Future Career Roadmap</h3>
                </div>

                {/* Vertical Timeline Container */}
                <div className="relative pl-8 md:pl-12 border-l-4 border-gray-300 space-y-12">

                    {/* STEP: High School */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] top-0 bg-yellow-400 w-14 h-14 border-4 border-white ring-4 ring-black rounded-full flex items-center justify-center z-10">
                            <span className="font-black text-xl">1</span>
                        </div>
                        <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <h4 className="text-xl font-black mb-1 text-yellow-600 uppercase">Step 01. High School</h4>
                            <p className="text-gray-500 mb-4 font-bold text-sm">기초를 다지는 시기</p>
                            <label className="block font-bold mb-2">희망 고등학교 및 중점 학습 목표</label>
                            <input
                                name="high" onChange={handleRoadmap}
                                className="w-full p-4 text-lg border-2 border-black bg-yellow-50 focus:bg-white outline-none transition-colors"
                                placeholder="예: OO고등학교 진학 후 코딩 동아리 활동하기"
                            />
                        </div>
                    </div>

                    {/* STEP: University */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] top-0 bg-green-400 w-14 h-14 border-4 border-white ring-4 ring-black rounded-full flex items-center justify-center z-10">
                            <span className="font-black text-xl">2</span>
                        </div>
                        <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <h4 className="text-xl font-black mb-1 text-green-700 uppercase">Step 02. University / Major</h4>
                            <p className="text-gray-500 mb-4 font-bold text-sm">전문성을 심화하는 시기</p>
                            <label className="block font-bold mb-2">희망 대학교 및 전공 (구체적 학습 계획)</label>
                            <input
                                name="univ" onChange={handleRoadmap}
                                className="w-full p-4 text-lg border-2 border-black bg-green-50 focus:bg-white outline-none transition-colors"
                                placeholder="예: 컴퓨터공학과에서 인공지능 심화 전공 이수"
                            />
                        </div>
                    </div>

                    {/* STEP: First Job */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] top-0 bg-blue-400 w-14 h-14 border-4 border-white ring-4 ring-black rounded-full flex items-center justify-center z-10">
                            <span className="font-black text-xl">3</span>
                        </div>
                        <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <h4 className="text-xl font-black mb-1 text-blue-700 uppercase">Step 03. First Career</h4>
                            <p className="text-gray-500 mb-4 font-bold text-sm">사회에 첫발을 내딛는 순간</p>
                            <label className="block font-bold mb-2">첫 번째 직업과 기대하는 역할</label>
                            <input
                                name="job" onChange={handleRoadmap}
                                className="w-full p-4 text-lg border-2 border-black bg-blue-50 focus:bg-white outline-none transition-colors"
                                placeholder="예: IT 스타트업 프론트엔드 개발자"
                            />
                        </div>
                    </div>

                    {/* STEP: Final Dream */}
                    <div className="relative">
                        <div className="absolute -left-[54px] md:-left-[70px] top-0 bg-purple-400 w-14 h-14 border-4 border-white ring-4 ring-black rounded-full flex items-center justify-center z-10">
                            <span className="font-black text-xl">4</span>
                        </div>
                        <div className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ring-2 ring-purple-200">
                            <h4 className="text-2xl font-black mb-1 text-purple-700 uppercase">Ultimate Vision</h4>
                            <p className="text-gray-500 mb-6 font-bold text-sm">직업 너머, 내가 세상에 기여하고 싶은 꿈</p>
                            <label className="block font-bold mb-3 text-lg">당신의 궁극적인 꿈은 무엇인가요?</label>
                            <textarea
                                name="dream" onChange={handleRoadmap}
                                className="w-full h-32 p-4 text-lg border-2 border-black bg-purple-50 focus:bg-white outline-none transition-colors resize-none leading-relaxed"
                                placeholder="예: 기술 소외 계층을 위한 교육 플랫폼을 만들어, 누구나 코딩을 배울 수 있는 세상을 만들고 싶습니다."
                            />
                        </div>
                    </div>

                </div>
            </section>

            {/* 5. AI Report Generator (Bottom) */}
            <section className="pt-10 border-t-4 border-black border-dashed">
                <div className="bg-black text-white p-6 md:p-10 flex flex-col items-center text-center shadow-[12px_12px_0px_0px_rgba(100,100,100,0.5)]">
                    <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
                        <span className="animate-bounce">🤖</span> AI CAREER REPORT
                    </h2>
                    <p className="text-gray-300 max-w-2xl text-lg mb-8 leading-relaxed">
                        작성하신 <strong>SWOT, 가치관, 로드맵</strong>을 완벽하게 정리했습니다.<br/>
                        아래 버튼을 눌러 <strong>[A4 사이즈 진로 분석 리포트]</strong> 생성 코드를 복사하세요.
                    </p>

                    <div className="w-full max-w-3xl bg-gray-900 border border-gray-700 p-4 rounded text-left mb-6 font-mono text-sm h-48 overflow-y-auto">
                        {swot.S || values.first.val ? (
                            <span className="text-green-400 whitespace-pre-wrap">{generateReportPrompt()}</span>
                        ) : (
                            <span className="text-gray-500">
                   [WAITING...] 상단의 활동 내용을 모두 입력하면 이곳에 AI 프롬프트가 생성됩니다.
                 </span>
                        )}
                    </div>

                    <button
                        onClick={copyPrompt}
                        className="px-10 py-4 bg-white text-black font-black text-xl hover:bg-yellow-400 transition-colors border-4 border-transparent hover:border-black"
                    >
                        프롬프트 복사하기
                    </button>
                </div>
            </section>

        </div>
    );
};

export default CareerPage
