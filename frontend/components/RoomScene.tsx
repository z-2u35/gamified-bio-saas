"use client";
import { useState } from "react";
import { ExternalLink, Play, FileText, HeartHandshake, X } from "lucide-react";

// Định nghĩa kiểu dữ liệu
interface Item {
  _id: string;
  itemId: string;
  x: number;
  y: number;
  actionType: "LINK" | "VIDEO" | "TEXT" | "DONATE";
  actionValue: string;
  title: string;
}

interface BioData {
  username: string;
  themeId: string;
  items: Item[];
}

export default function RoomScene({ data }: { data: BioData }) {
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  // Chọn icon dựa trên loại hành động
  const getIcon = (type: string) => {
    switch (type) {
      case "VIDEO": return <Play size={18} />;
      case "TEXT": return <FileText size={18} />;
      case "DONATE": return <HeartHandshake size={18} />;
      default: return <ExternalLink size={18} />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
      {/* Background của căn phòng (Tạm dùng màu gradient tối rùng rợn, sau này thay bằng ảnh) */}
      <div 
        className="relative w-full max-w-4xl aspect-[4/3] bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl rounded-lg border border-slate-700 shadow-black/50"
        style={{
          // Tương lai bạn chèn ảnh background vào đây:
          // backgroundImage: `url('/themes/${data.themeId}-bg.jpg')`,
          // backgroundSize: 'cover'
        }}
      >
        <div className="absolute top-4 left-4 text-slate-500 font-mono text-sm opacity-50 tracking-widest">
          Không gian của: @{data.username}
        </div>

        {/* Render các vật thể lên bản đồ */}
        {data.items.map((item) => (
          <button
            key={item._id}
            onClick={() => setActiveItem(item)}
            className="absolute group transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
            style={{ left: `${item.x}%`, top: `${item.y}%` }}
          >
            {/* Điểm neo vật thể (Vòng tròn phát sáng) */}
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 animate-pulse flex items-center justify-center border border-cyan-500/50">
              <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
            </div>
            
            {/* Tooltip hiện ra khi hover chuột */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 pointer-events-none border border-slate-700">
              {getIcon(item.actionType)}
              <span className="font-mono">{item.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal / Popup hiện ra khi click vào vật thể */}
      {activeItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl w-full max-w-md relative shadow-2xl shadow-cyan-900/20">
            <button 
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-mono text-cyan-400 font-bold mb-4">{activeItem.title}</h3>
            
            <p className="text-slate-300 mb-6 font-mono text-sm">
              Bạn đang tương tác với vật thể này.
            </p>

            <a 
              href={activeItem.actionType === 'LINK' ? activeItem.actionValue : '#'}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full block text-center py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded transition-colors font-mono uppercase tracking-wider"
            >
              Đi tới liên kết
            </a>
          </div>
        </div>
      )}
    </div>
  );
}