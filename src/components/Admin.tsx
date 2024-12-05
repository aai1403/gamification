import React, { useState, useEffect } from 'react';
import { getAllUsers, getAllGameSettings } from '../db';
import { User, GameSettings } from '../types';
import { BarChart, Users, Settings } from 'lucide-react';

export default function Admin() {
  const [users, setUsers] = useState<User[]>([]);
  const [gameSettings, setGameSettings] = useState<(GameSettings & { userId: string })[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'settings'>('users');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const usersData = await getAllUsers();
      const settingsData = await getAllGameSettings();
      setUsers(usersData);
      setGameSettings(settingsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const renderUsersTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام کاربری</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">سطح</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">امتیاز</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تعداد نشان‌ها</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.level}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.score}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.badges.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSettingsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام کاربری</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">چالش‌ها</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تقویت‌کننده‌ها</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نشان‌ها</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رتبه‌بندی</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {gameSettings.map((settings) => {
            const user = users.find(u => u.id === settings.userId);
            return (
              <tr key={settings.userId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user?.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {settings.challenges ? '✓' : '✗'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {settings.boosters ? '✓' : '✗'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {settings.badges ? '✓' : '✗'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {settings.ranking ? '✓' : '✗'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">پنل مدیریت</h1>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'users'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="w-5 h-5 ml-2" />
              کاربران
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === 'settings'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Settings className="w-5 h-5 ml-2" />
              تنظیمات کاربران
            </button>
          </div>

          <div className="bg-white rounded-lg">
            {activeTab === 'users' ? renderUsersTable() : renderSettingsTable()}
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">تعداد کل کاربران</h3>
                <p className="text-3xl font-bold text-blue-900">{users.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700 mb-2">میانگین امتیاز</h3>
                <p className="text-3xl font-bold text-green-900">
                  {users.length > 0
                    ? Math.round(users.reduce((acc, user) => acc + user.score, 0) / users.length)
                    : 0}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-700 mb-2">کاربران فعال چالش‌ها</h3>
                <p className="text-3xl font-bold text-purple-900">
                  {gameSettings.filter(s => s.challenges).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}