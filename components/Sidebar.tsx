
import type React from 'react';
import type { SidebarData } from '../types';

interface SidebarProps {
  data: SidebarData;
}

const Sidebar: React.FC<SidebarProps> = ({ data }) => {
  const { estimatedCalories, foodEquivalent, sources } = data;

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 p-4 space-y-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 h-full overflow-y-auto">
      <div>
        <h2 className="text-lg font-bold text-teal-800 mb-2">Resumen del Entrenamiento</h2>
        <div className="p-4 bg-yellow-100/50 rounded-lg space-y-2">
          <div>
            <h3 className="font-semibold text-gray-700">Gasto Calórico Aproximado</h3>
            <p className="text-2xl font-bold text-yellow-700">
              {estimatedCalories ? `${estimatedCalories} kcal` : '...'}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Equivalente en Alimento</h3>
            <p className="text-teal-700">{foodEquivalent || '...'}</p>
          </div>
        </div>
      </div>
      
      {sources && sources.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-teal-800 mb-2">Fuentes de Información</h2>
          <ul className="space-y-2 text-sm">
            {sources.map((source, index) => source.web && (
              <li key={index} className="p-2 bg-sky-100/50 rounded-lg hover:bg-sky-200/60 transition-colors">
                <a
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 hover:text-sky-900 font-medium break-words"
                >
                  {source.web.title || source.web.uri}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
