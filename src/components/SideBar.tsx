import { ArrowRight, Bot, Calendar, Gamepad2, Map, Share2, User } from "lucide-react";

const SideBar = (props) => {

    const NavItem = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => props.setActiveTab(id)}
            className={
                `w-full flex items-center gap-3 px-6 py-5 text-left border-b-2 border-black transition-all group
                ${props.activeTab === id
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'}
            `}
        >
            <Icon size={22} className={`transition-transform ${props.activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className="font-bold text-lg tracking-tight">{label}</span>
            {props.activeTab === id && <ArrowRight className="ml-auto animate-pulse" size={18} />}
        </button>
    );

    return (
        <aside
            className="w-full lg:w-72 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-white flex flex-col z-10">
            {/* 로고 영역 */}
            <div className="p-8 border-b-2 border-black bg-yellow-400">
                <h1 className="text-3xl font-black leading-none tracking-tighter">MY<br/>FUTURE<br/>CANVAS.</h1>
                <p className="text-xs font-bold mt-2 opacity-80">STUDENT PLANNER v2.0</p>
            </div>

            {/* 네비게이션 영역 */}
            <nav className="flex-1 overflow-auto">
                <NavItem id="profile" label="자기소개 & 명함" icon={User}/>
                <NavItem id="career" label="진로 & 가치관" icon={Map}/>

                {/* 방학 관련 메뉴 분리 */}
                <NavItem id="vacation" label="방학 생활 계획표" icon={Calendar}/>
                <NavItem id="bingo" label="방학 퀘스트 빙고" icon={Gamepad2}/>

                <NavItem id="ai" label="AI 연구소" icon={Bot}/>
                <NavItem id="share" label="작품 공유 갤러리" icon={Share2}/>
            </nav>

            {/* 하단 푸터 */}
            <div className="p-4 border-t-2 border-black bg-gray-50 text-center">
                <p className="text-xs font-bold text-gray-400">DESIGNED FOR EDUCATION</p>
            </div>
        </aside>
    )
}

export default SideBar;
