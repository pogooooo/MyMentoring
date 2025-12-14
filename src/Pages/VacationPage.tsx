import {useState} from "react";
import {BookOpen, Clock, Gamepad2, LayoutTemplate, ListTodo, MessageSquarePlus, PenTool, Printer, Sparkles, Sun, User, Zap} from "lucide-react";
import WorksheetCard from "../components/UI/WorksheetCard";

const VacationPage = () => {
    // 1. 기본 정보
    const [basicInfo, setBasicInfo] = useState({
        name: '',
        planTitle: ''
    });

    // 2. 목표 데이터
    const [goals, setGoals] = useState({
        must: ['', '', ''],
        want: ['', '', ''],
        habit: ['', '', '']
    });

    // 3. 시간표 설계 데이터
    const [schedule, setSchedule] = useState({
        wakeTime: '08:00',
        bedTime: '23:00',
        focusMorning: '',
        focusAfternoon: '',
        focusEvening: '',
        visualStyle: 'timeline'
    });

    // 4. [New] 추가 요청 사항 (커스텀 스타일)
    const [additionalRequest, setAdditionalRequest] = useState('');

    // --- 핸들러 ---
    const handleBasic = (e) => setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });

    const handleGoalChange = (category, index, value) => {
        setGoals(prev => {
            const newList = [...prev[category]];
            newList[index] = value;
            return { ...prev, [category]: newList };
        });
    };

    const handleSchedule = (e) => setSchedule({ ...schedule, [e.target.name]: e.target.value });

    // --- 프롬프트 생성 로직 ---
    const generateHtmlPrompt = () => {
        const makeList = (arr) => arr.filter(t => t.trim()).map(t => `- ${t}`).join('\n') || '(내용 없음)';

        return `숙련된 웹 퍼블리셔이자 학습 플래너 전문가로서 행동해줘.
사용자가 입력한 데이터를 바탕으로 **"A4 용지 출력용 방학 생활 계획표"**를 **단일 HTML 파일**로 만들어줘.

[1. 프로젝트 개요]
- 🏷️ 주제: "AI와 함께 만드는 방학 마스터 플랜"
- 👤 작성자: ${basicInfo.name || '미입력'}
- 🚩 타이틀: ${basicInfo.planTitle || '나만의 방학 계획'}

[2. 3대 목표 리스트]
- 📚 Must Do (성장):
${makeList(goals.must)}
- 🎮 Want Do (힐링):
${makeList(goals.want)}
- ⚡ Habit (습관):
${makeList(goals.habit)}

[3. 하루 시간표 설계 (Blueprint)]
- ⏰ 기상 시간: ${schedule.wakeTime} / 취침 시간: ${schedule.bedTime}
- ☀️ 오전 집중 포인트: ${schedule.focusMorning || '자율 학습'}
- 🌤️ 오후 집중 포인트: ${schedule.focusAfternoon || '취미 및 활동'}
- 🌙 저녁 집중 포인트: ${schedule.focusEvening || '휴식 및 점검'}
- **🎨 시각화 스타일: ${schedule.visualStyle === 'timeline' ? '세로형 타임테이블 (시간순 나열)' : '원형 생활계획표 (파이 차트 형태)'}**

[4. ✨ 추가 요청사항 (Custom Style)]
사용자가 특별히 요청한 디자인/기능 요구사항이야. 이 내용을 **최우선으로 반영**해줘.
${additionalRequest ? `- ${additionalRequest}` : '- 특별한 추가 요청 없음 (기본 팝 스타일 적용)'}

[5. 디자인 및 기술 요구사항 (필수)]
1. **규격:** CSS @media print를 사용하여 A4 사이즈(210mm x 297mm)에 꽉 차게 디자인.
2. **레이아웃:**
   - 상단: 타이틀 및 이름.
   - 좌측/상단: 3대 목표 리스트를 박스 형태로 예쁘게 배치.
   - 중앙/메인: 위 [3. 시간표 설계] 데이터를 바탕으로 실제 시간표(Timetable)를 그려줘.
   - 하단: "나와의 약속" 서명란.
3. **스타일:** 10대 감성의 팝하고 깔끔한 디자인 (Tailwind CSS 스타일 권장).
4. **기능:** 별도의 CSS 파일 없이 <style> 태그 내부에 작성.

위 내용을 바탕으로 바로 인쇄 가능한 완성된 HTML 코드를 작성해줘.`;
    };

    const copyPrompt = () => {
        navigator.clipboard.writeText(generateHtmlPrompt());
        alert('커스텀 요청이 포함된 코드가 복사되었습니다!');
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
                    <span className="text-purple-600 bg-purple-100 px-2 border border-black mx-1">V 2.1</span>
                    목표는 심플하게, 시간표는 확실하게! AI가 그려주는 나만의 계획표
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
                                    onChange={handleBasic}
                                    className="w-full border-b-2 border-black p-2 bg-gray-50 outline-none focus:bg-yellow-50 font-bold transition-colors"
                                    placeholder="예: 갓생살기 프로젝트"
                                />
                            </div>
                        </div>
                    </WorksheetCard>

                    {/* STEP 2. 목표 리스트 */}
                    <WorksheetCard title="STEP 2. 핵심 목표 3-3-3" titleColor="bg-purple-600">
                        <div className="space-y-6">
                            {/* Must Do */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-black text-red-600 mb-2">
                                    <BookOpen size={16}/> MUST DO (꼭 해야 하는 것 3가지)
                                </label>
                                <div className="space-y-2">
                                    {goals.must.map((goal, idx) => (
                                        <div key={`must-${idx}`} className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}.</span>
                                            <input
                                                value={goal}
                                                onChange={(e) => handleGoalChange('must', idx, e.target.value)}
                                                className="flex-1 border-b border-gray-300 p-1 text-sm outline-none focus:border-red-500 focus:bg-red-50 transition-colors"
                                                placeholder="예: 수학 문제집 완북"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Want Do */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-black text-blue-600 mb-2">
                                    <Gamepad2 size={16}/> WANT DO (하고 싶은 것 3가지)
                                </label>
                                <div className="space-y-2">
                                    {goals.want.map((goal, idx) => (
                                        <div key={`want-${idx}`} className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}.</span>
                                            <input
                                                value={goal}
                                                onChange={(e) => handleGoalChange('want', idx, e.target.value)}
                                                className="flex-1 border-b border-gray-300 p-1 text-sm outline-none focus:border-blue-500 focus:bg-blue-50 transition-colors"
                                                placeholder="예: 게임 티어 올리기"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Habit */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-black text-green-600 mb-2">
                                    <Zap size={16}/> HABIT (매일 지킬 습관 3가지)
                                </label>
                                <div className="space-y-2">
                                    {goals.habit.map((goal, idx) => (
                                        <div key={`habit-${idx}`} className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}.</span>
                                            <input
                                                value={goal}
                                                onChange={(e) => handleGoalChange('habit', idx, e.target.value)}
                                                className="flex-1 border-b border-gray-300 p-1 text-sm outline-none focus:border-green-500 focus:bg-green-50 transition-colors"
                                                placeholder="예: 물 2L 마시기"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </WorksheetCard>

                    {/* STEP 3. 시간표 설계 */}
                    <WorksheetCard title="STEP 3. 하루 시간표 설계도" titleColor="bg-blue-600">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-black text-gray-500 mb-1">기상 시간</label>
                                    <input type="time" name="wakeTime" value={schedule.wakeTime} onChange={handleSchedule} className="w-full border-2 border-black p-2 rounded font-bold bg-white"/>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-black text-gray-500 mb-1">취침 시간</label>
                                    <input type="time" name="bedTime" value={schedule.bedTime} onChange={handleSchedule} className="w-full border-2 border-black p-2 rounded font-bold bg-white"/>
                                </div>
                            </div>

                            <hr className="border-gray-200"/>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black bg-yellow-100 px-2 py-1 rounded w-16 text-center">오전</span>
                                    <input name="focusMorning" onChange={handleSchedule} className="flex-1 border-b-2 border-gray-200 p-1 text-sm focus:border-yellow-400 outline-none" placeholder="주요 활동 키워드" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black bg-orange-100 px-2 py-1 rounded w-16 text-center">오후</span>
                                    <input name="focusAfternoon" onChange={handleSchedule} className="flex-1 border-b-2 border-gray-200 p-1 text-sm focus:border-orange-400 outline-none" placeholder="주요 활동 키워드" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black bg-indigo-100 px-2 py-1 rounded w-16 text-center">저녁</span>
                                    <input name="focusEvening" onChange={handleSchedule} className="flex-1 border-b-2 border-gray-200 p-1 text-sm focus:border-indigo-400 outline-none" placeholder="주요 활동 키워드" />
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t-2 border-black">
                                <label className="block text-xs font-black text-gray-500 mb-2 flex items-center gap-1">
                                    <LayoutTemplate size={14}/> 시간표 시각화 스타일
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setSchedule({...schedule, visualStyle: 'timeline'})}
                                        className={`p-3 border-2 text-xs font-bold flex flex-col items-center gap-2 transition-all
                                            ${schedule.visualStyle === 'timeline' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-400 hover:border-gray-400'}
                                        `}
                                    >
                                        <ListTodo size={20}/> 세로형 타임테이블
                                    </button>
                                    <button
                                        onClick={() => setSchedule({...schedule, visualStyle: 'circle'})}
                                        className={`p-3 border-2 text-xs font-bold flex flex-col items-center gap-2 transition-all
                                            ${schedule.visualStyle === 'circle' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-400 hover:border-gray-400'}
                                        `}
                                    >
                                        <Clock size={20}/> 원형 생활계획표
                                    </button>
                                </div>
                            </div>
                        </div>
                    </WorksheetCard>

                    {/* [New] STEP 4. 추가 요청 사항 */}
                    <WorksheetCard title="STEP 4. 추가 요청 사항 (Custom)" titleColor="bg-gray-800">
                        <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <MessageSquarePlus size={16} className="text-gray-800"/>
                            코드에 반영할 구체적인 요청사항이 있나요?
                        </label>
                        <textarea
                            value={additionalRequest}
                            onChange={(e) => setAdditionalRequest(e.target.value)}
                            className="w-full h-32 p-4 border-2 border-black bg-gray-50 outline-none resize-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all placeholder-gray-400 text-sm"
                            placeholder={`예시:\n- 전체적인 배경색을 연한 민트색으로 해줘\n- 시간표 옆에 귀여운 고양이 아이콘을 넣어줘\n- 폰트를 손글씨체 느낌으로 적용해줘`}
                        />
                    </WorksheetCard>

                </div>

                {/* [우측] 결과 확인 및 프롬프트 영역 */}
                <div className="flex flex-col h-full">
                    <WorksheetCard title="STEP 5. HTML 생성기" titleColor="bg-black" className="flex-1 flex flex-col min-h-[500px]">
                        <div className="bg-[#1e1e1e] border-2 border-black flex-1 p-6 relative group shadow-inner">
                            {/* 상단 탭 장식 */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-[#2d2d2d] border-b border-black flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"/>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                                <div className="w-3 h-3 rounded-full bg-green-500"/>
                                <span className="ml-2 text-xs text-gray-400 font-mono">vacation_plan_custom.html</span>
                            </div>

                            {/* 프롬프트 출력 */}
                            <div className="mt-6 text-gray-300 font-mono text-xs leading-relaxed h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 pb-10">
                                {basicInfo.name || goals.must[0] ? (
                                    <>
                                        <span className="text-blue-400 font-bold block mb-2">{''}</span>
                                        <div className="whitespace-pre-wrap">{generateHtmlPrompt()}</div>
                                        <span className="animate-pulse inline-block w-2 h-4 bg-gray-400 ml-1 align-middle mt-2"></span>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-4 mt-10">
                                        <PenTool size={40} className="opacity-50"/>
                                        <p>좌측의 정보와 <span className="text-yellow-400 font-bold">추가 요청사항</span>을<br/>입력하면 코드가 생성됩니다.</p>
                                    </div>
                                )}
                            </div>

                            {(basicInfo.name || goals.must[0]) && (
                                <div className="absolute bottom-6 left-6 right-6">
                                    <button
                                        onClick={copyPrompt}
                                        className="w-full py-4 font-black text-lg bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Printer size={24} />
                                        코드 복사하기 (A4 Print Ready)
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 bg-blue-50 border-2 border-black p-4 flex gap-3 items-start">
                            <span className="text-2xl">💡</span>
                            <div className="text-xs font-bold text-gray-700 space-y-1">
                                <p>1. <strong>추가 요청사항</strong>에 "흑백으로 만들어줘" 라고 적으면 잉크를 아낄 수 있습니다.</p>
                                <p>2. "아이유 사진을 배경으로 넣어줘(이미지 URL)" 같은 구체적인 요청도 가능합니다!</p>
                            </div>
                        </div>
                    </WorksheetCard>
                </div>
            </div>
        </div>
    );
};

export default VacationPage;
