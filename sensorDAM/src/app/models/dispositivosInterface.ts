export interface Dispositivos {
    dispositivoId: number;
    nombre: string;
    ubicacion: string;
    electrovalvulaId: number;
}

export interface Mediciones {
    fecha: string;
    valor: string;
    dispositivoId: number;
}

export interface LogRiego {
    apertura: number;
    fecha: string;
    electrovalvulaId: number;
}

export interface EvName {
    nombre: string;
}
