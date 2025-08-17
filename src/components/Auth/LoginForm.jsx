import React, { useState } from 'react';
import { 
  Smartphone, 
  Lock, 
  AlertTriangle, 
  Unlock, 
  RotateCcw, 
  UserPlus, 
  Shield,
  Loader2
} from 'lucide-react';
import { useLogin } from '../../hooks/auth/useLogin';

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    phone_number: '',
    password: ''
  });
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      onSuccess?.();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fields = [
    { 
      name: 'phone_number', 
      label: 'НОМЕР ТЕЛЕФОНА', 
      type: 'tel', 
      icon: Smartphone, 
      placeholder: '+7 (xxx) xxx-xx-xx' 
    },
    { 
      name: 'password', 
      label: 'ПАРОЛЬ', 
      type: 'password', 
      icon: Lock, 
      placeholder: 'Введите пароль' 
    }
  ];

  return (
    <div className="bg-black border-4 border-orange-500 p-8 relative">
      {/* Заголовок */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white mb-4">
          <span className="text-orange-500">ВХОД</span> В СИСТЕМУ
        </h2>
        <div className="w-full h-1 bg-orange-500 mb-4"></div>
        <p className="text-gray-300 font-bold text-sm uppercase">
          ВОЙДИТЕ В СВОЙ АККАУНТ
        </p>
      </div>

      <div className="space-y-6">
        {/* Поля формы */}
        <div className="space-y-6">
          {fields.map((field) => {
            const IconComponent = field.icon;
            return (
              <div key={field.name}>
                <label className="block text-white font-black text-sm uppercase tracking-wider mb-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="text-orange-500" size={18} />
                    {field.label}
                  </div>
                </label>
                
                <div className="relative group">
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full bg-white border-4 border-black px-4 py-4 font-black text-black
                               focus:outline-none focus:border-orange-500 focus:bg-orange-100
                               hover:bg-gray-100 transition-all duration-300
                               placeholder:text-gray-500 placeholder:font-normal"
                  />
                  
                  {/* Декоративный элемент */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 opacity-50 group-focus-within:opacity-100 transition-opacity"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ошибка */}
        {error && (
          <div className="bg-red-900 border-4 border-red-500 p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-500" size={20} />
              <span className="text-red-300 font-bold uppercase">{error}</span>
            </div>
          </div>
        )}

        {/* Кнопка входа */}
        <button
          onClick={handleSubmit}
          disabled={loading || !formData.phone_number || !formData.password}
          className={`w-full py-6 font-black text-xl uppercase tracking-wider border-4 transition-all duration-300 transform
            ${loading || !formData.phone_number || !formData.password
              ? 'bg-gray-800 border-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-orange-500 border-black text-black hover:bg-orange-400 hover:scale-105 active:scale-95'
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="animate-spin" size={24} />
              ВХОДИМ...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Unlock size={24} />
              ВОЙТИ
            </div>
          )}
        </button>

        {/* Дополнительные опции */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Забыли пароль */}
          <button className="bg-gray-900 border-2 border-white text-white font-black text-sm uppercase tracking-wider py-3 px-4
                           hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center gap-2">
              <RotateCcw size={16} />
              ЗАБЫЛИ ПАРОЛЬ?
            </div>
          </button>

          {/* Регистрация */}
          <button className="bg-white border-2 border-black text-black font-black text-sm uppercase tracking-wider py-3 px-4
                           hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center gap-2">
              <UserPlus size={16} />
              РЕГИСТРАЦИЯ
            </div>
          </button>
        </div>

        {/* Статус заполнения */}
        <div className="bg-gray-900 border-2 border-gray-600 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-black text-sm uppercase tracking-wider">
              ГОТОВНОСТЬ К ВХОДУ:
            </span>
            <span className="text-orange-500 font-black text-sm">
              {formData.phone_number && formData.password ? '100%' : 
               formData.phone_number || formData.password ? '50%' : '0%'}
            </span>
          </div>
          <div className="w-full bg-black border-2 border-gray-600 h-3">
            <div 
              className="h-full bg-orange-500 transition-all duration-500"
              style={{
                width: formData.phone_number && formData.password ? '100%' : 
                       formData.phone_number || formData.password ? '50%' : '0%'
              }}
            ></div>
          </div>
        </div>

        {/* Безопасность */}
        <div className="bg-gray-900 border-2 border-green-500 p-4">
          <div className="flex items-start gap-3">
            <Shield className="text-green-500 mt-1" size={20} />
            <div className="text-gray-300 text-sm">
              <p className="font-bold uppercase mb-1 text-green-400">БЕЗОПАСНЫЙ ВХОД</p>
              <p className="text-xs normal-case">
                Все данные передаются по защищенному SSL соединению
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-2 left-2 w-6 h-6 border-2 border-orange-500"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 bg-orange-500"></div>
    </div>
  );
};

export default LoginForm;