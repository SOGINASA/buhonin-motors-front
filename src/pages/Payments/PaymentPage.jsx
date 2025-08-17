import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Building2, 
  Wallet, 
  Gem, 
  Clock, 
  DollarSign, 
  Shield, 
  FileText, 
  Check 
} from 'lucide-react';
import { usePayments } from '../../hooks/api/usePayments';

const PaymentPage = () => {
  // Mock data для демонстрации
  const serviceId = '1';
  const listingId = '123';
  
  const navigate = (path) => console.log('Navigate to:', path);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  
  const { services, createPayment } = usePayments();
  
  // Mock service data
  const service = {
    service_id: 1,
    service_name: 'VIP РАЗМЕЩЕНИЕ',
    description: 'Ваше объявление будет показано в топе результатов поиска на 30 дней',
    price: 2000,
    currency_code: '₸',
    duration_days: 30
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Mock payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Платеж успешно создан!');
      navigate('/payments/history');
    } catch (error) {
      console.error('Payment error:', error);
      alert('Ошибка при создании платежа');
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { 
      value: 'card', 
      label: 'БАНКОВСКАЯ КАРТА', 
      icon: CreditCard, 
      description: 'Visa, MasterCard, МИР',
      popular: true 
    },
    { 
      value: 'kaspi', 
      label: 'KASPI PAY', 
      icon: Building2, 
      description: 'Быстрая оплата через Kaspi',
      popular: true 
    },
    { 
      value: 'qiwi', 
      label: 'QIWI КОШЕЛЕК', 
      icon: Wallet, 
      description: 'Оплата через QIWI',
      popular: false 
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="bg-black border-4 border-orange-500 p-6 relative">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white text-center mb-4">
              <span className="text-orange-500">ОПЛАТА</span> УСЛУГИ
            </h1>
            <div className="w-full h-1 bg-orange-500"></div>
            
            {/* Декоративные элементы */}
            <div className="absolute top-2 left-2 w-4 h-4 border-2 border-orange-500"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-orange-500"></div>
          </div>
        </div>

        {/* Информация об услуге */}
        <div className="mb-8">
          <div className="bg-black border-4 border-white p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <Gem className="w-8 h-8 text-orange-500" />
              <h2 className="text-white font-black text-xl uppercase tracking-wider">
                ДЕТАЛИ УСЛУГИ
              </h2>
              <div className="flex-1 h-1 bg-orange-500 ml-4"></div>
            </div>

            <div className="bg-gray-900 border-2 border-orange-500 p-6">
              <h3 className="text-orange-500 font-black text-2xl uppercase tracking-wider mb-3">
                {service.service_name}
              </h3>
              <p className="text-gray-300 font-bold mb-6">{service.description}</p>
              
              {/* Цена */}
              <div className="bg-black border-2 border-white p-4 text-center">
                <div className="text-orange-500 font-black text-sm uppercase tracking-wider mb-2">
                  СТОИМОСТЬ:
                </div>
                <div className="text-white font-black text-4xl">
                  {service.price.toLocaleString()} <span className="text-orange-500">{service.currency_code}</span>
                </div>
              </div>

              {/* Срок действия */}
              {service.duration_days && (
                <div className="mt-4 bg-blue-900 border-2 border-blue-500 p-3 text-center">
                  <span className="text-blue-400 font-black text-sm uppercase tracking-wider flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    СРОК ДЕЙСТВИЯ: {service.duration_days} ДНЕЙ
                  </span>
                </div>
              )}
            </div>

            {/* Декоративный элемент */}
            <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 opacity-50"></div>
          </div>
        </div>

        {/* Способы оплаты */}
        <div className="mb-8">
          <div className="bg-black border-4 border-white p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-8 h-8 text-orange-500" />
              <h2 className="text-white font-black text-xl uppercase tracking-wider">
                СПОСОБ ОПЛАТЫ
              </h2>
              <div className="flex-1 h-1 bg-orange-500 ml-4"></div>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <div key={method.value} className="relative">
                    <input
                      type="radio"
                      id={method.value}
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <label
                      htmlFor={method.value}
                      className={`block p-4 border-4 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        paymentMethod === method.value
                          ? 'bg-orange-500 border-black text-black'
                          : 'bg-gray-900 border-gray-600 text-white hover:border-orange-500'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <IconComponent className={`w-8 h-8 ${
                          paymentMethod === method.value ? 'text-black' : 'text-white'
                        }`} />
                        <div className="flex-1">
                          <div className="font-black text-lg uppercase tracking-wider flex items-center gap-2">
                            {method.label}
                            {method.popular && (
                              <span className="bg-green-600 text-white text-xs px-2 py-1 font-black uppercase">
                                ПОПУЛЯРНО
                              </span>
                            )}
                          </div>
                          <div className={`text-sm font-bold ${
                            paymentMethod === method.value ? 'text-black' : 'text-gray-400'
                          }`}>
                            {method.description}
                          </div>
                        </div>
                        <div className={`w-6 h-6 border-4 rounded-full ${
                          paymentMethod === method.value
                            ? 'bg-black border-black'
                            : 'border-gray-600'
                        }`}>
                          {paymentMethod === method.value && (
                            <div className="w-full h-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-orange-500" />
                            </div>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Кнопка оплаты */}
        <div className="mb-8">
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-6 font-black text-xl uppercase tracking-wider border-4 transition-all duration-300 transform flex items-center justify-center gap-3
              ${loading
                ? 'bg-gray-800 border-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-orange-500 border-black text-black hover:bg-orange-400 hover:scale-105 active:scale-95'
              }`}
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ОБРАБОТКА...
              </>
            ) : (
              <>
                <DollarSign className="w-6 h-6" />
                ОПЛАТИТЬ {service.price.toLocaleString()} {service.currency_code}
              </>
            )}
          </button>
        </div>

        {/* Безопасность и условия */}
        <div className="space-y-4">
          {/* Безопасность */}
          <div className="bg-black border-4 border-green-500 p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-500 mt-1" />
              <div className="text-gray-300 text-sm">
                <p className="font-bold uppercase mb-1 text-green-400">БЕЗОПАСНАЯ ОПЛАТА</p>
                <p className="text-xs normal-case">
                  Все платежи защищены SSL шифрованием и обрабатываются через сертифицированные платежные системы
                </p>
              </div>
            </div>
          </div>

          {/* Условия */}
          <div className="bg-black border-4 border-gray-600 p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-1" />
              <div className="text-gray-400 text-xs">
                <p className="font-bold uppercase mb-2">УСЛОВИЯ ОПЛАТЫ:</p>
                <ul className="space-y-1 normal-case">
                  <li>• Нажимая кнопку "Оплатить", вы соглашаетесь с условиями предоставления услуг</li>
                  <li>• Услуга активируется автоматически после успешной оплаты</li>
                  <li>• Возврат средств возможен в течение 24 часов при технических проблемах</li>
                  <li>• Поддержка: support@kolesa.kz</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;