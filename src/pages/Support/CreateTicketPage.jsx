import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { 
  Folder, 
  AlertTriangle, 
  Edit3, 
  FileText, 
  Lightbulb, 
  AlertCircle, 
  Rocket, 
  Clock,
  Circle,
  Square
} from 'lucide-react';
import api from '../../services/api';

const CreateTicketPage = () => {
  const [formData, setFormData] = useState({
    category_id: '',
    priority: 'medium',
    subject: '',
    description: ''
  });
  const [error, setError] = useState('');
  
  const navigate = (path) => console.log('Navigate to:', path);

  // Mock categories для демонстрации
  const mockCategories = [
    { category_id: 1, category_name: 'Технические проблемы' },
    { category_id: 2, category_name: 'Проблемы с оплатой' },
    { category_id: 3, category_name: 'Вопросы по объявлениям' },
    { category_id: 4, category_name: 'Другое' }
  ];

  const { data: categories } = useQuery('support-categories', () => 
    Promise.resolve({ data: mockCategories })
  );

  const createTicketMutation = useMutation(
    (ticketData) => {
      // Mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { ticket_id: Date.now() } });
        }, 1000);
      });
    },
    {
      onSuccess: (response) => {
        navigate(`/support/tickets/${response.data.ticket_id}`);
      },
      onError: (error) => {
        setError(error.response?.data?.message || 'Ошибка при создании обращения');
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.subject.trim() || !formData.description.trim()) {
      setError('Заполните все обязательные поля');
      return;
    }

    setError('');
    createTicketMutation.mutate(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const priorityOptions = [
    { value: 'low', label: 'НИЗКИЙ', icon: Circle, color: 'text-green-500', description: 'Обычный вопрос' },
    { value: 'medium', label: 'СРЕДНИЙ', icon: Circle, color: 'text-yellow-500', description: 'Требует внимания' },
    { value: 'high', label: 'ВЫСОКИЙ', icon: Circle, color: 'text-orange-500', description: 'Срочный вопрос' },
    { value: 'critical', label: 'КРИТИЧЕСКИЙ', icon: Circle, color: 'text-red-500', description: 'Критическая проблема' }
  ];

  const getProgressPercentage = () => {
    let filled = 0;
    if (formData.category_id) filled++;
    if (formData.priority) filled++;
    if (formData.subject.trim()) filled++;
    if (formData.description.trim()) filled++;
    return (filled / 4) * 100;
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="bg-black border-4 border-orange-500 p-6 relative">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white text-center mb-4">
              <span className="text-orange-500">СОЗДАТЬ</span> ОБРАЩЕНИЕ
            </h1>
            <div className="w-full h-1 bg-orange-500 mb-4"></div>
            <p className="text-gray-300 font-bold text-center uppercase">
              ОПИШИТЕ ВАШУ ПРОБЛЕМУ - МЫ ПОМОЖЕМ!
            </p>
            
            {/* Декоративные элементы */}
            <div className="absolute top-2 left-2 w-4 h-4 border-2 border-orange-500"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-orange-500"></div>
          </div>
        </div>

        {/* Прогресс заполнения */}
        <div className="mb-8 bg-black border-4 border-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-black text-sm uppercase tracking-wider">
              ПРОГРЕСС ЗАПОЛНЕНИЯ:
            </span>
            <span className="text-orange-500 font-black text-sm">
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
          <div className="w-full bg-gray-800 border-2 border-gray-600 h-3">
            <div 
              className="h-full bg-orange-500 transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Категория */}
          <div className="bg-black border-4 border-white p-6">
            <label className="block text-white font-black text-sm uppercase tracking-wider mb-4">
              <Folder className="inline-block w-4 h-4 mr-2 text-orange-500" />
              КАТЕГОРИЯ ПРОБЛЕМЫ:
            </label>
            
            <div className="relative group">
              <select
                value={formData.category_id}
                onChange={(e) => handleChange('category_id', e.target.value)}
                className="w-full bg-white border-4 border-black px-4 py-4 font-black text-black uppercase tracking-wide
                           focus:outline-none focus:border-orange-500 focus:bg-orange-100
                           hover:bg-gray-100 transition-all duration-300 cursor-pointer appearance-none"
              >
                <option value="">ВЫБЕРИТЕ КАТЕГОРИЮ</option>
                {categories?.data?.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name.toUpperCase()}
                  </option>
                ))}
              </select>
              
              {/* Кастомная стрелка */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] 
                                border-l-transparent border-r-transparent border-t-black"></div>
              </div>
              
              {/* Декоративный элемент */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 opacity-50 group-focus-within:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Приоритет */}
          <div className="bg-black border-4 border-white p-6">
            <label className="block text-white font-black text-sm uppercase tracking-wider mb-4">
              <AlertTriangle className="inline-block w-4 h-4 mr-2 text-orange-500" />
              ПРИОРИТЕТ ОБРАЩЕНИЯ:
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {priorityOptions.map((option) => (
                <div key={option.value} className="relative">
                  <input
                    type="radio"
                    id={option.value}
                    name="priority"
                    value={option.value}
                    checked={formData.priority === option.value}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={option.value}
                    className={`block p-4 border-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      formData.priority === option.value
                        ? 'bg-orange-500 border-black text-black'
                        : 'bg-gray-900 border-gray-600 text-white hover:border-orange-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <option.icon className={`w-6 h-6 ${option.color}`} fill="currentColor" />
                      <div>
                        <div className="font-black text-lg uppercase tracking-wider">
                          {option.label}
                        </div>
                        <div className={`text-sm font-bold ${
                          formData.priority === option.value ? 'text-black' : 'text-gray-400'
                        }`}>
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Тема обращения */}
          <div className="bg-black border-4 border-white p-6">
            <label className="block text-white font-black text-sm uppercase tracking-wider mb-4">
              <Edit3 className="inline-block w-4 h-4 mr-2 text-orange-500" />
              ТЕМА ОБРАЩЕНИЯ <span className="text-red-500">*</span>
            </label>
            
            <div className="relative group">
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="Кратко опишите проблему"
                maxLength={255}
                required
                className="w-full bg-white border-4 border-black px-4 py-4 font-black text-black
                           focus:outline-none focus:border-orange-500 focus:bg-orange-100
                           hover:bg-gray-100 transition-all duration-300
                           placeholder:text-gray-500 placeholder:font-normal"
              />
              
              {/* Счетчик символов */}
              <div className="absolute bottom-2 right-2 text-xs font-bold text-gray-400">
                {formData.subject.length}/255
              </div>
              
              {/* Декоративный элемент */}
              <div className="absolute top-2 right-8 w-3 h-3 bg-orange-500 opacity-50 group-focus-within:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Описание проблемы */}
          <div className="bg-black border-4 border-white p-6">
            <label className="block text-white font-black text-sm uppercase tracking-wider mb-4">
              <FileText className="inline-block w-4 h-4 mr-2 text-orange-500" />
              ПОДРОБНОЕ ОПИСАНИЕ <span className="text-red-500">*</span>
            </label>
            
            <div className="relative group">
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Подробно опишите вашу проблему или вопрос. Укажите все детали, которые могут помочь нам решить вашу проблему быстрее."
                required
                rows={6}
                className="w-full bg-white border-4 border-black px-4 py-4 font-bold text-black resize-none
                           focus:outline-none focus:border-orange-500 focus:bg-orange-100
                           hover:bg-gray-100 transition-all duration-300
                           placeholder:text-gray-500 placeholder:font-normal"
              />
              
              {/* Декоративный элемент */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 opacity-50 group-focus-within:opacity-100 transition-opacity"></div>
            </div>

            {/* Подсказки */}
            <div className="mt-4 bg-blue-900 border-2 border-blue-500 p-3">
              <div className="text-blue-400 font-black text-xs uppercase tracking-wider mb-2 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                ПОДСКАЗКИ ДЛЯ БЫСТРОГО РЕШЕНИЯ:
              </div>
              <ul className="text-blue-300 text-xs space-y-1">
                <li>• Укажите номер объявления, если проблема связана с ним</li>
                <li>• Опишите, что вы делали перед возникновением проблемы</li>
                <li>• Приложите скриншоты, если это поможет</li>
                <li>• Укажите браузер и устройство, которым пользуетесь</li>
              </ul>
            </div>
          </div>

          {/* Ошибка */}
          {error && (
            <div className="bg-red-900 border-4 border-red-500 p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <span className="text-red-300 font-bold uppercase">{error}</span>
              </div>
            </div>
          )}

          {/* Кнопки */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={createTicketMutation.isLoading}
              className={`flex-1 py-6 font-black text-xl uppercase tracking-wider border-4 transition-all duration-300 transform
                ${createTicketMutation.isLoading
                  ? 'bg-gray-800 border-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 border-black text-black hover:bg-orange-400 hover:scale-105 active:scale-95'
                }`}
            >
              {createTicketMutation.isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  СОЗДАЕМ...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Rocket className="w-6 h-6" />
                  СОЗДАТЬ ОБРАЩЕНИЕ
                </div>
              )}
            </button>

            <button
              onClick={() => navigate('/support')}
              className="px-8 py-6 bg-gray-800 border-4 border-white text-white font-black text-xl uppercase tracking-wider
                         hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              ОТМЕНА
            </button>
          </div>

          {/* Информация о времени ответа */}
          <div className="bg-black border-4 border-green-500 p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="text-gray-300 text-sm">
                <p className="font-bold uppercase mb-1 text-green-400">ВРЕМЯ ОТВЕТА:</p>
                <ul className="text-xs normal-case space-y-1">
                  <li>• <span className="font-bold">Критические проблемы:</span> до 2 часов</li>
                  <li>• <span className="font-bold">Высокий приоритет:</span> до 6 часов</li>
                  <li>• <span className="font-bold">Средний приоритет:</span> до 24 часов</li>
                  <li>• <span className="font-bold">Низкий приоритет:</span> до 72 часов</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketPage;