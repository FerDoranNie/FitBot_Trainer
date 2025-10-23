
import { GoogleGenAI } from "@google/genai";
import type { WorkoutParams } from "../types";

// Fix: Initialize GoogleGenAI with apiKey from process.env directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getExerciseSuggestions = async (params: WorkoutParams) => {
  const equipmentText = params.equipment.length > 0 ? params.equipment.join(', ') : 'ninguno (solo peso corporal)';
  const prompt = `
    Actúa como un entrenador personal experto. Un usuario quiere una rutina de ejercicios.
    Sus datos son:
    - Edad: ${params.age}
    - Género: ${params.gender}
    - Nivel de actividad física: ${params.activityLevel}
    - Tiempo disponible: ${params.time} minutos
    - Equipamiento disponible: ${equipmentText}

    Basado en estos datos, busca en la web para generar 3-5 ejercicios adecuados. Para toda la sesión de entrenamiento, estima las calorías totales quemadas y sugiere un alimento común con un conteo de calorías similar.

    Devuelve la respuesta como un único objeto JSON válido con la siguiente estructura:
    {
      "estimatedCalories": number,
      "foodEquivalent": "string",
      "exercises": [
        { "name": "string", "description": "string" }
      ]
    }
    
    No incluyas texto, explicaciones o marcadores de formato como \`\`\`json fuera del objeto JSON. La respuesta debe ser únicamente el JSON.
  `;

  // Fix: Call generateContent directly on ai.models as per guidelines.
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  try {
    const jsonText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(jsonText);
    return {
        data,
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [],
    };
  } catch (error) {
    console.error("Error parsing JSON from Gemini:", error);
    throw new Error("La respuesta de la IA no es un JSON válido.");
  }
};

export const getExerciseInstructions = async (exerciseName: string, params: WorkoutParams) => {
    const prompt = `
        Proporciona instrucciones detalladas, paso a paso, para realizar el ejercicio "${exerciseName}".
        Adapta las instrucciones para una persona con el siguiente perfil:
        - Edad: ${params.age}
        - Género: ${params.gender}
        - Nivel de actividad física: ${params.activityLevel}
        - Duración total del entrenamiento: ${params.time} minutos

        Formatea las instrucciones como una lista numerada (ej. 1. Comienza de pie...). No agregues títulos ni texto introductorio, solo la lista de pasos.
    `;

    // Fix: Call generateContent directly on ai.models as per guidelines.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
};