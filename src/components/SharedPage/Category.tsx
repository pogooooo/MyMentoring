import {Check, Eye, FileCode, Filter} from "lucide-react";

const Category = (props) => {
    return(
        <div>
            {props.mode === 'list' && (
                <div className="flex-1 flex flex-col min-h-0"> {/* min-h-0는 스크롤을 위해 중요 */}

                    {/* [추가됨] 카테고리 필터 버튼 영역 */}
                    <div className="flex flex-wrap gap-2 mb-6 pb-2 border-b-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-2 mr-2 text-gray-500 font-bold">
                            <Filter size={18} />
                            <span className="text-sm">Filter:</span>
                        </div>
                        {props.CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => props.setCategoryFilter(cat.id)}
                                className={`
                                    px-3 py-1.5 rounded-full text-sm font-bold border-2 border-black transition-all flex items-center gap-1
                                    ${props.categoryFilter === cat.id
                                    ? `${cat.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-[-2px]`
                                    : 'bg-white text-gray-500 hover:bg-gray-100'
                                }
                                `}
                            >
                                {cat.label}
                                {props.categoryFilter === cat.id && <Check size={14} strokeWidth={4} />}
                            </button>
                        ))}
                    </div>

                    {/* 필터링된 리스트 출력 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pb-10 pr-2">
                        {props.filteredPosts.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-gray-400">
                                <FileCode size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="font-bold text-lg">아직 등록된 작품이 없어요.</p>
                                <p className="text-sm">가장 먼저 작품을 올려보세요!</p>
                            </div>
                        ) : (
                            props.filteredPosts.map((post) => (
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
                                        onClick={() => props.setSelectedHtml(post.htmlContent)}
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
        </div>
    )
}

export default Category
