import React from 'react';
import { useQuery } from 'react-query';
import { 
  Users, 
  Car, 
  Clock, 
  AlertTriangle, 
  Search, 
  Siren, 
  User, 
  BarChart3, 
  InboxX, 
  Zap, 
  Lightbulb, 
  Settings, 
  CheckCircle 
} from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery(
    'admin-stats',
    () => api.get('/api/admin/dashboard')
  );

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-white font-black text-xl uppercase tracking-wider">
            ЗАГРУЗКА СТАТИСТИКИ...
          </p>
        </div>
      </div>
    );
  }

  const dashboardStats = stats?.data || {};

  const statCards = [
    {
      title: 'ПОЛЬЗОВАТЕЛИ',
      value: dashboardStats.total_users?.toLocaleString() || 0,
      subtitle: `Новых за сегодня: ${dashboardStats.users_today || 0}`,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-600',
      borderColor: 'border-blue-500'
    },
    {
      title: 'ОБЪЯВЛЕНИЯ',
      value: dashboardStats.total_listings?.toLocaleString() || 0,
      subtitle: `Активных: ${dashboardStats.active_listings || 0}`,
      icon: Car,
      color: 'green',
      bgColor: 'bg-green-600',
      borderColor: 'border-green-500'
    },
    {
      title: 'МОДЕРАЦИЯ',
      value: dashboardStats.pending_moderation || 0,
      subtitle: 'Ожидают проверки',
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-600',
      borderColor: 'border-yellow-500'
    },
    {
      title: 'ЖАЛОБЫ',
      value: dashboardStats.open_reports || 0,
      subtitle: 'Требуют рассмотрения',
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-600',
      borderColor: 'border-red-500'
    }
  ];

  const quickActions = [
    {
      title: 'МОДЕРАЦИЯ КОНТЕНТА',
      count: dashboardStats.pending_moderation || 0,
      icon: Search,
      url: '/admin/moderation',
      bgColor: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-500'
    },
    {
      title: 'РАССМОТРЕТЬ ЖАЛОБЫ',
      count: dashboardStats.open_reports || 0,
      icon: Siren,
      url: '/admin/reports',
      bgColor: 'bg-red-600',
      hoverColor: 'hover:bg-red-500'
    },
    {
      title: 'УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ',
      count: dashboardStats.total_users || 0,
      icon: User,
      url: '/admin/users',
      bgColor: 'bg-green-600',
      hoverColor: 'hover:bg-green-500'
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-12">
          <div className="bg-black border-4 border-orange-500 p-8 relative">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white text-center mb-4">
              <span className="text-orange-500">АДМИН</span> ПАНЕЛЬ
            </h1>
            <div className="w-full h-2 bg-orange-500"></div>
            <p className="text-gray-300 font-bold text-center mt-4 uppercase tracking-wide">
              УПРАВЛЕНИЕ СИСТЕМОЙ KOLESA.KZ
            </p>
            
            {/* Декоративные элементы */}
            <div className="absolute top-2 left-2 w-6 h-6 border-2 border-orange-500"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-orange-500"></div>
          </div>
        </div>

        {/* Статистические карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((card, index) => {
            const IconComponent = card.icon;
            
            return (
              <div key={index} className="bg-black border-4 border-white p-6 relative group hover:border-orange-500 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="w-8 h-8 text-orange-500" />
                  <div className={`w-4 h-4 ${card.bgColor} group-hover:bg-orange-500 transition-colors duration-300`}></div>
                </div>
                
                <h3 className="text-white font-black text-sm uppercase tracking-wider mb-2">
                  {card.title}
                </h3>
                
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-2">
                  {card.value}
                </div>
                
                <p className="text-gray-400 font-bold text-xs uppercase">
                  {card.subtitle}
                </p>

                {/* Декоративная линия */}
                <div className="absolute bottom-2 left-2 w-8 h-1 bg-orange-500"></div>
              </div>
            );
          })}
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Последние действия */}
          <div className="bg-black border-4 border-white p-6">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-orange-500" />
              <h2 className="text-white font-black text-xl uppercase tracking-wider">
                ПОСЛЕДНИЕ ДЕЙСТВИЯ
              </h2>
              <div className="flex-1 h-1 bg-orange-500 ml-4"></div>
            </div>

            <div className="bg-gray-900 border-2 border-gray-600 max-h-96 overflow-y-auto">
              {dashboardStats.recent_activities?.length ? (
                dashboardStats.recent_activities.map((activity, index) => (
                  <div key={index} className="p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-800 transition-colors duration-300">
                    <div className="text-orange-500 font-black text-sm uppercase tracking-wide mb-1">
                      {activity.action}
                    </div>
                    <div className="text-gray-400 font-bold text-xs">
                      {activity.user_name} • {new Date(activity.created_date).toLocaleString('ru-RU')}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <InboxX className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-400 font-bold uppercase">НЕТ ДАННЫХ</p>
                </div>
              )}
            </div>
          </div>

          {/* Быстрые действия */}
          <div className="bg-black border-4 border-white p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-orange-500" />
              <h2 className="text-white font-black text-xl uppercase tracking-wider">
                БЫСТРЫЕ ДЕЙСТВИЯ
              </h2>
              <div className="flex-1 h-1 bg-orange-500 ml-4"></div>
            </div>

            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const ActionIcon = action.icon;
                
                return (
                  <button
                    key={index}
                    onClick={() => window.location.href = action.url}
                    className={`w-full p-6 ${action.bgColor} ${action.hoverColor} border-4 border-black text-white font-black text-lg uppercase tracking-wider
                               transition-all duration-300 transform hover:scale-105 active:scale-95 relative group`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ActionIcon className="w-6 h-6" />
                        <span>{action.title}</span>
                      </div>
                      <div className="bg-black bg-opacity-30 px-3 py-1 border border-white font-black text-sm">
                        {action.count}
                      </div>
                    </div>
                    
                    {/* Декоративный элемент */}
                    <div className="absolute top-2 right-2 w-3 h-3 bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                );
              })}
            </div>

            {/* Дополнительная информация */}
            <div className="mt-6 bg-gray-900 border-2 border-orange-500 p-4">
              <div className="flex items-center gap-2 text-sm">
                <Lightbulb className="w-4 h-4 text-orange-500" />
                <span className="text-white font-bold uppercase">
                  СИСТЕМА РАБОТАЕТ НОРМАЛЬНО
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Системная информация */}
        <div className="mt-12 bg-black border-4 border-gray-600 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-gray-400" />
            <h2 className="text-white font-black text-xl uppercase tracking-wider">
              СИСТЕМНАЯ ИНФОРМАЦИЯ
            </h2>
            <div className="flex-1 h-1 bg-gray-600 ml-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border-2 border-gray-600 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-green-500 font-black text-lg mb-2">
                <CheckCircle className="w-5 h-5" />
                ОНЛАЙН
              </div>
              <div className="text-gray-400 font-bold text-sm uppercase">СТАТУС СЕРВЕРА</div>
            </div>
            
            <div className="bg-gray-900 border-2 border-gray-600 p-4 text-center">
              <div className="text-blue-500 font-black text-lg mb-2">v2.1.0</div>
              <div className="text-gray-400 font-bold text-sm uppercase">ВЕРСИЯ СИСТЕМЫ</div>
            </div>
            
            <div className="bg-gray-900 border-2 border-gray-600 p-4 text-center">
              <div className="text-orange-500 font-black text-lg mb-2">
                {new Date().toLocaleDateString('ru-RU')}
              </div>
              <div className="text-gray-400 font-bold text-sm uppercase">ПОСЛЕДНЕЕ ОБНОВЛЕНИЕ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;