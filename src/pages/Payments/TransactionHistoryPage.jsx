import React, { useState } from 'react';
import { 
  CreditCard, 
  RotateCcw, 
  Gift, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Lightbulb, 
  BarChart3 
} from 'lucide-react';
import { usePayments } from '../../hooks/api/usePayments';

const TransactionHistoryPage = () => {
  const [filter, setFilter] = useState('all');
  const { transactions, requestRefund } = usePayments();

  // Mock data для демонстрации
  const mockTransactions = [
    {
      transaction_id: 1001,
      transaction_type: 'payment',
      amount: 2000,
      currency_code: '₸',
      status: 'completed',
      description: 'VIP размещение объявления #12345',
      created_date: '2024-08-17T10:30:00Z',
      payment_method: 'card'
    },
    {
      transaction_id: 1002,
      transaction_type: 'payment',
      amount: 1000,
      currency_code: '₸',
      status: 'pending',
      description: 'Выделенное объявление #12346',
      created_date: '2024-08-17T09:15:00Z',
      payment_method: 'kaspi'
    },
    {
      transaction_id: 1003,
      transaction_type: 'refund',
      amount: 500,
      currency_code: '₸',
      status: 'completed',
      description: 'Возврат за поднятие в поиске #12344',
      created_date: '2024-08-16T14:20:00Z',
      payment_method: 'card'
    },
    {
      transaction_id: 1004,
      transaction_type: 'bonus',
      amount: 300,
      currency_code: '₸',
      status: 'completed',
      description: 'Бонус за активность',
      created_date: '2024-08-15T16:45:00Z',
      payment_method: 'system'
    },
    {
      transaction_id: 1005,
      transaction_type: 'payment',
      amount: 300,
      currency_code: '₸',
      status: 'failed',
      description: 'Срочная продажа #12343',
      created_date: '2024-08-15T11:10:00Z',
      payment_method: 'qiwi'
    }
  ];

  const getTransactionTypeText = (type) => {
    const types = {
      payment: 'ПЛАТЕЖ',
      refund: 'ВОЗВРАТ',
      bonus: 'БОНУС',
      withdrawal: 'ВЫВОД'
    };
    return types[type] || type.toUpperCase();
  };

  const getTransactionTypeIcon = (type) => {
    const icons = {
      payment: CreditCard,
      refund: RotateCcw,
      bonus: Gift,
      withdrawal: DollarSign
    };
    const IconComponent = icons[type] || CreditCard;
    return <IconComponent className="w-5 h-5" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-green-500',
      pending: 'text-yellow-500',
      failed: 'text-red-500',
      cancelled: 'text-gray-500'
    };
    return colors[status] || 'text-gray-500';
  };

  const getStatusText = (status) => {
    const statuses = {
      completed: 'ЗАВЕРШЕН',
      pending: 'В ОБРАБОТКЕ',
      failed: 'ОШИБКА',
      cancelled: 'ОТМЕНЕН'
    };
    return statuses[status] || status.toUpperCase();
  };

  const handleRefundRequest = async (transactionId) => {
    if (confirm('Вы уверены, что хотите запросить возврат средств?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Запрос на возврат отправлен');
      } catch (error) {
        console.error('Error requesting refund:', error);
        alert('Ошибка при запросе возврата');
      }
    }
  };

  const filterOptions = [
    { value: 'all', label: 'ВСЕ ТРАНЗАКЦИИ', icon: BarChart3 },
    { value: 'payment', label: 'ПЛАТЕЖИ', icon: CreditCard },
    { value: 'refund', label: 'ВОЗВРАТЫ', icon: RotateCcw },
    { value: 'bonus', label: 'БОНУСЫ', icon: Gift }
  ];

  const filteredTransactions = filter === 'all' 
    ? mockTransactions 
    : mockTransactions.filter(t => t.transaction_type === filter);

  // Статистика
  const stats = {
    total: mockTransactions.length,
    completed: mockTransactions.filter(t => t.status === 'completed').length,
    pending: mockTransactions.filter(t => t.status === 'pending').length,
    totalAmount: mockTransactions
      .filter(t => t.transaction_type === 'payment' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0)
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="bg-black border-4 border-orange-500 p-6 relative">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-white text-center mb-4">
              <span className="text-orange-500">ИСТОРИЯ</span> ПЛАТЕЖЕЙ
            </h1>
            <div className="w-full h-1 bg-orange-500"></div>
            
            {/* Декоративные элементы */}
            <div className="absolute top-2 left-2 w-4 h-4 border-2 border-orange-500"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-orange-500"></div>
          </div>
        </div>

        {/* Статистика */}
        <div className="mb-8 bg-black border-4 border-white p-6">
          <h2 className="text-white font-black text-xl uppercase tracking-wider mb-6 text-center flex items-center justify-center">
            <TrendingUp className="w-6 h-6 mr-3" />
            СТАТИСТИКА ПЛАТЕЖЕЙ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-900 border-2 border-blue-500 p-4 text-center">
              <div className="text-blue-400 font-black text-2xl mb-2">{stats.total}</div>
              <div className="text-white font-bold uppercase text-sm">ВСЕГО ТРАНЗАКЦИЙ</div>
            </div>
            <div className="bg-green-900 border-2 border-green-500 p-4 text-center">
              <div className="text-green-400 font-black text-2xl mb-2">{stats.completed}</div>
              <div className="text-white font-bold uppercase text-sm">ЗАВЕРШЕНО</div>
            </div>
            <div className="bg-yellow-900 border-2 border-yellow-500 p-4 text-center">
              <div className="text-yellow-400 font-black text-2xl mb-2">{stats.pending}</div>
              <div className="text-white font-bold uppercase text-sm">В ОБРАБОТКЕ</div>
            </div>
            <div className="bg-orange-900 border-2 border-orange-500 p-4 text-center">
              <div className="text-orange-400 font-black text-2xl mb-2">{stats.totalAmount.toLocaleString()}₸</div>
              <div className="text-white font-bold uppercase text-sm">ПОТРАЧЕНО</div>
            </div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="mb-8">
          <div className="bg-black border-4 border-white p-6">
            <label className="block text-white font-black text-sm uppercase tracking-wider mb-4 flex items-center">
              <Search className="w-4 h-4 mr-2 text-orange-500" />
              ФИЛЬТР ПО ТИПУ:
            </label>
            
            <div className="flex flex-wrap gap-4">
              {filterOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`px-6 py-3 font-black text-sm uppercase tracking-wider border-4 transition-all duration-300 transform hover:scale-105 flex items-center
                      ${filter === option.value 
                        ? 'bg-orange-500 border-black text-black' 
                        : 'bg-black border-gray-600 text-white hover:border-orange-500'
                      }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Список транзакций */}
        {filteredTransactions.length === 0 ? (
          <div className="bg-black border-4 border-gray-600 p-12 text-center">
            <CreditCard className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h3 className="text-white font-black text-2xl uppercase tracking-wider mb-4">
              ТРАНЗАКЦИИ НЕ НАЙДЕНЫ
            </h3>
            <p className="text-gray-400 font-bold uppercase">
              ИЗМЕНИТЕ ФИЛЬТР ИЛИ СОВЕРШИТЕ ПЕРВУЮ ПОКУПКУ
            </p>
          </div>
        ) : (
          <>
            {/* Desktop таблица */}
            <div className="hidden lg:block bg-black border-4 border-white overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-900 border-b-4 border-orange-500">
                      <th className="px-6 py-4 text-left text-white font-black text-sm uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-white font-black text-sm uppercase tracking-wider">ТИП</th>
                      <th className="px-6 py-4 text-left text-white font-black text-sm uppercase tracking-wider">СУММА</th>
                      <th className="px-6 py-4 text-left text-white font-black text-sm uppercase tracking-wider">СТАТУС</th>
                      <th className="px-6 py-4 text-left text-white font-black text-sm uppercase tracking-wider">ОПИСАНИЕ</th>
                      <th className="px-6 py-4 text-left text-white font-black text-sm uppercase tracking-wider">ДАТА</th>
                      <th className="px-6 py-4 text-left text-white font-black text-sm uppercase tracking-wider">ДЕЙСТВИЯ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction, index) => (
                      <tr key={transaction.transaction_id} className={`border-b-2 border-gray-700 hover:bg-gray-900 transition-colors duration-300 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-black'}`}>
                        <td className="px-6 py-4">
                          <div className="text-orange-500 font-black">#{transaction.transaction_id}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="text-white">{getTransactionTypeIcon(transaction.transaction_type)}</div>
                            <span className="text-white font-bold text-sm uppercase">
                              {getTransactionTypeText(transaction.transaction_type)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`font-black text-lg ${
                            transaction.transaction_type === 'refund' || transaction.transaction_type === 'bonus' 
                              ? 'text-green-500' 
                              : 'text-white'
                          }`}>
                            {transaction.transaction_type === 'refund' || transaction.transaction_type === 'bonus' ? '+' : ''}
                            {transaction.amount.toLocaleString()} {transaction.currency_code}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-black text-sm uppercase ${getStatusColor(transaction.status)}`}>
                            {getStatusText(transaction.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-300 font-bold text-sm max-w-xs truncate">
                            {transaction.description || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-300 font-bold text-sm">
                            {new Date(transaction.created_date).toLocaleString('ru-RU')}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {transaction.transaction_type === 'payment' && 
                           transaction.status === 'completed' && (
                            <button
                              onClick={() => handleRefundRequest(transaction.transaction_id)}
                              disabled={requestRefund?.isLoading}
                              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white font-black text-xs uppercase tracking-wider
                                       border-2 border-black transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" />
                              ВОЗВРАТ
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile карточки */}
            <div className="lg:hidden space-y-4 mb-8">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.transaction_id} className="bg-black border-4 border-white p-6 relative hover:border-orange-500 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-white">{getTransactionTypeIcon(transaction.transaction_type)}</div>
                      <div>
                        <div className="text-orange-500 font-black text-lg">#{transaction.transaction_id}</div>
                        <div className="text-white font-bold text-sm uppercase">
                          {getTransactionTypeText(transaction.transaction_type)}
                        </div>
                      </div>
                    </div>
                    <div className={`font-black text-lg ${getStatusColor(transaction.status)}`}>
                      {getStatusText(transaction.status)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-900 border-2 border-gray-600 p-3">
                      <div className="text-gray-400 font-black text-xs uppercase mb-1">СУММА:</div>
                      <div className={`font-black text-xl ${
                        transaction.transaction_type === 'refund' || transaction.transaction_type === 'bonus' 
                          ? 'text-green-500' 
                          : 'text-white'
                      }`}>
                        {transaction.transaction_type === 'refund' || transaction.transaction_type === 'bonus' ? '+' : ''}
                        {transaction.amount.toLocaleString()} {transaction.currency_code}
                      </div>
                    </div>

                    <div className="bg-gray-900 border-2 border-gray-600 p-3">
                      <div className="text-gray-400 font-black text-xs uppercase mb-1">ОПИСАНИЕ:</div>
                      <div className="text-white font-bold text-sm">
                        {transaction.description || '-'}
                      </div>
                    </div>

                    <div className="bg-gray-900 border-2 border-gray-600 p-3">
                      <div className="text-gray-400 font-black text-xs uppercase mb-1">ДАТА:</div>
                      <div className="text-white font-bold text-sm">
                        {new Date(transaction.created_date).toLocaleString('ru-RU')}
                      </div>
                    </div>
                  </div>

                  {transaction.transaction_type === 'payment' && transaction.status === 'completed' && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleRefundRequest(transaction.transaction_id)}
                        disabled={requestRefund?.isLoading}
                        className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-black text-sm uppercase tracking-wider
                                 border-2 border-black transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        ЗАПРОСИТЬ ВОЗВРАТ
                      </button>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 opacity-50"></div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Информация о возвратах */}
        <div className="bg-black border-4 border-yellow-500 p-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-yellow-500 mt-1" />
            <div className="text-gray-300 text-sm">
              <p className="font-bold uppercase mb-2 text-yellow-400">ИНФОРМАЦИЯ О ВОЗВРАТАХ:</p>
              <ul className="space-y-1 text-xs normal-case">
                <li>• Возврат средств возможен в течение 24 часов после оплаты</li>
                <li>• Возврат производится только при технических проблемах с услугой</li>
                <li>• Средства возвращаются на тот же способ оплаты в течение 3-5 рабочих дней</li>
                <li>• По вопросам возврата обращайтесь в поддержку: support@kolesa.kz</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;