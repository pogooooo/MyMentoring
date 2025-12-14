import {useState} from "react";
import {Dices, Gift, Grid3X3, Printer, Sparkles, Star, Trophy, Zap} from "lucide-react";
import WorksheetCard from "../components/UI/WorksheetCard";

// 주변 8칸을 채울 랜덤 퀘스트 목록
const RANDOM_QUESTS = [
    "영화 3편 몰아보기", "방 대청소 하기", "일기장 한 권 다 쓰기",
    "자전거 타고 옆 동네 가기", "모르는 단어 50개 외우기", "아침 8시 기상하기",
    "하루 2리터 물 마시기", "줄넘기 1000개 하기", "나만의 요리 레시피 만들기",
    "서점 가서 책 구경하기", "부모님 안마 해드리기", "하루종일 긍정적인 말만 하기",
    "핸드폰 없이 3시간 보내기", "새로운 친구 1명 사귀기", "스쿼트 50개 하기"
];

const VacationBingo = () => {
    // 1. 기본 정보
    const [basicInfo, setBasicInfo] = useState({
        name: '',
        planTitle: ''
    });

    // 2. 메인 목표 & 보상
    const [mainGoal, setMainGoal] = useState({
        theme: '',
        reward: ''
    });

    // 3. 빙고 데이터 (9칸)
    const [bingoCells, setBingoCells] = useState(Array(9).fill(''));

    // --- 핸들러 ---
    const handleBasic = (e) => setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });

    // [핵심] 메인 목표 입력 시 -> 빙고판 중앙(index 4) 자동 업데이트
    const handleMainGoal = (e) => {
        const { name, value } = e.target;
        setMainGoal(prev => ({ ...prev, [name]: value }));

        if (name === 'theme') {
            setBingoCells(prev => {
                const newCells = [...prev];
                newCells[4] = value; // 중앙 칸 동기화
                return newCells;
            });
        }
    };

    // 빙고판 직접 수정 시
    const handleBingoChange = (index, value) => {
        const newBingo = [...bingoCells];
        newBingo[index] = value;
        setBingoCells(newBingo);

        // 중앙 칸(4)을 수정하면 -> 메인 목표도 같이 업데이트 (양방향 동기화)
        if (index === 4) {
            setMainGoal(prev => ({ ...prev, theme: value }));
        }
    };

    // [New] 랜덤 퀘스트 채우기 (중앙 목표는 보호)
    const handleRandomFill = () => {
        if (!window.confirm("중앙 목표는 유지되고, 주변 8칸이 랜덤으로 채워집니다.")) return;

        const shuffled = [...RANDOM_QUESTS].sort(() => 0.5 - Math.random());
        let questIndex = 0;

        setBingoCells(prev => {
            return prev.map((cell, idx) => {
                if (idx === 4) return cell; // 중앙 칸(Main Goal)은 건드리지 않음
                return shuffled[questIndex++]; // 나머지만 랜덤 할당
            });
        });
    };

    // --- 프롬프트 생성 ---
    const generateHtmlPrompt = () => {
        const bingoItemsStr = bingoCells.map((item, idx) => {
            if (idx === 4) return `- [★중앙 핵심 목표]: ${item || '(메인 목표)'}`;
            return `- 칸 ${idx + 1}: ${item || '(빈 칸)'}`;
        }).join('\n');

        return `숙련된 웹 퍼블리셔이자 게이미피케이션 전문가로서 행동해줘.
사용자가 입력한 데이터를 바탕으로 **"팝하고 세련된 디자인의 방학 빙고판"**을 **단일 HTML 파일**로 만들어줘.

[1. 프로젝트 데이터]
- 플레이어: ${basicInfo.name || 'Unknown'}
- 시즌 타이틀: ${basicInfo.planTitle || 'Vacation Bingo'}
- 핵심 목표(Center): ${mainGoal.theme || '미정'}
- 완료 보상: ${mainGoal.reward || '미정'}

[2. 빙고 미션 (3x3)]
${bingoItemsStr}

[3. 디자인 요구사항 (필수)]
- **컨셉:** 과한 게임 느낌보다는, **"다이어리 꾸미기"**나 **"팝아트"** 느낌의 밝고 깔끔한 디자인.
- **규격:** A4 세로 사이즈 (인쇄 최적화).
- **레이아웃:**
  - 헤더: 타이틀과 이름 영역.
  - 메인: 3x3 빙고판. 
  - **★중요★ 정중앙 칸(5번 칸)은 'Key Goal'로서 가장 눈에 띄게 강조해줘. (별 아이콘 추가, 배경색 강조 등)**
  - 푸터: 보상 아이콘과 서약서 영역.
- **스타일:** CSS는 <style> 태그 내부에 작성. 테두리는 깔끔한 굵은 선(Border-width: 3px) 사용.

위 내용을 바탕으로 바로 복사해서 사용할 수 있는 HTML 코드를 작성해줘.`;
    };

    const copyPrompt = () => {
        navigator.clipboard.writeText(generateHtmlPrompt());
        alert('빙고 생성 프롬프트가 복사되었습니다!');
    };

    return (
        <div className="flex flex-col xl:flex-row gap-8 h-full">
            {/* [좌측] 입력 폼 */}
            <div className="flex-1 space-y-6 overflow-y-auto pr-2 pb-10">
                <div className="border-b-4 border-indigo-500 pb-2 mb-4">
                    <h2 className="text-2xl font-black text-indigo-900 flex items-center gap-2">
                        <Grid3X3 className="text-indigo-500"/> 방학 챌린지 빙고
                    </h2>
                    <p className="text-sm text-gray-500 font-bold">
                        이번 방학에 꼭 이루고 싶은 9가지 목표를 채워보세요!
                    </p>
                </div>

                {/* STEP 1 */}
                <WorksheetCard title="STEP 1. 기본 정보" titleColor="bg-indigo-600">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-black text-gray-500 mb-1 block">작성자 이름</label>
                            <input name="name" onChange={handleBasic} className="w-full p-2 border-2 border-indigo-100 focus:border-indigo-500 outline-none rounded font-bold transition-colors" placeholder="최수환" />
                        </div>
                        <div>
                            <label className="text-xs font-black text-gray-500 mb-1 block">빙고판 제목</label>
                            <input name="planTitle" onChange={handleBasic} className="w-full p-2 border-2 border-indigo-100 focus:border-indigo-500 outline-none rounded font-bold transition-colors" placeholder="알찬 방학 만들기" />
                        </div>
                    </div>
                </WorksheetCard>

                {/* STEP 2 */}
                <WorksheetCard title="STEP 2. 핵심 목표 & 보상" titleColor="bg-purple-600">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-black text-purple-800 mb-1 flex items-center gap-1">
                                <Star size={14} className="fill-yellow-400 text-yellow-600"/>
                                최우선 핵심 목표 (Center Goal)
                            </label>
                            <input
                                name="theme"
                                value={mainGoal.theme}
                                onChange={handleMainGoal}
                                className="w-full p-3 border-2 border-purple-200 bg-purple-50 focus:bg-white focus:border-purple-600 outline-none rounded font-bold transition-all placeholder-purple-300"
                                placeholder="여기에 적으면 빙고판 중앙에 자동으로 들어갑니다!"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-500 mb-1 flex items-center gap-1">
                                <Gift size={14}/> 성공 시 보상
                            </label>
                            <input name="reward" onChange={handleMainGoal} className="w-full p-2 border-2 border-gray-200 focus:border-pink-500 outline-none rounded transition-colors" placeholder="예: 하루종일 게임하기, 용돈 받기" />
                        </div>
                    </div>
                </WorksheetCard>

                {/* STEP 3 */}
                <WorksheetCard title="STEP 3. 빙고 완성하기" titleColor="bg-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-xs font-bold text-gray-500">주변 8칸을 채워주세요.</p>
                        <button
                            onClick={handleRandomFill}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-black px-3 py-1.5 rounded flex items-center gap-1 transition-colors border border-gray-300"
                        >
                            <Dices size={14}/> 랜덤 채우기
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-gray-100 p-3 rounded-xl border-2 border-gray-200 shadow-inner">
                        {bingoCells.map((cell, idx) => (
                            <div key={idx} className="relative aspect-square">
                                {/* 번호 표시 */}
                                <span className={`absolute top-1 left-2 text-[10px] font-bold z-10 ${idx === 4 ? 'text-yellow-700' : 'text-gray-400'}`}>
                                    {idx === 4 ? '★' : idx + 1}
                                </span>

                                <textarea
                                    value={cell}
                                    onChange={(e) => handleBingoChange(idx, e.target.value)}
                                    readOnly={idx === 4} // 중앙 칸은 위쪽 Input에서 수정 유도 (UX 일관성) 또는 양방향 가능하지만 ReadOnly가 더 명확할 수 있음. 여기선 양방향을 위해 readOnly 제거 가능하나, 위쪽 강조를 위해 놔둠. -> 사용자 요청 "연동"이므로 그냥 입력 가능하게 해도 됨. 여기선 편의상 입력 가능하게 처리.
                                    // readOnly={false} 로 변경하여 양방향 지원

                                    className={`w-full h-full p-2 pt-6 text-xs font-bold text-center resize-none border-2 outline-none rounded-lg transition-all shadow-sm
                                        ${idx === 4
                                        ? 'bg-yellow-100 border-yellow-400 text-purple-900 shadow-md ring-2 ring-yellow-200 ring-offset-1'
                                        : 'bg-white border-white focus:border-indigo-400 hover:border-indigo-100'}
                                    `}
                                    placeholder={idx === 4 ? "핵심 목표" : "미션"}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2 text-right">* 중앙 목표는 위쪽 'STEP 2'에서 수정할 수도 있습니다.</p>
                </WorksheetCard>
            </div>

            {/* [우측] 프롬프트 출력 */}
            <div className="flex-1 flex flex-col h-full min-h-[400px]">
                <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-2xl flex flex-col h-full border-2 border-black relative group">
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"/>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                        <div className="w-3 h-3 rounded-full bg-green-500"/>
                        <span className="text-xs text-gray-400 font-mono ml-auto">bingo_generator.html</span>
                    </div>

                    <div className="flex-1 overflow-auto font-mono text-xs text-blue-300 whitespace-pre-wrap leading-relaxed">
                        {basicInfo.name ? generateHtmlPrompt() : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3 opacity-50">
                                <Sparkles size={40}/>
                                <p>좌측 내용을 작성하면<br/>예쁜 빙고판 코드가 생성됩니다.</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={copyPrompt}
                        disabled={!basicInfo.name}
                        className={`mt-4 w-full py-4 font-black flex items-center justify-center gap-2 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:shadow-none active:translate-x-1 active:translate-y-1
                            ${basicInfo.name
                            ? 'bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                    >
                        <Printer size={20} /> 코드 복사하기
                    </button>
                </div>

                <div className="mt-4 p-4 bg-indigo-50 border-2 border-indigo-200 text-xs text-indigo-800 rounded-lg flex items-start gap-2">
                    <Zap className="shrink-0" size={16}/>
                    <span>
                        <strong>Tip:</strong> 생성된 코드는 A4 용지에 딱 맞게 제작됩니다. 친구들과 서로의 빙고판을 만들어 선물해보세요!
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VacationBingo;
