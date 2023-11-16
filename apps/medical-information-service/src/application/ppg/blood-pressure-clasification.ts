export enum ClasificacionPresion {
    Optimo = "Óptimo",
    Normal = "Normal",
    PreHipertension = "Pre-Hipertensión",
    HipertensionI = "Hipertensión I",
    HipertensionII = "Hipertensión II",
    HipertensionIII = "Hipertensión III",
    HipertensionSistolicaAislada = "Hipertensión Sistólica Aislada",
  }
  
export type RangoPresion = {
    minSistolica: number;
    maxSistolica: number;
    minDiastolica: number;
    maxDiastolica: number;
    clasificacion: ClasificacionPresion;
  };
  
export const rangosPresion: RangoPresion[] = [
  { minSistolica: 0, maxSistolica: 119, minDiastolica: 0, maxDiastolica: 79, clasificacion: ClasificacionPresion.Optimo },
  { minSistolica: 0, maxSistolica: 129, minDiastolica: 0, maxDiastolica: 84, clasificacion: ClasificacionPresion.Normal },
  { minSistolica: 0, maxSistolica: 139, minDiastolica: 0, maxDiastolica: 89, clasificacion: ClasificacionPresion.PreHipertension },
  { minSistolica: 0, maxSistolica: 149, minDiastolica: 0, maxDiastolica: 99, clasificacion: ClasificacionPresion.HipertensionI },
  { minSistolica: 0, maxSistolica: 179, minDiastolica: 0, maxDiastolica: 109, clasificacion: ClasificacionPresion.HipertensionII },
  { minSistolica: 0, maxSistolica: Number.MAX_VALUE, minDiastolica: 0, maxDiastolica: Number.MAX_VALUE, clasificacion: ClasificacionPresion.HipertensionIII },
  { minSistolica: 0, maxSistolica: Number.MAX_VALUE, minDiastolica: 0, maxDiastolica: 89, clasificacion: ClasificacionPresion.HipertensionSistolicaAislada },
];
