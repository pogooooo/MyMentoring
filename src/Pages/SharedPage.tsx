import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Upload, FileCode, Eye, X, MonitorPlay, Filter, Check } from "lucide-react";

// 재사용을 위한 필터 카테고리 정의
const CATEGORIES = [
    { id: 'all', label: '전체 보기', color: 'bg-gray-800 text-white' },
    { id: '명함 만들기', label: '명함', color: 'bg-yellow-400 text-black' },
    { id: '진로 계획세우기', label: '진로', color: 'bg-green-400 text-black' },
    { id: '방학 계획 세우기', label: '방학', color: 'bg-pink-400 text-black' },
];

const SharedPage = () => {
    const [mode, setMode] = useState('list'); // 'list' | 'upload'
    const [posts, setPosts] = useState([]);
    const [selectedHtml, setSelectedHtml] = useState(null);

    // [추가됨] 카테고리 필터 상태 (기본값: 'all')
    const [categoryFilter, setCategoryFilter] = useState('all');

    // 업로드 폼 데이터
    const [name, setName] = useState('');
    const [projectType, setProjectType] = useState('명함 만들기');
    const [htmlContent, setHtmlContent] = useState('');
    const [fileName, setFileName] = useState('');

    // 게시글 불러오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const q = query(collection(db, "student_projects"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const loadedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(loadedPosts);
            } catch (e) {
                console.error("데이터 불러오기 실패:", e);
            }
        };
        fetchPosts();
    }, [mode]);

    // 필터링된 리스트 계산
    const filteredPosts = posts.filter(post => {
        if (categoryFilter === 'all') return true;
        return post.projectType === categoryFilter;
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (event) => {
                setHtmlContent(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleUpload = async () => {
        if (!name || !htmlContent) return alert("이름과 파일을 모두 입력해주세요!");

        try {
            await addDoc(collection(db, "student_projects"), {
                name,
                projectType,
                htmlContent,
                createdAt: serverTimestamp()
            });
            alert("업로드 성공!");
            setMode('list');
            setName('');
            setHtmlContent('');
            setFileName('');
            // 업로드 후에는 해당 카테고리나 전체를 보도록 설정 가능 (선택사항)
            setCategoryFilter('all');
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("업로드 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="h-full flex flex-col relative">

            {/* 상단 헤더 & 모드 전환 */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-black text-white p-2 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                        <MonitorPlay size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">CLASSROOM GALLERY</h2>
                        <p className="text-sm font-bold text-gray-400">친구들의 작품을 감상해보세요!</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setMode('list')}
                        className={`px-4 py-2 font-bold border-2 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${mode === 'list' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
                    >
                        작품 목록
                    </button>
                    <button
                        onClick={() => setMode('upload')}
                        className={`px-4 py-2 font-bold border-2 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                    >
                        내 작품 올리기
                    </button>
                </div>
            </div>

            {/* --- [모드 1: 리스트 뷰] --- */}
            {mode === 'list' && (
                <div className="flex-1 flex flex-col min-h-0"> {/* min-h-0는 스크롤을 위해 중요 */}

                    {/* [추가됨] 카테고리 필터 버튼 영역 */}
                    <div className="flex flex-wrap gap-2 mb-6 pb-2 border-b-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-2 mr-2 text-gray-500 font-bold">
                            <Filter size={18} />
                            <span className="text-sm">Filter:</span>
                        </div>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategoryFilter(cat.id)}
                                className={`
                                    px-3 py-1.5 rounded-full text-sm font-bold border-2 border-black transition-all flex items-center gap-1
                                    ${categoryFilter === cat.id
                                    ? `${cat.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]`
                                    : 'bg-white text-gray-500 hover:bg-gray-100'
                                }
                                `}
                            >
                                {cat.label}
                                {categoryFilter === cat.id && <Check size={14} strokeWidth={4} />}
                            </button>
                        ))}
                    </div>

                    {/* 필터링된 리스트 출력 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pb-10 pr-2">
                        {filteredPosts.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-gray-400">
                                <FileCode size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="font-bold text-lg">아직 등록된 작품이 없어요.</p>
                                <p className="text-sm">가장 먼저 작품을 올려보세요!</p>
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
                                <div key={post.id} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={`text-xs font-bold px-2 py-1 border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] ${
                                            post.projectType === '명함 만들기' ? 'bg-yellow-400' :
                                                post.projectType === '진로 계획세우기' ? 'bg-green-400' : 'bg-pink-400'
                                        }`}>
                                            {post.projectType}
                                        </span>
                                        <FileCode size={20} className="text-gray-400"/>
                                    </div>
                                    <h3 className="text-xl font-black mb-1 truncate">{post.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4 font-medium">Click to view project</p>

                                    <button
                                        onClick={() => setSelectedHtml(post.htmlContent)}
                                        className="mt-auto w-full py-3 bg-black text-white font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors rounded-sm"
                                    >
                                        <Eye size={18}/> 바로 보기
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* --- [모드 2: 업로드 폼] --- */}
            {mode === 'upload' && (
                <div className="max-w-2xl mx-auto w-full bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in slide-in-from-bottom-4">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                        <Upload size={24}/> 작품 업로드
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-extrabold mb-2">이름 (작성자)</label>
                            <input
                                value={name} onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 border-2 border-black outline-none focus:bg-yellow-50 font-bold placeholder:font-normal transition-colors"
                                placeholder="본인의 이름을 입력하세요 (예: 홍길동)"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-extrabold mb-2">프로젝트 종류</label>
                            <div className="relative">
                                <select
                                    value={projectType} onChange={(e) => setProjectType(e.target.value)}
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
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="group-hover:scale-110 transition-transform duration-200">
                                    <FileCode className="mx-auto mb-3 text-gray-400 group-hover:text-blue-500" size={40} />
                                </div>
                                <p className="font-bold text-lg text-gray-700">{fileName || "여기를 클릭하여 HTML 파일을 선택하세요"}</p>
                                <p className="text-xs text-gray-400 mt-2 font-bold">.html 파일만 업로드 가능합니다</p>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <button
                                onClick={() => setMode('list')}
                                className="flex-1 py-4 font-bold border-2 border-black hover:bg-gray-100 transition-all"
                            >
                                취소하기
                            </button>
                            <button
                                onClick={handleUpload}
                                className="flex-[2] py-4 bg-blue-600 text-white font-bold border-2 border-black text-lg hover:bg-blue-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
                            >
                                게시판에 올리기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- [HTML 뷰어 모달] --- */}
            {selectedHtml && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full h-full max-w-7xl max-h-[90vh] border-2 border-black flex flex-col shadow-2xl relative rounded-sm overflow-hidden">
                        {/* 모달 헤더 */}
                        <div className="flex justify-between items-center p-4 border-b-2 border-black bg-gray-100">
                            <span className="font-black flex items-center gap-2 text-lg">
                                <MonitorPlay size={20}/> PROJECT VIEWER
                            </span>
                            <button
                                onClick={() => setSelectedHtml(null)}
                                className="bg-red-500 text-white p-2 border-2 border-black hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                            >
                                <X size={20} strokeWidth={3} />
                            </button>
                        </div>
                        {/* iframe */}
                        <div className="flex-1 bg-gray-800 relative w-full h-full">
                            <iframe
                                srcDoc={selectedHtml}
                                title="Student Project"
                                className="w-full h-full border-0 bg-white"
                                sandbox="allow-scripts allow-same-origin allow-modals allow-popups"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SharedPage;
