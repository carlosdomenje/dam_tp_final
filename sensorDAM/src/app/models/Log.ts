export class Log{
    private apertura: number;
    private fecha: string;
    private electrovalvulaId: number;

    constructor(apertura,fecha,electrovalvulaId){
        this.apertura=apertura;
        this.fecha=fecha;
        this.electrovalvulaId=electrovalvulaId;
    }

    public get Gapertura(): number {
        return this.apertura;
    }
    public set Sapertura(value: number) {
        this.apertura = value;
    }

    public get Gfecha(): string {
        return this.fecha;
    }
    public set Sfecha(value: string) {
        this.fecha = value;
    }

    public get GelectrovalvulaId(): number {
        return this.electrovalvulaId;
    }
    public set SelectrovalvulaId(value: number) {
        this.electrovalvulaId = value;
    }

}