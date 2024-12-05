import React from 'react';
import { BookOpen } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">درباره ما</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 text-gray-600">
          <p>
            بازی دسته‌بندی تصاویر یک پلتفرم آموزشی تعاملی است که به شما کمک می‌کند مهارت‌های تشخیص و دسته‌بندی تصاویر را بهبود بخشید.
          </p>
          
          <p>
            در این بازی، شما با مجموعه‌ای از تصاویر متنوع روبرو می‌شوید و باید برچسب‌های مناسب را برای هر تصویر تشخیص دهید. با هر پاسخ درست، امتیاز کسب می‌کنید و می‌توانید به سطوح بالاتر صعود کنید.
          </p>

          <p>
            ویژگی‌های سفارشی‌سازی مانند چالش‌ها، نشان‌ها و رتبه‌بندی، تجربه بازی را جذاب‌تر می‌کنند و به شما انگیزه می‌دهند تا عملکرد بهتری داشته باشید.
          </p>
        </div>
      </div>
    </div>
  );
}