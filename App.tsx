import React, { useState, useRef, useEffect, useCallback } from 'react';
import ChatMessage from './components/ChatMessage';
import Sidebar from './components/Sidebar';
import UserInput from './components/UserInput';
import LoadingIndicator from './components/LoadingIndicator';
import { getExerciseSuggestions, getExerciseInstructions } from './services/geminiService';
import { ConversationState } from './types';
import type { Message, WorkoutParams, SidebarData, Exercise, Equipment } from './types';
import { EQUIPMENT_OPTIONS, ACTIVITY_LEVELS } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationState, setConversationState] = useState<ConversationState>(ConversationState.AWAITING_GREETING);
  const [workoutParams, setWorkoutParams] = useState<WorkoutParams>({
    time: null,
    equipment: [],
    age: null,
    gender: null,
    activityLevel: null,
  });
  const [sidebarData, setSidebarData] = useState<SidebarData>({
    estimatedCalories: null,
    foodEquivalent: null,
    sources: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  const addMessage = useCallback((sender: 'user' | 'bot', text?: string, component?: React.ReactNode) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender, text, component }]);
  }, []);
  
  useEffect(() => {
      addMessage('bot', '¡Hola! 👋 Soy FitBot, tu entrenador personal de IA. Escribe "quiero hacer ejercicio" para empezar. 💪');
  }, [addMessage]);
  
  const handleTimeSelect = (time: number) => {
    setWorkoutParams(p => ({ ...p, time }));
    addMessage('user', `${time} minutos`);
    setMessages(prev => prev.map(m => m.component ? { ...m, component: undefined, text: '¿Cuánto tiempo tienes para entrenar hoy?' } : m));
    
    setTimeout(() => {
        addMessage(
            'bot',
            '¡Perfecto! 👍 Ahora, selecciona el equipamiento que tienes disponible. 🏋️‍♀️',
            <IconSelector onSelect={handleEquipmentSelect} />
        );
        setConversationState(ConversationState.AWAITING_EQUIPMENT);
    }, 500);
  };

  const handleEquipmentSelect = (selectedEquipment: string[]) => {
    const equipmentNames = selectedEquipment.map(id => EQUIPMENT_OPTIONS.find(eq => eq.id === id)?.name || id).join(', ');
    setWorkoutParams(p => ({ ...p, equipment: selectedEquipment }));
    addMessage('user', `Tengo: ${equipmentNames || 'Nada, solo mi cuerpo'}`);
    setMessages(prev => prev.map(m => m.component ? { ...m, component: undefined, text: '¡Perfecto! Ahora, selecciona el equipamiento que tienes disponible.' } : m));

    setTimeout(() => {
        addMessage(
            'bot',
            'Genial. 👍 Para personalizar tu rutina, necesito algunos datos más. 📝',
            <ProfileForm onSubmit={handleProfileSubmit} />
        );
        setConversationState(ConversationState.AWAITING_PROFILE);
    }, 500);
  };

  const handleProfileSubmit = async (profile: { age: number; gender: string; activityLevel: string }) => {
    const finalParams = { ...workoutParams, ...profile };
    setWorkoutParams(finalParams);
    addMessage('user', `Tengo ${profile.age} años, soy ${profile.gender} y mi actividad es ${profile.activityLevel}.`);
    setMessages(prev => prev.map(m => m.component ? { ...m, component: undefined, text: 'Genial. Para personalizar tu rutina, necesito algunos datos más.' } : m));
    setConversationState(ConversationState.GENERATING_EXERCISES);
    setIsLoading(true);

    try {
        const result = await getExerciseSuggestions(finalParams);
        setSidebarData({
            estimatedCalories: result.data.estimatedCalories,
            foodEquivalent: result.data.foodEquivalent,
            sources: result.sources,
        });
        addMessage(
            'bot',
            '¡Listo! ✅ He preparado estas opciones para ti. Selecciona un ejercicio para ver las instrucciones detalladas. 👇',
            <ExerciseList exercises={result.data.exercises} onSelect={handleExerciseSelect} />
        );
        setConversationState(ConversationState.AWAITING_EXERCISE_SELECTION);
    } catch (error) {
        console.error(error);
        addMessage('bot', 'Lo siento, he tenido un problema al generar tus ejercicios. 😥 Por favor, intenta de nuevo.');
        setConversationState(ConversationState.IDLE);
    } finally {
        setIsLoading(false);
    }
  };

  const handleExerciseSelect = async (exercise: Exercise) => {
    addMessage('user', `Quiero hacer: ${exercise.name}`);
    setMessages(prev => prev.map(m => m.component ? { ...m, component: undefined, text: 'He preparado estas opciones para ti. Selecciona un ejercicio para ver las instrucciones detalladas.' } : m));
    setConversationState(ConversationState.GENERATING_INSTRUCTIONS);
    setIsLoading(true);

    try {
        const instructions = await getExerciseInstructions(exercise.name, workoutParams);
        addMessage('bot', `¡Excelente elección! 🤸‍♀️ Aquí tienes cómo hacer "${exercise.name}":\n\n${instructions}`);
        addMessage('bot', '¡Has completado tu planificación! 🎉 Si quieres otra rutina, escribe "quiero hacer ejercicio".');
        setConversationState(ConversationState.AWAITING_GREETING);
    } catch (error) {
        console.error(error);
        addMessage('bot', 'Ups, no pude obtener las instrucciones. 😥 Intenta seleccionar otro ejercicio.');
        setConversationState(ConversationState.AWAITING_EXERCISE_SELECTION); // Revert to allow another choice
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleUserMessage = (text: string) => {
    addMessage('user', text);
    if (conversationState === ConversationState.AWAITING_GREETING && text.toLowerCase().includes('ejercicio')) {
        setTimeout(() => {
            addMessage(
                'bot',
                '¡Claro! 👍 ¿Cuánto tiempo tienes para entrenar hoy? ⏱️',
                <TimeSelector onSelect={handleTimeSelect} />
            );
            setConversationState(ConversationState.AWAITING_TIME);
        }, 500);
    } else {
        setTimeout(() => {
            addMessage('bot', 'No te he entendido. 🤔 Si quieres empezar, escribe "quiero hacer ejercicio".');
        }, 500);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-gradient-to-br from-slate-200 via-yellow-100 to-orange-200">
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        <div className="flex-grow flex flex-col bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            {isLoading && <LoadingIndicator />}
            <div ref={chatEndRef} />
          </div>
          <UserInput
            onSubmit={handleUserMessage}
            isLoading={isLoading}
            placeholder="Escribe tu mensaje..."
            enabled={conversationState === ConversationState.AWAITING_GREETING}
          />
        </div>
        <Sidebar data={sidebarData} />
      </main>
    </div>
  );
};

// --- Internal Components for Chat Flow ---

const TimeSelector: React.FC<{ onSelect: (time: number) => void }> = ({ onSelect }) => {
  const times = [15, 30, 45, 60];
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {times.map(time => (
        <button key={time} onClick={() => onSelect(time)} className="px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
          {time} min
        </button>
      ))}
    </div>
  );
};

const IconSelector: React.FC<{ onSelect: (equipment: string[]) => void }> = ({ onSelect }) => {
    const [selected, setSelected] = useState<string[]>([]);
    const toggleSelection = (id: string) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    return (
        <div className="mt-2">
            <div className="grid grid-cols-2 gap-3">
                {EQUIPMENT_OPTIONS.map(eq => (
                    <button key={eq.id} onClick={() => toggleSelection(eq.id)} className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-all ${selected.includes(eq.id) ? 'bg-teal-100 border-teal-400 ring-2 ring-teal-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                        {eq.icon}
                        <span className="text-xs font-medium">{eq.name}</span>
                    </button>
                ))}
            </div>
            <button onClick={() => onSelect(selected)} className="w-full mt-4 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                Continuar
            </button>
        </div>
    );
};

const ProfileForm: React.FC<{ onSubmit: (profile: { age: number; gender: string; activityLevel: string }) => void }> = ({ onSubmit }) => {
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [activityLevel, setActivityLevel] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (age && gender && activityLevel) {
            onSubmit({ age: parseInt(age), gender, activityLevel });
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-3 mt-2 text-sm">
            <div>
                <label className="font-semibold text-gray-700">Edad</label>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md mt-1 bg-white" />
            </div>
            <div>
                <label className="font-semibold text-gray-700">Género</label>
                <select value={gender} onChange={e => setGender(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md mt-1 bg-white">
                    <option value="" disabled>Selecciona...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
            <div>
                <label className="font-semibold text-gray-700">Nivel de Actividad</label>
                <select value={activityLevel} onChange={e => setActivityLevel(e.target.value)} required className="w-full p-2 border border-gray-300 rounded-md mt-1 bg-white">
                    <option value="" disabled>Selecciona...</option>
                    {ACTIVITY_LEVELS.map(level => <option key={level.id} value={level.name}>{level.name}</option>)}
                </select>
            </div>
            <button type="submit" className="w-full mt-2 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                Generar Rutina
            </button>
        </form>
    );
};

const ExerciseList: React.FC<{ exercises: Exercise[]; onSelect: (exercise: Exercise) => void }> = ({ exercises, onSelect }) => {
    return (
        <div className="space-y-2 mt-2">
            {exercises.map(exercise => (
                <button key={exercise.name} onClick={() => onSelect(exercise)} className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-teal-50 hover:border-teal-300 transition-all focus:outline-none focus:ring-2 focus:ring-teal-300">
                    <h4 className="font-bold text-teal-800">{exercise.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{exercise.description}</p>
                </button>
            ))}
        </div>
    );
};

export default App;