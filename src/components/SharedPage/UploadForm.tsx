import {FileCode, Upload} from "lucide-react";

const UploadForm = (props) => {
    return(
        <div>
            {props.mode === 'upload' && (
                <div className="max-w-2xl mx-auto w-full bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                        <Upload size={24}/> 작품 업로드
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-extrabold mb-2">이름 (작성자)</label>
                            <input
                                value={name} onChange={(e) => props.setName(e.target.value)}
                                className="w-full p-4 border-2 border-black outline-none focus:bg-yellow-50 font-bold placeholder:font-normal transition-colors"
                                placeholder="본인의 이름을 입력하세요 (예: 홍길동)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-extrabold mb-2">프로젝트 종류</label>
                            <div className="relative">
                                <select
                                    value={props.projectType} onChange={(e) => props.setProjectType(e.target.value)}
                                    className="w-full p-4 border-2 border-black outline-none bg-white cursor-pointer appearance-none font-bold"
                                >
                                    <option>명함 만들기</option>
                                    <option>진로 계획세우기</option>
                                    <option>방학 계획 세우기</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">▼</div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-extrabold mb-2">HTML 파일 선택</label>
                            <div className="relative border-2 border-dashed border-black bg-gray-50 p-10 text-center hover:bg-blue-50 transition-colors cursor-pointer group">
                                <input
                                    type="file" accept=".html"
                                    onChange={props.handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="group-hover:scale-110 transition-transform duration-200">
                                    <FileCode className="mx-auto mb-3 text-gray-400 group-hover:text-blue-500" size={40} />
                                </div>
                                <p className="font-bold text-lg text-gray-700">{props.fileName || "여기를 클릭하여 HTML 파일을 선택하세요"}</p>
                                <p className="text-xs text-gray-400 mt-2 font-bold">.html 파일만 업로드 가능합니다</p>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <button
                                onClick={() => props.setMode('list')}
                                className="flex-1 py-4 font-bold border-2 border-black hover:bg-gray-100 transition-all"
                            >
                                취소하기
                            </button>
                            <button
                                onClick={props.handleUpload}
                                className="flex-[2] py-4 bg-blue-600 text-white font-bold border-2 border-black text-lg hover:bg-blue-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                            >
                                게시판에 올리기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UploadForm
