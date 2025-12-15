import {MonitorPlay} from "lucide-react";

const Header = (props) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
                <div className="bg-black text-white p-2 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                    <MonitorPlay size={24}/>
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tight">CLASSROOM GALLERY</h2>
                    <p className="text-sm font-bold text-gray-400">친구들의 작품을 감상해보세요!</p>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => props.setMode('list')}
                    className={`px-4 py-2 font-bold border-2 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${props.mode === 'list' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
                >
                    작품 목록
                </button>
                <button
                    onClick={() => props.setMode('upload')}
                    className={`px-4 py-2 font-bold border-2 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${props.mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                >
                    내 작품 올리기
                </button>
            </div>
        </div>
    )
}

export default Header
