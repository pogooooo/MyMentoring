import { useState } from 'react';
import ProfilePage from "./Pages/ProfilePage.tsx";
import CareerPage from "./Pages/CareerPage.tsx";
import AiLabPage from "./Pages/AiLabPage.tsx";
import VacationPage from "./Pages/VacationPage.js"; // 기존 생활 계획표
import VacationBingo from "./Pages/VacationBingo.jsx"; // [NEW] 방학 퀘스트 빙고 추가
import SharedPage from "./Pages/SharedPage.tsx";
import SideBar from "./components/SideBar.js";

function App() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="min-h-screen bg-[#f0f0f0] p-4 lg:p-8 font-sans text-gray-900">
            <div className="max-w-[1400px] mx-auto bg-white border-2 border-black flex flex-col lg:flex-row min-h-[90vh] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">

                {/* 사이드바에 현재 탭 상태 전달 */}
                <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

                <main className="flex-1 bg-white overflow-y-auto h-[90vh] lg:h-auto">
                    <div className="p-8 h-full max-w-7xl mx-auto">
                        {activeTab === 'profile' && <ProfilePage />}
                        {activeTab === 'career' && <CareerPage />}

                        {/* 기존 계획표와 빙고를 분리 */}
                        {activeTab === 'vacation' && <VacationPage />}
                        {activeTab === 'bingo' && <VacationBingo />}

                        {activeTab === 'ai' && <AiLabPage />}
                        {activeTab === 'share' && <SharedPage />}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
