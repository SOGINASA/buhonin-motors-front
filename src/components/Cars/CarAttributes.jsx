import React from 'react';
import { Car, Settings, ClipboardList } from 'lucide-react';
import { useCars } from '../../hooks/api/useCars';

const CarAttributes = ({ attributes, onChange }) => {
  const { 
    bodyTypes, 
    engineTypes, 
    transmissionTypes, 
    driveTypes, 
    colors 
  } = useCars();

  const handleAttributeChange = (key, value) => {
    onChange({
      ...attributes,
      [key]: value
    });
  };

  // Группы полей для лучшей организации
  const fieldGroups = [
    {
      title: 'ОСНОВНЫЕ ХАРАКТЕРИСТИКИ',
      icon: Car,
      fields: [
        {
          key: 'year',
          label: 'ГОД ВЫПУСКА',
          type: 'number',
          props: { min: 1980, max: new Date().getFullYear() + 1 }
        },
        {
          key: 'mileage',
          label: 'ПРОБЕГ (КМ)',
          type: 'number',
          props: { min: 0 }
        },
        {
          key: 'condition',
          label: 'СОСТОЯНИЕ',
          type: 'select',
          options: [
            { value: '', label: 'ВЫБЕРИТЕ СОСТОЯНИЕ' },
            { value: 'new', label: 'НОВЫЙ' },
            { value: 'excellent', label: 'ОТЛИЧНОЕ' },
            { value: 'good', label: 'ХОРОШЕЕ' },
            { value: 'fair', label: 'УДОВЛЕТВОРИТЕЛЬНОЕ' },
            { value: 'poor', label: 'ТРЕБУЕТ РЕМОНТА' }
          ]
        }
      ]
    },
    {
      title: 'ТЕХНИЧЕСКИЕ ДАННЫЕ',
      icon: Settings,
      fields: [
        {
          key: 'body_type_id',
          label: 'ТИП КУЗОВА',
          type: 'select',
          options: [
            { value: '', label: 'ВЫБЕРИТЕ ТИП КУЗОВА' },
            ...(bodyTypes?.data?.map(type => ({
              value: type.body_type_id,
              label: type.body_type_name.toUpperCase()
            })) || [])
          ]
        },
        {
          key: 'engine_type_id',
          label: 'ТИП ДВИГАТЕЛЯ',
          type: 'select',
          options: [
            { value: '', label: 'ВЫБЕРИТЕ ТИП ДВИГАТЕЛЯ' },
            ...(engineTypes?.data?.map(type => ({
              value: type.engine_type_id,
              label: type.engine_type_name.toUpperCase()
            })) || [])
          ]
        },
        {
          key: 'engine_volume',
          label: 'ОБЪЕМ ДВИГАТЕЛЯ (Л)',
          type: 'number',
          props: { step: 0.1, min: 0, max: 10 }
        },
        {
          key: 'power_hp',
          label: 'МОЩНОСТЬ (Л.С.)',
          type: 'number',
          props: { min: 0 }
        },
        {
          key: 'transmission_id',
          label: 'КОРОБКА ПЕРЕДАЧ',
          type: 'select',
          options: [
            { value: '', label: 'ВЫБЕРИТЕ КПП' },
            ...(transmissionTypes?.data?.map(type => ({
              value: type.transmission_id,
              label: type.transmission_name.toUpperCase()
            })) || [])
          ]
        },
        {
          key: 'drive_type_id',
          label: 'ПРИВОД',
          type: 'select',
          options: [
            { value: '', label: 'ВЫБЕРИТЕ ПРИВОД' },
            ...(driveTypes?.data?.map(type => ({
              value: type.drive_type_id,
              label: type.drive_type_name.toUpperCase()
            })) || [])
          ]
        },
        {
          key: 'color_id',
          label: 'ЦВЕТ',
          type: 'select',
          options: [
            { value: '', label: 'ВЫБЕРИТЕ ЦВЕТ' },
            ...(colors?.data?.map(color => ({
              value: color.color_id,
              label: color.color_name.toUpperCase()
            })) || [])
          ]
        }
      ]
    },
    {
      title: 'ДОПОЛНИТЕЛЬНЫЕ ОПЦИИ',
      icon: ClipboardList,
      fields: [
        {
          key: 'customs_cleared',
          label: 'РАСТАМОЖЕН',
          type: 'checkbox'
        },
        {
          key: 'exchange_possible',
          label: 'ВОЗМОЖЕН ОБМЕН',
          type: 'checkbox'
        },
        {
          key: 'credit_available',
          label: 'ВОЗМОЖЕН КРЕДИТ',
          type: 'checkbox'
        }
      ]
    }
  ];

  const renderField = (field) => {
    const value = attributes[field.key] || '';

    switch (field.type) {
      case 'select':
        return (
          <div className="relative group">
            <select
              value={value}
              onChange={(e) => handleAttributeChange(field.key, e.target.value)}
              className="w-full bg-white border-4 border-black px-4 py-4 font-black text-black uppercase tracking-wide
                         focus:outline-none focus:border-orange-500 focus:bg-orange-100
                         hover:bg-gray-100 transition-all duration-300 cursor-pointer appearance-none"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {/* Кастомная стрелка */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] 
                              border-l-transparent border-r-transparent border-t-black"></div>
            </div>
            
            {/* Декоративный элемент */}
            <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          </div>
        );

      case 'number':
        return (
          <div className="relative group">
            <input
              type="number"
              value={value}
              onChange={(e) => handleAttributeChange(field.key, e.target.value)}
              className="w-full bg-white border-4 border-black px-4 py-4 font-black text-black uppercase tracking-wide
                         focus:outline-none focus:border-orange-500 focus:bg-orange-100
                         hover:bg-gray-100 transition-all duration-300"
              {...field.props}
            />
            
            {/* Декоративный элемент */}
            <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="flex items-center gap-4 bg-gray-900 border-2 border-orange-500 p-4 hover:bg-gray-800 transition-colors duration-300">
            <div className="relative">
              <input
                type="checkbox"
                id={field.key}
                checked={value || false}
                onChange={(e) => handleAttributeChange(field.key, e.target.checked)}
                className="sr-only"
              />
              <label
                htmlFor={field.key}
                className={`block w-8 h-8 border-4 cursor-pointer transition-all duration-300 transform hover:scale-110
                  ${value 
                    ? 'bg-orange-500 border-black' 
                    : 'bg-black border-orange-500 hover:bg-gray-800'
                  }`}
              >
                {value && (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-black font-black text-lg">✓</span>
                  </div>
                )}
              </label>
            </div>
            <span className="text-white font-black text-sm uppercase tracking-wider flex-1">
              {field.label}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-black border-4 border-orange-500 p-6 relative">
      {/* Заголовок */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white mb-4">
          <span className="text-orange-500">ХАРАКТЕРИСТИКИ</span> АВТОМОБИЛЯ
        </h3>
        <div className="w-full h-1 bg-orange-500"></div>
        <p className="text-gray-300 font-bold text-sm mt-2 uppercase">
          ЗАПОЛНИТЕ ДАННЫЕ О ВАШЕМ АВТОМОБИЛЕ
        </p>
      </div>

      {/* Группы полей */}
      <div className="space-y-10">
        {fieldGroups.map((group, groupIndex) => {
          const IconComponent = group.icon;
          
          return (
            <div key={groupIndex} className="bg-gray-900 border-2 border-white p-6">
              {/* Заголовок группы */}
              <div className="flex items-center gap-3 mb-8">
                <IconComponent className="w-6 h-6 text-orange-500" />
                <h4 className="text-white font-black text-lg uppercase tracking-wider">
                  {group.title}
                </h4>
                <div className="flex-1 h-1 bg-orange-500 ml-4"></div>
              </div>

              {/* Поля группы */}
              <div className="space-y-6">
                {group.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    {field.type !== 'checkbox' && (
                      <label className="block text-white font-black text-sm uppercase tracking-wider mb-3">
                        <span className="text-orange-500">●</span> {field.label}
                      </label>
                    )}
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Прогресс заполнения */}
      <div className="mt-8 bg-gray-900 border-2 border-orange-500 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-black text-sm uppercase tracking-wider">
            ПРОГРЕСС ЗАПОЛНЕНИЯ:
          </span>
          <span className="text-orange-500 font-black text-sm">
            {Math.round((Object.values(attributes).filter(v => v !== '' && v !== null && v !== undefined).length / 
              fieldGroups.reduce((total, group) => total + group.fields.length, 0)) * 100)}%
          </span>
        </div>
        <div className="w-full bg-black border-2 border-gray-600 h-3">
          <div 
            className="h-full bg-orange-500 transition-all duration-500"
            style={{
              width: `${(Object.values(attributes).filter(v => v !== '' && v !== null && v !== undefined).length / 
                fieldGroups.reduce((total, group) => total + group.fields.length, 0)) * 100}%`
            }}
          ></div>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-2 left-2 w-6 h-6 border-2 border-orange-500"></div>
      <div className="absolute bottom-2 right-2 w-6 h-6 bg-orange-500"></div>
    </div>
  );
};

export default CarAttributes;