import axios from 'axios';
import { notFound } from 'next/navigation';
import RoomScene from '@/components/RoomScene';

export const dynamic = "force-dynamic";

const API_URL = 'http://127.0.0.1:5000/api';

async function getBioData(username: string) {
  console.log(`\n---> Đang tìm kiếm dữ liệu cho user: [${username}]`);
  
  try {
    const res = await axios.get(`${API_URL}/bio/${username}`);
    console.log("---> ✅ Lấy dữ liệu thành công!");
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log("---> ❌ Database báo không tìm thấy user này!");
      return null;
    }
    console.error("---> ⚠️ Lỗi kết nối Server:", error.message);
    return null;
  }
}

export default async function BioPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params; // "Mở khóa" Promise ở đây
  const data = await getBioData(resolvedParams.username);

  if (!data) {
    return notFound();
  }

  return <RoomScene data={data} />;
}