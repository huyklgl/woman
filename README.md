# Moman Interpret - AI Giải Mã Ngôn Ngữ Phụ Nữ

## Giới thiệu

Moman Interpret là một ứng dụng AI thông minh được thiết kế để giúp hiểu rõ hơn về ngôn ngữ và ý nghĩa tiềm ẩn trong giao tiếp của phụ nữ. Ứng dụng sử dụng các model AI tiên tiến (OpenAI, Anthropic Claude, Google Gemini) kết hợp với hiểu biết về tâm lý học và giao tiếp để phân tích và giải mã các câu nói một cách chuyên sâu.

Bản quyền thuộc về team [Học Code AI](https://hoccodeai.com).

Bạn có thể sử dụng bản online tại [Thấu hiểu phụ nữ Online](https://hoccodeai.com/tools/thau-hieu-phu-nu).

## Tính năng chính

- 🧠 Phân tích ngữ cảnh và ý nghĩa tiềm ẩn trong lời nói
- 💡 Giải thích chi tiết từ nhiều góc độ (nghĩa đen, suy nghĩ tiềm ẩn, ý nghĩa thực sự)
- 📊 Đánh giá mức độ tin cậy của phân tích
- 🎯 Tích hợp bối cảnh để tăng độ chính xác
- ✨ Giao diện người dùng thân thiện và trực quan
- 🚀 Phản hồi nhanh chóng và chi tiết

## Huớng dẫn cài đặt và sử dụng

### 1. Cài đặt

1. Clone repository về máy:
```bash
git clone https://github.com/conanak99/translaher
cd translaher
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Copy file `.env.example` thành `.env` và thêm API key cho model AI bạn muốn sử dụng. Chỉ cần 1 trong 3 model là đuợc.

```bash
cp .env.example .env
```

```bash
OPENAI_API_KEY=sk-xxx
# hoặc
ANTHROPIC_API_KEY=sk-ant-xxx
# hoặc
GOOGLE_API_KEY=xxx
```

Bạn có thể lấy API Key tại:
- Google (Free): <https://aistudio.google.com/u/1/apikey>
- OpenAI : <https://platform.openai.com/api-keys>
- Anthropic: <https://console.anthropic.com/settings/keys>

4. Chạy development server:
```bash
npm run dev
# hoặc
yarn dev
```

### 2. Cách sử dụng

1. Nhập bối cảnh của cuộc hội thoại (nếu có)
2. Nhập câu nói cần được phân tích
3. Nhấn "Giải mã ngôn ngữ phụ nữ"
4. Nhận kết quả phân tích chi tiết bao gồm:
   - Phân tích ngữ cảnh
   - Nghĩa đen của câu nói
   - Suy nghĩ tiềm ẩn
   - Ý nghĩa thực sự
   - Giải thích thêm
   - Mức độ tin cậy của phân tích

## Công nghệ sử dụng

Boilerplate được xây dựng trên các công nghệ hiện đại:

- [Astro](https://astro.build) - Web framework for content-focused websites
- [React](https://reactjs.org) - UI component library
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [shadcn/ui](https://ui.shadcn.com) - UI component library
- [Vercel AI SDK](https://sdk.vercel.ai/) - SDK for building AI-powered applications