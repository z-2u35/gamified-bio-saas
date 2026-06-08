// frontend/app/dashboard/page.tsx
"use client";
import { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import { Save, PlusCircle, Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Dashboard() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentUsername = "harry";

  useEffect(() => {
    axios.get(`${API_URL}/bio/${currentUsername}`)
      .then(res => {
        if (res.data && res.data.items) {
          setItems(res.data.items);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false)); 
  }, []);

  const handleRoomClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newItem = {
      _id: Date.now().toString(), 
      itemId: "new_item",
      x: Number(x.toFixed(2)), 
      y: Number(y.toFixed(2)),
      actionType: "LINK",
      actionValue: "https://",
      title: "Vật thể mới"
    };

    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: string, value: string) => {
    setItems(items.map(item => item._id === id ? { ...item, [field]: value } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item._id !== id));
  };

  // Hàm saveBio ĐÃ ĐƯỢC SỬA LỖI
  const saveBio = async () => {
    try {
      // Gọt bỏ các _id giả do Frontend tự tạo để MongoDB tự sinh ID chuẩn
      const cleanItems = items.map(item => ({
        itemId: item.itemId || "new_item",
        x: item.x,
        y: item.y,
        actionType: item.actionType,
        actionValue: item.actionValue,
        title: item.title
      }));

      await axios.post(`${API_URL}/bio`, {
        username: currentUsername,
        themeId: "cyber-room",
        items: cleanItems,
        isPublished: true
      });
      alert("🎉 Đã lưu giao diện thành công!");
    } catch (error) {
      console.error(error);
      alert("❌ Có lỗi xảy ra khi lưu! Hãy kiểm tra lại Backend.");
    }
  };

  if (isLoading) return <div className="p-10 text-white font-mono">Đang tải phòng làm việc...</div>;

  return (
    <div className="min-h-screen bg-slate-950 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-mono text-cyan-400 font-bold">Studio Thiết Kế</h1>
          <button 
            onClick={saveBio}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded font-mono transition-colors"
          >
            <Save size={18} /> Lưu Thay Đổi
          </button>
        </div>

        <p className="text-slate-400 font-mono text-sm mb-4 flex items-center gap-2">
          <PlusCircle size={16} /> Click vào bất kỳ đâu trong khung dưới để thêm vật thể tương tác mới.
        </p>

        <div 
          onClick={handleRoomClick}
          className="relative w-full aspect-[4/3] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border-2 border-dashed border-slate-700 cursor-crosshair overflow-hidden shadow-xl"
        >
          {items.map((item, index) => (
            <div
              key={item._id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-[0_0_15px_#22d3ee] cursor-pointer"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={(e) => e.stopPropagation()} 
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 h-max max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-mono text-white mb-6">Quản lý Liên Kết ({items.length})</h2>
        
        {items.length === 0 && (
          <div className="text-slate-500 font-mono text-sm text-center py-10 border border-dashed border-slate-700 rounded">
            Chưa có vật thể nào.<br/>Click vào phòng để thêm nhé!
          </div>
        )}

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item._id} className="bg-slate-800 p-4 rounded border border-slate-700 relative">
              <div className="absolute top-0 right-0 bg-cyan-600 text-white text-xs px-2 py-1 rounded-bl rounded-tr font-bold">
                #{index + 1}
              </div>
              
              <div className="space-y-3 mt-2">
                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-1">Tên hiển thị (Tooltip)</label>
                  <input 
                    type="text" 
                    value={item.title}
                    onChange={(e) => updateItem(item._id, 'title', e.target.value)}
                    className="w-full bg-slate-950 text-white px-3 py-2 rounded border border-slate-700 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                  />
                </div>
                
                <div>
                  <label className="text-xs text-slate-400 font-mono block mb-1">Đường dẫn (URL)</label>
                  <input 
                    type="text" 
                    value={item.actionValue}
                    onChange={(e) => updateItem(item._id, 'actionValue', e.target.value)}
                    className="w-full bg-slate-950 text-cyan-400 px-3 py-2 rounded border border-slate-700 focus:border-cyan-500 focus:outline-none font-mono text-sm"
                  />
                </div>
                
                <button 
                  onClick={() => deleteItem(item._id)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 text-xs font-mono mt-2"
                >
                  <Trash2 size={14} /> Xóa vật thể này
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}