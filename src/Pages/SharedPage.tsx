import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Upload, FileCode, Eye, X, MonitorPlay, Filter, Check, Download } from "lucide-react";

import Header from "../components/SharedPage/Header"
import Category from "../components/SharedPage/Category"
import UploadForm from "../components/SharedPage/UploadForm"

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

    const handleDownload = () => {
        if (!selectedHtml) return;

        // 1. HTML 내용을 담은 Blob 객체 생성
        const blob = new Blob([selectedHtml], { type: 'text/html' });

        // 2. 가상의 다운로드 링크 생성
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        // 3. 파일명 설정 (필요에 따라 동적으로 변경 가능)
        a.download = 'student-project.html';

        // 4. 링크 클릭 및 정리
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="h-full flex flex-col relative">

            {/* 상단 헤더 & 모드 전환 */}
            <Header mode={mode} setMode={setMode} />

            {/* --- [모드 1: 리스트 뷰] --- */}
            <Category mode={mode} CATEGORIES={CATEGORIES} setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} filteredPosts={filteredPosts} setSelectedHtml={setSelectedHtml} />

            {/* --- [모드 2: 업로드 폼] --- */}
            <UploadForm mode={mode} setName={setName} projectType={projectType} setProjectType={setProjectType} handleFileChange={handleFileChange}
            fileName={fileName} setMode={setMode} handleUpload={handleUpload} />

            {/* --- [HTML 뷰어 모달] --- */}
            {selectedHtml && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full h-full max-w-7xl max-h-[90vh] border-2 border-black flex flex-col shadow-2xl relative rounded-sm overflow-hidden">
                        {/* 모달 헤더 */}
                        <div className="flex justify-between items-center p-4 border-b-2 border-black bg-gray-100">
                            <span className="font-black flex items-center gap-2 text-lg">
                                <MonitorPlay size={20}/> PROJECT VIEWER
                            </span>
                            <div className="flex items-center gap-2">
                                {/* 다운로드 버튼 추가됨 */}
                                <button
                                    onClick={handleDownload}
                                    className="bg-blue-500 text-white p-2 border-2 border-black hover:bg-blue-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                                    title="Download Source"
                                >
                                    <Download size={20} strokeWidth={3}/>
                                </button>

                                <button
                                    onClick={() => setSelectedHtml(null)}
                                    className="bg-red-500 text-white p-2 border-2 border-black hover:bg-red-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                                >
                                    <X size={20} strokeWidth={3}/>
                                </button>
                            </div>
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
