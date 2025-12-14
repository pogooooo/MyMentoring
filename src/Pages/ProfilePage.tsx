import {useState} from "react";
import {AlignCenter, Copy, CreditCard, LayoutGrid, Palette, User} from "lucide-react";
import SectionTitle from "../components/UI/SectionTitle";
import WorksheetCard from "../components/UI/WorksheetCard";

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        engName: '',
        role: '',
        mbti: '',
        email: '',
        keywords: '',
        style: 'Modern Flat (깔끔하고 단정한)',
        color: '#3b82f6',
        // 신규 추가 필드
        cardSize: '90mm x 50mm (표준 가로형)',
        cardLayout: '중앙 정렬형 (Center Aligned)',
        additionalRequest: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const generatePrompt = () => {
        return `프론트엔드 개발자로서 행동해줘. 아래 정보를 바탕으로 "단일 HTML 파일"로 된 세련된 자기소개 명함(Profile Card) 코드를 작성해줘.

            [1. 필수 데이터]
            - 이름: ${formData.name} (${formData.engName})
            - 직업/역할: ${formData.role}
            - MBTI: ${formData.mbti}
            - 이메일: ${formData.email}
            - 키워드: ${formData.keywords}
            
            [2. 디자인 및 규격 요구사항]
            - 스타일 컨셉: ${formData.style} 느낌으로 디자인해줘.
            - 메인 컬러: ${formData.color} (이 색상을 강조색으로 사용)
            - **카드 규격(Size): CSS container에 \`width: ${formData.cardSize.split('(')[0].trim()};\`, \`height: ${formData.cardSize.includes('세로') ? '90mm' : '50mm'};\` 를 적용하여 실제 명함 크기로 만들어줘.**
            - **레이아웃 배치: 콘텐츠를 "${formData.cardLayout}" 방식으로 배치해줘.**
            - 기술 제약: 별도의 CSS 파일 없이 <style> 태그 내부에 모든 스타일을 작성하고, 화면 중앙에 명함이 위치하도록 Flexbox를 사용해줘.
            
            [3. 추가 요청사항]
            ${formData.additionalRequest ? `- ${formData.additionalRequest}` : '- 특별한 추가 요청 없음.'}
            
            위 내용을 바탕으로 바로 복사해서 사용할 수 있는 완성된 HTML 코드를 보여줘.`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatePrompt());
        alert('코딩 프롬프트가 복사되었습니다! 챗GPT에게 붙여넣으세요.');
    };

    return (
        <div className="flex flex-col xl:flex-row gap-8 h-full">
            {/* [좌측] 데이터 입력 영역 */}
            <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                <SectionTitle icon={User}>HTML Profile Builder</SectionTitle>

                {/* STEP 1 */}
                <WorksheetCard title="STEP 1. 기본 정보 입력">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">이름</label>
                            <input name="name" onChange={handleChange} className="w-full p-2 border-b-2 border-black bg-gray-50 outline-none focus:bg-yellow-50 transition-colors" placeholder="홍길동" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">영문 이름</label>
                            <input name="engName" onChange={handleChange} className="w-full p-2 border-b-2 border-black bg-gray-50 outline-none focus:bg-yellow-50 transition-colors" placeholder="Hong GilDong" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">MBTI / 성향</label>
                            <input name="mbti" onChange={handleChange} className="w-full p-2 border-b-2 border-black bg-gray-50 outline-none focus:bg-yellow-50 transition-colors" placeholder="ENFP" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">연락처/이메일</label>
                            <input name="email" onChange={handleChange} className="w-full p-2 border-b-2 border-black bg-gray-50 outline-none focus:bg-yellow-50 transition-colors" placeholder="user@email.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">희망 직업 (Role)</label>
                        <input name="role" onChange={handleChange} className="w-full p-2 border-b-2 border-black bg-gray-50 outline-none focus:bg-yellow-50 transition-colors" placeholder="웹 개발자" />
                    </div>
                </WorksheetCard>

                {/* STEP 2 (업데이트됨: 사이즈 & 레이아웃 추가) */}
                <WorksheetCard title="STEP 2. 퍼스널 브랜딩 & 규격">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">나를 표현하는 키워드 3개</label>
                            <input name="keywords" onChange={handleChange} className="w-full p-2 border-b-2 border-black bg-gray-50 outline-none focus:bg-blue-50 transition-colors" placeholder="#성실함 #꼼꼼함 #아이디어뱅크" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* 스타일 */}
                            <div>
                                <label className="block text-sm font-bold mb-1 flex items-center gap-1"><Palette size={14}/> 디자인 스타일</label>
                                <select name="style" onChange={handleChange} className="w-full p-2 border-2 border-black outline-none cursor-pointer hover:bg-gray-50 transition-colors text-sm">
                                    <option>Modern Flat (깔끔하고 단정한)</option>
                                    <option>Cyberpunk (네온 효과가 있는)</option>
                                    <option>Soft Pastel (부드러운 감성)</option>
                                    <option>Bold Typography (글자가 강조된)</option>
                                    <option>Retro 8-bit (도트 게임 스타일)</option>
                                </select>
                            </div>
                            {/* 테마 컬러 */}
                            <div>
                                <label className="block text-sm font-bold mb-1">테마 컬러</label>
                                <div className="flex gap-2 items-center border-2 border-black p-1 hover:bg-gray-50 transition-colors">
                                    <input type="color" name="color" onChange={handleChange} value={formData.color} className="w-8 h-8 border border-black cursor-pointer p-0" />
                                    <span className="text-xs font-mono">{formData.color}</span>
                                </div>
                            </div>
                            {/* [신규] 카드 규격 */}
                            <div>
                                <label className="block text-sm font-bold mb-1 flex items-center gap-1"><CreditCard size={14}/> 카드 규격 (Size)</label>
                                <select name="cardSize" onChange={handleChange} className="w-full p-2 border-2 border-black outline-none cursor-pointer hover:bg-gray-50 transition-colors text-sm bg-yellow-50 font-bold">
                                    <option>90mm x 50mm (표준 가로형)</option>
                                    <option>50mm x 90mm (표준 세로형)</option>
                                </select>
                            </div>
                            {/* [신규] 레이아웃 */}
                            <div>
                                <label className="block text-sm font-bold mb-1 flex items-center gap-1"><AlignCenter size={14}/> 레이아웃 배치</label>
                                <select name="cardLayout" onChange={handleChange} className="w-full p-2 border-2 border-black outline-none cursor-pointer hover:bg-gray-50 transition-colors text-sm">
                                    <option>중앙 정렬형 (Center Aligned)</option>
                                    <option>좌측 정렬형 (Left Aligned)</option>
                                    <option>좌우 분할형 (Split Layout)</option>
                                    <option>미니멀리스트 (Minimalist)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </WorksheetCard>

                {/* STEP 3 */}
                <WorksheetCard title="STEP 3. 추가 요청 사항">
                    <label className="block text-sm font-bold mb-2">코드에 반영할 구체적인 요청사항이 있나요?</label>
                    <textarea
                        name="additionalRequest"
                        onChange={handleChange}
                        className="w-full h-24 p-3 border-2 border-black bg-gray-50 outline-none resize-none focus:bg-green-50 placeholder-gray-400 text-sm transition-colors"
                        placeholder="예시: &#10;- 마우스를 올리면 카드가 뒤집히게 해줘 &#10;- 배경에 그라데이션 효과를 넣어줘"
                    />
                </WorksheetCard>
            </div>

            {/* [우측] 프롬프트 출력 영역 */}
            <div className="flex-1 flex flex-col h-full min-h-[500px]">
                <SectionTitle icon={LayoutGrid}>Code Generation Prompt</SectionTitle>

                <div className="flex-1 bg-[#1e1e1e] border-2 border-black p-6 flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-gray-200 font-mono relative group">
                    {/* 터미널 헤더 */}
                    <div className="flex items-center gap-2 border-b border-gray-600 pb-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-400 ml-2">prompt.txt</span>
                    </div>

                    {/* 프롬프트 내용 */}
                    <div className="flex-1 overflow-auto whitespace-pre-wrap leading-relaxed text-sm scrollbar-thin scrollbar-thumb-gray-600 relative">
                        {formData.name ? (
                            <>
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] px-2 py-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Ready to Copy</div>
                                <span className="text-purple-400 font-bold"># 아래 내용을 AI에게 복사해서 붙여넣으세요.</span>
                                <br/><br/>
                                {generatePrompt()}
                                <span className="animate-pulse inline-block w-2 h-4 bg-gray-400 ml-1 align-middle"></span>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                                <CreditCard size={40} className="opacity-50"/>
                                <p className="text-center">좌측의 [STEP 1~3] 정보를 입력하면<br/>이곳에 코딩 명령어가 생성됩니다.</p>
                            </div>
                        )}
                    </div>

                    {/* 복사 버튼 */}
                    <button
                        onClick={copyToClipboard}
                        disabled={!formData.name}
                        className={`mt-4 w-full py-4 font-bold transition-all flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
                ${formData.name ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        <Copy size={20} /> 프롬프트 복사하기
                    </button>
                </div>

                <div className="mt-4 bg-yellow-100 border-2 border-black p-3 text-xs flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    <p><strong>Tip:</strong> "표준 가로형(90x50mm)"을 선택하면 실제 명함 크기의 HTML 코드가 만들어집니다.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage
