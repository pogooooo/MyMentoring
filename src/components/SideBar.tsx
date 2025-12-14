import {ArrowRight, Bot, Calendar, Map, User} from "lucide-react";

const SideBar = (props) => {

    const NavItem = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => props.setActiveTab(id)}
            className={
                `w-full flex items-center gap-3 px-6 py-5 text-left border-b-2 border-black transition-all
                ${props.activeTab === id ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}
            `}
        >
            <Icon size={22} />
            <span className="font-bold text-lg tracking-tight">{label}</span>
            {props.activeTab === id && <ArrowRight className="ml-auto" size={18} />}
        </button>
    );

    return (
        <aside
            className="w-full lg:w-72 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-white flex flex-col z-10">
            <div className="p-8 border-b-2 border-black bg-yellow-400">
                <h1 className="text-3xl font-black leading-none tracking-tighter">MY<br/>FUTURE<br/>CANVAS.</h1>
                <p className="text-xs font-bold mt-2 opacity-80">STUDENT PLANNER v2.0</p>
            </div>
            <nav className="flex-1 overflow-auto">
                <NavItem id="profile" label="자기소개 & 명함" icon={User}/>
                <NavItem id="career" label="진로 & 가치관" icon={Map}/>
                <NavItem id="vacation" label="방학 계획표" icon={Calendar}/>
                <NavItem id="ai" label="AI 연구소" icon={Bot}/>
            </nav>
            <div className="p-4 border-t-2 border-black bg-gray-50 text-center">
                <p className="text-xs font-bold text-gray-400">DESIGNED FOR EDUCATION</p>
            </div>
        </aside>
    )
}

export default SideBar
