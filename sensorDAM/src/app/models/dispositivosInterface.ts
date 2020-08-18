export interface Dispositivos {
    dispositivoId: number;
    nombre: string;
    ubicacion: string;
    electrovalvulaId: number;
}

export interface Mediciones {
    medicionId: number;
    fecha: string;
    valor: string;
    dispositivoId: number;
}