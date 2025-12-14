import {useState} from "react";
import {BookOpen, Coffee, Gamepad2, Moon, PenTool, Printer, Sparkles, Sun, User, Zap} from "lucide-react";
import WorksheetCard from "../components/UI/WorksheetCard";

const VacationPage = () => {
    // 1. 기본 정보
    const [basicInfo, setBasicInfo] = useState({
        name: '',
        planTitle: ''
    });

    // 2. 목표 데이터
    const [goals, setGoals] = useState({
        study: { target: '', method: '' },
        bucket: { target: '', method: '' },
        habit: { target: '', method: '' }
    });

    // 3. 하루 루틴 데이터
    const [routine, setRoutine] = useState({
        morning: { time: '09:00 ~ 12:00', act: '' },
        afternoon: { time: '13:00 ~ 18:00', act: '' },
        evening: { time: '19:00 ~ 23:00', act: '' }
    });

    // --- [수정된 부분] 안전한 핸들러 (prev 사용) ---
    // 기존 데이터가 날아가지 않도록 (prev) => ... 문법 사용

    const handleBasic = (e) => {
        const { name, value } = e.target;
        setBasicInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleGoal = (type, field, value) => {
        setGoals(prev => ({
            ...prev,
            [type]: {
                ...prev[type], // 기존 study/bucket/habit 데이터 유지
                [field]: value // 변경된 target/method 만 업데이트
            }
        }));
    };

    const handleRoutine = (period, field, value) => {
        setRoutine(prev => ({
            ...prev,
            [period]: {
                ...prev[period],
                [field]: value
            }
        }));
    };

    // --- 프롬프트 생성 로직 ---
    const generateHtmlPrompt = () => {
        // 데이터가 비어있을 경우를 대비해 안전하게 접근 (?. 사용)
        return `숙련된 웹 퍼블리셔이자 학습 코칭 전문가로서 행동해줘.
사용자가 입력한 데이터를 바탕으로 **"A4 용지에 최적화된 방학 생활 계획표"**를 **단일 HTML 파일**로 만들어줘.

[1. 프로젝트 개요]
- 🏷️ 주제: "AI를 이용한 나만의 방학 계획서 만들기"
- 👤 작성자(학생명): ${basicInfo.name || '작성자 미입력'}
- 🚩 프로젝트 타이틀: ${basicInfo.planTitle || '나만의 방학 계획'}

[2. 상세 목표 데이터]
- 📚 [학업/성장] 목표: ${goals.study?.target || ''} (실천법: ${goals.study?.method || ''})
- 🎮 [휴식/보상] 목표: ${goals.bucket?.target || ''} (실천법: ${goals.bucket?.method || ''})
- ⚡ [습관/루틴] 목표: ${goals.habit?.target || ''} (실천법: ${goals.habit?.method || ''})

[3. 하루 고정 루틴 (Time Blocking)]
- 🌅 오전 (${routine.morning?.time}): ${routine.morning?.act || ''}
- ☀️ 오후 (${routine.afternoon?.time}): ${routine.afternoon?.act || ''}
- 🌙 저녁 (${routine.evening?.time}): ${routine.evening?.act || ''}

[4. 기술 및 디자인 요구사항 (필수)]
1. **규격:** CSS @media print를 사용하여 A4 사이즈(210mm x 297mm)에 딱 맞게 레이아웃을 잡아줘.
2. **디자인 컨셉:** 10대에게 어울리는 팝하고 활기찬 디자인 (굵은 테두리, 선명한 컬러, Neo-Brutalism 스타일).
3. **구성 요소:**
   - 상단: 타이틀 및 이름 (큰 폰트)
   - 중단 1: 3대 목표 카드 (Must, Want, Habit) 시각화
   - 중단 2: 주간 계획표 (월~금은 루틴 기반 자동 생성, 토/일은 자유 시간으로 채워 넣기)
   - 하단: "나와의 서약서" (서명란 포함)
4. **기능:** 별도의 CSS 파일 없이 <style> 태그 안에 모든 스타일을 포함시켜줘.

위 내용을 바탕으로 바로 브라우저에서 열어 인쇄할 수 있는 완성된 HTML 코드를 작성해줘.`;
    };

    const copyPrompt = () => {
        navigator.clipboard.writeText(generateHtmlPrompt());
        alert('A4 계획표 생성 코드가 복사되었습니다! ChatGPT에게 붙여넣으세요.');
    };

    return (
        <div className="flex flex-col gap-8 h-full pb-10">
            {/* Header */}
            <div className="border-b-4 border-black pb-4 text-center lg:text-left">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 flex items-center gap-3">
                    <Sun className="text-orange-500" size={40} strokeWidth={3}/>
                    Vacation Master Plan
                </h2>
                <p className="text-lg text-gray-600 font-bold">
                    <span className="text-purple-600 bg-purple-100 px-2 border border-black mx-1">AI x Me</span>
                    나만의 완벽한 방학 전략을 세우고, A4로 출력해서 벽에 붙여보세요!
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* [좌측] 데이터 입력 영역 */}
                <div className="space-y-8">

                    {/* STEP 1. 기본 정보 */}
                    <WorksheetCard title="STEP 1. 프로젝트 선포" titleColor="bg-black">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-gray-500 mb-1 flex items-center gap-1">
                                    <User size={14}/> 작성자 이름
                                </label>
                                <input
                                    name="name"
                                    value={basicInfo.name}
                                    onChange={handleBasic}
                                    className="w-full border-b-2 border-black p-2 bg-gray-50 outline-none focus:bg-yellow-50 font-bold transition-colors"
                                    placeholder="예: 김학생"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-500 mb-1 flex items-center gap-1">
                                    <Sparkles size={14}/> 방학 프로젝트명
                                </label>
                                <input
                                    name="planTitle"
                                    value={basicInfo.planTitle}
                                    onChange={handleBasic}
                                    className="w-full border-b-2 border-black p-2 bg-gray-50 outline-none focus:bg-yellow-50 font-bold transition-colors"
                                    placeholder="예: 중2병 탈출하고 갓생살기"
                                />
                            </div>
                        </div>
                    </WorksheetCard>

                    {/* STEP 2. 목표 상세 설정 */}
                    <WorksheetCard title="STEP 2. 3대 목표와 공략법" titleColor="bg-purple-600">
                        <div className="space-y-6">
                            {/* Must Do */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 border-2 border-black flex items-center justify-center shrink-0 mt-1">
                                    <BookOpen className="text-red-600" size={20} />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-xs font-black text-red-600">MUST DO (성장 목표)</label>
                                    <input
                                        value={goals.study.target}
                                        onChange={(e) => handleGoal('study', 'target', e.target.value)}
                                        className="w-full border-2 border-black p-2 text-sm outline-none focus:shadow-[4px_4px_0px_0px_#fca5a5]"
                                        placeholder="목표: 예) 수학 문제집 1권 완북"
                                    />
                                    <textarea
                                        value={goals.study.method}
                                        onChange={(e) => handleGoal('study', 'method', e.target.value)}
                                        className="w-full border-2 border-black p-2 text-sm outline-none resize-none h-16 bg-red-50 focus:bg-white transition-colors"
                                        placeholder="실천법: 예) 매일 점심 먹고 3장씩 풀기, 틀린 문제 오답노트 필수"
                                    />
                                </div>
                            </div>

                            {/* Want Do */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-black flex items-center justify-center shrink-0 mt-1">
                                    <Gamepad2 className="text-blue-600" size={20} />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-xs font-black text-blue-600">WANT DO (힐링 목표)</label>
                                    <input
                                        value={goals.bucket.target}
                                        onChange={(e) => handleGoal('bucket', 'target', e.target.value)}
                                        className="w-full border-2 border-black p-2 text-sm outline-none focus:shadow-[4px_4px_0px_0px_#93c5fd]"
                                        placeholder="목표: 예) 게임 랭크 다이아 달성"
                                    />
                                    <textarea
                                        value={goals.bucket.method}
                                        onChange={(e) => handleGoal('bucket', 'method', e.target.value)}
                                        className="w-full border-2 border-black p-2 text-sm outline-none resize-none h-16 bg-blue-50 focus:bg-white transition-colors"
                                        placeholder="실천법: 예) 주말에만 3시간씩 집중해서 하기, 평일엔 유튜브 공략만 보기"
                                    />
                                </div>
                            </div>

                            {/* Habit */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-black flex items-center justify-center shrink-0 mt-1">
                                    <Zap className="text-green-600" size={20} />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-xs font-black text-green-600">HABIT (매일 루틴)</label>
                                    <input
                                        value={goals.habit.target}
                                        onChange={(e) => handleGoal('habit', 'target', e.target.value)}
                                        className="w-full border-2 border-black p-2 text-sm outline-none focus:shadow-[4px_4px_0px_0px_#86efac]"
                                        placeholder="목표: 예) 아침 9시 기상 & 이불 개기"
                                    />
                                    <textarea
                                        value={goals.habit.method}
                                        onChange={(e) => handleGoal('habit', 'method', e.target.value)}
                                        className="w-full border-2 border-black p-2 text-sm outline-none resize-none h-16 bg-green-50 focus:bg-white transition-colors"
                                        placeholder="실천법: 예) 알람 시계 책상 위에 두기, 일어나자마자 물 한 잔 마시기"
                                    />
                                </div>
                            </div>
                        </div>
                    </WorksheetCard>

                    {/* STEP 3. 3단 하루 루틴 */}
                    <WorksheetCard title="STEP 3. 루틴 블록 조립" titleColor="bg-blue-600">
                        <p className="text-sm font-bold text-gray-500 mb-4">
                            🧩 구체적인 시간보다는 '무엇을 할지' 큰 덩어리를 정해주세요.
                        </p>

                        <div className="space-y-4">
                            {/* Morning Block */}
                            <div className="flex items-center gap-3 border-2 border-black bg-yellow-50 p-3">
                                <div className="bg-yellow-400 border-2 border-black p-2 rounded-full">
                                    <Sun size={20} className="text-black"/>
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-black text-xs">MORNING</span>
                                        <select
                                            value={routine.morning.time}
                                            onChange={(e) => handleRoutine('morning', 'time', e.target.value)}
                                            className="bg-transparent text-xs font-bold outline-none border-b border-black"
                                        >
                                            <option>09:00 ~ 12:00</option>
                                            <option>08:00 ~ 11:00</option>
                                            <option>10:00 ~ 13:00</option>
                                        </select>
                                    </div>
                                    <input
                                        value={routine.morning.act}
                                        onChange={(e) => handleRoutine('morning', 'act', e.target.value)}
                                        className="w-full bg-white border border-black p-1 text-sm outline-none"
                                        placeholder="예: 영어 학원 숙제, 수학 인강"
                                    />
                                </div>
                            </div>

                            {/* Afternoon Block */}
                            <div className="flex items-center gap-3 border-2 border-black bg-orange-50 p-3">
                                <div className="bg-orange-400 border-2 border-black p-2 rounded-full">
                                    <Coffee size={20} className="text-black"/>
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-black text-xs">AFTERNOON</span>
                                        <select
                                            value={routine.afternoon.time}
                                            onChange={(e) => handleRoutine('afternoon', 'time', e.target.value)}
                                            className="bg-transparent text-xs font-bold outline-none border-b border-black"
                                        >
                                            <option>13:00 ~ 18:00</option>
                                            <option>12:00 ~ 17:00</option>
                                            <option>14:00 ~ 19:00</option>
                                        </select>
                                    </div>
                                    <input
                                        value={routine.afternoon.act}
                                        onChange={(e) => handleRoutine('afternoon', 'act', e.target.value)}
                                        className="w-full bg-white border border-black p-1 text-sm outline-none"
                                        placeholder="예: 친구랑 농구, 자유 시간"
                                    />
                                </div>
                            </div>

                            {/* Evening Block */}
                            <div className="flex items-center gap-3 border-2 border-black bg-indigo-50 p-3">
                                <div className="bg-indigo-400 border-2 border-black p-2 rounded-full">
                                    <Moon size={20} className="text-black"/>
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-black text-xs text-indigo-900">EVENING</span>
                                        <select
                                            value={routine.evening.time}
                                            onChange={(e) => handleRoutine('evening', 'time', e.target.value)}
                                            className="bg-transparent text-xs font-bold outline-none border-b border-black"
                                        >
                                            <option>19:00 ~ 23:00</option>
                                            <option>18:00 ~ 22:00</option>
                                            <option>20:00 ~ 24:00</option>
                                        </select>
                                    </div>
                                    <input
                                        value={routine.evening.act}
                                        onChange={(e) => handleRoutine('evening', 'act', e.target.value)}
                                        className="w-full bg-white border border-black p-1 text-sm outline-none"
                                        placeholder="예: 독서, 넷플릭스, 내일 계획 세우기"
                                    />
                                </div>
                            </div>
                        </div>
                    </WorksheetCard>
                </div>

                {/* [우측] 결과 확인 및 프롬프트 영역 */}
                <div className="flex flex-col h-full">
                    <WorksheetCard title="STEP 4. A4 HTML 계획표 생성" titleColor="bg-black" className="flex-1 flex flex-col min-h-[500px]">
                        <div className="bg-[#1e1e1e] border-2 border-black flex-1 p-6 relative group shadow-inner">
                            {/* 상단 탭 장식 */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-[#2d2d2d] border-b border-black flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"/>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                                <div className="w-3 h-3 rounded-full bg-green-500"/>
                                <span className="ml-2 text-xs text-gray-400 font-mono">my_vacation_plan.html</span>
                            </div>

                            {/* 프롬프트 출력 */}
                            <div className="mt-6 text-gray-300 font-mono text-xs leading-relaxed h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 pb-10">
                                {basicInfo.name || goals.study.target ? (
                                    <>
                                        <span className="text-blue-400 font-bold block mb-2">{''}</span>
                                        <div className="whitespace-pre-wrap">{generateHtmlPrompt()}</div>
                                        <span className="animate-pulse inline-block w-2 h-4 bg-gray-400 ml-1 align-middle mt-2"></span>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-4 mt-10">
                                        <PenTool size={40} className="opacity-50"/>
                                        <p>좌측의 [STEP 1~3] 정보를 입력하면<br/>
                                            <span className="text-yellow-400 font-bold">인쇄 가능한 HTML 계획표 코드</span>가<br/>
                                            이곳에 생성됩니다.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {(basicInfo.name || goals.study.target) && (
                                <div className="absolute bottom-6 left-6 right-6">
                                    <button
                                        onClick={copyPrompt}
                                        className="w-full py-4 font-black text-lg bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Printer size={24} />
                                        코드 복사하기 (For A4 Printing)
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 bg-blue-50 border-2 border-black p-4 flex gap-3 items-start">
                            <span className="text-2xl">💡</span>
                            <div className="text-xs font-bold text-gray-700 space-y-1">
                                <p>1. 위 버튼을 눌러 <strong>프롬프트를 복사</strong>하세요.</p>
                                <p>2. ChatGPT나 Claude에게 붙여넣으세요.</p>
                                <p>3. AI가 작성해준 <strong>HTML 코드를 메모장에 저장(.html)</strong>해서 열면 바로 인쇄할 수 있습니다!</p>
                            </div>
                        </div>
                    </WorksheetCard>
                </div>
            </div>
        </div>
    );
};

export default VacationPage
